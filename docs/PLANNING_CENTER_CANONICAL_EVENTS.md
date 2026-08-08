# Planning Center Canonical Events

Snapshot date: August 7, 2026

## Status

The relationship-aware read model currently yields **21 canonical diagnostic candidates** from **24 explicitly published Calendar parents**. Three parent duplicates are merged only because each pair shares an exact connected Group ID. The remaining Calendar series stay separate unless an allowed exact relationship proves identity.

This is a no-index diagnostic model only. `/events`, `/events/[slug]`, and homepage Events remain unchanged and do not consume these candidates.

The AI creative foundation consumes this same model but admits only the 12 strict `public` candidates. The 8 cleanup candidates and 1 ambiguous candidate remain quarantined. Creative workflow state never changes canonical Planning Center facts.

## Allowed merge evidence

Automatic merging is limited to:

1. instances with the same Calendar parent ID;
2. Calendar parents sharing an exact connected Group ID;
3. a Group Event with the same exact Group ID and exact raw occurrence timestamp;
4. an exact Registration EventConnection;
5. an exact Check-Ins EventConnection or exact Registrations Integration Link;
6. an exact Services EventConnection.

Title similarity, fuzzy matching, descriptions, same calendar day, locations, and ministry names are never merge signals. They may create a diagnostic ambiguity flag, but cannot change identity.

## Ambiguity classes

| Class | Meaning | Merge effect |
| --- | --- | --- |
| `same-title` | Multiple canonical series have the same normalized title | None; Sunday and CrossFit remain separate |
| `same-ministry` | Records appear ministry-related without an exact shared provider relationship | None; reserved for evidence review, never identity |
| `recurring-overlap` | Separate same-title series contain an identical occurrence timestamp | None without an allowed exact relationship |
| `schedule-mismatch` | An explicitly public Group occurrence has the exact Group ID but not the exact raw Calendar timestamp | Quarantines the Group occurrence |
| `conflicting-locations` | Exact related records provide incompatible locations for the same occurrence | Requires owner review; no automatic overwrite |
| `conflicting-dates` | Exact related records provide incompatible dates | Requires owner review; no automatic overwrite |
| `unverified-duplicate` | Records look duplicative but have no allowed merge signal | Remain separate |
| `unlinked-cross-product-record` | Another Planning Center product has a same-name record without an exact relationship | Candidate is Ambiguous; Good Friday is the current case |

Only evidence actually present is attached to a candidate. Classes with no current evidence remain explicit model options rather than inferred warnings.

## Eligibility classes

| Class | Rule | Current candidates |
| --- | --- | ---: |
| Public | Explicitly published Calendar parent with no unresolved evidence flag | 12 |
| Public – needs cleanup | Explicitly public, but same-title series or exact Group schedule mismatch needs owner review | 8 |
| Public – registration only | Public Registration source without a proven Calendar identity | 0 |
| Internal | Not explicitly public in the originating product | 0 candidates; 19 Calendar parents excluded before candidacy because they are not Church Center published |
| Ambiguous | Public Calendar candidate has a same-name cross-product record without an exact relationship | 1 |
| Past | Source occurrence is no longer future | 0; future filters exclude these before candidacy |

“Public” here means eligible under the strict evidence model, not approved for public Events activation.

## Sanitized candidate register

| Canonical ID | Title | Products / exact related IDs | Occurrences | Eligibility | Evidence, ambiguity, and coverage |
| --- | --- | --- | ---: | --- | --- |
| `planning-center:19564824` | Young Adults Prayer & Fellowship Walk | Calendar `19564824`; Group `1991591` | 24 | Public | Recurring Calendar parent; Group connection; image and location available |
| `planning-center:17643257` | Sunday Services | Calendar `17643257`; Check-Ins `621157`; Services `1322660` | 105 | Public – needs cleanup | Same-title series; exact Check-Ins and Services connections; image and location available |
| `planning-center:8396350` | Sunday Services | Calendar `8396350` | 105 | Public – needs cleanup | Same-title series; no cross-product merge evidence; image and location available |
| `planning-center:8396418+11593126` | Connect to One — Women’s Ministry | Calendar `8396418`, `11593126`; Group `2015811`; Services `1516358` | 47 | Public – needs cleanup | Calendar parents merged by shared exact Group ID; one exact Group occurrence merge and seven schedule mismatches; image and location available |
| `planning-center:17440344+17440370` | Anchored to One (Seniors Bible Study) | Calendar `17440344`, `17440370`; Group `2740562`; Registration `3052835` | 46 | Public – needs cleanup | Calendar parents merged by shared exact Group ID; 22 exact Group occurrence merges and two schedule mismatches; connected Signup is closed; image available, location absent |
| `planning-center:21579261` | Next Steps Class | Calendar `21579261`; Registration `3723510`; Check-Ins `1020160`; Services `1322660` | 1 | Public | Verified Calendar → Registrations → Check-Ins chain plus Services connection; open Signup; image and location available |
| `planning-center:8617866+8617868` | Called to One — Men’s Ministry | Calendar `8617866`, `8617868`; Group `2015812`; Services `1721187` | 47 | Public | Calendar parents merged by shared exact Group ID; eight exact Group occurrence merges; image and location available |
| `planning-center:15367072` | Young Adults | Calendar `15367072`; Group `1991591` | 47 | Public | Seven exact Group occurrence merges; image available, location absent |
| `planning-center:21826266` | Young Adult Panel Breakfast | Calendar `21826266`; Groups `1991591`, `2867782`; Registration `3790764` | 1 | Public | Exact Group and open Registration connections; image and location available |
| `planning-center:22003458` | Youth Ministry Volunteer Interest Meeting | Calendar `22003458`; Group `2015813` | 1 | Public | Exact Group connection; image and location available |
| `planning-center:21994337` | Missions Course | Calendar `21994337`; Registration `3788218` | 4 | Public | Exact open Registration connection; image and location available |
| `planning-center:19564735` | Young Adult Bowling Night | Calendar `19564735`; Group `1991591` | 1 | Public | Exact Group connection; image and location available |
| `planning-center:22003619` | Youth Ministry Bowling Night | Calendar `22003619` | 1 | Public | Calendar identity only; image and location absent |
| `planning-center:19564972` | Young Adults Sports in the Park | Calendar `19564972`; Group `1991591` | 1 | Public | Exact Group connection; image and location available |
| `planning-center:22003630` | Youth Ministry Volunteer Training | Calendar `22003630` | 1 | Public | Calendar identity only; location available, image absent |
| `planning-center:19565356` | Young Adults Christmas Party | Calendar `19565356`; Group `1991591` | 1 | Public | Exact Group connection; image and location available |
| `planning-center:22003657` | CrossFit Youth Ministry | Calendar `22003657` | 5 | Public – needs cleanup | Same-title recurring series intentionally kept separate; location available, image absent |
| `planning-center:22003670` | CrossFit Youth Ministry | Calendar `22003670` | 5 | Public – needs cleanup | Same-title recurring series intentionally kept separate; location available, image absent |
| `planning-center:21713520` | Good Friday | Calendar `21713520` | 1 | Ambiguous | Same-name Check-Ins record exists without an exact relationship; no merge; image and location absent |
| `planning-center:22003689` | CrossFit Youth Ministry | Calendar `22003689` | 5 | Public – needs cleanup | Same-title recurring series intentionally kept separate; location available, image absent |
| `planning-center:22003705` | CrossFit Youth Ministry | Calendar `22003705` | 4 | Public – needs cleanup | Same-title recurring series intentionally kept separate; location available, image absent |

## Coverage

- Registration-linked candidates: 4
- Group-linked candidates: 10
- Services-linked candidates: 4
- Check-Ins-linked candidates: 2
- Candidates with images: 14 of 21
- Candidates with at least one location: 17 of 21

## Recurrence and series rules

- One Calendar parent is one recurring series; its instances remain occurrences, not separate event cards.
- Multiple Calendar parents remain multiple series unless an exact shared provider relationship permits a merge.
- The two Sunday Services parents remain two series. Their matching titles do not prove identity.
- All four CrossFit Youth Ministry parents remain four series. Their matching titles and ministry context do not prove identity.
- Group occurrences merge into a Calendar series only through exact Group ID plus exact raw timestamp. This permits 38 merges and leaves nine mismatches quarantined.
- A mismatched Group occurrence is not silently moved, deleted, or attached to a Calendar event. Staff must correct or clarify it inside Planning Center.

## Source precedence

1. Explicit originating-product publication state decides eligibility.
2. Exact provider IDs decide identity.
3. Calendar provides public schedule/location where explicitly published.
4. Registrations owns Signup state and destination.
5. Groups provides public Group context only when listed with public events.
6. Services and Check-Ins provide relationship identity only; neither creates a standalone public candidate.
7. Approved LMC artwork may later override presentation, followed by Planning Center artwork, then an approved fallback.

## Unresolved cases

- Seven Women’s Ministry Group occurrences do not match the exact raw Calendar timestamp.
- Two Seniors Group occurrences have no exact Calendar timestamp match.
- The Good Friday Calendar and Check-Ins records share a name but have no exact relationship.
- The open unscheduled Next Steps Signup `3569618` has no exact Calendar relationship and is not a candidate.
- Sunday and CrossFit same-title series remain deliberately separate.

All operational cleanup must occur inside Planning Center. This platform will only re-read and reclassify the resulting data.
