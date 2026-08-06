# Technology audit

Audit date: 2026-08-05  
Production source: <https://www.livingmessagechurch.com>  
Development deployment: <https://dev.livingmessagechurch.com>

## Scope and confidence

This is a non-invasive audit of public HTML, HTTP headers, DNS-visible behavior, WordPress REST/sitemap endpoints, embeds, scripts, stylesheets, and the local repository. No account dashboards were accessed and no forms were submitted. `Needs Verification` means the public site reveals an integration or clue but cannot prove account ownership, configuration, data flow, or continued operational use.

Recommendation vocabulary:

- **KEEP** — retain the service and its current responsibility.
- **REPLACE** — move the responsibility to a different implementation.
- **REMOVE** — do not carry the dependency into the new site.
- **MODERNIZE** — retain the capability, but change or simplify its integration.

## Executive findings

- Production is a WordPress site using the Divi parent theme and a Living Message child theme. Public response headers strongly indicate Automattic WordPress.com Atomic/WP Cloud hosting and CDN behind nginx; the exact plan/account is **Needs Verification**.
- The site retains Fusion/Avada-era shortcodes and assets alongside Divi. This explains malformed legacy markup and increases maintenance weight.
- The new repository is a minimal Next.js 16.3.0, React 19.2.8, TypeScript, Tailwind CSS 4 application. The development domain is served by Vercel and currently shows the starter site.
- Planning Center/Church Center is the operational center for giving, registrations, and people forms. The website should preserve those high-trust operations externally while presenting them through consistent native pages and handoffs.
- Analytics is fragmented: a direct GA4 tag, Google Tag Manager, and Jetpack Stats are present. GTM contents are not public, so duplicate event/pageview collection is possible and **Needs Verification**.
- Public markup exposes legacy forms, popup plugins, two Typeform namespaces, Text In Church, Divi forms, Contact Form 7 assets, and Church Center forms. Form ownership and retention are not consistently disclosed.
- Three public-facing security/content hygiene concerns were found: unrelated steroid/dental links on `/home/`, another unrelated hormone/peptide shop link on `/living-message-bible-training-school/`, and malformed `www.www` URLs/email addresses. None should migrate; the WordPress installation should receive an owner-led security review.

## Current repository and deployment

| Technology | Purpose | Where/integration | Recommendation |
| --- | --- | --- | --- |
| Next.js 16.3.0 + React 19.2.8 | New public application | Local `package.json`; minimal Pages Router starter | **KEEP + MODERNIZE.** Keep Next/React. Decide the long-term router and content boundary before page implementation; follow the installed Next 16 documentation before code changes. |
| TypeScript | Type safety | Repository source/config | **KEEP.** Use typed content and integration contracts. |
| Tailwind CSS 4 | Styling foundation | Repository dev dependencies and global stylesheet | **KEEP.** Build a small Living Message design-token and component layer; do not import the reference site's CSS. |
| Vercel | Development hosting/CDN | `dev.livingmessagechurch.com` response behavior | **KEEP + VERIFY.** Confirm team ownership, environments, domains, logs, backups, and spend before production cutover. |
| Current starter routes | Placeholder application | `/`, `_app`, `_document`, sample `/api/hello` | **REPLACE** during implementation, not in this audit. No production content model, redirects, forms, analytics, or SEO layer exists yet. |

## Production platform, CMS, and plugins

| Service/technology | Purpose | Where it appears | How integrated | Recommendation |
| --- | --- | --- | --- | --- |
| WordPress | Production CMS and page delivery | All production routes; REST API and XML sitemaps | Server-rendered WordPress with public REST endpoints | **REPLACE** as the public runtime after an approved migration. Keep production untouched until cutover; export approved content/media and preserve a rollback/archive plan. |
| WordPress.com Atomic / WP Cloud | Hosting, CDN, media delivery | Sitewide response headers (`wpcloud`, Automattic CDN timing) and same-origin uploads | Managed WordPress infrastructure behind nginx | **REPLACE** for the new public runtime with Vercel; **VERIFY** account/backup ownership and retain an archive until migration acceptance. |
| Divi + Living Message child theme | Page building and visual presentation | Sitewide body classes, scripts, styles, page markup | WordPress theme and visual builder | **REMOVE** from the new application. Migrate facts and approved media, not builder markup or layout code. |
| Fusion/Avada legacy assets | Old shortcodes/components | `/home/` and other older pages | Plugin styles/scripts and shortcode residue | **REMOVE.** Do not parse directly into new page UI; extract only reviewed copy. |
| Yoast SEO 28.0 | SEO titles, descriptions, canonical links, Open Graph, schema, sitemaps | Sitewide and sitemap index | WordPress plugin-generated metadata | **REPLACE** with typed Next metadata, canonical/robots/sitemap generation, and verified structured data. Preserve useful current metadata only after editorial review. |
| The Events Calendar | Historical event CMS, archive, REST API, iCal | `/events/`, 415 event/recurrence URLs, `tribe/events/v1`, `?ical=1` | WordPress plugin | **REPLACE/MODERNIZE.** Choose Church Center or a native event model as the single source. Do not import expired records as current. Preserve redirects. |
| Contact Form 7 | Form capability | Assets loaded publicly; no confirmed live CF7 form found | WordPress plugin scripts/styles and reCAPTCHA support | **REMOVE.** **Needs Verification** whether a non-discoverable workflow still uses it. |
| Divi contact form | General contact | Contact page | Server POST to the WordPress page with Divi handling and reCAPTCHA v3 | **REPLACE** with an accessible native form and server-side validation/routing. Verify recipients, spam controls, retention, and response expectations. |
| Divi Popup Builder / Popups for Divi | Modal/popup UI | Sitewide plugin assets/classes | WordPress plugins | **REMOVE.** Use native accessible dialogs only where a modal is genuinely needed. |
| HFCM by 99 Robots | Header/footer code injection | Sitewide HTML comments/snippets | Injects Church Center modal code and Google tracking | **REMOVE.** Move each approved integration into version-controlled Next configuration/components. |
| Jetpack | WordPress.com connectivity and statistics | Sitewide assets/tracking; additional page assets | WordPress plugin linked to WordPress.com | **REMOVE** after migration. Export any required historical analytics before shutdown. Other enabled Jetpack modules are **Needs Verification**. |
| Bloom | Possible email opt-in capability | `et_bloom` body/classes | Divi ecosystem plugin or module | **REMOVE/VERIFY.** No active public newsletter form/provider was positively identified. Confirm whether Bloom stores or forwards subscriber data. |
| WordPress MediaElement | Audio/video player support | WordPress player assets | Core/plugin player library | **REMOVE** with WordPress. Use native media elements or YouTube/Podbean links as approved. |

## Operational services, forms, and church systems

| Service | Purpose | Where it appears | How integrated | Recommendation |
| --- | --- | --- | --- | --- |
| Planning Center / Church Center | Church operations platform | Giving, registrations, people forms; Church Center modal loaded sitewide | External links and `js.churchcenter.com/modal/v1` | **KEEP + MODERNIZE.** Keep payments, registrations, check-in, and member-sensitive operations external. Use clear native landing pages and direct secure handoffs; prefer links over opaque embeds. Confirm account ownership/admins. |
| Church Center Giving | Donations and recurring gifts | Give navigation/action | External namespace `living-message-church-428144.churchcenter.com/giving` | **KEEP + VERIFY.** Confirm this is the current approved fund/account and whether its namespace differs intentionally from other Church Center links. Never handle card data in the Next app. |
| Church Center Registrations | Event and volunteer registration | Event/registration calls to action | External Church Center registration URLs/modal | **KEEP.** Use for capacity, payment, attendee, and check-in workflows; expose verified event summaries natively. |
| Church Center People forms | Plan a visit and other interest intake | Home/Visit and another public form (`people/forms/1250627`, `people/forms/979623`) | External forms/modal | **MODERNIZE + VERIFY.** Confirm each form's owner, fields, automations, retention, and purpose. A native visit form may forward server-side if Planning Center remains the approved record. |
| Text In Church | Digital connect card/follow-up | Home page | External connect-card link/QR workflow | **VERIFY/MODERNIZE.** Confirm contract, automation, consent, and whether it duplicates Church Center. Keep only if it owns an approved communications workflow. |
| Typeform | Legacy visit/campaign forms | 19 pages use `greatthings.typeform.com`; an older landing page uses `brianbroadway.typeform.com` | External linked/embedded forms | **REPLACE.** Audit/export required submissions first; retire stale forms after owners approve. Account ownership and active automation are **Needs Verification**. |
| Google reCAPTCHA v3 | Spam prevention | Divi and Contact Form 7 assets | Client/server token workflow | **REPLACE/MODERNIZE.** Select one privacy-conscious anti-abuse approach for native forms; disclose it in privacy documentation. Do not expose secret keys client-side. |
| Newsletter/email marketing | Subscriber communication | Bloom clues, but no provider positively identified | Unknown | **Needs Verification.** Do not invent or select a provider until ownership, lists, consent records, and unsubscribe behavior are audited. Native signup UI may later call the approved provider API. |
| Prayer request system | Pastoral care intake | Legacy prayer CTA; no current dedicated system confirmed | Unknown | **Needs Verification.** Define confidentiality, recipients, emergencies disclaimer, retention, and whether to use a native server workflow or Church Center before implementation. |
| Volunteer signup/check-in | Serving and attendance operations | Registration/form links and historical event content | Likely Church Center, not positively confirmed end-to-end | **KEEP EXTERNAL + VERIFY.** Keep scheduling/check-in/member records in Planning Center if confirmed; use native explanatory pages. |

## Media, social, maps, and content delivery

| Service | Purpose | Where it appears | How integrated | Recommendation |
| --- | --- | --- | --- | --- |
| YouTube | Sermon video and livestream hosting | Online Church, Sermons, social navigation | Links, embeds, playlist/feed plugins | **KEEP + MODERNIZE.** Keep video/live hosting external; build a native messages presentation with cached API/feed metadata and accessible links. Canonical channel is **Needs Verification** because multiple IDs/handles appear. |
| YouTube Feed Pro 2.7.0 | Video feed UI | Online Church | WordPress feed plugin reading a YouTube channel | **REPLACE.** Use server-side cached official feed/API data or curated records; do not replicate plugin markup. |
| YouTube Embed Plus 14.2.6 | YouTube embeds | Sermon/media pages and site assets | WordPress embed plugin | **REPLACE.** Use consent/performance-aware native embeds, ideally click-to-load with links/captions. |
| Podbean | Podcast/audio sermon hosting | Sermons page | External multi-player/playlist with download controls | **KEEP + VERIFY.** Confirm account ownership, feed activity, rights, and whether audio remains a supported channel; modernize the native presentation if retained. |
| Facebook | Social presence and Page feed | Footer/navigation and Online Church | Links plus Facebook Page plugin embed | **KEEP links; REMOVE embed.** Social links are useful; the embedded feed adds tracking, brittleness, and visual noise. Confirm page ownership. |
| Instagram | Social presence | Header/footer links | External link only | **KEEP + VERIFY** account activity/ownership; avoid embedding a tracking-heavy feed by default. |
| X/Twitter | Social presence | Sitewide social links | External link | **VERIFY/REMOVE** if inactive; do not preserve solely because the old site links it. |
| StreamYard | Possible livestream production | Appears in YouTube descriptions/referral links | Not a confirmed website integration | **Needs Verification.** Keep only as an internal production tool if staff confirms use; no new-site dependency is required. |
| Vimeo | Possible video provider | Not detected | None found | **REMOVE / not applicable.** Re-check only if staff identifies private videos. |
| Google Maps | Location and directions | Contact and visitor paths | Embedded map plus Google directions link | **KEEP + MODERNIZE.** Make the address and directions link primary; use a click-to-load embed or static treatment to reduce tracking/performance cost. Verify pin/access point. |
| Google Fonts | Open Sans, Unica One, ABeeZee | Sitewide | Remote CSS/fonts from Google domains | **REPLACE/MODERNIZE.** Select Living Message typography independently; self-host licensed font files where practical for privacy/performance. |
| WordPress uploads / Automattic CDN | Images and downloadable media | Sitewide `/wp-content/uploads/` assets | Same-origin files served by WordPress cloud/CDN | **REPLACE.** Migrate only approved originals with documented rights, alt text, crops, and ownership; do not hotlink the old site. |
| PDFs/downloads | Public documents | No public PDFs/documents positively identified in discovered pages | None confirmed; Podbean offers audio download | **Needs Verification.** Ask staff about hidden bulletins, forms, policies, or member resources before content freeze. |
| Calendar/iCal | Event calendar subscription | The Events Calendar archive | Plugin-generated `?ical=1` | **REPLACE/MODERNIZE.** Generate calendar links from the chosen authoritative event source; no Google Calendar integration was detected. |

## Analytics, search, and privacy

| Service | Purpose | Where/integration | Recommendation |
| --- | --- | --- | --- |
| Google Analytics 4 (`G-VY0QWCSMKN`) | Traffic/behavior analytics | Direct sitewide `gtag` injected by HFCM | **MODERNIZE + VERIFY.** Define a minimal measurement plan, consent/legal basis, retention, internal-traffic filtering, and ownership. Do not copy the tag blindly. |
| Google Tag Manager (`GTM-KKL5T3M`) | Tag deployment | Sitewide GTM container | **VERIFY/MODERNIZE.** Audit container contents and owners; use either a governed GTM setup or direct analytics, avoiding duplicate pageviews. |
| Jetpack/WordPress.com Stats | Traffic analytics | Sitewide `stats.wp.com`; public blog identifier | **REMOVE** after required historical export. It duplicates the new analytics responsibility. |
| Google Search Console | Search ownership/monitoring | Verification meta tag | **KEEP + MODERNIZE.** Verify property ownership, submit the new sitemap, monitor redirects/indexing, and transfer access to organizational accounts. |
| Facebook Pixel / other ad pixels | Advertising attribution | Not positively detected | **Not detected.** Verify GTM before concluding none exists. |

## External content and ministry destinations

Links to Find, Feed & Restore, Radius International, Life's Choices, SLPFCC, Ligonier Ministries, Radical, and Campus Outreach Central Florida are editorial/external relationships rather than application dependencies. **KEEP + VERIFY** each relationship, URL, description, logo/media permission, and donation handoff. Never proxy or imply ownership of partner services.

## Security, accessibility, and operational risks

1. **Critical content integrity:** unrelated commerce links on `/home/` and `/living-message-bible-training-school/` require a WordPress security/content audit. Do not migrate them or visit them as part of content production.
2. **Account fragmentation:** Church Center namespaces, two Typeform namespaces, Google tags, social accounts, and media accounts need an owner/admin register using organizational—not personal—accounts.
3. **Unclear form data handling:** confirm recipients, storage, retention, minors/sensitive prayer data, consent, deletion, and breach response before building forms.
4. **Third-party embed burden:** Facebook, maps, YouTube, podcast, forms, and tracking can create performance, privacy, keyboard, and cookie-consent issues. Prefer native summaries and explicit links or click-to-load embeds.
5. **Plugin accumulation:** redundant form, popup, analytics, video, and legacy-builder plugins create security and performance surface area. They should not be reproduced in Next.
6. **No positively identified newsletter provider, prayer workflow, public groups integration, check-in UI, or document library:** all remain **Needs Verification**.

## Recommended decommission sequence

1. Establish organizational ownership and exports for WordPress, Vercel, DNS, Planning Center, analytics, forms, YouTube, Podbean, and social accounts.
2. Freeze approved facts/content/media and resolve the verification backlog.
3. Implement and test the new site, integrations, privacy disclosures, forms, redirects, SEO, analytics, and accessibility without altering production.
4. Run a parallel acceptance period and capture final WordPress database/media backups.
5. Change DNS only after stakeholder approval, then monitor the 301 ledger, Search Console, forms, events, giving, and livestream paths.
6. Retain a private, access-controlled legacy archive for an approved period; decommission public WordPress/plugins only after rollback and record-retention requirements are met.
