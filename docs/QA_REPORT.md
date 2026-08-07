# QA report

QA date: 2026-08-07  
Application: local Next.js development preview

## Mobile spacing and navigation refinement

The 2026-08-06 mobile polish pass reviewed the current Motivation Church public implementation for transferable responsive principles only. Living Message now uses a disciplined mobile gutter of approximately 5–5.5% with a 1.25rem minimum, a calmer 4rem-or-greater section rhythm, and selective centering for the identity statement, ministry introduction, and final invitation. Content-led sections, event rows, message browsing, visit details, and footer information remain left-aligned for scanning clarity.

The mobile header no longer displays the word “Menu.” Its native `details` summary is now a 48px icon-only target with a 30px three-line hamburger, accessible open/close labels, and a restrained close-state transformation. The dropdown shares the page gutter, provides 52px navigation rows, and retains native keyboard/focus behavior.

The mobile first-visit section now treats “A simple, welcoming first step” as a centered focal moment. Its headline scales from 3.25rem to 4.25rem, while the supporting copy is centered on a 31-character measure with a modestly larger reading size and the action remains centered below it. Desktop layout and typography are unchanged.

The connected in-app browser was unavailable after the documented connection and troubleshooting checks, so rendered optical approval at 430, 390, 375, 360, and 320 pixels remains pending. Source inspection confirms that the 320px canvas retains 280px of usable content width, the 9.5rem logo and 48px menu target fit the header, centered copy keeps bounded measures, and reduced-motion rules suppress the icon transition duration.

## Verified YouTube feed integration

The user-approved Streams source resolves to channel ID `UC-YctizZq1wTbhgn3tQOJqA`; the official public Atom feed resolves to the same channel. The provider-neutral adapter now fetches and normalizes the newest 15 records, sorts them newest-first, marks the first as featured, and supplies title, published date, first description paragraph, video ID, watch URL, and thumbnail without credentials. Categories are derived only from explicit stream/title/description metadata and publication year. Home, `/messages`, and `/online-church` revalidate hourly; `/messages` is now indexable and included in the sitemap.

The public feed is intentionally a recent-history integration, not a claim of complete channel history. A full historical import requires the future authenticated Data API or editorial backend. If YouTube is unavailable during generation, the adapter retains the approved four-record local fallback instead of failing the page.

## YouTube live-status integration

The existing `/online-church` media window receives normalized server-side status context from `src/lib/youtube`: active Live first, nearest Upcoming second, and newest public embeddable completed/uploaded video third. The provider client uses the configured channel uploads playlist plus `videos.list`, verifies channel ownership, applies a seven-second timeout, deduplicates concurrent requests, and caches results for 55 seconds. Playback is deliberately independent of the completed-video fallback: only a resolved Live or genuinely future Upcoming video ID is embedded. The page uses 60-second ISR and never serializes credentials or raw provider responses.

The player is a responsive official `youtube-nocookie.com` iframe with fullscreen and picture-in-picture permission, no forced inline autoplay, a descriptive title, and `LIVE NOW`, `Next live service`, or `Live channel` labeling. When no active/future broadcast is resolved, the same 16:9 window becomes a branded motion thumbnail: approved navy-to-purple color, softly drifting wave lines, the white Living Message tree in a glass medallion, a rotating next-broadcast ring, restrained status copy, and the verified `/live` link. It replaces YouTube's “video unavailable” screen without introducing a recorded-message fallback. All motion is neutralized by the global reduced-motion rule. Cinema mode uses a large centered 16:9 native modal, a 95% dark blurred viewport veil, and user-triggered autoplay; Escape, the close control, or clicking outside the player closes it and removes the cinema iframe.

The Church Online schedule panel now remains present independently of Planning Center availability. It calculates the next Sunday date in the Eastern time zone and displays the user-verified recurring broadcast time of 10:45 AM EST, with the live-channel destination as its handoff. The hero's past-message wording links directly to `/messages` rather than describing the provider.

The Message Archive keeps the newest message featured at the top, with both inline playback and a focused 16:9 Cinema option. Every archive card now plays directly inside its own frame instead of replacing the featured player or scrolling the visitor upward. Each card also exposes Cinema mode, and the library coordinates playback so starting another inline message stops the previously active inline player. Cinema uses a deep navy-to-purple veil with very slow, faint radial-light movement; reduced-motion visitors receive the same static gradient. The homepage message presentation remains unchanged.

Deterministic selection fixtures passed for all four requested logic paths: Live, Upcoming, Offline, and provider/failure fallback; a non-embeddable candidate was also rejected. Authenticated discovery initially stopped at `channels.list(part=contentDetails)` with HTTP 403 `forbidden`: Google reported that requests with an empty referrer were blocked. No uploads-playlist or video request had run, so the diagnostic's network-level `API reachable` status obscured a request-authorization restriction.

Supplying the API key's approved `https://dev.livingmessagechurch.com/` referrer fixes that request without exposing the key. The complete chain now returns one configured channel, its uploads playlist, and 25 hydrated candidates. At verification time all 25 were public and embeddable and zero were Live. Six records still carry YouTube's `upcoming` marker, but their scheduled dates range from April 24 through July 15, 2026—all before the August 7 verification time. The former selector trusted the marker alone and incorrectly resolved the oldest stale record. Upcoming now requires both YouTube's marker and a valid future scheduled time. With those stale records excluded, the latest completed fallback correctly resolves video `SGsP83hGEN8`, published August 3, 2026. This also proves the uploads-playlist strategy is not currently excluding Living Message Church's live or completed content.

The message player now renders a lightweight custom facade before YouTube loads. It uses the verified thumbnail as the photographic field and centers a high-contrast white play triangle inside the exact `#0E153D` to `#282C72` circular brand gradient. The medallion occupies 62% of the control while the label is distributed across 98% of the circular path, leaving a controlled seam instead of a visibly short text run. The 16-second ring surrounds the medallion without overlapping it. The complete facade is one keyboard-accessible play button; activation replaces it with the privacy-enhanced `youtube-nocookie.com` iframe and requests autoplay. Reduced-motion styling leaves the ring static.

The homepage message section now carries a restrained 120-degree navy-to-indigo background wash derived from the same approved tokens. Both endpoints are mixed back into the existing ink surface, preserving white-text contrast and keeping the gradient subordinate to the message photography.

The homepage ministry section now presents its three available pathways as equal image-first cards in one desktop row. The former oversized first-card exception was removed; all three cards share the same 4:3 photography crop, content rhythm, and bottom-aligned action. The existing responsive grid intentionally collapses to two columns below 70rem and one below 48rem.

The desktop homepage hero now completes a full first-screen composition at every desktop aspect ratio: its minimum height is the small viewport height minus the 6.5rem main navigation. This replaces the previous 16:10-only condition, which left the following section visible on wider laptop and browser-window ratios. Tablet and mobile retain their existing dedicated height rules.

The desktop primary navigation now uses a wider fluid item gap (`1.2rem` to `1.9rem`), restrained positive tracking, and a slightly more generous active underline. The editorial header container and existing 70rem mobile-navigation breakpoint prevent the expanded rhythm from crowding intermediate widths.

“New Here” is now the “I’m New” navigation group. Its desktop disclosure exposes “Plan Your Visit” (`/plan-your-visit`) and “Next Steps Class” (`/connect/next-steps`) through a semantic button with `aria-expanded` and `aria-controls`. It opens on pointer hover, keyboard focus, or click; closes on link selection, pointer exit, focus exit, or Escape; and returns focus to its trigger after Escape. Mobile presents the same destinations as an always-visible subgroup inside the existing navigation disclosure.

The same disclosure behavior now supports more than one primary-navigation group without opening sibling menus. About presents Our Church, Our Beliefs, Our Pastor, and Our Team as separate implemented destinations, Our Outreach as an external handoff, and Our Missions as a nested partner-link group. Desktop and mobile use the same route labels without inventing mission descriptions.

Our Outreach now resolves directly to `https://www.findfeedrestore.com/` from both submenu presentations. The link uses a visible external-link icon, `target="_blank"`, and `rel="noreferrer"`; the standalone primary Outreach item remains an internal staged route rather than being silently repurposed.

Our Missions now uses a second-level desktop flyout and a nested native mobile disclosure. The six links match the current production menu: Radius International, Life’s Choices, SLPFCC, Ligonier Ministries, Radical, and Campus Outreach Central Florida. Each renders a visible external-link icon with protected new-tab behavior. Desktop supports hover, focus, and click opening plus Escape close/focus return; mobile uses native `details`/`summary` semantics.

## Next Steps redesign

The current production `/nextsteps/` page is now represented by the canonical `/connect/next-steps` route. The route preserves the observable one-class Sunday format, its 10:45 AM service timing, leadership-team host, Connect · Serve · Grow pathway, three Scripture references, and Church Center form `979623`. The source page and user direction authorize temporary publication; duration, childcare, recurrence dates, form recipient, retention, and Planning Center ownership remain explicit verification blockers.

The redesigned route uses a natural Living Message lobby-connection photograph for its hero, concise class facts, a three-part pathway, locally optimized current Next Steps artwork, a restrained Scripture-reference moment, and a direct final registration invitation. The Church Center form opens as an external specialist handoff; no registration data is collected by this application. Source review confirms single-column collapse below 56rem and 48rem, bounded mobile headline sizing, stacked facts and pathway content, responsive 16:9 imagery, and shared accessible action targets. Rendered browser review remains pending because no browser connection was available.

## Our Church redesign

The supplied `/about-living-message-church-clermont/` slug is preserved as a direct 200 route and the former redirect to `/about` is removed. The page uses the current production source for its church-family philosophy, living-stones name story, general service emphasis, and church video. The hero uses a route-specific production-site worship photograph rather than repeating the homepage image. The user-supplied “Living Message Church. This Is Us!” video now appears in a compact homepage-style split feature; its lightweight poster opens a focused, dismissible cinema player and does not load the YouTube iframe until requested. Historical outreach counts and changing class/program claims are intentionally excluded. The About dropdown and footer point to the preserved canonical route, and the XML sitemap includes it.

Source-level responsive review confirms that the photography-led hero retains bounded type, family and service splits collapse below 56rem, the family statement remains inside the image composition, the name-story columns stack, and all actions retain the shared target sizing. Final rendered optical approval remains pending because no browser connection was available.

## Our Beliefs redesign

`/about/beliefs` now replaces its no-index staging shell with the doctrinal material on the current production `/our-beliefs/` page. The misleading legacy “Church of Christ teachings” SEO phrase is not carried forward. The page retains the source’s Why Beliefs Matter introduction, historic-confession note, Holy Scriptures, Trinity, Human Condition, Salvation, Assurance of Salvation, and Church statements with their Scripture references. Copy received punctuation and readability cleanup without adding doctrinal claims; final pastoral proofreading remains recorded in the verification registry.

The route uses a unique Living Message Bible-study photograph, a restrained two-column foundation section, and native `details`/`summary` disclosures with visible hover, open, keyboard-focus, and plus/minus states. The disclosure index stacks below the introduction at 56rem, mobile rows retain 40px controls inside 5rem targets, long doctrine keeps a bounded reading measure, and the shared Sunday invitation closes the page. Rendered optical approval remains pending because no browser connection was available.

## Our Pastor redesign

The dedicated `/about/pastor` route separates the current Broadway biography from the team directory. It preserves the production page’s exact `IMG_0914-1.jpg` header photograph, current family portrait, New York and Long Island background, 2001 marriage, Grace and Hannah, mission travel, 2004 Clermont move, 2009 church start, and stated expository-teaching, discipleship, church-family, and outreach focus. The copy receives grammar and reading-rhythm cleanup without adding biography claims; the current page and user direction authorize temporary use while the Team page’s “Bishop” variant and final personal approval remain documented.

The layout uses a full-width teaching hero, square family portrait with bounded biography copy, a three-point milestone list, a restrained navy-to-indigo ministry-focus moment, and the shared Sunday invitation. Profile, timeline, and focus grids collapse at 56rem; the portrait loses its sticky behavior, timeline labels stack, the hero receives a mobile vertical scrim, and type remains bounded below 48rem. Rendered optical approval remains pending because no browser connection was available.

## Plan Your Visit redesign

The authoritative production `/plan-your-visit/` slug now remains a 200 destination instead of redirecting to `/new-here`; the superseded internal `/new-here` route returns a direct 301 to the preserved slug. The redesigned page uses a photography-led visitor hero, Sunday service card, three-column essentials summary, five-step arrival and connection guide, LMC Kids feature, and final invitation. Copy is limited to facts observable on the current production page: parking and greeters, hallway self check-in and pickup sticker, contemporary worship, Scripture-centered teaching, available pastors and elders, Connect Cards, current service times, and the current address. The disputed Kids starting age is intentionally omitted.

The page uses approved local Living Message photography only. Its primary “Tell us you’re coming” action remains a direct handoff to the currently observed Church Center form; the site does not collect visitor data. The form’s ownership, recipient, retention, and automation remain verification blockers.

Source-level responsive review confirms the hero and Sunday card collapse below 56rem; essentials become one column below 48rem; expectation rows simplify to one text column; the Kids image becomes a 16:11 landscape crop; and all actions retain the shared 3rem minimum height. Rendered browser review remains pending because no browser connection was available.

The user-supplied `Living Message Logo.svg` now replaces the previous raster logo in the header and footer through `next/image` with explicit intrinsic dimensions. The header preserves its native navy/brown color while the dark footer applies a white high-contrast treatment. The message-player medallion uses the separately supplied standalone tree SVG. Every use preserves its source asset’s native proportions. The previous PNG remains in the repository but is no longer referenced by application code.

## Helvetica Neue typography test

The 2026-08-06 typography test standardizes the complete application on a Helvetica Neue-led local stack, with Helvetica, Arial, and generic sans-serif fallbacks. The former mixed body stack and isolated Georgia event treatment were removed. Fractional weight declarations were normalized to explicit 400, 600, 700, 800, and 900 values so hierarchy resolves predictably across locally available Helvetica-family faces.

No font files, font service request, package, route, content, layout, component structure, or data structure was added. Optical comparison still requires a connected browser; lint and the production build validate the implementation path.

The subsequent Plan Your Visit refinement adds one content-defined accent phrase inside the existing semantic `h2`. Its three display lines remain one accessible heading, use fluid sizing from mobile through desktop, and rely only on local system font fallbacks.

The identity statement now uses the same `AccentHeading` primitive for “community.” The accent remains inline within the single `h2`, inherits the section’s white foreground, and uses the same system-only old-style serif stack without affecting surrounding Helvetica Neue text.

The section photograph now uses a GPU-composited, 20-second alternate transform between shallow scale and translation values. The media frame and document flow remain stationary, preventing layout shift. The reduced-motion media query removes both the animation and its transform, returning the approved source crop to a static presentation.

## Wide canvas and premium layout update

The 2026-08-06 layout-confidence pass replaced the fixed `78rem` site canvas with semantic reading (`48rem`), content (`64rem`), standard (`80rem`), editorial (`90rem`), hero (`96rem`), and full-bleed (`100%`) containers. The header, footer, and photography-led homepage sections now select wider canvases intentionally; standard interior pages and long-form reading remain constrained.

No content, route, data model, photography asset, color token, typography scale, section order, component inventory, dependency, or motion behavior changed. The hero retains its existing text scale and photography while using a wider horizontal composition. Image-led editorial splits allocate more space to media, message video receives the dominant column, supporting ministry cards retain bounded proportions, and footer facts gain a dedicated wide-screen column.

The subsequent hero-height refinement compared the current public Motivation Church behavior across its responsive rules. Its hero uses a stable full-viewport minimum and bottom-anchored content while changing layout at smaller breakpoints. Living Message Church adopts the same proportional principles without copying the reference implementation, then tempers the height to `90svh` so the hero remains cinematic without monopolizing the screen. Because its header occupies normal document flow rather than overlaying the media, the hero subtracts the `6.5rem` desktop or `5.5rem` mobile header. A `vh` fallback precedes the stable-viewport rule. The headline and Sunday panel align at the bottom of the content grid, the video/poster covers the complete hero, and content can increase the section height when a short viewport cannot contain it safely.

The in-app browser connection and documented troubleshooting check found no available browser. Therefore all requested widths below are **source-reviewed and production-build verified, with rendered visual verification pending**. No screenshots were available, and no claim of optical browser approval is made.

## Homepage art-direction update

The homepage was reviewed section by section against a single-focal-point standard. Hero, identity, first visit, latest message, and outreach were protected rather than redesigned. Ministry cards form one lead photographic story with two supporting paths, and the final invitation uses approved Living Message photography as its emotional focal point.

The event presentation now uses a ruled horizontal list, optional event-specific imagery, compact date/title/location hierarchy, and conditional registration actions. The current unavailable adapter renders an honest calendar-pending row on Home and `/events`; historical records are still excluded. Verified future records will populate the same component without changing its visual contract. Final optical review remains pending a connected browser.

## Message library and admin-prototype update

The original message prototype rendered a production-sermon-page video and four approved-temporary local records. Those records now serve only as the network-failure fallback; the verified canonical YouTube feed is the primary source.

Source and HTTP checks passed for:

- homepage and `/messages` rendering the current newest normalized feed record (`SGsP83hGEN8` at test time) through `youtube-nocookie.com` with an accessible iframe title;
- `/messages` rendering normalized feed records, publication dates, category controls, search input, responsive cards, canonical metadata, and indexable robots behavior;
- `/admin/messages` returning 200, retaining `noindex, nofollow`, exposing no write endpoint, and rendering disabled persistence/upload controls;
- `/online-church` returning 200 through the verified provider-normalized live path;
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

## Our Team directory update

The production `/the-team/` page modified 2026-07-31 was reconciled into the canonical `/about/leadership` route. The route preserves its three tiers and source order: 6 Executive Team members, 6 Deacons, and 4 Ministry Leaders. All 16 production portraits and the source page’s unique worship hero were locally optimized and rendered through `next/image`; incorrect legacy alt labels were replaced with meaningful person-and-role descriptions.

Source review confirms two subtly featured cards for Brian and Allison followed by a compact 4-column desktop grid for every other team member. Every card is now narrower than its available grid track, creating consistent breathing room without changing the roster hierarchy; the final two Deacon cards center as a pair rather than hanging against one edge. The directory becomes a bounded 2-column tablet composition and one centered portrait card per row below 48rem. Cards use a stable 7:10 frame, natural document-height copy, quiet spacing, no large shadow, and only a restrained crop transition that is suppressed by the global reduced-motion rule. The page has one `h1`, tier `h2` headings, person `h3` headings, indexable metadata, and no interactive card behavior requiring a keyboard target.

Local HTTP smoke checks passed: `/about/leadership` returned 200, rendered all 16 card records and all three tier labels, emitted no `noindex`, and appeared in the XML sitemap. Legacy `/the-team/` returned one direct 301 to `/about/leadership`. Browser-level optical crop approval remains pending because no connected browser is available.

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
| Primary and priority routes | Existing public routes plus the no-index administrative prototypes build successfully; representative Home, Messages, Church Online, and Admin routes returned HTTP 200 locally. |
| Staged/no-index handling | About, Gallery, most Connect routes, Events, Outreach, and Give retain deliberate `noindex, nofollow`; Beliefs, Pastor, Team, Next Steps, Messages, and Church Online are indexable. |
| Metadata | Home emitted a unique title, canonical URL, Open Graph/Twitter metadata, and Organization JSON-LD. |
| Structured-data restraint | Only the verified organization name and canonical URL are emitted; no address, phone, service, event, sermon, rating, or founding claims were fabricated. |
| Messages source | Home, `/messages`, and `/online-church` consume the verified canonical YouTube feed through one normalized adapter, with approved local records retained only for feed failure. |
| Message privacy/SEO restraint | Message facades, cinema dialogs, and the always-present Church Online live player use `youtube-nocookie.com`; Messages and Church Online are indexable after channel verification, Admin remains no-indexed, and no unapproved `VideoObject` claims are emitted. |
| Admin safety boundary | `/admin/messages` has no API mutation, authentication claim, Supabase client, or enabled upload/save control; all prototype edits are browser-local. |
| Events fallback | `/events` and Home rendered the unconfigured adapter state; historical WordPress events were not treated as upcoming. |
| Redirects | Representative legacy routes return direct 301 responses to `/`, `/plan-your-visit`, and `/events`; the canonical `/plan-your-visit/` source remains a 200 page. Static validation found 452 redirect sources, no duplicates, no loops, no chains, and no missing destinations. |
| Skip link | The first shared-shell link targets `#main-content`; the main landmark is programmatically focusable. |
| Navigation semantics | Desktop and mobile navigation have accessible labels; mobile uses native `details`/`summary`; current-page state uses `aria-current`. |
| Heading structure | Page templates use one `h1` through `PageHero`/Hero and hierarchical `h2`/`h3` section/card headings. |
| Focus foundation | Global `:focus-visible` styling provides a 3px high-contrast outline and offset. |
| Button sizing | Action links have a 3rem minimum height and responsive wrapping. |
| Reduced-motion code path | `prefers-reduced-motion: reduce` disables smooth scrolling and minimizes animation/transition duration. |
| Photography crops | Local approved-source images render within defined 4:3 and 16:9 frames using `next/image`, responsive `sizes`, and `object-fit: cover`; page-hero backgrounds use capped cover crops. |
| Sitemap/robots | Both returned HTTP 200; the sitemap contains the published Home, Plan Your Visit, About, Beliefs, Pastor, Team, Next Steps, Messages, Church Online, and Contact routes. |

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
- Replaced the staged Leadership placeholder with a complete 16-person, source-ordered Team directory; normalized every portrait to a stable 7:10 card crop and collapsed its 3/4-column desktop grids safely through two columns to one.

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
- Live-channel availability behavior when YouTube has an active stream, a scheduled stream, and no stream; the external channel fallback remains available in every state.
- Production-host API restriction approval: add `https://livingmessagechurch.com/` to the Google key's allowed website referrers before the production hostname becomes authoritative.
- Admin keyboard behavior for local title/meta fields, category add/remove actions, and narrow-screen row composition.

## Validation commands

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run validate:redirects` | Passed |
| `npm run build -- --webpack` | Passed on Next.js 16.3.0 with the verified public YouTube feed available during generation; all 25 pages plus robots, sitemap, and API routes generated successfully |
| Our Team route smoke | Passed; `/about/leadership` returned 200 with 16 cards and 3 tiers, remained indexable, appeared in the sitemap, and `/the-team/` returned a direct 301 to it. |
| Current message-control refinement | `npm run lint` passed. The default Turbopack build reached TypeScript and then hit an environment-level internal port restriction; the webpack production path remains the validated build command. |
| Previous message milestone route smoke | Passed at that milestone; Home, Messages, Live, sitemap, and robots returned HTTP 200. The former Live no-index state is superseded by the Church Online milestone below. |
| Church Online milestone | `npm run lint`, `npm run validate:redirects`, and `npm run build` passed. `/online-church` is the canonical 200 route, renders the live player without `noindex`, appears in the sitemap, and `/messages/live` returns a direct 301. The duplicate embedded archive was removed in favor of the dedicated `/messages` page. Interactive visual QA remains pending because no browser connection was available. |
| Planning Center service schedule | The public projection is limited to the earliest future public Calendar record with an explicit online/Sunday/worship service title, formatted in Eastern time. The block degrades by omission. Current local and deployed diagnostics report Planning Center credentials as missing, so a live schedule record could not be rendered or verified. |
| YouTube live resolver | The empty-referrer 403 was reproduced and fixed. Authenticated `channels.list`, `playlistItems.list`, and `videos.list` requests passed; Live/Upcoming/Offline/stale-Upcoming selection fixtures passed; and the no-credentials failure path retained a playable latest-message iframe and fallback channel link. The default Turbopack build hit its environment-level worker-port `EPERM` after TypeScript; the webpack production fallback passed all 25 pages. `/online-church` revalidates every 60 seconds. |
| Existing automated tests | No test suite or test command is configured |
