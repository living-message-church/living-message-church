# Planning Center Integration

## Status

The project now has a read-only, server-side Planning Center provider boundary. The only public activation is a narrowly scoped next-service schedule on `/online-church`; no Planning Center data is activated on the homepage, `/events`, or public Groups experiences, and no data is persisted to Supabase.

The official server-only credentials were detected successfully during local validation on August 7, 2026. Read-only requests returned HTTP 200 for the API, organization, Calendar, Registrations, and Groups checks. Discovery returned 100 upcoming public Calendar records (the bounded adapter limit, marked truncated), 7 public signup opportunities, and 5 published groups. Credential values and organization data remained excluded from diagnostics output.

## Authentication

This integration uses a Planning Center Personal Access Token for one church. Each request sends the client ID and secret with HTTP Basic authentication, as specified by [Planning Center authentication guidance](https://api.planningcenteronline.com/docs/overview/authentication).

Required server-only variables:

| Variable | Exposure | Purpose |
| --- | --- | --- |
| `PLANNING_CENTER_CLIENT_ID` | Server only | Personal Access Token client identifier |
| `PLANNING_CENTER_SECRET` | Server only | Personal Access Token secret |

Neither variable may use a `NEXT_PUBLIC_` prefix. Their values are read only in `src/lib/planning-center/config.ts`, passed directly to the centralized server request client, and never returned in page props, rendered HTML, logs, normalized records, or public JavaScript.

## API products and endpoints

The client uses Planning Center’s official REST/JSON:API surface and sends a pinned `X-PCO-API-Version` for each product.

| Product | Read-only endpoint | Purpose | Pinned version |
| --- | --- | --- | --- |
| People | `GET /people/v2` | Organization reachability only; response data is discarded | `2021-08-17` |
| Calendar | `GET /calendar/v2/event_instances?filter=future` | Discover future public event instances | `2022-07-07` |
| Registrations | `GET /registrations/v2/signups?filter=unarchived` | Discover public signup opportunities, not submitted registrations | `2025-05-01` |
| Groups | `GET /groups/v2/groups` | Discover groups explicitly listed on Church Center | `2023-07-10` |

The Calendar adapter retains only records with a public Church Center URL. The Groups adapter retains only unarchived records with `listed: true` and a public Church Center URL. The Registrations adapter calls the public `Signup` resource and never calls Registration, Attendee, Emergency Contact, or Person endpoints. See the official [EventInstance](https://api.planningcenteronline.com/docs/apps/calendar/versions/2022-07-07/vertices/event_instance), [Signup](https://api.planningcenteronline.com/docs/apps/registrations/versions/2025-05-01/vertices/signup), and [Group](https://api.planningcenteronline.com/docs/apps/groups/versions/2023-07-10/vertices/group) references.

### Online Church schedule projection

`/online-church` requests the same normalized future Calendar collection during static generation and hourly revalidation. It publishes only the earliest non-all-day record whose public title explicitly identifies it as Church Online, an online service, a Sunday service/worship/gathering, or a worship service. This conservative title rule prevents a generic class, group, or event from being presented as the next livestream. The public projection contains only a formatted date, Eastern time, and the event’s public Church Center URL. If credentials, Calendar access, a public URL, or a matching service record is absent, the schedule block is omitted without changing the rest of the page.

## Internal normalized types

Provider response shapes are confined to the adapter files. UI code may consume only:

- `NormalizedEvent`: public title, public description, published start/end, location, image, public URL, and all-day state.
- `NormalizedRegistration`: public signup title/description, opening/closing dates, public URL, open state, and capacity-full state. Despite the internal compatibility name, this is a public `Signup`, never a person’s submitted registration.
- `NormalizedGroup`: public title/description, schedule, image, public URL, and a literal `published: true` marker.

All normalized records include a provider source discriminator. Provider-specific requests never appear in React components.

## Client behavior

`src/lib/planning-center/client.ts` centralizes:

- Basic authentication
- the official API origin
- `GET`-only requests
- eight-second request timeouts
- no-store fetch behavior
- pinned product API versions
- JSON response parsing
- safe error normalization
- `Retry-After` parsing on HTTP 429

The client does not automatically retry during an interactive diagnostics request. A 429 becomes the safe `rate-limited` state so callers can stop immediately. Future background synchronization must honor Planning Center’s returned rate-limit headers and `Retry-After`, rather than hard-coding a quota. See [Planning Center rate limiting](https://api.planningcenteronline.com/docs/overview/rate-limiting) and [error guidance](https://api.planningcenteronline.com/docs/overview/errors).

The discovery adapters request at most 100 records per product. A `truncated` marker records when provider metadata indicates more results. Public activation must add bounded pagination and incremental synchronization rather than increasing request fan-out during page rendering.

## Diagnostics

- `/admin/platform` reports credential presence and API/product reachability using safe states only.
- `/admin/platform/planning-center` is a no-index, server-rendered preview with private/no-store caching. It shows discovered public counts and up to three normalized samples per product.
- Organization response data is discarded and never enters serialized page props.
- Both routes degrade to `Missing` / `Not checked` without credentials and remain renderable during provider failures.

The diagnostics routes are not authenticated in this milestone, so their payload is intentionally limited to metadata already eligible for public Church Center display. Authentication remains required before future administrative capabilities are introduced.

## Privacy boundaries

This foundation must never request, normalize, render, or publicly cache:

- people or household records
- group memberships, applications, or conversations
- attendee, emergency-contact, or submitted-registration records
- payment, balance, giving, or donor data
- contact email, private location, virtual meeting URL, or confidential group metadata
- organization profile data beyond a transient reachability check
- access tokens, authorization headers, raw provider errors, or private response bodies

All diagnostics responses use `Cache-Control: private, no-store, max-age=0`. Any future public cache must contain the approved normalized public projection only, never a raw Planning Center response.

## Future webhook architecture

Webhooks are intentionally deferred. A future implementation should:

1. Accept provider notifications on a dedicated server-only endpoint.
2. Verify the provider signature before reading or queuing the payload.
3. Store an idempotency key and minimal event metadata; do not retain raw sensitive payloads by default.
4. Enqueue a scoped re-fetch from the relevant adapter instead of trusting webhook content as publishable data.
5. Validate the normalized public projection before changing publication state.
6. Record success/failure without people data or secrets in logs.
7. Reconcile periodically to recover from missed or out-of-order notifications.

## Future event-art workflow

Planning Center should remain the source for event identity, timing, and registration URLs. A later approved editorial workflow may associate a locally managed event-art record with the provider event ID. Artwork should require source/usage metadata, alt text, crop review, and explicit publish approval. Generated artwork, if later approved, must remain an editorial derivative and must never overwrite the provider record automatically.

## Deferred public activation

- No public activation beyond the scoped `/online-church` next-service projection
- No homepage event replacement
- No `/events` replacement
- No public Groups replacement
- No webhooks
- No Supabase tables or synchronization
- No write operations
- No person, giving, or private registration access

## Validation

Validated locally on August 7, 2026:

- `PLANNING_CENTER_CLIENT_ID` — Configured
- `PLANNING_CENTER_SECRET` — Configured
- API — HTTP 200, Reachable
- Organization — HTTP 200, Reachable; response data discarded
- Calendar — HTTP 200, Reachable; 100 bounded records discovered, truncated
- Registrations — HTTP 200, Reachable; 7 public signup opportunities discovered
- Groups — HTTP 200, Reachable; 5 published groups discovered
- `/admin/platform` — HTTP 200 with `Cache-Control: private, no-store, max-age=0`
- `/admin/platform/planning-center` — HTTP 200 with `Cache-Control: private, no-store, max-age=0`
- `npm run lint` — passed
- `npm run build -- --webpack` — passed
- No Planning Center credential names or values were found in `.next/static` or rendered diagnostic HTML

The required server-only credentials are `PLANNING_CENTER_CLIENT_ID` and `PLANNING_CENTER_SECRET`. See `docs/IMPLEMENTATION_STATUS.md` for the consolidated project status.
