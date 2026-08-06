# Implementation status

Updated: 2026-08-06

## Completed

- Content verification registry covering the audit’s unresolved and conflicting facts.
- Typed content models for identity, contact, services, navigation/footer, leadership, ministries, messages, events, outreach, social channels, external services, images, calls to action, pages, and homepage sections.
- Project-native design tokens and responsive editorial component foundation.
- Shared service bar, header, accessible mobile navigation, skip link, main landmark, and footer.
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
- Asset register confirms no approved photography was supplied or copied; code-native placeholders remain.
- HTTP route, metadata, no-index, structured-data, provider-fallback, sitemap, robots, and representative redirect smoke checks pass.
- Design System Review completed with a presentation-only refinement pass: calmer type scale, tighter rhythm, warmer neutral-dominant palette, quieter cards/actions/navigation/placeholders, and reduced decorative motion.
- Existing Living Message Church production logo added locally and used through `next/image` in the header and footer; source and approval recorded in `ASSET_REGISTER.md`.
- Existing Living Message Church community promo video added as an optimized 720p H.264 hero background with a 204 KB poster fallback; the 46.15 MB source was reduced to 7.28 MB, stripped of audio, and gated off for mobile/reduced-motion visitors.

## In progress

- The homepage hero now uses the user-approved current-site promo video; remaining section and ministry media retain abstract local placeholders pending additional approved church photography.
- Legal routes preserve the current subjects but remain interim/no-index pending legal and processor review.
- Interactive responsive/browser QA remains pending because no in-app or extension browser was connected. All five requested viewport checks are documented as not testable in `QA_REPORT.md`.

## Blocked by verification

- Service/online times, address/map/entrance, phone, email, accessibility, service duration, and kids ages/safety.
- Leadership roster, spellings, titles, biographies, and portraits.
- Canonical YouTube channel, message metadata owner, and Podbean status.
- Authoritative event source and publishing/registration policy.
- Church Center namespaces, giving destination, visit form, Typeform, Text In Church, newsletter, prayer, and volunteer workflows.
- Outreach relationship/program details, partner approvals, social ownership, and all image rights/releases.
- Final privacy and photo-release wording.

## Deferred

- Supabase, native form submission, newsletter integration, prayer handling, analytics, and consent tooling.
- Live YouTube/message and event APIs; adapter boundaries are ready but intentionally unconfigured.
- Dynamic message/event detail routes and search/filtering.
- Full ministry, beliefs, leadership, history, and gallery publication.
- Production deployment, DNS changes, and WordPress decommissioning.

## Recommended next milestone

Run a structured content-verification workshop with operations, pastoral leadership, ministry/safeguarding, communications, outreach, finance, legal, and technical owners. Resolve the launch-critical registry rows, supply approved photography, and confirm YouTube, event, Church Center, and giving ownership. Then populate the completed route structures, activate the existing adapters, and run the deferred interactive five-viewport browser QA before considering indexing.

## Validation record

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run validate:redirects` | Passed: 453 sources, 20 known destinations, 0 loops, 0 chains, 0 duplicates/missing destinations |
| `npm run build` | Passed on Next.js 16.3.0; 22 generated pages plus robots/sitemap/API routes |
| Local HTTP smoke check | 21 primary/priority routes, robots, and sitemap returned 200; no-index/provider fallbacks/metadata passed; representative legacy URLs returned a direct 301 |
| Interactive browser QA | Not run: no connected browser was available |
| Existing tests | No test command or test suite is currently configured |
