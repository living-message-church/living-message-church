# QA report

QA date: 2026-08-06  
Application: local Next.js development preview

## Environment limitation

The browser-control runtime reported no connected in-app or extension browser after the required connection and troubleshooting checks. Interactive viewport rendering, screenshots, keyboard traversal, computed overflow measurement, and media-feature emulation were therefore **Not testable in the current environment**. No unrelated browser automation tool was substituted.

HTTP responses, rendered HTML metadata, semantic source structure, CSS breakpoints, provider fallbacks, redirects, lint, and the production build were tested directly.

## Viewport matrix

| Viewport | Status | Result |
| --- | --- | --- |
| Desktop 1440px | Not testable in current environment | Responsive layout rules exist, but rendered composition could not be visually inspected. |
| Desktop 1280px | Not testable in current environment | Responsive layout rules exist, but rendered composition could not be visually inspected. |
| Tablet 768px | Not testable in current environment | The 70rem/48rem breakpoints were reviewed statically; interactive rendering remains pending. |
| Mobile 390px | Not testable in current environment | Single-column rules and native mobile menu semantics were reviewed statically; visual/touch QA remains pending. |
| Mobile 375px | Not testable in current environment | Single-column rules and native mobile menu semantics were reviewed statically; visual/touch QA remains pending. |

## Passed

| Area | Evidence |
| --- | --- |
| Primary and priority routes | 21 requested/public routes, robots, and sitemap returned HTTP 200 locally. |
| Staged/no-index handling | About, beliefs, leadership, all Connect routes, Messages, Live, Events, Outreach, and Give emitted `noindex, nofollow`. |
| Metadata | Home emitted a unique title, canonical URL, Open Graph/Twitter metadata, and Organization JSON-LD. |
| Structured-data restraint | Only the verified organization name and canonical URL are emitted; no address, phone, service, event, sermon, rating, or founding claims were fabricated. |
| Messages fallback | `/messages` and `/messages/live` rendered the unconfigured adapter state and explicitly contained no inferred sermon metadata or media IDs. |
| Events fallback | `/events` and Home rendered the unconfigured adapter state; historical WordPress events were not treated as upcoming. |
| Redirects | Representative trailing-slash legacy routes returned a direct 301 to `/`, `/new-here`, and `/events`. Static validation found 453 sources, no duplicates, no loops, no chains, and no missing destinations. |
| Skip link | The first shared-shell link targets `#main-content`; the main landmark is programmatically focusable. |
| Navigation semantics | Desktop and mobile navigation have accessible labels; mobile uses native `details`/`summary`; current-page state uses `aria-current`. |
| Heading structure | Page templates use one `h1` through `PageHero`/Hero and hierarchical `h2`/`h3` section/card headings. |
| Focus foundation | Global `:focus-visible` styling provides a 3px high-contrast outline and offset. |
| Button sizing | Action links have a 3.25rem minimum height and responsive wrapping. |
| Reduced-motion code path | `prefers-reduced-motion: reduce` disables smooth scrolling and minimizes animation/transition duration. |
| Placeholder crops | Code-native media frames define 4:5, 4:3, and 16:9 aspect ratios without remote or unapproved assets. |
| Sitemap/robots | Both returned HTTP 200; sitemap contains only the published Home, New Here, and Contact routes. |

## Failed and fixed

No new deterministic failure was found in this milestone. The previously discovered trailing-slash 308→301 chain remains fixed through `skipTrailingSlashRedirect: true`, and representative regression checks passed.

## Pending manual verification

- Keyboard traversal order, menu open/close behavior, Escape expectations, and focus visibility across actual browsers.
- Visual wrapping of oversized headings at 1440, 1280, 768, 390, and 375 pixels.
- Computed horizontal overflow at every requested viewport.
- Touch-target spacing and mobile menu positioning with browser chrome and zoom.
- Color contrast with final approved photography and overlays.
- Actual image focal crops, intrinsic dimensions, and layout shift after approved assets are supplied.
- Reduced-motion behavior under real OS/browser emulation.
- Screen-reader announcement of mobile navigation and feed empty states.
- Safari/iOS and Chromium rendering differences.

## Validation commands

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run validate:redirects` | Passed |
| `npm run build` | Passed; 22 generated pages plus robots, sitemap, and API route |
| Existing automated tests | No test suite or test command is configured |
