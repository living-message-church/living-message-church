# Responsive design review

Review date: 2026-08-06

Scope: visual QA and responsive polish only. No routes, content architecture, data structures, dependencies, or page inventory were changed.

## Evidence and test limitation

The review covered the complete shared shell, all homepage sections, the priority-route template, the staged-route template, Messages and Events feed states, New Here, Contact, and both policy-page layouts. These templates account for every current public route.

The browser-control environment reported no connected browser after its required connection and recovery checks. Screenshots, computed layout boxes, real font rasterization, keyboard traversal, and pixel-level crop inspection were therefore unavailable. Each requested width was still assessed independently against the implemented CSS cascade, breakpoint conditions, intrinsic asset dimensions, grid calculations, content lengths, and semantic markup. Assertions requiring rendered pixels remain marked for manual verification rather than presented as passed.

## Route and template coverage

| Surface | Routes represented | Review focus |
| --- | --- | --- |
| Shared shell | Every route | Service bar, logo, desktop/mobile navigation, content width, footer, focus, touch targets |
| Homepage | `/` | Hero, editorial splits, media ratios, empty event/message states, ministry cards, outreach, invitation |
| Priority template | `/about`, `/about/beliefs`, `/about/leadership`, `/connect` and children, `/outreach`, `/give` | Page hero, sticky status rail, panel grid, staged action |
| Staged template | Staged message/event and supporting routes | Page hero, reading measure, empty states, actions |
| Visitor pages | `/plan-your-visit`, `/contact` | Facts, visit cards, address/contact wrapping, non-form contact state |
| Legal pages | `/privacy-policy`, `/photo-release` | Long-form measure, heading rhythm, paragraph readability |
| Feed pages | `/messages`, `/messages/live`, `/events` | Empty and populated card-grid rules, metadata wrapping |

## Observations by viewport

Status vocabulary:

- **Code-reviewed**: the CSS cascade and markup were deterministically inspected at this width.
- **Pending rendered verification**: the final visual judgment requires a connected browser.

### Desktop

| Width | Independent observations | Result after refinement |
| --- | --- | --- |
| 3840px | An expanding canvas made the site’s grid change character on 4K displays. | The content canvas remains capped at 78rem while reading copy stays at 42rem. The additional space becomes deliberate margin rather than looser internal composition. Code-reviewed; final optical scale is pending rendered verification. |
| 2560px | Ultra-wide overrides previously changed media and card proportions relative to standard desktop. | The same 78rem operating grid now applies, preserving alignment and section rhythm. Code-reviewed; pending rendered verification. |
| 1920px | Body copy was correctly bounded, but the canvas expanded independently. | Photography and copy remain within the fixed 78rem grid. Code-reviewed; pending rendered verification. |
| 1600px | The larger canvas step weakened continuity with 1440px layouts. | The full desktop navigation and content now share the same capped grid used at other desktop widths. Code-reviewed; pending rendered verification. |
| 1440px | The bounded canvas provides a strong desktop proportion. | The 78rem cap, balanced headings, and pretty-wrapped paragraphs preserve clarity. Code-reviewed; pending rendered verification. |
| 1280px | The fluid gutter protects the content canvas while the full navigation remains available. | Desktop navigation links retain 44px minimum targets without enlarging their visual typography. Code-reviewed; pending rendered verification. |

### Tablet

| Width | Independent observations | Result after refinement |
| --- | --- | --- |
| 1024px | The mobile menu correctly replaces the dense nine-item navigation. The hero remains two columns, but its previous display formula approached desktop scale inside a narrower copy column. | Tablet display scaling is reduced below 70rem. The hero retains a deliberate text/media relationship while avoiding desktop-sized type. Code-reviewed; pending rendered verification. |
| 834px | The previous two-column hero forced a long headline into a narrow column while the portrait placeholder stayed tall, creating excessive vertical weight. Other two-column feature layouts still have workable column widths. | The hero alone collapses below 56rem, uses a bounded 42rem media width, and switches its crop from 4:5 to 4:3. Other grids retain their existing structure until 48rem. Code-reviewed; pending rendered verification. |
| 768px | Existing 48rem rules correctly collapse primary content grids, route rails, cards, contact layout, and footer lead. Previous media minimum height overrode 16:9 and 4:3 ratios, and display text remained too close to desktop scale. | Media frames now preserve their declared ratio, display/page sizes receive mobile caps, contact and empty states are shorter, and the hero uses the landscape tablet crop. Code-reviewed; pending rendered verification. |

### Mobile

| Width | Independent observations | Result after refinement |
| --- | --- | --- |
| 430px | The one-column structure is appropriate. Two actions could fit inconsistently depending on label length, creating uneven rows. Footer text links had smaller-than-target hit areas. | Actions stack to consistent full-width controls; footer links gain 44px targets. Hero display type resolves to approximately 55px rather than the former minimum of 53px with a steeper growth curve. Code-reviewed; pending rendered verification. |
| 414px | Heading balance and long address wrapping are the primary risks. Fixed media minimum heights previously made wide imagery nearly square. | `text-wrap: pretty`, constrained reading measures, preserved aspect ratios, and full-width actions reduce widows, awkward crops, and control imbalance. Code-reviewed; pending rendered verification. |
| 390px | The logo/menu pairing fits the shared header. The hero fact card and long directions/contact values need predictable wrapping. | The wordmark remains 148px wide; the fact card is bounded by its container; contact/footer links can wrap safely within their columns. Code-reviewed; pending rendered verification. |
| 375px | The former display minimum produced a visually heavy multi-line hero and page heroes. Empty feed/contact panels consumed too much of the initial viewport. | Mobile display and page scales are capped, empty feed state minimum height drops to 16rem, and the contact placeholder drops to 18rem. Code-reviewed; pending rendered verification. |
| 360px | The default gutter leaves sufficient room for the logo and menu. Very long labels and side-by-side controls remained the main overflow risk. | Controls stack, media ratios remain intact, and removal of the secondary service bar reduces first-viewport density. Code-reviewed; pending rendered verification. |
| 320px | The former 52.8px minimum display size created excessive wrapping, the media minimum height distorted crops, and paired buttons could feel cramped. Header composition had only a small reserve. | Display type now resolves to 44.8px, actions stack, the logo reduces to 140px, the gutter reduces to 14px, hero visual inset tightens, and the fact card cannot exceed its containing block. Code-reviewed; pending rendered verification. |

## Issues found and changes made

| Area | Issue | Change |
| --- | --- | --- |
| Ultra-wide layout | Expanding canvas steps weakened alignment consistency and made sections feel independently composed. | Standardized every desktop width on one 78rem canvas while keeping reading copy fixed at 42rem. |
| Tablet hero | The long hero headline and portrait media competed inside a narrow two-column grid at 834px. | Collapsed only the hero below 56rem and bounded its media width. |
| Mobile typography | The display scale had a 3.3rem minimum, too heavy for 320–430px headlines. | Added mobile display and page-heading caps without changing component semantics or content. |
| Image treatment | `min-height: 18rem` overrode 16:9 and 4:3 aspect ratios on narrow screens. | Removed the fixed minimum so declared crop ratios govern layout. |
| Hero crop | A 4:5 hero crop became excessively tall after the hero collapsed. | Applied a 4:3 crop to the existing hero media frame below 56rem. |
| Buttons | Multiple actions could form inconsistent partial rows on narrow screens. | Stacked non-text actions at 512px and below while preserving 48px control height. |
| Touch targets | Desktop navigation and mobile footer links relied on text line height rather than a 44px target. | Added 44px minimum interactive heights without increasing visual font size. |
| Vertical balance | Contact and feed placeholder panels were disproportionately tall on small screens. | Reduced only their mobile minimum heights. |
| Widows | Paragraphs could end with a single short word despite bounded measures. | Added progressive `text-wrap: pretty`; headings retain `text-wrap: balance`. |
| 320px containment | The hero fact card and default gutter left minimal tolerance. | Bounded the card, reduced the smallest gutter, and slightly reduced the logo/inset. |
| Image performance | The header logo used the deprecated Next.js 16 `priority` prop. | Replaced it with `preload`; the current vector master has explicit 288×92 intrinsic dimensions to prevent layout shift. |

## Typography and readability

- Display type remains intentionally oversized on desktop but is capped rather than scaling indefinitely on 4K.
- The homepage display heading retains an 11-character measure; page headings retain 14 characters; section headings retain 17 characters.
- Body copy remains capped through 34–43 character/reading measures depending on context.
- Headings use balanced wrapping and paragraphs use pretty wrapping as progressive enhancements. Exact line breaks depend on the local system font and require rendered confirmation.
- No content text or heading hierarchy was changed.

## Photography and cropping

- Current media surfaces are consent-safe placeholders, not approved photography.
- Landscape, portrait, and wide ratios now remain deterministic at narrow widths.
- The hero uses a landscape crop when stacked so future photography does not dominate the entire mobile/tablet viewport.
- Actual focal points, faces, subject-safe crops, alt text, and responsive source sizes remain pending until approved photography exists.

## Navigation, controls, and forms

- Desktop navigation remains available from above 70rem; the native `details` mobile menu is used at and below that threshold.
- Desktop navigation, mobile summary, mobile menu links, buttons, and mobile footer links meet or exceed a 44px target in code.
- At 512px and below, primary/secondary action pairs stack to avoid cramped partial rows.
- There are no live forms in the application. The Contact route deliberately presents an email fallback, so field layout, validation, error messaging, and mobile keyboard behavior are not applicable in this milestone.

## Accessibility, motion, and performance

- Semantic landmarks, one page-level heading, skip link, native mobile disclosure, `aria-current`, visible focus states, and reduced-motion overrides remain intact.
- No animation was added. Existing transitions are limited to short color/border changes and are effectively removed under `prefers-reduced-motion: reduce`.
- The approved user-supplied logo is now a local SVG with a 288 × 91.19 viewBox and Next.js image handling, providing resolution-independent rendering from 320px mobile screens through 4K/high-density displays.
- No new dependency, remote font, script, image payload, or runtime integration was added.

## Screenshots

No screenshots are available because no browser was connected to the test environment. This is an environment limitation, not a passing visual result. Screenshot capture remains required for representative 3840, 1920, 1440, 1024, 834, 768, 430, 390, 375, 360, and 320px compositions once browser access is available.

## Validation results

| Check | Result |
| --- | --- |
| `npm run lint` | Passed with no ESLint errors or warnings. |
| `npm run build` | Passed; TypeScript and the optimized Next.js 16.3.0 production build completed successfully, generating 22 pages plus dynamic support routes. |
| Local HTTP smoke check | Passed; all 22 checked public routes, including robots and sitemap, returned HTTP 200. |
| Diff whitespace validation | Passed. |

## Remaining recommendations

1. Run a connected-browser screenshot pass using the exact viewport matrix and compare full-page captures side by side.
2. Confirm headline line breaks, widows, and optical balance using the actual OS font rasterization on macOS, Windows, iOS, and Android.
3. Verify the mobile menu through keyboard and touch, including focus indication, disclosure announcement, outside-click expectations, and navigation after opening.
4. Test 200% browser zoom and large-text settings for reflow without horizontal scrolling.
5. Obtain an approved vector or higher-resolution church wordmark for high-density and 4K displays.
6. Repeat crop QA after approved Living Message photography replaces the placeholders; define focal positions per asset rather than relying on centered crops.
7. Measure Core Web Vitals against the deployed development site after real photography is integrated.
