# Content gaps and verification backlog

Audit date: 2026-08-05

Severity legend: **Critical** blocks trustworthy launch; **High** blocks a section/page; **Medium** reduces quality, accessibility, or maintainability.

## Critical factual discrepancies

| Gap | Evidence | Required decision/owner |
| --- | --- | --- |
| Service times | Current Home/Visit/Contact/Online: 9:00 and 10:45; older visitor/campaign pages: 8:00, 9:30, 11:15; old home: 10:00; legacy events include 9:00/10:30. | Church operations confirms in-person and online times and effective date. |
| Address | Current: 20180 US Highway 27 Suite 308; expired campaigns: 830 W. Montrose Street; Waterfront Park appears for historical Good Friday events. | Operations confirms postal display, map pin, suite, accessible entrance, and whether a mailing address differs. |
| Phone | Current contact: 352-432-6048; training/campaign content: 352-617-8484. | Operations confirms public phone and disposition of old number. |
| Suspicious links | `/home/` links to an unrelated steroid site and dental-site path; `/living-message-bible-training-school/` links to an unrelated hormone/peptide shop. | Technical owner excludes these from migration and performs an owner-approved security/content-integrity review of legacy WordPress. |
| Broken Plan Your Visit links | Multiple pages use `https://www.www.livingmessagechurch.com/plan-your-visit/`, which does not resolve. | Replace through migration/redirects; do not reproduce. |
| Broken legal contact email | Privacy and photo-release pages list `info@www.www.livingmessagechurch.com`. | Confirm and replace with the approved privacy/photo contact. |
| Authoritative event source | Events wrapper is thin; old calendar exposes 415 expired detail/recurrence URLs; nav also uses Church Center registrations. | Choose CMS vs Church Center source-of-truth and define synchronization/ownership. |

## Visitor and ministry information

| Gap | What is missing or unclear | Needed content/approval |
| --- | --- | --- |
| Kids age range | Birth–5th grade versus one year–5th grade. | Exact ages/rooms; nursery availability at each service. |
| Kids safety | Check-in is described, but background checks, security labels, pickup policy, allergies, accommodations, and first-visit preregistration are incomplete. | Kids director and safeguarding approval. |
| Accessibility | No clear wheelchair access, accessible parking/seating, sensory accommodations, hearing assistance, or service-animal guidance. | Facility/accessibility walkthrough. |
| Worship/service expectations | Contemporary worship and 60–70 minutes appear in visit content, but must be confirmed. | Pastoral/operations approval; concise FAQ. |
| Ministry catalog | Empty `/ministries/`; scattered references to Kids, Youth, Young Adults, Women, Men, discipleship, marriage, home groups. | For each: current name, purpose, ages/audience, leader, cadence, location, childcare, contact, registration. |
| Next Steps | Says one class during the 10:45 service. | Confirm schedule, duration, childcare, prerequisites, and active signup URL. |
| Prayer/care | Old home mentions prayer; current Contact offers general contact. | Decide whether Contact includes prayer, confidential handling, crisis disclaimer, and response expectations. |
| Online church | 10:45 is current; text offers Zoom, meetings, and “coffee at Panera Breard.” | Confirm livestream platform/schedule and real online connection options; correct/remove typo. |

## Leadership and history

| Gap | Evidence | Needed action |
| --- | --- | --- |
| Incomplete staff records | Team page has names/titles/portraits but no bios/contact responsibilities. | Confirm roster; collect approved 40–80 word bios and pronunciation/preferred names if useful. |
| Spelling conflicts | Garry image filename says Gary; Jaime image says Jamie; Simons image filenames say Simmons. | Each person/administrator confirms public spelling. |
| Role consistency | Allison is described as helping with children/admin on pastor page and Administrator on team page; Brian is Lead Pastor/Founder and Lead Pastor/Bishop. | Approve public titles and biography wording. |
| Church history | Founding in 2009 and 2004 Clermont move are stated; facility history is scattered. | Approve a concise timeline and whether former locations should be named. |
| “No membership, family” | Strong identity statement but long/absolute phrasing may conflict with governance terminology. | Pastoral/governance review and approved concise expression. |

## Beliefs and teaching philosophy

- Pastoral review is required for all doctrinal wording, scripture references, grammar, and the relationship to the 1689 Baptist Confession and 1853 New Hampshire Confession.
- The SEO description calls the page “Church of Christ teachings,” which may imply a denomination not supported elsewhere. Confirm and correct.
- Approve a concise description of “expository/line-by-line” teaching for Home/New Here and a full version for Beliefs.
- Decide whether baptism, communion, salvation, prayer, spiritual gifts, marriage, and governance need explicit public sections; do not invent positions.

## Outreach and mission partners

- Confirm Find, Feed & Restore’s current legal relationship to the church and preferred name/style.
- Verify the housing-first model, trailer program, free-period/payment timeline, counseling/case-management claims, current impact data, eligibility, volunteer path, and donation URL.
- Reconcile older “feed over 70 people/month” and shelter/job/Microsoft Office class claims with the current program.
- Confirm approved relationship descriptions for Radius International, Life’s Choices, SLPFCC, Ligonier Ministries, Radical, and Campus Outreach Central Florida.
- Decide whether Outreach owns all partner content or whether missions warrants a child section. No partner logo/content should be reused without permission.

## Messages, events, and giving

- Determine whether Podbean remains active and whether the full historical YouTube archive should use a server-only Data API credential or the future editorial backend; the canonical Streams channel and credential-free recent feed are verified.
- Sermons lack reliable title/date/speaker/series/scripture metadata on the current page. Define import source and editorial owner.
- Decide whether transcripts/captions will be published and how accessibility corrections are handled.
- Define event fields, cancellation/update ownership, registration capacity/status, recurrence behavior, timezone, and archival policy.
- All sitemap event details are historical; no upcoming event record should be inferred from them.
- Create approved Give copy: why give, methods, recurring-gift management, designated giving, receipts/contact, security statement, and external Church Center handoff.

## Legal, privacy, and safeguarding

- Privacy policy needs an effective date and an accurate list of processors/cookies/forms/analytics/embeds, retention, user rights/contact, minors, and cross-site handoffs.
- Photo release needs legal review for consent by entry, minors/guardians, opt-out method, event signage, accessibility, withdrawal/contact, and storage/use duration.
- Confirm photo permissions for every migrated image. A public legacy image URL or broad release notice is not sufficient proof of permission.
- Decide whether contact/prayer submissions contain sensitive information and document access/retention.
- Confirm ADA/accessibility responsibilities, cookie-consent needs, and state/federal requirements with qualified counsel.

## Broken, stale, and risky links/content

- `www.www.livingmessagechurch.com` Plan Your Visit links fail DNS.
- Privacy and photo-release contact blocks use the invalid `info@www.www.livingmessagechurch.com` address.
- `/home/` and `/living-message-bible-training-school/` contain unrelated suspicious links; do not migrate or visit them during content production.
- `/pictures/` has two `#` “Click Here” placeholders.
- `leadpages_post-sitemap.xml` returns a 404 page despite being advertised by the sitemap index.
- Old campaign/training registrations and dates must not remain actionable.
- External partner/social/form/giving URLs need a launch-day status and ownership check.
- X/Twitter account activity and desired inclusion should be confirmed.
- Confirm ownership and continued need for both Church Center namespaces, two Typeform namespaces, Google Analytics/Tag Manager, Podbean, and Text In Church. The canonical YouTube channel is resolved.
- No active newsletter provider, dedicated prayer-request workflow, public groups integration, or downloadable document library was positively identified; each is **Needs Verification**.

## SEO and structured content gaps

- Several pages have no meta description; others use awkward keyword-stuffed descriptions (“church events clermont,” “christian pastor Florida,” etc.).
- Duplicate home/visitor/media pages create competing intent and canonical risk.
- Titles/slugs are long, inconsistent, or internal (`Home2`, `Home_OLD`, `nextsteps`).
- LocalBusiness/Church structured data should use verified name, address, phone, hours, map coordinates, logo, and social profiles.
- Event and VideoObject structured data should only be emitted from verified fields.
- Old taxonomy/author archives are thin and should not be recreated.
- Create unique title/meta/social-image fields for every retained route.

## Images and alt text

- Observed gallery, team, campaign, home, and contact images overwhelmingly have empty/missing alt attributes.
- Many images are old (2014–2018) or campaign-specific and may no longer represent the church/facility.
- Needed: image owner, consent/release status, subjects, event/date, focal point, approved crop, alt text, and whether decorative.
- Needed photography coverage: exterior/entrance/parking, lobby greeting, worship, teaching, kids check-in/classrooms, accessibility, pastors/leaders, groups, outreach, and diverse candid community life.
- Do not migrate image URLs blindly; obtain originals and document rights.

## Repository/deployment gaps

- Local repository is a clean Next.js 16.3 starter using the Pages Router with only `/`, `_app`, `_document`, and sample `/api/hello`.
- The development deployment returns the default Next.js starter (“To get started, edit…”), consistent with the repository.
- There is no content model, CMS integration, design system, route structure, redirects, SEO/structured-data layer, analytics consent plan, form integration, image pipeline, test coverage, or deployment documentation yet.
- Before application work, read the installed Next.js 16 documentation in `node_modules/next/dist/docs/` as required by `AGENTS.md`.

## Approval checklist

Content should not be marked ready until named owners approve:

- Operations: logistics/contact/facility/accessibility.
- Pastoral leadership: identity, history, beliefs, teaching, leadership bios/titles.
- Ministry leads: program details and schedules.
- Outreach owner: Find, Feed & Restore and partner claims.
- Communications: copy, photos, alt text, events, messages, social links.
- Finance: giving copy/account.
- Legal/safeguarding: privacy, photo release, minors, submissions.
- Technical owner: forms, redirects, structured data, analytics, external link validation.
