# Component library

Updated: 2026-08-06

The component library is project-native React and CSS/Tailwind infrastructure. No UI library or new dependency was installed.

## Shell and global components

| Component | Location | Responsibility |
| --- | --- | --- |
| `SiteShell` | `src/components/shell/site-shell.tsx` | Skip link, service bar, header, main landmark, footer |
| `ServiceBar` | `src/components/shell/service-bar.tsx` | Current observed Sunday times and location gateway |
| `SiteHeader` | `src/components/shell/site-header.tsx` | Wordmark, responsive primary navigation, current-page state |
| `SiteFooter` | `src/components/shell/site-footer.tsx` | Visit facts, grouped routes, contact, social and legal links |
| `SiteHead` | `src/components/seo/site-head.tsx` | Title, description, canonical, Open Graph, Twitter, robots, JSON-LD |

## Primitives

| Component | Responsibility |
| --- | --- |
| `Container` | Wide/reading content widths and responsive gutters |
| `Section` | Semantic section, tone, spacing, and labelled-by connection |
| `Eyebrow` | Compact editorial context label |
| `Heading` | Typed heading level and display scale |
| `ActionLink`, `ActionGroup` | Internal/external calls to action with consistent states |
| `Card` | Neutral semantic article surface |
| `MediaFrame` | Local abstract fallback or responsive approved photography frame |

## Page components

- `PageHero` provides consistent interior-page hierarchy.
- `StagedPage` gives intentionally staged sitemap destinations useful content and `noindex` metadata.
- `PriorityPage` provides a production-quality editorial structure for verification-gated About, Connect, Outreach, and Give routes without leaking unresolved facts.

## Integration components

| Component | Responsibility |
| --- | --- |
| `YouTubeEmbed` | Privacy-enhanced, responsive YouTube player for an approved normalized message record |
| `MessageLibrary` | Featured player, category chips, keyword search, cards, and empty state for normalized message records |
| `MessageArchive` | Compact normalized-message collection or a truthful unavailable-source state, retained for `/messages/live` |
| `MessageAdminPrototype` | Non-persistent title/meta/category management preview; upload and save controls remain disabled pending Supabase/auth |
| `EventCollection` | Renders normalized event records or a truthful unavailable-source state; historical events are excluded |
| `messageSource` adapter | Provider-neutral message boundary; currently returns approved-temporary local records sourced from the production sermon page |
| `eventSource` adapter | Provider-neutral event boundary; currently unconfigured because the authoritative event source is not verified |

## Homepage sections

- `Hero`
- `IdentityStatement`
- `VisitEditorial`
- `LatestMessage`
- `UpcomingEvents`
- `MinistryGrid`
- `OutreachFeature`
- `SundayInvitation`

Every section reads church content from `src/content/`; components contain layout and rendering logic rather than church records.

`Hero` includes a decorative, muted background-video renderer that is hydration-gated by motion and viewport preferences. Mobile widths and `prefers-reduced-motion: reduce` receive the approved static poster without instantiating the video element.

## Extension rules

1. Add or revise content in `src/content/` and its model in `src/types/content.ts` before placing church facts in a component.
2. Reuse tokenized color, typography, spacing, and focus behavior from `globals.css`.
3. Prefer semantic native elements. Add a headless component dependency only when a demonstrated complex interaction cannot be implemented accessibly and maintainably without it.
4. Add approved images through a typed `ContentImage` record with meaningful alt text, rights/approval status, and intended crop.
5. Do not turn staged empty states into fabricated messages or events.
6. Keep provider response formats inside `src/lib/*` adapters; presentation components consume normalized typed records.
7. Use `next/image` with explicit dimensions or `fill` plus a sized parent when approved photography replaces `MediaFrame` placeholders.
