# Platform Foundation

## Status

The Supabase platform foundation is configured without application tables, authentication, forms, or content migration. The implementation uses the official `@supabase/supabase-js` client and exposes a no-index health page at `/admin/platform`. A separate read-only Planning Center provider foundation now adds sanitized environment and endpoint diagnostics without activating provider data publicly.

## Environment contract

The application expects these variables at the repository root in `.env.local` and in each applicable Vercel environment:

| Variable | Exposure | Current use |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser and server | Project endpoint and connectivity check |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser and server | Publishable client access with Row Level Security enforced |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Presence verified only; not used by the application |
| `PLANNING_CENTER_APP_ID` | Server only | Planning Center Personal Access Token identifier |
| `PLANNING_CENTER_SECRET` | Server only | Planning Center Personal Access Token secret |

The health page reports only whether configuration is present and valid. It never renders credential values, the project URL, or project identifiers.

## Client helpers

- `src/lib/supabase/config.ts` validates public configuration and provides safe status metadata.
- `src/lib/supabase/client.ts` provides a singleton browser client.
- `src/lib/supabase/server.ts` creates a non-persistent, publishable-key server client so Row Level Security remains active. It also checks only for the presence of the server credential.
- `src/lib/supabase/health.ts` performs a five-second, no-store request to Supabase Auth health. It does not query a table, create a session, or use the service-role key.
- `src/lib/supabase/index.ts` provides stable exports for future modules.

No generated database type exists yet because no schema or tables have been approved.

## Health page

`/admin/platform` is server-rendered on every request and sends `Cache-Control: private, no-store`. It reports:

- Supabase connection status and non-sensitive response latency
- Environment configuration status
- Node.js runtime version
- Application version and abbreviated Vercel commit when available
- Vercel environment, or local development when outside Vercel

The page is intentionally marked `noindex, nofollow`. It is diagnostic, not an application administration feature.

Planning Center adds the following non-sensitive checks to `/admin/platform`:

- credential presence as `Configured` or `Missing`
- API and organization reachability
- Calendar, Registrations, and Groups endpoint reachability

The no-index `/admin/platform/planning-center` route adds counts and safe normalized samples from public-eligible records. Both diagnostic routes are server-rendered with `Cache-Control: private, no-store, max-age=0`. See `PLANNING_CENTER_INTEGRATION.md` for the complete provider and privacy contract.

## Middleware decision

No `middleware.ts` or root `proxy.ts` was added. Next.js 16 reserves Proxy for request-time rewriting and optimistic authorization, and Supabase needs it primarily to refresh cookie-backed authentication sessions. Authentication is explicitly outside this milestone, so adding Proxy now would create an unused request interception layer. Revisit this decision when the authentication architecture is approved.

## Security boundaries

- The service-role key must never use the `NEXT_PUBLIC_` prefix.
- Future browser code must use `getSupabaseBrowserClient()` and rely on Row Level Security.
- Future server code should default to `createSupabaseServerClient()` unless a reviewed administrative operation specifically requires elevated access.
- Elevated helpers should live in a separate server-only module and must never be imported by client code.
- Health failures return generic states; remote response bodies and credential-related errors are not exposed.
- Planning Center credentials are read only by server-side provider modules and never serialized into page props.
- Planning Center diagnostics never request People records, group memberships, submitted registrations, attendees, giving records, or contact data.

## Deferred work

- Database schema and migrations
- Generated database types
- Authentication and session refresh
- Proxy/middleware integration
- Storage buckets
- Content migration
- Forms and administrative workflows
- Planning Center public activation, synchronization, webhooks, and write operations

## Validation

Validated locally on August 7, 2026:

- `npm run lint` — passed
- `npm run build` — passed; `/admin/platform` is emitted as a dynamic server-rendered route
- Planning Center diagnostics — `/admin/platform/planning-center` is emitted as a dynamic server-rendered route and returns `200 OK`, `noindex, nofollow`, and `Cache-Control: private, no-store, max-age=0`
- Missing-credential behavior — `/admin/platform` reports `Missing` and all provider endpoints report `Not checked`; the preview reports no counts or records
- Client-bundle credential scan — no Planning Center environment-variable names, Basic credential payloads, or Authorization logic found in `.next/static`
- Production HTTP smoke check — `200 OK`
- Cache policy — `private, no-store, max-age=0`
- Supabase health — connected
- Rendered-output credential scan — no configured environment names, key prefixes, project URL, or credential values found
