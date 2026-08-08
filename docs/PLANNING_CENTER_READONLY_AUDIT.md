# Planning Center Read-Only Audit

Audit date: August 7, 2026

## Result

**Passed.** Planning Center is the canonical system of record and the Living Message Platform is a one-way, read-only consumer. Every Planning Center request implemented by the application uses HTTP `GET` through `src/lib/planning-center/client.ts`. The codebase contains no Planning Center `POST`, `PUT`, `PATCH`, or `DELETE` request; no mutation helper; no create, update, or delete operation; no webhook writer; and no OAuth write-scope request.

The application authenticates with server-only HTTP Basic credentials. It does not implement an OAuth authorization flow or request scopes. Credential values never enter browser props, rendered diagnostics, logs, or the client bundle.

## Enforced request boundary

- `planningCenterGet()` is the only exported Planning Center request function.
- `PLANNING_CENTER_READ_ONLY_METHOD` is the immutable literal `GET`.
- Runtime code asserts the method is `GET` before each request.
- The API origin exists only inside the centralized provider boundary.
- `npm run validate:planning-center-read-only` rejects Planning Center write verbs/helpers, direct provider fetches outside the client, and API-origin bypasses.
- If a future feature requires a Planning Center mutation, implementation must stop. The read-only alternative is to perform the operational change in Planning Center and let this platform re-read the result.

## Current application endpoints

| Endpoint | Verb | Purpose | Read-only confirmation |
| --- | --- | --- | --- |
| `/people/v2` | `GET` | Organization/API reachability; response data is discarded | Status only; no People records are normalized or presented |
| `/calendar/v2/events?filter=future` | `GET` | Read future Calendar parents and explicit Church Center publication state | Reads event-level metadata only |
| `/calendar/v2/event_instances?filter=future` | `GET` | Read future occurrences for canonical schedules and the Online Church schedule projection | Reads public schedule fields only |
| `/calendar/v2/feeds` | `GET` | Determine whether Calendar feed-origin relationships exist | Diagnostic read; current result is zero feeds |
| `/calendar/v2/events/{eventId}/event_connections` | `GET` | Read exact cross-product relationship IDs | Relationship discovery only; creates no connection |
| `/registrations/v2/signups?filter=unarchived` | `GET` | Read public Signup metadata and next Signup Time relationships | Does not request submitted registrations, attendees, contacts, or payments |
| `/registrations/v2/signups/{signupId}` | `GET` | Resolve an exact connected archived/closed Signup omitted by the unarchived collection | Exact relationship lookup only |
| `/groups/v2/groups` | `GET` | Read Group publication and public-event visibility metadata | Does not request memberships, applications, conversations, or People |
| `/groups/v2/events?filter=upcoming` | `GET` | Read future Group Event occurrences and recurrence identity | Schedule relationship discovery only |
| `/services/v2/service_types` | `GET` | Resolve exact Calendar-connected Service Type IDs | Does not request teams, people, assignments, or modify Plans |
| `/check-ins/v2/events` | `GET` | Resolve Check-Ins Event IDs for relationship diagnostics | Does not request check-in/person records |
| `/check-ins/v2/integration_links` | `GET` | Read exact Check-Ins-to-Registrations relationship IDs | Relationship discovery only |

All paginated variants of these endpoints remain the same HTTP `GET` operation with `offset` and `per_page` query parameters.

## Repository audit

Audited locations:

- `src/lib/planning-center/client.ts`
- `src/lib/planning-center/config.ts`
- `src/lib/planning-center/diagnostics.ts`
- `src/lib/planning-center/event-aggregation.ts`
- `src/lib/planning-center/events.ts`
- `src/lib/planning-center/groups.ts`
- `src/lib/planning-center/registrations.ts`
- `src/lib/planning-center/read-only-policy.ts`
- all `src/pages/admin` consumers
- all repository source files for direct Planning Center API-origin use

No mutation endpoint or write helper was found. Public pages do not receive credentials or raw provider responses. The `/admin/platform` routes serialize only sanitized statuses, counts, public provider IDs, public eligibility evidence, and approved diagnostic fields.

## Prohibited future implementation

The platform must never create or modify Calendar events, Signups/Registrations, Groups, People, Giving, Check-Ins, Services, Church Center publication, Event Connections, or any other Planning Center resource. Webhooks, if later approved, may only trigger a scoped re-read; they may never write back to Planning Center.

Synchronization direction is permanently:

`Planning Center → Living Message Platform`

Never:

`Living Message Platform → Planning Center`
