# Living Message design system

Implementation date: 2026-08-05

Updated: 2026-08-06

## Direction

The system is confident, minimal, warm, and photography-led. White is the dominant design material. Hierarchy comes from content order, type scale, image crop, and space—not ornamental rules, floating graphics, alternating color bands, or section-specific effects. Every public section uses the same bounded grid and spacing vocabulary so the site reads as one brand rather than a collection of designed moments.

Living Message-owned photography supplies the emotional energy. The approximate page-level balance is 80% white and 20% dark. Dark fields are reserved for photographic page heroes and the final homepage invitation; blue, coral, gold, and sage operate as restrained accents rather than section backgrounds. Interface surfaces remain quiet enough to disappear behind the story.

## Tokens

Tokens live in `src/styles/globals.css`.

### Color

| Token | Value | Role |
| --- | --- | --- |
| `--color-paper` | `#F7F5F0` | Warm fallback and small supporting surface |
| `--color-paper-bright` | `#FFFFFF` | Dominant page field and light text on dark fields |
| `--color-ink-deep` | `#0C0C0B` | Highest-contrast text and media fallback |
| `--color-ink` | `#141412` | Primary typography and immersive sections |
| `--color-ink-soft` | `#5B5953` | Secondary copy |
| `--color-blue` | `#6E838C` | Restrained blue-gray accent and light-surface focus |
| `--color-coral` | `#A34F3C` | Select action and editorial accent |
| `--color-gold` | `#E8DCC2` | Warm dark-surface focus and supporting tint |
| `--color-sage` | `#F0F1ED` | Rare supporting tint, not a section field |
| `--color-line` | 9% ink mix | Near-invisible structural rule |

The muted blue-gray remains the sole blue source, but no longer carries large content sections. Components may derive restrained darker or translucent variants with `color-mix()`, but must not introduce a second blue.

Color combinations must retain WCAG AA text contrast. Blue is used for focus on light surfaces and gold on dark surfaces. Because the approved blue is a mid-tone, small text placed directly on blue uses deep ink; light text on blue is reserved for large display copy. Accent fields are restrained so warm paper and ink remain visually dominant.

### Typography

- Primary display and body: locally self-hosted Inter variable (`400`–`800`) for clarity, discipline, and consistent metrics.
- Emotional display moments: locally self-hosted Instrument Serif regular and italic. It is limited to selected phrases and narrative headings; it is never the default heading face.
- Font binaries and OFL licenses are stored in `public/fonts/`; the site makes no third-party font request.
- Fluid scale: `--step--1` through `--step-5` using `clamp()`.
- Display headings use controlled tight leading and tracking; only the homepage hero receives the largest display treatment.
- Section headings use the shared scale without one-off enlargement unless the section has a documented narrative role.
- Body text keeps generous leading and a controlled reading measure.
- Components preserve one `h1` per page and hierarchical `h2`/`h3` levels.

### Spacing and layout

- `--space-1` through `--space-8` establish the rhythm.
- Section padding uses fluid `--space-8` (approximately `7rem`–`13rem`); content clusters use smaller tokens.
- Semantic containers separate reading (`48rem`), content (`64rem`), standard (`80rem`), editorial (`90rem`), hero (`96rem`), and full-bleed (`100%`) canvases.
- Every bounded container uses the same fluid gutter and centers within its own intentional maximum. Ultra-wide screens give photography-led sections more presence without widening prose.
- Shared two-column compositions use a fluid gap bounded by the existing spacing rhythm.
- Header and footer use the editorial canvas; the homepage hero and final invitation use the hero canvas; homepage image-led sections use the editorial canvas; ordinary interior pages default to standard.
- Main editorial grids collapse intentionally to one column below 48rem.

### Shape and imagery

- `--radius-image` provides a restrained fluid corner radius capped near `1.35rem` for photography, video, and photo-led cards.
- Standalone photography uses the image radius consistently. Photo-led cards retain matching upper corners so the image and card read as one composition.
- Full-bleed hero backgrounds remain edge-to-edge; logos, icons, and decorative marks do not inherit the photography radius.
- Public content cards are ordinarily transparent and borderless. Photography and spacing establish their edges; shadows are omitted. Form and administrative surfaces may retain quiet boundaries where interaction requires them.
- Media crop ratios: landscape 4:3, portrait 4:5, wide 16:9.
- Approved photography should use focal-point-aware cropping and contextual alt text. Decorative imagery must use empty alt text; meaningful imagery must describe the content and purpose, not begin with “image of.”

## Interaction

- Buttons and primary action links are at least 48px high, exceeding the 44px minimum interaction target, with clear text and directional affordances.
- Every interactive element receives a visible 3px focus outline: blue on light surfaces and gold on dark surfaces.
- Hover feedback is limited to color, border, and background changes and never carries essential meaning.
- Mobile navigation uses native `details`/`summary` semantics and full-width tap targets.
- The skip link is the first focusable element and targets `#main-content`.

## Motion and reduced motion

Default transitions are short and limited to color, border, and underline changes. Decorative floating, orbiting, and image-drift motion is not part of the shared system. Under `prefers-reduced-motion: reduce`, smooth scrolling is disabled and animation/transition duration is effectively removed. Essential content never depends on motion or scroll reveal.

The homepage hero video is decorative, muted, and non-interactive. It is instantiated only above 768px when reduced motion is not requested. Mobile and reduced-motion presentations use the approved static poster, preserving hierarchy without downloading autoplay video.

## Accessibility guardrails

- Semantic landmarks, labelled navigation regions, one page-level heading, descriptive link text, and focus visibility are required.
- Service facts remain text, not embedded in imagery.
- Forms must not be added until accessible validation, privacy, recipient, retention, and anti-abuse behavior are approved.
- Staged pages are deliberately useful and no-indexed; they do not expose internal verification notes.
