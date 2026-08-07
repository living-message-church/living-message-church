# Platform Foundation

## Status

The Supabase platform foundation is configured without application tables, authentication, forms, or content migration. The implementation uses the official `@supabase/supabase-js` client and exposes a no-index health page at `/admin/platform`. Separate read-only Planning Center and YouTube provider foundations add sanitized diagnostics while keeping credentials and provider logic on the server.

## Environment contract

The application expects these variables at the repository root in `.env.local` and in each applicable Vercel environment:

| Variable | Exposure | Current use |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser and server | Project endpoint and connectivity check |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser and server | Publishable client access with Row Level Security enforced |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Presence verified only; not used by the application |
| `PLANNING_CENTER_APP_ID` | Server only | Planning Center Personal Access Token identifier |
| `PLANNING_CENTER_SECRET` | Server only | Planning Center Personal Access Token secret |
| `YOUTUBE_API_KEY` | Server only | YouTube Data API requests for livestream resolution |
| `YOUTUBE_CHANNEL_ID` | Server only | Restricts resolved videos to the configured Living Message Church channel |

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

YouTube adds the following non-sensitive checks to `/admin/platform`:

- API and channel configuration as `Configured` or `Missing`
- API reachability without response bodies or credentials
- normalized current state as `Live`, `Upcoming`, `Offline`, or `Unavailable`
- resolved video ID status as `Resolved` or `Not resolved`; the ID itself is not shown

`src/lib/youtube` owns the server-only client, provider wire types, normalized video model, and deterministic Live → Upcoming → latest completed selection. The resolver reads the configured channel's uploads playlist, hydrates candidate video resources, rejects records from other channels or videos that are private or not embeddable, and caches its result for 55 seconds. `/online-church` revalidates every 60 seconds and embeds only the resolved Live or future Upcoming video ID. The completed record remains diagnostic context and is never substituted into Church Online playback.

The Google API key is currently restricted to the approved development origin. Server-side Data API requests therefore send `https://dev.livingmessagechurch.com/` as their `Referer`. Without it, Google returns HTTP 403 before the channel resource is read. Before the production hostname becomes authoritative, `https://livingmessagechurch.com/` must also be added to the key's allowed website restrictions; the key itself remains server-only.

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
- The YouTube API key is read only by `src/lib/youtube/client.ts`; it is never imported by a client component or serialized into page props.
- The public player uses `youtube-nocookie.com` for a resolved Live or future Upcoming video, does not force autoplay inline, supports cinema mode after user activation, and retains the supplied channel's `/live` URL as an offline fallback.
- YouTube API errors are reduced to non-sensitive reachability/status metadata. Raw provider responses and request URLs containing the key are never logged or rendered.

## Deferred work

- Database schema and migrations
- Generated database types
- Authentication and session refresh
- Proxy/middleware integration
- Storage buckets
- Content migration
- Forms and administrative workflows
- Planning Center public activation, synchronization, webhooks, and write operations
- YouTube administrative editing, uploads, webhooks, and historical database synchronization

## Validation

Validated locally on August 7, 2026:

- `npm run lint` — passed
- `npm run build` — passed; `/admin/platform` is emitted as a dynamic server-rendered route
- Planning Center diagnostics — `/admin/platform/planning-center` is emitted as a dynamic server-rendered route and returns `200 OK`, `noindex, nofollow`, and `Cache-Control: private, no-store, max-age=0`
- Missing-credential behavior — `/admin/platform` reports `Missing` and all provider endpoints report `Not checked`; the preview reports no counts or records
- Client-bundle credential scan — no Planning Center environment-variable names, Basic credential payloads, or Authorization logic found in `.next/static`
- YouTube state selection — fixture coverage passed for Live priority, Upcoming fallback, Offline fallback, and rejection of a non-embeddable candidate
- YouTube failure behavior — when status resolution is unavailable, `/online-church` retains its 16:9 media window as a branded offline state with the verified channel fallback; no old completed message or YouTube error is shown
- YouTube client-bundle scan — no API key, YouTube environment-variable names, or Data API request logic found in `.next/static`
- Authenticated discovery — the initial request formerly failed at `channels.list(part=contentDetails)` with HTTP 403 `forbidden` because Google received an empty referrer. Adding the approved development referrer resolves the channel and uploads playlist. The next 25 records currently include 25 public, embeddable videos and a playable completed-message fallback. Six records carry stale `upcoming` markers with past scheduled dates; the resolver now rejects those instead of treating them as future services.
- Production HTTP smoke check — `200 OK`
- Cache policy — `private, no-store, max-age=0`
- Supabase health — connected
- Rendered-output credential scan — no configured environment names, key prefixes, project URL, or credential values found
