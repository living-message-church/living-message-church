# Visual refinement plan

Plan date: 2026-08-06

Scope: presentation-only refinement of the existing foundation

## Guardrails

- No route, page, content model, typed data, adapter, or redirect changes.
- No new content, photography, provider, form, or dependency.
- No reference-site assets, code, copy, exact layout, font choices, or distinctive artwork.
- Preserve semantic HTML, focus visibility, reduced motion, and minimum touch-target sizes.
- Reduce visual noise before adding any new visual device.

## Approved implementation scope

### 1. Rebalance typography

- Replace the `Arial Black`-first display stack with a neutral local/system sans stack.
- Reduce display, page, and section maxima while preserving a clearly oversized hero.
- Relax extreme negative tracking and normalize card heading weight.
- Define consistent lead, body, and card copy measures.

### 2. Tighten spatial rhythm

- Reduce the global section maximum from the current immersive setting.
- Reduce page-hero and header height.
- Normalize editorial gaps and card padding.
- Keep the home hero immersive, but avoid using hero-scale space everywhere.

### 3. Calm the palette

- Warm paper/ink neutrals.
- Mute cobalt, coral, gold, and sage.
- Treat gold and sage sections as pale tints.
- Reserve coral for the primary action and cobalt for focus/information.

### 4. Simplify transitions and surfaces

- Remove automatic top rules between every section.
- Remove card corner graphics and persistent drop shadows.
- Replace hover translation with subtle border/background changes.
- Remove oversized decorative page-hero circle.

### 5. Refine navigation and actions

- Quiet the service bar and shorten the header.
- Use sentence-case nav and action labels visually.
- Soften the monogram and current-page underline.
- Differentiate solid primary, quiet secondary, and text actions more clearly.

### 6. Demote placeholders

- Remove the oversized `LM` treatment from abstract media frames.
- Use lower-saturation tonal fields and a small operational label.
- Preserve current crop ratios and accessible names for eventual photography replacement.

### 7. Improve responsive composition

- Reduce mobile display sizes and section padding.
- Tighten hero/fact-card relationship on small screens.
- Keep cards and route panels single-column with calmer internal rhythm.
- Prevent long controls and labels from forcing horizontal overflow.

### 8. Preserve accessibility

- Retain the 3px visible focus outline and minimum 44px interaction targets.
- Verify all new token pairings for readable contrast.
- Retain `prefers-reduced-motion` behavior.
- Do not encode hierarchy through color alone.

### 9. Restore the approved church wordmark

- Reuse the existing Living Message Church wordmark from the current production site, as explicitly approved by the project owner.
- Store one local, descriptively named copy under `public/images/brand/` and render it with Next.js image handling.
- Use the wordmark in the shared header and footer without changing navigation, routing, or site identity data.
- Record its source and approval status in the asset register.

## Files allowed to change

- `src/styles/globals.css`
- Existing presentational components only where markup is purely decorative (`MediaFrame`, wordmark/menu visual wrappers if necessary)
- `public/images/brand/living-message-church-logo.png`
- `docs/DESIGN_REVIEW.md`
- `docs/VISUAL_REFINEMENT_PLAN.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/IMPLEMENTATION_STATUS.md`
- `docs/ASSET_REGISTER.md`

## Explicitly deferred

- Photography selection and art direction using real assets
- New fonts or font dependencies
- New animation libraries or scroll effects
- Component-library changes
- Content edits, new pages, route changes, and integration work
- Visual changes that require unverified church facts

## Acceptance criteria

- Hero remains confident but no longer overwhelms the viewport.
- Interior pages feel editorial rather than promotional.
- Neutral space dominates; accent colors have clear roles.
- Cards read as content gateways, not software widgets.
- Primary action is obvious; secondary actions are visibly quieter.
- Navigation consumes less vertical space and feels more approachable.
- No new dependency, route, content-model, or data change.
- `npm run lint` and `npm run build` pass.
