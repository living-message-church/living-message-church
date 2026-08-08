import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.resolve("src");
const providerRoot = path.resolve("src/lib/planning-center");
const providerClient = path.join(providerRoot, "client.ts");
const sourceExtensions = new Set([".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const planningCenterOrigin = "api.planningcenteronline.com";
const forbiddenRequest = /method\s*:\s*["'`](?:POST|PUT|PATCH|DELETE)["'`]/i;
const forbiddenHelper = /planningCenter(?:Post|Put|Patch|Delete)\b/i;
const directFetch = /\bfetch\s*\(/;
const providerOriginConstant = /\bPLANNING_CENTER_API_BASE_URL\b/;

async function filesWithin(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesWithin(target) : [target];
  }));
  return files.flat();
}

const violations = [];

for (const file of await filesWithin(sourceRoot)) {
  if (!sourceExtensions.has(path.extname(file))) continue;
  const contents = await readFile(file, "utf8");
  const isProviderFile = file.startsWith(`${providerRoot}${path.sep}`);

  if (isProviderFile && (forbiddenRequest.test(contents) || forbiddenHelper.test(contents))) {
    violations.push(`${path.relative(process.cwd(), file)} introduces a Planning Center write path.`);
  }

  if (isProviderFile && file !== providerClient && directFetch.test(contents)) {
    violations.push(`${path.relative(process.cwd(), file)} bypasses the centralized GET-only client.`);
  }

  if (!isProviderFile && (contents.includes(planningCenterOrigin) || providerOriginConstant.test(contents))) {
    violations.push(`${path.relative(process.cwd(), file)} bypasses the centralized Planning Center client.`);
  }
}

if (violations.length > 0) {
  console.error("Planning Center read-only validation failed:\n");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exitCode = 1;
} else {
  console.log("Planning Center read-only validation passed: centralized GET-only access; no write paths found.");
}
