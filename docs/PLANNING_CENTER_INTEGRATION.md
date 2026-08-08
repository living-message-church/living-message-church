# Planning Center Integration

## Non-negotiable read-only boundary

Planning Center is Living Message Church's canonical system of record. This platform is permanently a **read-only consumer** of Planning Center data.

The application may authenticate, issue `GET` requests, normalize, aggregate, cache, diagnose, and enhance the public presentation. It must never issue `POST`, `PUT`, `PATCH`, or `DELETE` requests; request write scopes or permissions; or modify Calendar, Registrations, Groups, People, Giving, Check-Ins, Services, or any other Planning Center product. Every operational change continues to occur inside Planning Center.

`src/lib/planning-center/client.ts` exposes only `planningCenterGet`, uses the immutable method in `read-only-policy.ts`, and is the only allowed Planning Center network boundary. `npm run validate:planning-center-read-only` fails when provider code introduces a write request/helper or application code bypasses the centralized client. If a future requirement cannot be fulfilled without writing to Planning Center, implementation must stop and the requirement must be reported rather than expanding access.

The endpoint-by-endpoint proof is maintained in `PLANNING_CENTER_READONLY_AUDIT.md`.

## Status

The project now has a read-only, server-side Planning Center provider boundary and an exact-ID, relationship-aware event aggregation layer. The only public activation remains a narrowly scoped next-service schedule on `/online-church`; no aggregated Planning Center event data is activated on the homepage, `/events`, or public Groups experiences, and no data is persisted to Supabase.

The official server-only credentials were detected successfully during local validation on August 7, 2026. Read-only requests returned HTTP 200 for the API, organization, Calendar, Registrations, Groups, Services, and Check-Ins checks. Relationship discovery found 43 future Calendar parents, 720 future Calendar instances, 27 exact Event Connections, no Calendar Feeds, 7 unarchived Signups, 83 future Group Event occurrences, 7 Services Service Types, and 11 Check-Ins Events. The strict aggregation yields 21 diagnostic candidates, merges 38 Group occurrences through exact Group ID plus exact raw timestamp, and quarantines nine Group schedule mismatches. It remains behind the publication gate in `PLANNING_CENTER_EVENT_RELATIONSHIPS.md`.

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
| Calendar | `GET /calendar/v2/events`, nested `event_connections`, and `feeds` | Resolve publication, parent identity, cross-product connections, and feed origin | `2022-07-07` |
| Registrations | `GET /registrations/v2/signups?filter=unarchived` | Discover public signup opportunities, not submitted registrations | `2025-05-01` |
| Groups | `GET /groups/v2/groups` | Discover groups explicitly listed on Church Center | `2023-07-10` |
| Groups | `GET /groups/v2/events?filter=upcoming` | Resolve public Group occurrences and repeating-event identity | `2023-07-10` |
| Services | `GET /services/v2/service_types` | Resolve exact Calendar-connected Service Type IDs; no people or schedules | `2018-11-01` |
| Check-Ins | `GET /check-ins/v2/events` and `integration_links` | Resolve exact operational event IDs and Registration links; no check-in records | `2025-05-28` |

The legacy Calendar projection remains only for the Online Church schedule. Public event candidacy now requires Calendar approval and Church Center publication, or an equally explicit originating-product visibility signal. Relationships and precedence are documented in `PLANNING_CENTER_EVENT_RELATIONSHIPS.md`. The Registrations boundary calls Signup resources and never calls Registration, Attendee, Emergency Contact, or Person endpoints. Check-Ins discovery never calls check-in/person records, and Services discovery never calls team or scheduled-person records.

### Online Church schedule projection

`/online-church` requests the same normalized future Calendar collection during static generation and hourly revalidation. It publishes only the earliest non-all-day record whose public title explicitly identifies it as Church Online, an online service, a Sunday service/worship/gathering, or a worship service. This conservative title rule prevents a generic class, group, or event from being presented as the next livestream. The public projection contains only a formatted date, Eastern time, and the event’s public Church Center URL. If credentials, Calendar access, a public URL, or a matching service record is absent, the schedule block is omitted without changing the rest of the page.

## Internal normalized types

Provider response shapes are confined to the adapter files. UI code may consume only:

- `CalendarEventProjection`: the narrow Calendar-only shape retained for Online Church scheduling.
- `NormalizedEvent`: one canonical event identity with product IDs, occurrences, presentation, registration, Group context, public visibility, recurrence, and source metadata assembled through exact relationships.
- `PlanningCenterCanonicalEventDiagnostic`: the sanitized evidence record for each candidate, including provider IDs, source products, relationship presence, coverage, merge reasons, ambiguity classes, series model, and eligibility.
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

Legacy preview adapters remain bounded to 100 records. The relationship aggregator paginates event-level collections in 100-record provider pages, resolves Calendar connections with concurrency capped at four, and retains the safe snapshot in-process for 60 seconds. Public activation must use the aggregator's server cache/revalidation boundary rather than repeating provider fan-out in browser renders.

## Diagnostics

- `/admin/platform` reports credential presence and API/product reachability using safe states only.
- `/admin/platform/planning-center` is a no-index, server-rendered preview with private/no-store caching. It shows all 21 sanitized canonical candidate evidence records plus bounded normalized samples.
- Relationship diagnostics additionally show Calendar parents/instances, Registration and Group-event counts, Services and Check-Ins linkage, feeds, connections, canonical candidates, exclusions, exact merges, and unresolved ambiguity. No public event page consumes those candidates yet.
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

That read-only creative foundation is now implemented in `src/lib/creative` and the Supabase migration documented in `AI_EVENT_CREATIVE_PIPELINE.md`. Calendar remains the discovery source; an exact Calendar EventConnection may enrich the candidate with Registration, Group, Check-In, or Services context. Unlinked Registration records remain diagnostics-only. All creative writes target Supabase; the Planning Center client and validator remain GET-only.

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
- Calendar — HTTP 200, Reachable; 43 future parents and 720 future instances read through paginated GET requests
- Registrations — HTTP 200, Reachable; 7 public signup opportunities discovered
- Groups — HTTP 200, Reachable; 5 published groups discovered
- `/admin/platform` — HTTP 200 with `Cache-Control: private, no-store, max-age=0`
- `/admin/platform/planning-center` — HTTP 200 with `Cache-Control: private, no-store, max-age=0`
- Relationship diagnostics — 21 canonical candidates; 41 duplicate representations merged; 2 same-title clusters and 9 unmatched public Group occurrences quarantined
- `npm run validate:planning-center-read-only` — passed; centralized GET-only access and no write paths found
- `npm run lint` — passed
- `npm run build` — passed with Next.js 16.3.0 Turbopack
- No Planning Center credential names or values were found in `.next/static` or rendered diagnostic HTML

The required server-only credentials are `PLANNING_CENTER_CLIENT_ID` and `PLANNING_CENTER_SECRET`. See `docs/IMPLEMENTATION_STATUS.md` for the consolidated project status.
