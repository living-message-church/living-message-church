# QA report

QA date: 2026-08-06  
Application: local Next.js development preview

## Wide canvas and premium layout update

The 2026-08-06 layout-confidence pass replaced the fixed `78rem` site canvas with semantic reading (`48rem`), content (`64rem`), standard (`80rem`), editorial (`90rem`), hero (`96rem`), and full-bleed (`100%`) containers. The header, footer, and photography-led homepage sections now select wider canvases intentionally; standard interior pages and long-form reading remain constrained.

No content, route, data model, photography asset, color token, typography scale, section order, component inventory, dependency, or motion behavior changed. The hero retains its existing text scale and photography while using a wider horizontal composition. Image-led editorial splits allocate more space to media, message video receives the dominant column, supporting ministry cards retain bounded proportions, and footer facts gain a dedicated wide-screen column.

The subsequent hero-height refinement compared the current public Motivation Church behavior across its responsive rules. Its hero uses a stable full-viewport minimum and bottom-anchored content while changing layout at smaller breakpoints. Living Message Church adopts the same proportional principles without copying the reference implementation, then tempers the height to `90svh` so the hero remains cinematic without monopolizing the screen. Because its header occupies normal document flow rather than overlaying the media, the hero subtracts the `6.5rem` desktop or `5.5rem` mobile header. A `vh` fallback precedes the stable-viewport rule. The headline and Sunday panel align at the bottom of the content grid, the video/poster covers the complete hero, and content can increase the section height when a short viewport cannot contain it safely.

The in-app browser connection and documented troubleshooting check found no available browser. Therefore all requested widths below are **source-reviewed and production-build verified, with rendered visual verification pending**. No screenshots were available, and no claim of optical browser approval is made.

## Homepage art-direction update

The homepage was reviewed section by section against a single-focal-point standard. Hero, identity, first visit, latest message, and outreach were protected rather than redesigned. Ministry cards form one lead photographic story with two supporting paths, and the final invitation uses approved Living Message photography as its emotional focal point.

The event presentation now uses a ruled horizontal list, optional event-specific imagery, compact date/title/location hierarchy, and conditional registration actions. The current unavailable adapter renders an honest calendar-pending row on Home and `/events`; historical records are still excluded. Verified future records will populate the same component without changing its visual contract. Final optical review remains pending a connected browser.

## Message library and admin-prototype update

The homepage and `/messages` now render a real privacy-enhanced YouTube player for the video currently featured on the production sermon page. Four production-page YouTube IDs and their public oEmbed titles/authors were normalized into approved-temporary local records. The implementation does not claim that the 2018 featured record is the newest chronological sermon, and the canonical YouTube-channel conflict remains open.

Source and HTTP checks passed for:

- homepage and `/messages` rendering `youtube-nocookie.com/embed/BFGOKJx3KDI` with an accessible iframe title;
- `/messages` rendering four records, category controls, search input, responsive cards, and `noindex, nofollow`;
- `/admin/messages` returning 200, retaining `noindex, nofollow`, exposing no write endpoint, and rendering disabled persistence/upload controls;
- `/messages/live` returning 200 through the existing provider-normalized archive path;
- final lint, redirect validation, and the 23-page production build.

Interactive filtering, category creation/removal, local metadata editing, YouTube playback, focus order, and small-screen visual composition still require a connected browser. The browser connection check returned no available in-app or extension browser, so no screenshots or unverified interaction claims were recorded.

## Photography integration and visual-polish update

The 2026-08-06 photography pass replaced the homepage welcome, message, ministry-card, and outreach placeholders with ten locally optimized images sourced only from the current Living Message Church website. The same approved-source library now provides decorative photography-led heroes for New Here, Contact, About, Leadership, Connect, Kids, Groups, Next Steps, Messages, Live, and Outreach. Source URLs, use, dimensions, and rights caveats are recorded in `docs/ASSET_REGISTER.md`.

The responsive cascade was re-reviewed at 3840, 2560, 1920, 1600, 1440, 1280, 1024, 834, 768, 430, 414, 390, 375, 360, and 320 pixels. Because no connected browser runtime was available, these results are based on source/CSS inspection, intrinsic image dimensions, aspect-ratio constraints, and successful production rendering—not screenshots or pixel measurements. Screenshots are therefore unavailable for this pass.

Changes verified in source:

- the hero statement now has three intentional lines, a 7.1rem desktop cap (about 9% below the former 7.8rem cap), 1.01 line-height, a narrower measure, and a slight desktop-only right offset;
- the offset is removed at 896px and below, and the existing mobile display cap is restored at 768px and below;
- photography frames preserve 4:3 or 16:9 ratios, use `object-fit: cover`, provide responsive `sizes`, and remain single-column at mobile widths;
- page-hero photography has capped height, cover cropping, a dark readability overlay, and a mobile-specific height/crop rule;
- the secondary service bar is no longer mounted; service times remain available in the hero and footer without stacking navigation layers;
- the white primary navigation, enlarged logo, 44px interaction targets, keyboard focus, and reduced-motion rules remain intact.

## Responsive review update

The dedicated responsive review is documented in `docs/RESPONSIVE_DESIGN_REVIEW.md`. It evaluates the implemented cascade independently at 3840, 2560, 1920, 1600, 1440, 1280, 1024, 834, 768, 430, 414, 390, 375, 360, and 320 pixels.

The browser-control runtime again reported no connected in-app or extension browser after the required connection and troubleshooting checks. Interactive viewport rendering, screenshots, keyboard traversal, computed overflow measurement, and media-feature emulation were therefore **Not testable in the current environment**. No unrelated browser automation tool was substituted.

HTTP responses, rendered HTML metadata, semantic source structure, CSS breakpoints, provider fallbacks, redirects, lint, and the production build were tested directly.

## Viewport matrix

| Viewport | Status | Result |
| --- | --- | --- |
| Desktop 3840px | Source-reviewed; rendered verification pending | Hero caps at 96rem, editorial sections at 90rem, standard content at 80rem, and reading at 48rem; full-bleed photography retains cinematic surrounding field. |
| Desktop 2560px | Source-reviewed; rendered verification pending | Maximum semantic widths remain stable; larger media canvases reduce the former narrow-column effect without lengthening prose. |
| Desktop 1920px | Source-reviewed; rendered verification pending | Hero reaches 96rem, shell/editorial sections reach 90rem, and the 80rem standard grid remains visibly distinct. |
| Desktop 1600px | Source-reviewed; rendered verification pending | Fluid gutters leave a 94rem hero canvas and 90rem editorial canvas; navigation, hero facts, and footer columns fit their declared tracks. |
| Desktop 1440px | Source-reviewed; rendered verification pending | Hero/editorial canvases become fluid at approximately 84rem while standard content remains capped at 80rem; paragraph measures stay unchanged. |
| Desktop 1280px | Source-reviewed; rendered verification pending | All wide canvases resolve to the available fluid width; grid ratios—not stretched copy—create visual hierarchy. |
| Tablet 1024px | Source-reviewed; rendered verification pending | Approximately 60rem of usable width preserves two-column editorial layouts where minimum tracks fit; mobile navigation is active. |
| Tablet 834px | Source-reviewed; rendered verification pending | Hero stacks at the 56rem breakpoint; footer lead also becomes one column before its wide tracks can crowd. |
| Tablet 768px | Source-reviewed; rendered verification pending | Primary editorial grids collapse to one column, existing image ratios remain bounded, and the mobile type scale is unchanged. |
| Mobile 430px | Source-reviewed; rendered verification pending | A 24.9rem usable canvas, stacked actions, single-column cards, and bounded media prevent planned overflow. |
| Mobile 414px | Source-reviewed; rendered verification pending | A 23.9rem usable canvas retains shared alignment across header, hero, sections, and footer. |
| Mobile 390px | Source-reviewed; rendered verification pending | A 22.4rem usable canvas contains the logo/menu, hero facts, buttons, and card media. |
| Mobile 375px | Source-reviewed; rendered verification pending | A 21.4rem usable canvas preserves the same single-column hierarchy without widening reading content. |
| Mobile 360px | Source-reviewed; rendered verification pending | The narrow-screen 14px gutter yields a 20.75rem canvas and maintains existing action stacking. |
| Mobile 320px | Source-reviewed; rendered verification pending | The 14px gutter yields an 18.25rem canvas; logo, menu, fact card, cards, and footer remain constrained by existing narrow rules. |

## Passed

| Area | Evidence |
| --- | --- |
| Primary and priority routes | Existing public routes plus the new no-index `/admin/messages` prototype build successfully; representative Home, Messages, Live, and Admin routes returned HTTP 200 locally. |
| Staged/no-index handling | About, beliefs, leadership, all Connect routes, Messages, Live, Events, Outreach, and Give emitted `noindex, nofollow`. |
| Metadata | Home emitted a unique title, canonical URL, Open Graph/Twitter metadata, and Organization JSON-LD. |
| Structured-data restraint | Only the verified organization name and canonical URL are emitted; no address, phone, service, event, sermon, rating, or founding claims were fabricated. |
| Messages source | `/messages` and Home render approved-temporary production-sermon-page records through the local adapter; `/messages/live` consumes the same normalized feed. No canonical-channel resolution is implied. |
| Message privacy/SEO restraint | The iframe uses `youtube-nocookie.com`; Messages and Admin remain no-indexed, and no unapproved `VideoObject` claims are emitted. |
| Admin safety boundary | `/admin/messages` has no API mutation, authentication claim, Supabase client, or enabled upload/save control; all prototype edits are browser-local. |
| Events fallback | `/events` and Home rendered the unconfigured adapter state; historical WordPress events were not treated as upcoming. |
| Redirects | Representative trailing-slash legacy routes returned a direct 301 to `/`, `/new-here`, and `/events`. Static validation found 453 sources, no duplicates, no loops, no chains, and no missing destinations. |
| Skip link | The first shared-shell link targets `#main-content`; the main landmark is programmatically focusable. |
| Navigation semantics | Desktop and mobile navigation have accessible labels; mobile uses native `details`/`summary`; current-page state uses `aria-current`. |
| Heading structure | Page templates use one `h1` through `PageHero`/Hero and hierarchical `h2`/`h3` section/card headings. |
| Focus foundation | Global `:focus-visible` styling provides a 3px high-contrast outline and offset. |
| Button sizing | Action links have a 3rem minimum height and responsive wrapping. |
| Reduced-motion code path | `prefers-reduced-motion: reduce` disables smooth scrolling and minimizes animation/transition duration. |
| Photography crops | Local approved-source images render within defined 4:3 and 16:9 frames using `next/image`, responsive `sizes`, and `object-fit: cover`; page-hero backgrounds use capped cover crops. |
| Sitemap/robots | Both returned HTTP 200; sitemap contains only the published Home, New Here, and Contact routes. |

## Failed and fixed

- Fixed narrow-screen media frames that lost their intended aspect ratio because of an 18rem minimum height.
- Fixed the tablet/mobile hero becoming excessively tall when its portrait media stacked.
- Fixed the smallest display scale remaining too large at 320–430px.
- Fixed undersized desktop-navigation and mobile-footer interaction targets.
- Fixed cramped multi-action rows below 512px.
- Removed escalating ultra-wide canvas overrides so every desktop uses one disciplined 78rem grid.
- Updated the header logo from deprecated Next.js 16 `priority` behavior to `preload`.
- Replaced the visually generic homepage media placeholders with church-specific photography while preserving the component and grid structure.
- Reduced the desktop homepage heading cap by about 9%, preserved deliberate phrase breaks, tightened line-height, and removed its right offset on tablet/mobile.
- Added controlled photography-led page heroes without widening body copy or weakening the text overlay.
- Prevented upscaling of the smaller legacy outreach and leadership originals.
- Replaced the universal `78rem` cap with semantic widths so hero, editorial, standard, content, and reading layouts no longer compete for the same canvas.
- Reduced the hero height range while expanding its horizontal grid and removing the former one-off left inset, aligning the headline directly with the wide shell.
- Increased image allocation in identity, visit, message, and outreach compositions while preserving their existing text measures.
- Bounded supporting ministry cards within the wider editorial grid instead of stretching them to fill every available pixel.
- Rebalanced the footer into three intentional lead columns and added an earlier tablet collapse to avoid minimum-track overflow.

## Pending manual verification

- Keyboard traversal order, menu open/close behavior, Escape expectations, and focus visibility across actual browsers.
- Visual wrapping of oversized headings at 1440, 1280, 768, 390, and 375 pixels.
- Computed horizontal overflow at every requested viewport.
- Touch-target spacing and mobile menu positioning with browser chrome and zoom.
- Browser-measured color contrast against each final photographic crop and overlay.
- Human review of focal crops at all 15 requested viewport widths, especially Leadership and the lower-resolution Outreach images.
- Reduced-motion behavior under real OS/browser emulation.
- Screen-reader announcement of mobile navigation and feed empty states.
- Safari/iOS and Chromium rendering differences.
- Public category/search behavior, selected-player scrolling, remote YouTube thumbnail crops, and iframe playback in a real browser.
- Admin keyboard behavior for local title/meta fields, category add/remove actions, and narrow-screen row composition.

## Validation commands

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run validate:redirects` | Passed |
| `npm run build` | Current Turbopack rerun is environment-blocked while its CSS worker attempts to bind an internal process port (`Operation not permitted`), including with elevated execution permission; no application parse/type error was reported |
| `npx next build --webpack` | Passed on Next.js 16.3.0 after the viewport-height refinement; all 23 pages plus robots, sitemap, and API route generated successfully |
| Message milestone route smoke | Passed; Home, Messages, Live, and Admin returned HTTP 200 with expected embed/no-index markers |
| Existing automated tests | No test suite or test command is configured |
