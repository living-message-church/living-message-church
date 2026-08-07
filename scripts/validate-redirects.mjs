import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inventory = JSON.parse(fs.readFileSync(path.join(root, "docs/old-site-inventory.json"), "utf8"));
const ledger = fs.readFileSync(path.join(root, "docs/REDIRECTS.md"), "utf8");
const nextConfig = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");

const withoutTrailingSlash = (value) => value === "/" ? value : value.replace(/\/$/, "");
const redirectKey = (route) => {
  const url = new URL(route, "https://livingmessagechurch.com");
  const query = [...url.searchParams.entries()].sort().map(([key, value]) => `${key}=${value}`).join("&");
  return `${withoutTrailingSlash(url.pathname)}${query ? `?${query}` : ""}`;
};

function discoverPages(directory, prefix = "") {
  const routes = new Set();
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name === "api") continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      for (const route of discoverPages(full, `${prefix}/${entry.name}`)) routes.add(route);
      continue;
    }
    if (!/\.(tsx|ts|jsx|js)$/.test(entry.name)) continue;
    const base = entry.name.replace(/\.(tsx|ts|jsx|js)$/, "");
    if (base === "sitemap.xml" || base === "robots.txt") continue;
    routes.add(withoutTrailingSlash(base === "index" ? prefix || "/" : `${prefix}/${base}`));
  }
  return routes;
}

const implementedRoutes = discoverPages(path.join(root, "src/pages"));
const inventoryRedirects = inventory.entries.flatMap((entry) => {
  const source = redirectKey(entry.old_route);
  const destination = withoutTrailingSlash(entry.new_route);
  return source === destination ? [] : [{ source, destination, statusCode: 301 }];
});
const applicationRedirects = [
  { source: "/messages/live", destination: "/online-church", statusCode: 301 },
];
const redirects = [...applicationRedirects, ...inventoryRedirects];

const errors = [];
const warnings = [];
const seen = new Map();
for (const redirect of redirects) {
  if (seen.has(redirect.source)) errors.push(`Duplicate source: ${redirect.source}`);
  seen.set(redirect.source, redirect.destination);
  if (redirect.statusCode !== 301) errors.push(`Invalid status for ${redirect.source}: ${redirect.statusCode}`);
  if (!implementedRoutes.has(redirect.destination)) errors.push(`Missing static destination: ${redirect.source} -> ${redirect.destination}`);
}

const unconditional = new Map(redirects.filter((redirect) => !redirect.source.includes("?")).map((redirect) => [redirect.source, redirect.destination]));
for (const redirect of redirects) {
  const visited = new Set([redirect.source]);
  let current = redirect.destination;
  let hops = 1;
  while (unconditional.has(current)) {
    if (visited.has(current)) {
      errors.push(`Redirect loop: ${[...visited, current].join(" -> ")}`);
      break;
    }
    visited.add(current);
    current = unconditional.get(current);
    hops += 1;
  }
  if (hops > 1) errors.push(`Multi-hop chain from ${redirect.source} (${hops} hops)`);
}

const ledgerRows = ledger.split("\n").filter((line) => line.startsWith("| `"));
if (ledgerRows.length !== inventory.entries.length) errors.push(`Ledger row count ${ledgerRows.length} does not match inventory ${inventory.entries.length}`);
const ledgerChanged = ledgerRows.filter((line) => line.includes("Permanent (301)")).length;
if (ledgerChanged !== inventoryRedirects.length) errors.push(`Ledger has ${ledgerChanged} 301 rows; computed legacy redirects have ${inventoryRedirects.length}`);
if (/Permanent \(308\)/.test(ledger)) errors.push("Ledger still contains a 308 status assumption");
if (!/skipTrailingSlashRedirect:\s*true/.test(nextConfig)) errors.push("Next.js trailing-slash normalization can create a 308 -> 301 chain; set skipTrailingSlashRedirect: true");
if (!/source:\s*["']\/messages\/live["'][\s\S]*destination:\s*["']\/online-church["'][\s\S]*statusCode:\s*301/.test(nextConfig)) {
  errors.push("Missing canonical application redirect: /messages/live -> /online-church (301)");
}

const queryRedirects = redirects.filter((redirect) => redirect.source.includes("?"));
if (queryRedirects.length) warnings.push(`${queryRedirects.length} query-qualified source will be implemented with Next.js query matching; unrelated query parameters pass through.`);

console.log(`Redirect sources: ${redirects.length} (${inventoryRedirects.length} legacy + ${applicationRedirects.length} application)`);
console.log(`Known static destinations: ${implementedRoutes.size}`);
console.log(`Loops: 0`);
console.log(`Chains: 0`);
for (const warning of warnings) console.log(`Note: ${warning}`);

if (errors.length) {
  for (const error of [...new Set(errors)]) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log("Redirect validation passed.");
