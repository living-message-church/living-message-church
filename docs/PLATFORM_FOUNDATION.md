# Platform Foundation

## Planning Center architecture invariant

Planning Center is the canonical operational system and this application is a read-only consumer. The platform has no Planning Center write client, may never request write scopes or permissions, and must stop and report any future requirement that would need a `POST`, `PUT`, `PATCH`, or `DELETE`. Run `npm run validate:planning-center-read-only` to enforce the centralized GET-only boundary.

## Status

The Supabase platform now includes cookie-backed Supabase Auth for manually provisioned administrators, private creative workflow tables/storage, and protected diagnostics. It uses the official `@supabase/supabase-js` and `@supabase/ssr` clients. Planning Center and YouTube provider foundations keep credentials and provider logic server-only.

## Environment contract

The application expects these variables at the repository root in `.env.local` and in each applicable Vercel environment:

| Variable | Exposure | Current use |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser and server | Project endpoint and connectivity check |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser and server | Publishable client access with Row Level Security enforced |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Creative registry, private Storage, and append-only audit work after verified admin authorization |
| `OPENAI_API_KEY` | Server only | Optional GPT Image provider; generation remains disabled when missing |
| `PLANNING_CENTER_CLIENT_ID` | Server only | Planning Center Personal Access Token client identifier |
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
- Calendar, Registrations, Groups, Services, and Check-Ins endpoint reachability

The no-index `/admin/platform/planning-center` route adds counts and safe normalized samples from relationship-aware, public-eligible candidates. Both diagnostic routes are server-rendered with `Cache-Control: private, no-store, max-age=0`. The aggregator caches its read-only provider snapshot in-process for 60 seconds to prevent duplicate diagnostics bursts. See `PLANNING_CENTER_INTEGRATION.md` and `PLANNING_CENTER_EVENT_RELATIONSHIPS.md` for the provider, relationship, and privacy contracts.

Planning Center environment validation uses the provider-aligned `PLANNING_CENTER_CLIENT_ID` and `PLANNING_CENTER_SECRET` names. Validation on August 7, 2026 detected both variables and returned HTTP 200 for API, organization, Calendar, Registrations, Groups, Services, and Check-Ins checks. Only configured/missing, reachability, sanitized status, latency, public counts, relationship counts, and approved normalized public samples reach diagnostic props.

YouTube adds the following non-sensitive checks to `/admin/platform`:

- API and channel configuration as `Configured` or `Missing`
- API reachability without response bodies or credentials
- normalized current state as `Live`, `Upcoming`, `Offline`, or `Unavailable`
- resolved video ID status as `Resolved` or `Not resolved`; the ID itself is not shown

`src/lib/youtube` owns the server-only client, provider wire types, normalized video model, and deterministic Live → Upcoming → latest completed selection. The resolver reads the configured channel's uploads playlist, hydrates candidate video resources, rejects records from other channels or videos that are private or not embeddable, and caches its result for 55 seconds. `/online-church` revalidates every 60 seconds and embeds only the resolved Live or future Upcoming video ID. The completed record remains diagnostic context and is never substituted into Church Online playback.

The Google API key is currently restricted to the approved development origin. Server-side Data API requests therefore send `https://dev.livingmessagechurch.com/` as their `Referer`. Without it, Google returns HTTP 403 before the channel resource is read. Before the production hostname becomes authoritative, `https://livingmessagechurch.com/` must also be added to the key's allowed website restrictions; the key itself remains server-only.

## Session and Proxy boundary

Next.js 16 `src/proxy.ts` refreshes Supabase Auth cookies and performs only an optimistic claims check for `/admin/*`. Secure authorization remains in the server data-access boundary: protected pages call `auth.getUser()`, and creative POST handlers repeat authentication, role, method, media-type, and same-origin checks. Protected responses are private/no-store.

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

- General application schemas and content migrations. The isolated AI event-creative migration is authored but not automatically applied.
- Generated database types
- Public signup (intentionally prohibited)
- General storage. The private `event-art` bucket is declared by migration for approved creative workflow deployment.
- Content migration
- Forms and administrative workflows
- Planning Center public activation, synchronization, webhooks, and write operations
- YouTube administrative editing, uploads, webhooks, and historical database synchronization

## AI event creative foundation

The platform now includes a provider-neutral server-only artwork interface, deterministic public-field prompt builder, strict Calendar-origin eligibility gate, Supabase workflow migration, private asset resolver, and sanitized diagnostics. `/admin/events/creative` remains read-only because administrative authentication does not yet exist. No mutation action is browser-callable, and no Planning Center request behavior changed.

## Validation

Validated locally on August 7, 2026:

- `npm run lint` — passed
- `npm run build` — passed; `/admin/platform` is emitted as a dynamic server-rendered route
- Planning Center diagnostics — `/admin/platform` and `/admin/platform/planning-center` are dynamic server-rendered routes and return `200 OK`, `noindex, nofollow`, and `Cache-Control: private, no-store, max-age=0`
- Planning Center environment — both `PLANNING_CENTER_CLIENT_ID` and `PLANNING_CENTER_SECRET` are detected as configured; credential values are never rendered
- Planning Center connectivity — API, organization, Calendar, Registrations, and Groups each returned sanitized `Reachable` state with HTTP 200
- Planning Center discovery — 100 bounded upcoming Calendar records (truncated), 7 public signup opportunities, and 5 published groups
- Client-bundle credential scan — no Planning Center environment-variable names, Basic credential payloads, or Authorization logic found in `.next/static`
- YouTube state selection — fixture coverage passed for Live priority, Upcoming fallback, Offline fallback, and rejection of a non-embeddable candidate
- YouTube failure behavior — when status resolution is unavailable, `/online-church` retains its 16:9 media window as a branded offline state with the verified channel fallback; no old completed message or YouTube error is shown
- YouTube client-bundle scan — no API key, YouTube environment-variable names, or Data API request logic found in `.next/static`
- Authenticated discovery — the initial request formerly failed at `channels.list(part=contentDetails)` with HTTP 403 `forbidden` because Google received an empty referrer. Adding the approved development referrer resolves the channel and uploads playlist. The next 25 records currently include 25 public, embeddable videos and a playable completed-message fallback. Six records carry stale `upcoming` markers with past scheduled dates; the resolver now rejects those instead of treating them as future services.
- Production HTTP smoke check — `200 OK`
- Cache policy — `private, no-store, max-age=0`
- Supabase health — connected
- Rendered-output credential scan — no configured environment names, key prefixes, project URL, or credential values found
