# QA report

QA date: 2026-08-06  
Application: local Next.js development preview

## Responsive review update

The dedicated responsive review is documented in `docs/RESPONSIVE_DESIGN_REVIEW.md`. It evaluates the implemented cascade independently at 3840, 2560, 1920, 1600, 1440, 1280, 1024, 834, 768, 430, 414, 390, 375, 360, and 320 pixels.

The browser-control runtime again reported no connected in-app or extension browser after the required connection and troubleshooting checks. Interactive viewport rendering, screenshots, keyboard traversal, computed overflow measurement, and media-feature emulation were therefore **Not testable in the current environment**. No unrelated browser automation tool was substituted.

HTTP responses, rendered HTML metadata, semantic source structure, CSS breakpoints, provider fallbacks, redirects, lint, and the production build were tested directly.

## Viewport matrix

| Viewport | Status | Result |
| --- | --- | --- |
| Desktop 3840px | Code-reviewed; rendered verification pending | Canvas expands to 104rem while typography and reading measures remain capped. |
| Desktop 2560px | Code-reviewed; rendered verification pending | Canvas expands to 104rem; photography/card regions gain presence without widening prose. |
| Desktop 1920px | Code-reviewed; rendered verification pending | Canvas expands to 96rem; desktop hierarchy remains capped. |
| Desktop 1600px | Code-reviewed; rendered verification pending | Canvas expands to 88rem; navigation targets are at least 44px high. |
| Desktop 1440px | Code-reviewed; rendered verification pending | Existing 80rem canvas and bounded copy measures remain appropriate. |
| Desktop 1280px | Code-reviewed; rendered verification pending | Fluid canvas and full navigation fit; link targets were enlarged without visual inflation. |
| Tablet 1024px | Code-reviewed; rendered verification pending | Mobile navigation is active and tablet display scaling is reduced. |
| Tablet 834px | Code-reviewed; rendered verification pending | Hero now stacks independently and uses a bounded landscape crop. |
| Tablet 768px | Code-reviewed; rendered verification pending | Primary grids collapse; media ratios and mobile heading caps now apply. |
| Mobile 430px | Code-reviewed; rendered verification pending | Actions stack; footer targets are enlarged; display type is bounded. |
| Mobile 414px | Code-reviewed; rendered verification pending | Pretty wrapping and deterministic crop ratios reduce widow/crop risk. |
| Mobile 390px | Code-reviewed; rendered verification pending | Logo/menu and fact-card containment rules fit the available canvas. |
| Mobile 375px | Code-reviewed; rendered verification pending | Shorter feed/contact states and smaller display caps improve vertical balance. |
| Mobile 360px | Code-reviewed; rendered verification pending | Single-column controls and preserved media ratios remove primary overflow risks. |
| Mobile 320px | Code-reviewed; rendered verification pending | 44.8px display type, 14px gutter, 140px logo, and bounded fact card apply. |

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

- Fixed narrow-screen media frames that lost their intended aspect ratio because of an 18rem minimum height.
- Fixed the tablet/mobile hero becoming excessively tall when its portrait media stacked.
- Fixed the smallest display scale remaining too large at 320–430px.
- Fixed undersized desktop-navigation and mobile-footer interaction targets.
- Fixed cramped multi-action rows below 512px.
- Fixed an overly narrow ultra-wide canvas at 1600–3840px without widening prose.
- Updated the header logo from deprecated Next.js 16 `priority` behavior to `preload`.

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
| Responsive milestone route smoke | Passed; all 22 checked public routes, including robots and sitemap, returned HTTP 200 |
| Existing automated tests | No test suite or test command is configured |
