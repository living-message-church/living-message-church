# Living Message design system

Implementation date: 2026-08-05

## Direction

The foundation is editorial, welcoming, energetic, spacious, and church-appropriate. Oversized type, strong color fields, disciplined rhythm, and large media areas create energy without reproducing Motivation Church’s layout, assets, branding, fonts, or interaction code.

Photography is intentionally represented by local abstract media placeholders until Living Message-owned, consent-cleared originals are approved. The placeholders make required crop ratios and layout behavior testable without implying that unapproved legacy imagery may be reused.

## Tokens

Tokens live in `src/styles/globals.css`.

### Color

| Token | Role |
| --- | --- |
| `--color-paper`, `--color-paper-bright` | Warm page and card surfaces |
| `--color-ink`, `--color-ink-soft` | Primary text and immersive sections |
| `--color-cobalt` | Navigation/location accent and focus |
| `--color-coral` | Primary actions and energetic media treatment |
| `--color-gold` | Invitation/visitor emphasis |
| `--color-sage` | Calm ministry and information surfaces |
| `--color-line` | Low-contrast structural borders |

Color combinations must retain WCAG AA text contrast. Cobalt is used as the visible focus color; coral/gold surfaces use dark text.

### Typography

- Display: resilient local system stack headed by Arial Black/Helvetica Neue; no remote font request.
- Body: accessible system sans stack.
- Fluid scale: `--step--1` through `--step-5` using `clamp()`.
- Display headings use tight leading and tracking; body text keeps generous leading and a controlled reading measure.
- Components preserve one `h1` per page and hierarchical `h2`/`h3` levels.

### Spacing and layout

- `--space-1` through `--space-8` establish the rhythm.
- Section padding uses fluid `--space-8`; content clusters use smaller tokens.
- Wide container: `88rem`; reading container: `48rem`; responsive gutter uses `clamp()`.
- Main editorial grids collapse intentionally to one column below 48rem.

### Shape and imagery

- Cards are mostly square-edged to retain editorial clarity.
- Media crop ratios: landscape 4:3, portrait 4:5, wide 16:9.
- Approved photography should use focal-point-aware cropping and contextual alt text. Decorative imagery must use empty alt text; meaningful imagery must describe the content and purpose, not begin with “image of.”

## Interaction

- Buttons and action links are at least 52px high with clear text and directional affordances.
- Every interactive element receives a visible 3px cobalt focus outline.
- Hover movement is limited to small translations and never carries essential meaning.
- Mobile navigation uses native `details`/`summary` semantics and full-width tap targets.
- The skip link is the first focusable element and targets `#main-content`.

## Motion and reduced motion

Default transitions are short and limited to color, underline, shadow, and small vertical movement. Under `prefers-reduced-motion: reduce`, smooth scrolling is disabled and animation/transition duration is effectively removed. Essential content never depends on motion or scroll reveal.

## Accessibility guardrails

- Semantic landmarks, labelled navigation regions, one page-level heading, descriptive link text, and focus visibility are required.
- Service facts remain text, not embedded in imagery.
- Forms must not be added until accessible validation, privacy, recipient, retention, and anti-abuse behavior are approved.
- Staged pages are deliberately useful and no-indexed; they do not expose internal verification notes.
