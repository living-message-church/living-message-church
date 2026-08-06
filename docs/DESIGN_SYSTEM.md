# Living Message design system

Implementation date: 2026-08-05

Updated: 2026-08-06

## Direction

The foundation is editorial, welcoming, energetic, spacious, and church-appropriate. Oversized but controlled type, neutral-dominant surfaces, disciplined rhythm, and large media areas create energy without reproducing Motivation Church’s layout, assets, branding, fonts, or interaction code.

Photography is intentionally represented by local abstract media placeholders until Living Message-owned, consent-cleared originals are approved. The placeholders make required crop ratios and layout behavior testable without implying that unapproved legacy imagery may be reused. The church's existing production-site wordmark is approved for reuse and is the only legacy visual asset currently integrated.

## Tokens

Tokens live in `src/styles/globals.css`.

### Color

| Token | Value | Role |
| --- | --- | --- |
| `--color-paper` | `#F3F0E9` | Warm page surface |
| `--color-paper-bright` | `#FBFAF7` | Elevated cards and light text on dark fields |
| `--color-ink-deep` | `#080908` | High-contrast small text on mid-tone color fields |
| `--color-ink` | `#1D1D1B` | Primary text and immersive sections |
| `--color-ink-soft` | `#4D4C47` | Secondary copy |
| `--color-blue` | `#607D8B` | Approved muted blue-gray for brand fields, information accents, and light-surface focus |
| `--color-coral` | `#AD4F3B` | Primary actions and energetic accents |
| `--color-gold` | `#E5CF91` | Warm emphasis and dark-surface focus |
| `--color-sage` | `#E1E7DC` | Calm ministry and information surfaces |
| `--color-line` | 14% ink mix | Low-contrast structural borders |

The muted blue-gray is sampled from the approved visual reference supplied on 2026-08-06 and replaces the previous saturated cobalt (`#36538F`). Components may derive restrained darker or translucent variants with `color-mix()`, but must use `--color-blue` as their source rather than introducing a second blue.

Color combinations must retain WCAG AA text contrast. Blue is used for focus on light surfaces and gold on dark surfaces. Because the approved blue is a mid-tone, small text placed directly on blue uses deep ink; light text on blue is reserved for large display copy. Accent fields are restrained so warm paper and ink remain visually dominant.

### Typography

- Display: resilient local/system stack headed by Helvetica Neue; no remote font request.
- Body: accessible system sans stack.
- Fluid scale: `--step--1` through `--step-5` using `clamp()`.
- Display headings use controlled tight leading and tracking; body text keeps generous leading and a controlled reading measure.
- Components preserve one `h1` per page and hierarchical `h2`/`h3` levels.

### Spacing and layout

- `--space-1` through `--space-8` establish the rhythm.
- Section padding uses fluid `--space-7`; content clusters use smaller tokens.
- Wide container: `80rem`; reading container: `43rem`; responsive gutter uses `clamp()`.
- Main editorial grids collapse intentionally to one column below 48rem.

### Shape and imagery

- `--radius-image` provides a fluid `1.25rem`–`2rem` corner radius for photography, video, and photo-led cards.
- Standalone photography uses the image radius consistently. Photo-led cards retain matching upper corners so the image and card read as one composition.
- Full-bleed hero backgrounds remain edge-to-edge; logos, icons, and decorative marks do not inherit the photography radius.
- Non-media cards use a subtler radius, hairline border, and no persistent shadow to retain editorial clarity.
- Media crop ratios: landscape 4:3, portrait 4:5, wide 16:9.
- Approved photography should use focal-point-aware cropping and contextual alt text. Decorative imagery must use empty alt text; meaningful imagery must describe the content and purpose, not begin with “image of.”

## Interaction

- Buttons and primary action links are at least 48px high, exceeding the 44px minimum interaction target, with clear text and directional affordances.
- Every interactive element receives a visible 3px focus outline: blue on light surfaces and gold on dark surfaces.
- Hover feedback is limited to color, border, and background changes and never carries essential meaning.
- Mobile navigation uses native `details`/`summary` semantics and full-width tap targets.
- The skip link is the first focusable element and targets `#main-content`.

## Motion and reduced motion

Default transitions are short and limited to color, underline, shadow, and small vertical movement. Under `prefers-reduced-motion: reduce`, smooth scrolling is disabled and animation/transition duration is effectively removed. Essential content never depends on motion or scroll reveal.

The homepage hero video is decorative, muted, and non-interactive. It is instantiated only above 768px when reduced motion is not requested. Mobile and reduced-motion presentations use the approved static poster, preserving hierarchy without downloading autoplay video.

## Accessibility guardrails

- Semantic landmarks, labelled navigation regions, one page-level heading, descriptive link text, and focus visibility are required.
- Service facts remain text, not embedded in imagery.
- Forms must not be added until accessible validation, privacy, recipient, retention, and anti-abuse behavior are approved.
- Staged pages are deliberately useful and no-indexed; they do not expose internal verification notes.
