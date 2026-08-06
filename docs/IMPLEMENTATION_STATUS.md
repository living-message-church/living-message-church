# Implementation status

Updated: 2026-08-06

## Completed

- Content verification registry covering the audit’s unresolved and conflicting facts.
- Typed content models for identity, contact, services, navigation/footer, leadership, ministries, messages, events, outreach, social channels, external services, images, calls to action, pages, and homepage sections.
- Project-native design tokens and responsive editorial component foundation.
- Shared primary header, accessible mobile navigation, skip link, main landmark, and footer.
- Required homepage sections with content separated from components.
- Implemented foundation routes: `/`, `/new-here`, `/contact`, `/privacy-policy`, `/photo-release`.
- Deliberate no-index staged destinations for About, beliefs, leadership, gallery, Connect, Next Steps, Messages, live, Events, Outreach, and Give so the full redirect ledger has valid destinations.
- Sitewide metadata component, canonical URLs, Open Graph/Twitter defaults, minimal verified Organization JSON-LD, XML sitemap, and robots route.
- 453 audited 301 redirect rules sourced from the machine-readable inventory, including one query-qualified legacy route.
- Redirect validator for duplicate sources, statically missing destinations, loops, chains, ledger counts, and invalid status assumptions.
- Lint, redirect validation, and production build pass.
- Verification reconciliation completed: the public church name is the sole verified fact; no unresolved value was promoted.
- Priority route structures completed for About, beliefs, leadership, Connect, Kids, Youth, Young Adults, Groups, Next Steps, Outreach, and Give; all remain no-indexed while materially incomplete.
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
- The homepage hero now uses the `96rem` canvas, fills the stable viewport remaining below the separate site header, maintains stronger horizontal column balance, and aligns exactly with the wide shell. Editorial photography, video, and ministry grids receive more room without changing content, imagery, type scale, colors, section order, or motion.
- Footer facts now occupy a deliberate third column on wide screens, navigation groups have more breathing room, and the lead area collapses before its minimum columns can crowd at tablet widths.
- Decorative identity circles, accent bars, visit-section orbits, floating overlays, and image-drift animation were removed. The identity statement now uses a direct two-column composition with all-white type and a larger human photograph.
- Homepage art direction review completed in `ART_DIRECTION_REVIEW.md`: strong hero, identity, first-visit, message, and outreach moments were protected; the verification-only events state was removed from the homepage; ministries gained one lead photographic story; and the final invitation now closes on approved human photography.
- Featured homepage message now plays the production sermon-page YouTube record in a privacy-enhanced responsive player.
- `/messages` now provides a featured player, public category chips, keyword search, responsive archive cards, and truthful empty states using four approved-temporary production-page video records.
- `/admin/messages` provides a no-index, non-persistent visual prototype for title/meta editing and category creation/removal; save and upload remain disabled until Supabase storage and authenticated access are approved.
- Message records now include optional slug, YouTube, thumbnail, category, featured, and SEO metadata fields behind the existing provider adapter boundary.
- The future Supabase schema, RLS, storage, upload, audit, and adapter transition are documented in `MESSAGES_ARCHITECTURE.md`.

## In progress

- Current event cards, verified recent sermon records, Youth, and Young Adults still require current record-specific or ministry-specific media; truthful fallback or approved-temporary presentation remains in place.
- Legal routes preserve the current subjects but remain interim/no-index pending legal and processor review.
- Interactive responsive/browser QA remains pending because no in-app or extension browser was connected. All 15 requested viewport widths are source-reviewed and documented as rendered verification pending in `QA_REPORT.md`.

## Blocked by verification

- Service/online times, address/map/entrance, phone, email, accessibility, service duration, and kids ages/safety.
- Leadership roster, spellings, titles, biographies, and portraits.
- Canonical YouTube channel, message metadata owner, and Podbean status.
- Authoritative event source and publishing/registration policy.
- Church Center namespaces, giving destination, visit form, Typeform, Text In Church, newsletter, prayer, and volunteer workflows.
- Outreach relationship/program details, partner approvals, social ownership, and underlying photographer/model/minor release records for migrated production-site imagery.
- Final privacy and photo-release wording.

## Deferred

- Supabase persistence/auth/storage, native form submission, newsletter integration, prayer handling, analytics, and consent tooling.
- Live YouTube and event APIs; adapter boundaries are ready, with messages temporarily backed by local production-page records.
- Dynamic message/event detail routes; public message search and category filtering are now implemented.
- Full ministry, beliefs, leadership, history, and gallery publication.
- Production deployment, DNS changes, and WordPress decommissioning.

## Recommended next milestone

Run a structured content-verification workshop with operations, pastoral leadership, ministry/safeguarding, communications, outreach, finance, legal, and technical owners. Resolve the launch-critical registry rows, confirm release/attribution records for the migrated images, provide current Youth and event photography, and confirm YouTube, event, Church Center, and giving ownership. Then populate the completed route structures, activate the existing adapters, and run the deferred interactive 15-viewport browser QA before considering indexing.

## Validation record

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run validate:redirects` | Passed: 453 sources, 21 known destinations, 0 loops, 0 chains, 0 duplicates/missing destinations |
| `npm run build` | Previous milestone passed on Next.js 16.3.0. Current rerun is environment-blocked by Turbopack attempting to bind an internal process port (`Operation not permitted`); the supported `npx next build --webpack` path passed and generated all 23 pages plus robots/sitemap/API routes. |
| Local HTTP smoke check | Home, Messages, Live, and Admin returned 200; YouTube embed, local feed records, and no-index boundaries were present |
| Interactive browser QA | Not run: no connected browser was available |
| Existing tests | No test command or test suite is currently configured |
