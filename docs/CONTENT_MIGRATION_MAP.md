# Content migration map

Audit date: 2026-08-05

## Migration principles

1. Treat the current production site as the factual source, but treat contradictions as unresolved—not permission to choose a convenient answer.
2. Build the visitor journey around a single `/plan-your-visit` route with service times, address, kids, parking, worship/teaching expectations, accessibility, directions, and a low-friction visit form.
3. Keep current/upcoming events separate from historical records. Do not import 415 expired event detail/recurrence URLs as live events.
4. Give sermons a structured content model (title, date, speaker, series, scripture, summary, video/audio, optional transcript) rather than fixed embeds.
5. Consolidate duplicate home, visitor, media, gallery, and seasonal pages.
6. Preserve legal routes and obtain legal/safeguarding review before launch.
7. Preserve every old URL through an explicit mapping; `REDIRECTS.md` is the exhaustive **301 Moved Permanently** ledger for changed public routes.

## Proposed information architecture

| New route | Purpose | Source content |
| --- | --- | --- |
| `/` | Welcome, current service invitation, core identity, next event, latest message, ministries/outreach gateway | Current `/`, approved `/home/` welcome language, current address/times, curated church-owned photography |
| `/plan-your-visit` | Complete first-visit journey | `/plan-your-visit/`, useful reassurance from `/new-visitors/` and visitor landing page, kids/check-in details, contact/directions |
| `/about-living-message-church-clermont` | Church-family philosophy, identity/name story, and gateway to current service/outreach information | `/about-living-message-church-clermont/` and approved `/home/` copy |
| `/about/beliefs` | Teaching philosophy and doctrine | `/our-beliefs/` after pastoral edit |
| `/about/pastor` | Brian and Allison Broadway biography and ministry story | `/meet-our-pastor/` |
| `/about/leadership` | Elders, deacons, and ministry leaders | `/the-team/` |
| `/about/gallery` | Curated, consent-cleared church-life gallery (optional but justified) | `/pictures/`, `/photo-gallery/` |
| `/connect` | Ministry/group discovery and serving pathways | Group references from home/landing pages, `/ministries/`, ministry leader roles, Church Center signups |
| `/lmkids` | Kids and nursery details | Home and Plan Your Visit; requires age/safety verification. `/connect/kids` permanently redirects here. |
| `/connect/youth` | Youth ministry | Homepage/group and historical event evidence; requires owner/schedule/content |
| `/connect/young-adults` | Young adults | Homepage/team/event evidence; requires current schedule/content |
| `/connect/groups` | Men, women, marriage, discipleship, other groups | Homepage/landing/event evidence; requires current group list and schedule |
| `/connect/next-steps` | Connect, serve, grow class | `/nextsteps/` and active registration source |
| `/messages` | Latest message and searchable archive | `/media/`, `/sermons-living-message-church-clermont/`, YouTube/Podbean after feed verification |
| `/online-church` | Online service and online connection | `/online-church/` |
| `/events` | Current/upcoming event cards and details | `/events-living-message-church-clermont/`, Church Center registrations; no blind legacy import |
| `/events/[slug]` | Only current or intentionally archived individual events | New authoritative event records |
| `/outreach` | Find, Feed & Restore plus approved missions/partners | `/outreach/`, About outreach history, confirmed partner links |
| `/give` | Giving explanation, trust/safety copy, Church Center handoff | Current external giving destination; new approved copy required |
| `/contact` | Phone, email, address, directions, contact/prayer pathways | Current contact page and global footer |
| `/privacy-policy` | Accurate privacy policy | Existing policy plus legal/processor review |
| `/photo-release` | Accurate photo/video notice and opt-out path | Existing release plus legal/safeguarding review |

## Old-to-new page mapping

| Old URL(s) | New route | Decision | Migration notes |
| --- | --- | --- | --- |
| `/` | `/` | Keep/Rewrite | Preserve current times, address, teaching/family/outreach identity, visitor CTA. |
| `/home/`, `/home2/` | `/` | Merge/Archive | Migrate only approved evergreen copy; remove spam, old dates/times, builder artifacts. |
| `/?page_id=10`, `/new-visitors/`, `/plan-your-visit/`, `/so-glad-you-are-here-landing-page/`, `/new-guest-follow/`, `/services/` | `/plan-your-visit` | Merge | Use Plan Your Visit as the strongest base; verify all logistics. |
| `/about-living-message-church-clermont/` | `/about-living-message-church-clermont` | Keep/Rewrite | Preserve the user-supplied slug, family philosophy, name origin, and general service story; omit stale outreach claims. |
| `/our-beliefs/` | `/about/beliefs` | Keep/Edit | Pastoral review; correct misleading SEO phrasing. |
| `/meet-our-pastor/` | `/about/pastor` | Keep/Edit | Preserve the current Broadway biography and imagery; final title/history proofreading remains required. |
| `/the-team/` | `/about/leadership` | Keep/Edit | Confirm the current roster, names, titles, bios, portraits, and permissions. |
| `/pictures/`, `/photo-gallery/` | `/about/gallery` | Merge/Curate | No automatic asset migration; select church-owned, consent-cleared images and write alt text. |
| `/ministries/` | `/connect` | Replace thin page | Build only from verified current ministries. |
| `/nextsteps/` | `/connect/next-steps` | Keep/Rewrite | Confirm class timing and registration URL. |
| `/living-message-bible-training-school/` | `/connect` | Archive | Historical 2018 program; verify whether a successor exists. |
| `/media/`, `/sermons-living-message-church-clermont/` | `/messages` | Merge/Rebuild | Create structured sermon archive; verify feeds/rights. |
| `/online-church/` | `/online-church` | Keep/Rewrite | Preserve the authoritative production slug; omit the unverified online-service time. |
| `/events-living-message-church-clermont/`, `/events/` | `/events` | Merge/Rebuild | One event source; current records only. |
| 415 `/event/.../` URLs | `/events` | Archive | All sitemap-advertised details are historical. Exact mappings are in `REDIRECTS.md`. |
| `/outreach/` | `/outreach` | Keep/Rewrite | Verify program/legal/timeline claims; retain external donate/learn-more path. |
| `/2025-resurrection-sunday/`, `/resurrection-sunday-at-lmc/` | `/events` | Archive | Expired campaigns with former address/times. |
| `/contact-living-message-church-clermont/` | `/contact` | Keep/Rewrite | Preserve current contact form intent; confirm phone/email/address. |
| `/privacy-policy/` | `/privacy-policy` | Keep/Review | Same route; legal and technical accuracy update. |
| `/photo-release/` | `/photo-release` | Keep/Review | Same route; legal/safeguarding and opt-out review. |
| Three 2018 article URLs, two category archives, seven tag archives, `/author/living/` | `/messages` | Archive/Merge | Review articles before any republication; do not reproduce thin taxonomies. |
| `/events/category/family-fun/` | `/events` | Archive/Merge | Category content is historical. |

## Duplicate, outdated, thin, and conflicting content

- **Duplicate homes:** `/`, `/home/`, and `/home2/` contain overlapping welcome, media, outreach, and event sections.
- **Duplicate visitor journeys:** `/new-visitors/`, `/plan-your-visit/`, visitor landing page, `/services/`, and `/?page_id=10` compete for the same intent.
- **Duplicate galleries:** `/pictures/` and `/photo-gallery/` overlap and use old imagery without alt text.
- **Duplicate media:** `/media/`, sermon page, and online church split sermon discovery and streaming.
- **Thin/empty:** `/ministries/`, `/new-guest-follow/`, `/services/`, current Events wrapper, taxonomy archives.
- **Outdated:** two Resurrection pages, 2018 training school, all 415 event detail/recurrence URLs, older home content/series.
- **Conflicting service times:** current 9:00/10:45 versus 8:00/9:30/11:15, 10:00, and 9:00/10:30 in legacy pages/events.
- **Conflicting locations:** current US Highway 27 versus former 830 W. Montrose Street and one-off Waterfront Park events.
- **Conflicting phone:** 352-432-6048 versus 352-617-8484.
- **Kids age range:** birth–fifth grade versus one year–fifth grade.
- **Leadership spelling/data:** Garry/Gary, Jaime/Jamie, Simons/Simmons artifacts require confirmation.
- **Outreach evolution:** older feeding/shelter/class claims versus current housing-first/trailer/case-management model.
- **Compromised/unrelated links:** `/home/` and `/living-message-bible-training-school/` expose unrelated steroid, dental, or hormone/peptide destinations. Remove them from migrated content and audit the legacy WordPress installation.

## Required human verification before content freeze

1. Current service times, livestream time, address display, phone, email, and accessibility/parking details.
2. Kids age range, nursery availability, check-in/preregistration, volunteer screening, and child-safety language.
3. Full current leadership/ministry roster, names, titles, bios, ordering, and portrait permissions.
4. Active ministries/groups, leaders, meeting cadence, eligibility/ages, and registration links.
5. Find, Feed & Restore legal relationship, current programs, timelines, impact claims, and donation URL.
6. Approved mission partners and how the church describes each relationship.
7. Canonical sermon/video/audio sources and content ownership.
8. Giving account destination and approved stewardship/security copy.
9. Privacy policy and photo-release language.
10. Whether to retain an About gallery and any historical articles/training material.
