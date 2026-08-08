# Planning Center Event Relationships

## Status and decision gate

This is the relationship-discovery record requested before activating Planning Center events publicly. The snapshot was taken read-only from the live Living Message Church Planning Center organization on August 7, 2026.

Planning Center remains the canonical system of record. This relationship layer issues only `GET` requests and must never modify provider data, request write access, or add write permissions. Any reconciliation must be performed by an authorized owner inside Planning Center.

The public `/events` index and three-item homepage slice now consume only candidates classified exactly as `public`. `/events/[slug]` remains deferred. Two same-title Calendar clusters and nine public Group occurrences remain unresolved and quarantined; they do not enter the public adapter.

## Privacy boundary

The discovery used only event-level and public-presentation metadata. It did not request or retain People, attendees, check-in records, registrations submitted by people, contact details, giving, medical notes, internal notes, or payment data.

Read-only endpoints inspected:

- Calendar Events, Event Instances, Event Connections, and Feeds
- Registrations Signups and next Signup Time relationships
- Groups, future Group Events, and repeating-event relationships
- Services Service Types and public-state metadata on future Plans
- Check-Ins Events and Integration Links

Planning Center documents Calendar `EventConnection` as the explicit bridge to Registrations, Groups, Check-Ins, and Services. Calendar `Feed` is a separate import mechanism for Registrations, Groups, iCal, and Forms. LMC currently uses Event Connections, not Feeds.

## Live snapshot

| Area | Observed live data | Proven interpretation |
| --- | ---: | --- |
| Calendar future parent Events | 43 | 24 are approved, normally published in Church Center, and not link-only; 19 are hidden or otherwise ineligible. |
| Calendar future Event Instances | 720 | 453 belong to explicitly published parents; 267 belong to ineligible parents. Rendering instances directly would create a broken, repetitive index. |
| Calendar Feeds | 0 | No current Calendar record is feed-originated. Feed-based merging is supported conceptually but not active in LMC data. |
| Calendar Event Connections | 27 across 18 parents | 15 Group, 7 Services, 4 Registrations, and 1 Check-Ins connection. Sixteen connected parents are public; two are hidden. |
| Registrations unarchived Signups | 7 | Three are open with a future Signup Time and are directly connected to a public Calendar event. One additional active Signup has no future time. Three are closed. |
| Groups | 12 | Five are listed; only four also expose events publicly. Group listing and event visibility are separate settings. |
| Future Group Event occurrences | 83 | 47 non-canceled occurrences belong to listed Groups whose events are explicitly public. Those 47 reduce to six repeating series plus two standalone occurrences before cross-product merging. |
| Services Service Types | 7 | Four distinct Service Types are connected from Calendar through seven connections. The inspected future Plans for those connected types are not public. |
| Check-Ins Events | 11 | Check-Ins has no public-event publication signal suitable for standalone website eligibility. One event is directly connected from Calendar. |
| Check-Ins Integration Links | 5 | All five point to Registrations IDs; one belongs to a currently active public event chain. |

## How LMC is actually using each product

### Calendar

Calendar is the public schedule and Church Center publication layer. It contains both visitor-appropriate events and operational/internal records. API readability alone is therefore not a publication signal.

Observed internal/hidden examples include worship practice, board or leadership meetings, cleaning, and discipleship operations. They are excluded because `visible_in_church_center` is false, not because of title-based guessing.

Calendar also contains multiple parent Events for the same recurring ministry. The 720 future instances include these large recurring sets:

- two `Sunday Services` parents: 210 combined instances;
- two `Connect to One - Women's Ministry` parents: 47 combined instances;
- two `Called to One - Men's Ministry` parents: 47 combined instances;
- two `Anchored to One (Seniors Bible Study)` parents: 46 combined instances;
- four `CrossFit Youth Ministry` parents: 19 combined instances.

### Registrations

Registrations is the authoritative source for signup availability, capacity, and the registration destination. Four Calendar parents have explicit Signup connections:

| Calendar event | Calendar ID | Signup ID | Current registration finding |
| --- | ---: | ---: | --- |
| Anchored to One | `17440344` | `3052835` | Signup is archived and closed; do not show a Register CTA. |
| Next Steps Class | `21579261` | `3723510` | Open and scheduled. |
| Young Adult Panel Breakfast | `21826266` | `3790764` | Open and scheduled. |
| Missions Course | `21994337` | `3788218` | Open and scheduled. |

An additional open `Next Steps Class` Signup (`3569618`) has no next Signup Time and no explicit Calendar connection. It is not safe to turn into a standalone event without owner confirmation.

### Groups

Groups supplies relationship context and, where enabled, its own public meeting occurrences. The following Groups have the full safe combination of `listed: true`, `events_listed: true`, and `events_visibility: public`:

- Young Adults (`1991591`)
- Connected to One — Women's Ministry (`2015811`)
- Called to One — Men's Ministry (`2015812`)
- Anchored to One — Seniors Bible Study (`2740562`)

CrossFit Youth Ministry is listed, but its events are members-only and not listed. A Calendar event connected to that Group may still be public when Calendar explicitly publishes it; the Group event feed must not be used to broaden access.

Of 47 eligible future Group occurrences, 38 have an exact match to the raw provider occurrence timestamp of a Calendar occurrence connected to the same Group ID. Nine do not:

- seven Women's Ministry occurrences have no exact raw timestamp match;
- two Seniors Bible Study occurrences have no Calendar occurrence on the same date.

Those nine are quarantined. Six of the Women’s records align only when the Calendar presentation timestamp is substituted for the raw timestamp. That is useful diagnostic evidence, but it is not accepted as identity proof. A matching title, display time, or calendar day is insufficient.

### Services

Calendar has seven explicit connections to four Service Types:

- Sunday Services
- Tuesday Women's Ministry
- Monday Men's Ministry
- Usher Team for Worship Practice

These links prove Service Type context, but not a relationship to a specific Services Plan. The inspected future Plans for all four connected types have `public: false` and `public_by_schedule: false`. Services can therefore contribute a provider ID and operational relationship, but it must not provide standalone public events or overwrite the Calendar schedule.

### Check-Ins

Check-Ins contributes operational event identity only. It does not establish public eligibility.

Two high-confidence patterns exist:

- Calendar `17643257` (`Sunday Services`) directly connects to Check-Ins Event `621157` and Services Type `1322660`.
- Calendar `21579261` (`Next Steps Class`) connects to Registration Signup `3723510`; Check-Ins Integration Link `1346452` maps that same Signup ID to Check-Ins Event `1020160`. This proves a Calendar → Registrations → Check-Ins chain without title matching.

A Check-Ins `Good Friday` record and a Calendar `Good Friday` record have similar names but no explicit connection. They remain separate/ambiguous in the relationship audit.

## Canonical `NormalizedEvent`

The provider layer now defines a relationship-aware `NormalizedEvent` with:

- a canonical ID and stable slug;
- Planning Center IDs grouped by Calendar Event, Calendar Instance, Signup, Group, Group Event, Service Type, and Check-Ins Event;
- public title, description, artwork, category placeholder, featured state, and public URL;
- an occurrence collection for schedule, recurrence, location, all-day state, and end time;
- registration availability/status/URL;
- related public Group ID/URL;
- source-product and source-update metadata.

The model is intentionally provider-neutral at the presentation boundary. Raw Planning Center response shapes and credentials do not enter React components.

The per-candidate eligibility, provider-ID evidence, ambiguity flags, coverage, and series decisions are recorded in `PLANNING_CENTER_CANONICAL_EVENTS.md` and rendered on the no-index `/admin/platform/planning-center` diagnostics route.

## Field precedence

| Field | Precedence | Reason |
| --- | --- | --- |
| Public eligibility | Originating product's explicit publication state | Calendar requires approved + Church Center Published + not link-only. Group Events require listed Group + listed events + public visibility. Registrations require an open public URL and a future Signup Time. Services and Check-Ins are never standalone eligibility sources. |
| Canonical identity | Exact provider connection IDs, then source-native parent/repeating ID | Titles are not identifiers. |
| Schedule/location | Published Calendar instance for Calendar-origin events; Signup Time only for an otherwise standalone Registration event; Group Event only for an otherwise standalone public Group event | Prevents a secondary system from silently replacing the public Calendar schedule. |
| Registration | Exact connected Registrations Signup | Signup owns open/closed/full state and destination URL. An archived or closed Signup suppresses the CTA. |
| Group | Exact Calendar Group connection and the Group's public URL | Group metadata may enrich an event but cannot make a hidden Calendar event public. |
| Services | Exact connected Service Type ID only | LMC's connection does not identify an individual Plan, and the inspected Plans are not public. |
| Check-Ins | Direct Calendar connection or exact Registration Integration Link | Check-Ins data is operational enrichment, never public copy. |
| Description | Published Calendar description/summary, then exact connected Signup, then public Group description | Richer authoritative public copy wins. |
| Artwork | Approved LMC override, Calendar artwork, exact connected Signup artwork, public Group artwork, approved fallback | Keeps future editorial artwork possible without changing provider identity. |

## Deterministic deduplication

The aggregator applies only these automatic merges:

1. All instances of one Calendar parent become occurrences of one canonical event.
2. Calendar parents merge only when they have the same normalized title **and** share an exact connected Group ID. This safely merges three duplicate parent records in current LMC data: Women's Ministry, Men's Ministry, and Seniors Bible Study.
3. A Group Event occurrence merges only when its Group ID is explicitly connected to the Calendar parent and its timestamp exactly matches the Calendar occurrence's raw provider timestamp. This currently merges 38 duplicate occurrence representations.
4. Registrations merges only through a Calendar `EventConnection` Signup ID.
5. Check-Ins merges only through a direct Calendar connection or an Integration Link whose Registration ID is already connected to that canonical event.
6. Services contributes only an exact connected Service Type ID; it does not merge individual Plans.
7. Feed identity would use an exact Feed/source ID, but LMC currently has no Feeds.

The strict pass produces 21 canonical public candidates from 24 published Calendar parents, with 41 duplicate records/occurrences merged. These 21 are diagnostic candidates, not an approved public index.

## Remaining ambiguity requiring owner approval

1. **Sunday Services:** two published Calendar parents share the same normalized title, but only one has explicit Services and Check-Ins connections. Confirm whether they are one service program or intentionally separate schedules.
2. **CrossFit Youth Ministry:** four published Calendar parents share the same title but have no shared exact cross-product identity. Confirm whether they should be one recurring canonical event.
3. **Women's Ministry schedule:** seven public Group occurrences do not exactly match connected Calendar raw timestamps. Confirm whether Calendar or Groups has the authoritative occurrence; presentation-time alignment alone will not merge them.
4. **Seniors schedule:** two future public Group occurrences lack a Calendar occurrence on the same date. Confirm whether they should appear publicly.
5. **Open unscheduled Next Steps Signup:** Signup `3569618` is open but has no next time and no Calendar connection. Confirm whether it is a reusable form, an obsolete duplicate, or a public event.
6. **Good Friday:** Calendar and Check-Ins have similarly named records without an explicit link. No merge will occur without confirmation or a provider connection.
7. **Services Plan linkage:** Calendar connects to Service Types, not individual Plans. No Plan-derived title, schedule, or public state will be used unless LMC creates a provable link.

## Publication gate

Before public activation, a Planning Center owner should resolve the seven items above or approve a conservative policy that leaves the ambiguous records excluded. After approval, `/events`, `/events/[slug]`, and the homepage should consume only the canonical aggregator—not Calendar, Groups, or Registrations adapters directly.
## Creative pipeline boundary

Only strict `public` canonical events may enter creative eligibility. `public-needs-cleanup`, `ambiguous`, internal, expired, and quarantined candidates cannot create jobs. Registrations enrich only through exact Calendar relationships; unlinked public Registration candidates are counted for review and cannot become standalone events or artwork jobs.
