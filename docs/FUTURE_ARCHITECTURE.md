# Future architecture

Audit date: 2026-08-05

## Architectural direction

Build the public site as a Vercel-hosted Next.js application with a small, typed Living Message design system and an explicit boundary between public editorial content and church operations. Keep payments, registrations, check-in, livestream hosting, and member-sensitive workflows in specialist systems. Make the public browsing experience, page content, SEO, visitor guidance, and low-friction inquiry forms native.

This document recommends responsibilities, not an immediate implementation. No provider contract, database, or new dependency is authorized by this audit.

## Responsibility matrix

| Capability | Recommended owner | Delivery method | Recommendation and rationale |
| --- | --- | --- | --- |
| Stable page copy: About, beliefs, history, policies, visitor logistics | Next repository initially | **Static Content** | Versioned, reviewable, fast, and appropriate for low-frequency content. Use typed content/MDX or equivalent; exact approach follows the Next 16 architecture decision. |
| Navigation, footer, service facts, contact details | One typed global content record | **Static Content** | Prevent contradictory copies. Include an explicit last-verified date and content owner. |
| Ministries and leadership | Typed structured records; protected editor store when authorized | **Static Content** now; planned **Supabase** adapter after admin/auth governance is approved | The project owner requested a future Team admin on 2026-08-07. Preserve the current normalized content boundary now; add persistence only with approved authentication, roles, image-storage ownership, audit history, and publishing workflow. |
| Messages/sermons | YouTube as media host; native metadata/index | **Third-party API** plus cached/static records | Fetch only verified channel/playlist metadata server-side and cache/revalidate it. Allow curated corrections for title, speaker, scripture, series, summary, and transcript. Keep live and on-demand distinct. |
| Podcast/audio | Podbean if active | **Third-party API/feed** or external link | Confirm ownership/activity first. Do not create a second sermon archive with conflicting metadata. |
| Upcoming events | Planning Center/Church Center if staff confirms it as source of truth | **Third-party API** or native summaries with external registration | Keep registration, payment, capacity, and check-in external. Cache public event data and provide accessible direct links. If no suitable approved API/workflow exists, use reviewed static event records rather than scraping. |
| Giving | Planning Center Giving | External secure link; optionally Church Center modal | Never process or store payment details in the app. A native `/give` page should explain the handoff and open the verified secure destination. |
| Groups/member directory/check-in | Planning Center | External application/link | Keep personally sensitive church operations outside the marketing site. Public group descriptions may be native; enrollment/member records remain external. |
| Directions | Google Maps | External link; optional click-to-load **Embedded Widget** | Always display a verified text address. A map must not be the only way to understand location or accessibility. |
| Plan Your Visit | Native interface and server endpoint | **Supabase** and/or approved **Third-party API** | Native accessible UX; send the minimum fields to the approved church record/workflow. If stored in Supabase, use RLS, restricted staff access, retention/deletion rules, and auditability. Final system of record is **Needs Verification**. |
| General contact | Native interface and server endpoint | **Supabase** plus approved transactional email/API | Validate server-side, rate-limit, protect against spam, show response expectations, and avoid exposing recipient addresses in code. The delivery provider is **Needs Selection/Verification**. |
| Prayer requests | Native, privacy-first interface only after policy approval | **Supabase** or approved secure **Third-party API** | Treat as potentially sensitive. Minimize fields, separate confidential requests, restrict access, define retention, exclude content from analytics/logs, and show an emergency disclaimer. Workflow is **Needs Verification**. |
| Newsletter signup | Native interface | Approved **Third-party API** | Keep subscription, consent evidence, preference management, and unsubscribe with a specialist provider. Existing provider/list is **Needs Verification**; do not create a mailing system in Supabase. |
| Volunteer interest | Native explanatory page/form; operational fulfillment in Planning Center | **Third-party API** and possibly **Supabase** for transient intake | Keep scheduling, screening, and assignments external. Do not collect background-check data in the public app. |
| Photo gallery | Curated optimized assets | **Static Content** | Use only church-owned/approved originals with consent status, alt text, focal points, and retention decisions. No reference-site assets or hotlinks. |
| Redirects | Vercel/Next edge configuration | Static configuration | Implement the complete documented **301** ledger, test single-hop behavior, and preserve query strings where appropriate. Confirm exact framework/platform mechanism before coding. |
| Analytics | GA4 or another approved minimal tool—not multiple overlapping stacks | Controlled third-party script | Define events before deployment, obtain legal/privacy approval, honor consent where required, and avoid form/prayer content. GTM is optional only if governance warrants it. |
| Error/performance monitoring | Vercel platform and an approved monitoring service if needed | Platform/API | Establish ownership, alerts, privacy filtering, retention, and an operational response path before adding a vendor. |

## Recommended application layers

1. **Content layer:** typed stable records for global facts, pages, people, ministries, policies, and curated message/event overrides. Each publishable fact should have an owner and verification date.
2. **Integration layer:** server-only adapters for YouTube, Planning Center, email/newsletter, and optional Supabase. UI components must not depend directly on vendor response shapes.
3. **Presentation layer:** reusable accessible primitives and church-specific patterns—header, footer, editorial section, action link/button, media frame, person/ministry/event/message cards, details/disclosure, form fields, status messages, and Sunday invitation.
4. **Route layer:** concise sitemap routes with per-page metadata, canonicals, Open Graph, structured data only from verified fields, not-found handling, and the audited 301 ledger.
5. **Operational layer:** environment validation, preview/production separation, logs with sensitive-field redaction, backups/exports, monitoring, and launch runbooks.

## Content and data models

Minimum structured entities:

- `SiteFacts`: service times, online time, address, phone, email, directions, social accounts, last verified, owner.
- `Person`: name, approved title, role group, biography, portrait, alt text, display order, active status, approval date.
- `Ministry`: name, audience/ages, purpose, cadence, location, childcare/accessibility, leader/contact, CTA, status.
- `Message`: title, date, speaker, series, scripture, summary, video/audio IDs, thumbnail permission/source, transcript/caption status.
- `Event`: title, start/end/timezone, location, audience, summary, image/alt, registration URL/status, source ID, cancellation state.
- `Partner`: approved name/description, relationship, URL, donation/volunteer path, logo permission, verification date.
- `FormSubmission`: type, minimum necessary fields, consent, created/status/retention fields; never payment data, credentials, or unnecessary sensitive notes.

## Supabase decision boundary

Supabase is a suitable future option for native submissions and structured editorial data only if the team accepts database administration and access controls. If selected:

- keep all privileged keys server-only;
- enable row-level security and deny anonymous reads of submissions;
- separate public content tables from private submissions;
- restrict prayer/contact access by staff role and log administrative access;
- define deletion/retention schedules and redact logs/analytics;
- use migrations and generated types; maintain tested backups/export procedures;
- never store giving card/bank data, background-check data, or Planning Center credentials.

If staff does not need an editor workflow, stable public content should remain version-controlled rather than adding a database.

### Planned Team admin boundary

The public Team directory now consumes normalized `TeamMember` and `TeamTier` records rather than embedding people inside components. A future authenticated adapter may replace the local collection without changing the public page. Its minimum record should preserve a stable ID, tier, display order, active state, approved display name, approved title, portrait path, alt text, verification status, source/approval note, and updated timestamp.

Before implementation, approve staff roles, sign-in and recovery, draft/publish behavior, image ownership and deletion, change history, rollback/export, and who can mark a record public. Public reads may expose only published records. Service-role keys stay server-only; anonymous writes and direct client-side Storage mutation are prohibited. This milestone does not authorize Supabase, authentication, uploads, or mutations.

## Integration principles

- Prefer APIs or direct links over scraping and opaque embedded widgets.
- Cache public third-party data server-side and render a useful fallback when a provider is unavailable.
- Use stable vendor IDs, not copied titles or embed HTML, and validate external URLs at build/monitor time.
- Obtain explicit approval for scopes, tokens, webhooks, data retention, and organizational account ownership.
- Do not send personal form content to analytics, client logs, or error trackers.
- Provide direct accessible alternatives to every map, video, social, calendar, and registration embed.

## SEO, performance, accessibility, and privacy

- Generate one canonical, unique title, description, social image, and crawl decision for every retained route.
- Emit Church/Organization, Event, and VideoObject structured data only from current verified records.
- Optimize approved originals with responsive sizing and focal crops; lazy-load below-fold media and avoid third-party feed widgets.
- Target WCAG 2.2 AA: semantic landmarks/headings, keyboard/focus behavior, text contrast, reduced motion, large touch targets, captions/transcripts, meaningful alt text, and accessible form errors.
- Keep page rendering functional without analytics or social embeds. Consider click-to-load for maps/video where privacy and performance warrant it.
- Rewrite privacy/photo-release policies to match the final processors and data flows before launch.

## Component library recommendation

Use a small project-native Living Message component library built with React, Tailwind CSS 4 design tokens, and semantic HTML. Begin with accessible native primitives; evaluate a focused headless accessibility library only when a complex menu/dialog/disclosure requirement proves it necessary. Do not adopt a large generic UI kit or copy components/styles from Motivation Church.

Initial library scope:

- typography and spacing tokens;
- `Container`, editorial `Section`, `Stack`, and responsive media layouts;
- accessible `Button`/`Link`, header/menu, footer, breadcrumbs;
- `Image`, `VideoEmbed`, person, ministry, event, and message cards;
- visitor-facts panel, Sunday invitation, CTA band;
- form controls, validation summary, success/error states;
- disclosure/FAQ and optional dialog;
- skeleton/empty/error states for external feeds.

## Recommended homepage hierarchy

1. Welcome hero with current Sunday times, Clermont location, and Plan Your Visit/directions actions.
2. Brief Living Message identity: church family, genuine community, expository teaching.
3. First-visit confidence section: kids, parking, service expectations, accessibility.
4. Latest message with speaker/date/scripture and watch/listen action.
5. Two or three verified upcoming events.
6. Ministry/connect gateways using authentic approved photography.
7. Find, Feed & Restore/outreach feature with approved relationship and action.
8. Final Sunday invitation with times, address, directions, and contact.

Series promotions and campaigns should be optional dated modules, not hard-coded permanent homepage copy.

## Delivery milestones

### Milestone 1 — verified content foundation and visitor journey

Resolve critical facts; establish typed `SiteFacts`, route/content models, design tokens, shared shell, Home, New Here, Contact, legal routes, SEO foundations, and the tested 301 ledger. Implement no live form submission until data owners, recipients, retention, and privacy language are approved. This creates a trustworthy launch spine before messages/events complexity.

### Milestone 2 — About, Connect, Outreach, and approved media

Publish reviewed beliefs/history/leadership/ministry/outreach content and consent-cleared photography with accessibility metadata.

### Milestone 3 — Messages, events, and operational handoffs

Add cached YouTube/message presentation, the authoritative event source, Church Center registration/giving links, calendar actions, and resilient failure states.

### Milestone 4 — native forms and measurement

Add approved Plan Your Visit, contact, prayer, newsletter, and volunteer workflows; complete privacy/security testing, analytics governance, accessibility review, performance budgets, and launch monitoring.

## Decisions required before implementation

1. Confirm current service/contact/facility facts and named content owners.
2. Choose Pages Router versus App Router after reading the installed Next 16 documentation and assessing migration cost; do not assume training-era conventions.
3. Confirm Planning Center account/modules, API access, source-of-truth responsibilities, and the two Church Center namespaces.
4. Confirm Podbean status, newsletter provider, form recipients, and remaining social-account ownership; the canonical YouTube Streams channel is verified.
5. Approve whether Supabase is warranted, who administers it, and submission retention/access policies.
6. Approve final sitemap, content/photo/legal material, analytics approach, and production cutover/rollback plan.
