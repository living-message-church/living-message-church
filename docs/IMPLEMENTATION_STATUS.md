# Implementation status

Updated: 2026-08-06

## Completed

- Content verification registry covering the audit’s unresolved and conflicting facts.
- Typed content models for identity, contact, services, navigation/footer, leadership, ministries, messages, events, outreach, social channels, external services, images, calls to action, pages, and homepage sections.
- Project-native design tokens and responsive editorial component foundation.
- Shared primary header, accessible mobile navigation, skip link, main landmark, and footer.
- Required homepage sections with content separated from components.
- Implemented foundation routes: `/`, `/plan-your-visit`, `/contact`, `/privacy-policy`, `/photo-release`; `/new-here` permanently redirects to `/plan-your-visit` for backward compatibility.
- Deliberate no-index staged destinations for About, beliefs, leadership, gallery, Connect, live, Events, Outreach, and Give so the full redirect ledger has valid destinations; `/messages`, `/plan-your-visit`, and `/connect/next-steps` are published from current approved sources.
- Sitewide metadata component, canonical URLs, Open Graph/Twitter defaults, minimal verified Organization JSON-LD, XML sitemap, and robots route.
- 452 audited 301 redirect rules sourced from the machine-readable inventory, including one query-qualified legacy route; the production `/plan-your-visit/` slug is now preserved as a 200 route.
- Redirect validator for duplicate sources, statically missing destinations, loops, chains, ledger counts, and invalid status assumptions.
- Lint, redirect validation, and production build pass.
- Verification reconciliation completed: the public church name is the sole verified fact; no unresolved value was promoted.
- Priority route structures completed for About, beliefs, leadership, Connect, Kids, Youth, Young Adults, Groups, Outreach, and Give; all remain no-indexed while materially incomplete. Next Steps now has a complete indexable route sourced from the current production page.
- Provider-neutral message and event adapters added with deterministic unavailable-source fallbacks and no fabricated records.
- `/messages`, `/messages/live`, `/events`, and the homepage event section now consume normalized adapter results.
- Editorial route panels, feed states, stronger page-hero treatment, card depth, and responsive compositions refined.
- Asset register now records the approved-source photography library, its optimized local derivatives, page uses, and outstanding attribution/release checks.
- HTTP route, metadata, no-index, structured-data, provider-fallback, sitemap, robots, and representative redirect smoke checks pass.
- Design System Review completed with a presentation-only refinement pass: calmer type scale, tighter rhythm, warmer neutral-dominant palette, quieter cards/actions/navigation/placeholders, and reduced decorative motion.
- Existing Living Message Church production logo added locally and used through `next/image` in the header and footer; source and approval recorded in `ASSET_REGISTER.md`.
- Existing Living Message Church community promo video added as an optimized 720p H.264 hero background with a 204 KB poster fallback; the 46.15 MB source was reduced to 7.28 MB, stripped of audio, and gated off for mobile/reduced-motion visitors.
- Ten production-site Living Message Church photographs were audited, locally optimized, registered, and integrated across the homepage and priority page heroes; no reference-site assets were used.
- Homepage first-visit, latest-message, Kids, Groups, Next Steps, and outreach visual placeholders were replaced with church-specific photography using the existing `MediaFrame` and typed content foundation.
- New Here, Contact, About, Leadership, Connect, Kids, Groups, Next Steps, Messages, Live, and Outreach now use restrained photography-led page heroes without changing routes or page structures.
- Homepage hero copy was refined to “Come as you are. Grow in truth. Find community.” with deliberate line breaks, a roughly 9% smaller desktop cap, tighter line-height, narrower measure, and desktop-only compositional offset.
- The secondary service bar was removed from the shared shell to reduce stacked navigation and first-viewport noise. Verified Sunday information remains in the hero and footer.
- A system-level confidence pass standardized the public site around neutral-dominant section surfaces, sentence-case navigation, flatter cards, photography-first compositions, and restrained interaction feedback.
- The single `78rem` canvas was replaced with typed semantic containers: reading `48rem`, content `64rem`, standard `80rem`, editorial `90rem`, hero `96rem`, and full bleed `100%`. Header/footer and image-led homepage sections now choose their canvas intentionally while prose remains bounded.
- The homepage hero now uses the `96rem` canvas and a restrained `90svh` composition adjusted for the separate site header, with the headline and Sunday information bottom-aligned on a shared visual baseline while the next section arrives sooner. Editorial photography, video, and ministry grids receive more room without changing content, imagery, type scale, colors, section order, or motion.
- Footer facts now occupy a deliberate third column on wide screens, navigation groups have more breathing room, and the lead area collapses before its minimum columns can crowd at tablet widths.
- Decorative identity circles, accent bars, visit-section orbits, floating overlays, and image-drift animation were removed. The identity statement now uses a direct two-column composition with all-white type and a larger human photograph.
- Homepage art direction review completed in `ART_DIRECTION_REVIEW.md`: strong hero, identity, first-visit, message, and outreach moments were protected; ministries gained one lead photographic story; and the final invitation now closes on approved human photography.
- Upcoming Events now uses an editorial horizontal-list presentation with optional provider-supplied imagery, date/location hierarchy, quiet separators, and conditional registration actions. Until the authoritative feed is approved, the homepage renders the truthful calendar-pending state in the same layout rather than inventing events.
- Featured homepage message now plays the newest item from the verified Living Message Church YouTube feed in a privacy-enhanced responsive player.
- `/messages` now provides an hourly revalidated newest-first YouTube feed, featured player, publication dates, evidence-backed category filters, keyword search, responsive archive cards, and truthful local fallback.
- `/admin/messages` provides a no-index, non-persistent visual prototype for title/meta editing and category creation/removal; save and upload remain disabled until Supabase storage and authenticated access are approved.
- Message records now include optional slug, YouTube, thumbnail, category, featured, and SEO metadata fields behind the existing provider adapter boundary.
- The future Supabase schema, RLS, storage, upload, audit, and adapter transition are documented in `MESSAGES_ARCHITECTURE.md`.
- Site typography now uses one Helvetica Neue-led local system stack across display, body, navigation, event, message, and administrative surfaces, with normalized 400/600/700/800/900 weights and no downloaded font dependency.
- The homepage Plan Your Visit headline now supports one typed, content-defined accent phrase and renders it as an isolated old-style italic serif moment; the rest of the section and site remain in the Helvetica Neue-led system.
- The identity headline uses the same typed accent mechanism for “community,” keeping the complete statement as one accessible heading and leaving all non-accent words in Helvetica Neue.
- The Plan Your Visit photograph now receives a section-scoped 20-second cinematic push-and-pan within its existing crop. It causes no layout movement, introduces no dependency, and is explicitly disabled for reduced-motion visitors.
- Mobile spacing now uses a consistent 5–5.5% gutter and a minimum 4rem section rhythm. Identity, ministry-introduction, and final-invitation moments center deliberately while scan-heavy sections remain left-aligned.
- The mobile header now uses an accessible 48px icon-only navigation trigger with a larger 30px hamburger, open/close labels, gutter-aligned dropdown, and 52px navigation rows; the visible “Menu” label was removed.
- The user-supplied `Living Message Logo.svg` is now the shared brand master across the header and footer. Header rendering preserves its native navy/brown palette, while the dark footer uses a high-contrast treatment; the superseded PNG remains archived. The message player uses a separate circular play control.
- The “I’m New” desktop navigation group opens on hover, focus, or click and provides Plan Your Visit and Next Steps Class destinations; the mobile menu presents both links in a visible subgroup.
- `/plan-your-visit` now provides a complete photography-led visitor journey using only current-site facts and approved Living Message imagery. It preserves the production slug, omits the disputed Kids starting age, and keeps visitor form submission with the observed Church Center provider.
- `/connect/next-steps` now preserves the current Connect · Serve · Grow pathway, one-class Sunday format, 10:45 AM timing, leadership-team host, Scripture references, and Church Center registration handoff in a complete responsive presentation. Unconfirmed duration, childcare, recurrence dates, and form governance remain documented rather than invented.

## In progress

- Current event cards, Youth, and Young Adults still require current record-specific or ministry-specific media; truthful fallback or approved-temporary presentation remains in place.
- Legal routes preserve the current subjects but remain interim/no-index pending legal and processor review.
- Interactive responsive/browser QA remains pending because no in-app or extension browser was connected. All 15 requested viewport widths are source-reviewed and documented as rendered verification pending in `QA_REPORT.md`.

## Blocked by verification

- Service/online times, address/map/entrance, phone, email, accessibility, service duration, and kids ages/safety.
- Leadership roster, spellings, titles, biographies, and portraits.
- Message editorial-correction ownership and Podbean status; the canonical YouTube channel and feed are verified.
- Authoritative event source and publishing/registration policy.
- Church Center namespaces, giving destination, visit form, Next Steps form ownership/recipient/retention, Typeform, Text In Church, newsletter, prayer, and volunteer workflows.
- Outreach relationship/program details, partner approvals, social ownership, and underlying photographer/model/minor release records for migrated production-site imagery.
- Final privacy and photo-release wording.

## Deferred

- Supabase persistence/auth/storage, native form submission, newsletter integration, prayer handling, analytics, and consent tooling.
- Full-history YouTube Data API or future Supabase editorial sync and the live event API. The credential-free YouTube feed currently supplies the newest 15 records; local records remain a failure fallback.
- Dynamic message/event detail routes; public message search and category filtering are now implemented.
- Full ministry, beliefs, leadership, history, and gallery publication.
- Production deployment, DNS changes, and WordPress decommissioning.

## Recommended next milestone

Run a structured content-verification workshop with operations, pastoral leadership, ministry/safeguarding, communications, outreach, finance, legal, and technical owners. Resolve the remaining launch-critical registry rows, confirm release/attribution records for the migrated images, provide current Youth and event photography, and confirm event, Church Center, and giving ownership. Then populate the completed route structures, activate the remaining adapters, and run the deferred interactive 15-viewport browser QA.

## Validation record

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run validate:redirects` | Passed: 452 sources, 22 known destinations, 0 loops, 0 chains, 0 duplicates/missing destinations |
| `npm run build` | Passed on Next.js 16.3.0 with the verified YouTube feed available during generation; all 23 generated pages plus the dynamic `/new-here` redirect, robots, sitemap, and API routes completed successfully. |
| Local HTTP smoke check | Home, Messages, Live, sitemap, and robots returned 200. Home and Messages rendered newest feed video `SGsP83hGEN8`; Messages was indexable, Live remained no-indexed, and the sitemap included `/messages`. |
| Interactive browser QA | Not run: no connected browser was available |
| Existing tests | No test command or test suite is currently configured |
