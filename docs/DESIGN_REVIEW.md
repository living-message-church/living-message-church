# Design system review

Review date: 2026-08-06

Scope: presentation only; no routes, content models, data structures, or application features

## Review method and limitation

The review compares the current project tokens, CSS, components, and rendered HTML structure with the current public homepage structure of Motivation Church, Vercel, Stripe, Linear, Framer, Raycast, Apple, and Notion. Their public pages were inspected only for high-level design principles. No source, copy, assets, component code, or exact layout was reused.

No interactive browser was connected in the review environment. Consequently, conclusions about the current implementation are grounded in its actual CSS/component code and prior HTTP rendering checks rather than fresh screenshots. Final pixel-level visual QA remains necessary in a connected browser.

## Shared premium-design principles

The references are visually different, but repeatedly use the same underlying discipline:

1. **One dominant idea per viewport.** Apple and Motivation give a section one emotional job. Vercel and Linear give a section one product argument. Secondary elements support rather than compete.
2. **Large type with controlled measure.** Headlines are large because they are short, not because every heading is oversized. Body copy stays narrow and readable.
3. **Whitespace as hierarchy.** Space separates ideas and improves comprehension; it is not uniform emptiness around every component.
4. **A restrained palette.** Neutral surfaces dominate. Accent colors establish priority, state, or warmth instead of alternating equally loud full-width bands.
5. **Quiet precision.** Borders, shadows, radii, and motion are subtle and consistent. Premium polish comes from alignment, rhythm, and restraint.
6. **Media carries emotion.** Motivation and Apple let photography/product imagery provide atmosphere while text stays concise. Decorative UI does not compete with the image.
7. **Clear action hierarchy.** One primary action is unmistakable; secondary actions are quieter. Controls do not all look equally important.
8. **Responsive recomposition.** Mobile layouts change emphasis and order, not merely column count.
9. **Friendly clarity.** Notion and Motivation use plain language and approachable rhythm. Vercel/Linear precision is useful, but an institutional or software-product tone would be wrong for a church.

## Reference interpretation

| Reference | Transferable principle | What not to import |
| --- | --- | --- |
| Motivation Church | Visitor-first storytelling, authentic people photography, inviting editorial scale, repeated practical invitation | Copy, photography, branding, exact section order, artwork, layouts, Webflow behavior |
| Apple | One idea per section, disciplined copy, generous visual silence, media-led storytelling | Product-launch theatricality, exact typography, cinematic effects |
| Vercel | Grid precision, monochrome confidence, strong type hierarchy, crisp interaction states | Developer aesthetic, stark corporate tone, grid motifs as decoration |
| Stripe | Layered storytelling, clear action hierarchy, complex information made scannable | Dense product diagrams, gradients as spectacle, enterprise tone |
| Linear | Restrained palette, compact navigation, subtle borders/motion, unusually consistent spacing | Dark SaaS mood, product-dashboard language, excessively cool tone |
| Framer | Editorial compositions, modular visual rhythm, polished responsive art direction | Trend-driven effects, template-gallery energy, decorative motion |
| Raycast | Strong voice, bold but contained headings, confident feature pacing | Tech-product futurism, glowing effects, software iconography |
| Notion | Warm simplicity, approachable language, readable layouts, low-friction hierarchy | Product illustrations, workspace metaphors, generic productivity tone |

## Current-system assessment

### Typography hierarchy

**Current:** The fluid scale runs to `10rem`, display headings use an `Arial Black`-first stack, heading tracking reaches `-0.055em`, and many utility/control labels are uppercase with wide tracking.

**Finding:** The hierarchy is clear but too forceful. Display, page, and section headings all demand attention. The weight and tracking can feel promotional or poster-like rather than warm and editorial.

**Recommendation:** Keep a large hero, but lower the ceiling, use a neutral system display stack, reduce compression, and create more separation between display, page, section, and card levels.

### Heading scale and wrapping

**Current:** Hero display can reach `10rem`; page headings reach `6.8rem`; section headings can reach `3.45rem`.

**Finding:** The top two levels are too large for the amount of content and current lack of photography. They risk awkward two-word lines and make interior pages feel louder than their content warrants.

**Recommendation:** Cap hero display near `7.5–8rem`, page headings near `5–5.5rem`, and section headings near `3rem`. Preserve short balanced headings and use tighter width limits deliberately.

### Line length

**Current:** Lead text is capped by width, but general paragraphs and several cards rely on container/grid dimensions rather than a consistent reading measure.

**Finding:** Main copy can become visually diffuse in wide sections. Some card copy becomes dense next to oversized titles.

**Recommendation:** Establish explicit body measures around `62–68ch`, lead measures around `36–42ch`, and card measures around `30–36ch`.

### Whitespace and vertical rhythm

**Current:** Section padding can reach `11rem`; page heroes reach `10rem`; large gaps recur across most layouts.

**Finding:** The system is spacious, but uniform maximal spacing can feel empty rather than intentional—particularly while photography and verified content are unavailable.

**Recommendation:** Reduce the global section maximum and create three purposeful section densities: compact utility, standard editorial, and immersive hero/media.

### Grid and containers

**Current:** The wide container reaches `88rem`; grids use several bespoke fractions and gap sizes.

**Finding:** The layouts are responsive, but the very wide canvas and varied grid ratios weaken alignment continuity. This can feel like a sequence of independent templates.

**Recommendation:** Reduce the main container to approximately `80rem`, narrow reading content, standardize two-column proportions, and use consistent gaps.

### Section transitions

**Current:** Full-width ink, gold, sage, and paper bands alternate; every adjacent section receives a decorative top rule.

**Finding:** Too many transitions announce themselves. The page can feel busy and modular instead of narratively continuous.

**Recommendation:** Let warm neutral surfaces dominate, reserve ink for hero/final invitation/media moments, tint gold and sage substantially, and remove automatic section rules.

### Photography treatment

**Current:** No approved photography exists. Abstract placeholders use saturated color, circles, a large `LM` mark, and visible placeholder labels.

**Finding:** The placeholder treatment is useful operationally but visually competes like finished campaign artwork. This makes the site feel more branded/corporate and less authentic.

**Recommendation:** Make placeholders quieter and more photographic in proportion: subtle tonal fields, a minimal crop label, no oversized monogram. When approved photography arrives, images should carry the emotion with consistent 4:5, 4:3, and 16:9 crops.

### Card design

**Current:** Cards combine borders, shadows, corner graphics, saturated media, hover lift, indices, large headings, and action arrows.

**Finding:** Too many signals compete. Cards feel designed as objects rather than calm gateways to people, ministries, messages, or events.

**Recommendation:** Remove corner decoration and hover lift; use a subtle hairline, small radius, restrained surface change, consistent padding, and image-first hierarchy.

### Buttons and links

**Current:** Controls are uppercase, widely tracked, bordered at 2px, at least 52px tall, and often include generous internal space plus arrows.

**Finding:** Accessibility is strong, but controls can feel heavy and SaaS-like. Primary and secondary buttons have similar visual mass.

**Recommendation:** Keep large tap targets while using sentence case, lighter tracking, a compact 48–50px visual height, rounded corners, solid primary treatment, quiet secondary border, and unboxed text links.

### Color system

**Current:** Cobalt, coral, gold, and sage are saturated and all receive prominent full-width usage.

**Finding:** The palette is energetic but lacks priority. It can feel youthful in a campaign sense rather than youthful through confidence and authenticity.

**Recommendation:** Warm the neutrals, mute all accents, assign coral as primary action, cobalt as focus/information, gold as small warmth accent, and sage as a pale background—not equal protagonists.

### Navigation

**Current:** The service bar is bright cobalt, header height is `6.3rem`, desktop navigation is uppercase, and the wordmark includes a strong black square.

**Finding:** Clear but visually heavy. The combined bar/header consumes considerable initial viewport height and leans institutional/SaaS.

**Recommendation:** Darken and quiet the service bar, reduce header height, soften the monogram, use sentence-case navigation, and retain current-page/focus clarity.

### Motion

**Current:** Hover lifts, underline scaling, and button translation appear across repeated components.

**Finding:** Motion is restrained in duration but repeated in type. Translation on every card/button adds unnecessary activity.

**Recommendation:** Prefer color, border, and underline transitions. Reserve movement for one or two high-value media interactions. Continue honoring reduced motion.

### Responsive behavior

**Current:** Grids collapse at 70rem and 48rem; mobile generally becomes one column; the native details menu is accessible by construction.

**Finding:** The foundation is sound, but very large headings, hero padding, placeholder labels, and footer density may still feel oversized on small screens.

**Recommendation:** Lower mobile type maxima, tighten section padding and gaps, ensure CTAs become full-width only when useful, and retain intentional ordering.

### Accessibility

**Current:** Visible focus, skip link, semantic sections, reduced motion, minimum action height, and native mobile disclosure are strong.

**Finding:** Accessibility should be preserved. Refinement must not create lower contrast, smaller touch targets, or focus states dependent only on color.

**Recommendation:** Keep the 3px focus treatment, semantic hierarchy, minimum 44px targets, and reduced-motion override. Validate muted colors against WCAG AA.

## Where the current implementation feels off

| Diagnosis | Evidence | Design response |
| --- | --- | --- |
| Too large | 10rem display ceiling, 11rem section padding, 10rem page heroes | Reduce global scale and introduce density levels |
| Too busy | Four full-strength accent colors, automatic section rules, card corner graphics, repeated hover lifts | Neutral-dominant palette; remove ornamental signals |
| Too heavy | Arial Black, extreme negative tracking, uppercase controls, 2px button borders | Neutral display stack, lighter tracking, sentence-case controls |
| Too empty | Maximum whitespace around placeholder or verification-gated content | Use purposeful standard spacing; save immersive spacing for photography |
| Too corporate | Monogram blocks, branded placeholder art, uppercase nav/control language | Softer wordmark, quiet placeholders, human sentence case |
| Too generic | Generic card shells and identical section bands | Stronger editorial sequencing and image-led crop contracts |
| Too church-template | Alternating promotional color bands and repeated “big statement + cards + CTA” rhythm | Calmer narrative continuity, fewer promotional devices |
| Insufficient church friendliness | Precision outweighs warmth in ink/cobalt/uppercase treatment | Warmer neutrals, coral warmth, approachable type and controls |
| Youth appeal at risk | Saturation reads as “youth branding” rather than authentic culture | Let real future photography and confident restraint create relevance |
| SaaS polish over-applied | Grid, cards, monograms, indices, and arrows all visible simultaneously | Retain alignment precision; remove product-interface ornament |

## Target visual language

The right balance is:

- Apple-like confidence in what is omitted;
- Vercel/Linear-like alignment and consistency;
- Notion-like approachability;
- Motivation-like visitor empathy and people-centered storytelling;
- Living Message’s own warm, local, church-family identity.

The site should not look like software wearing church copy. It should feel like a confident editorial welcome built with software-level care.
