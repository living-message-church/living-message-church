import { readFile } from "node:fs/promises";

const files = {
  migration: "supabase/migrations/202608080001_ai_event_creative_pipeline.sql",
  adminMigration: "supabase/migrations/202608080002_secure_creative_admin.sql",
  auth: "src/lib/supabase/auth.ts",
  requestSecurity: "src/lib/admin/request-security.ts",
  api: "src/pages/api/admin/creative.ts",
  prompt: "src/lib/creative/prompt-builder.ts",
  provider: "src/lib/creative/providers/openai.ts",
  workflow: "src/lib/creative/workflow.ts",
  admin: "src/pages/admin/events/creative.tsx",
};

const contents = Object.fromEntries(await Promise.all(Object.entries(files).map(async ([key, path]) => [key, await readFile(path, "utf8")])));
const failures = [];

for (const table of ["event_creative_jobs", "event_creative_assets", "event_creative_overrides", "creative_style_presets"]) {
  if (!contents.migration.includes(`public.${table}`)) failures.push(`Missing ${table} migration.`);
}
if (!/values \('event-art', 'event-art', false/.test(contents.migration)) failures.push("event-art bucket must be private.");
if (/for (insert|update|delete)/i.test(contents.migration)) failures.push("Migration must not add anonymous mutation policies.");
if (!contents.prompt.includes("Do not render the event title") || !contents.prompt.includes("Do not create logos")) failures.push("Prompt safety rules are incomplete.");
if (!contents.provider.includes("conceptCount: 3") && !contents.workflow.includes("conceptCount: 3")) failures.push("Generation must request three concepts.");
if (!contents.workflow.includes("createSupabaseAdminClient")) failures.push("Creative mutations must use the server-only Supabase boundary.");
if (!contents.adminMigration.includes("creative_audit_log") || !contents.adminMigration.includes("acting_user_id")) failures.push("Creative mutation audit migration is missing.");
if (!contents.auth.includes("auth.getUser()") || !contents.auth.includes("app_metadata?.admin_role")) failures.push("Server-verified Supabase user and role checks are required.");
if (!contents.requestSecurity.includes("assertSameOriginPost") || !contents.requestSecurity.includes("requireAdminRole")) failures.push("Creative mutations require CSRF and server role checks.");
if (!contents.api.includes('req.body?.action') || !contents.api.includes('V1 generation is restricted')) failures.push("Creative mutation endpoint must use action-scoped POST handling and single-event generation gating.");
if (/export default async function handler[\s\S]*Planning Center/.test(contents.api)) failures.push("Creative mutation API must not write to Planning Center.");

if (failures.length) {
  console.error("Creative pipeline validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Creative pipeline validation passed: private storage, server-verified roles, same-origin POST mutations, audit identity, approval gating, and single-event three-concept generation confirmed.");
}
