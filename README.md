# Living Message Church

Next.js 16.3 website foundation for Living Message Church in Clermont, Florida.

The current production website remains the source for church information. The audit and planning documents in [`docs/`](./docs) are the project source of truth. Values that still require approval are tracked in [`docs/CONTENT_VERIFICATION.md`](./docs/CONTENT_VERIFICATION.md) and represented with verification metadata in `src/content/`.

## Current implementation

- Pages Router with TypeScript and Tailwind CSS 4
- Typed local content under `src/content/` and `src/types/`
- Project-native responsive design system and shared site shell
- Foundation routes for Home, New Here, Contact, Privacy Policy, and Photo Release
- Production-quality no-index route structures for About, beliefs, leadership, Connect and its child routes, Outreach, Give, Live, and Events
- Provider-neutral message and event adapters; messages use the verified canonical YouTube feed with an approved local failure fallback, while events retain a safe unavailable-source fallback
- Hourly revalidated canonical YouTube livestream feed powering the latest homepage player and searchable/category-filtered `/messages` library, plus a non-persistent no-index `/admin/messages` interface prototype
- Official Supabase client foundation with browser/server helpers and a no-index `/admin/platform` health page; database, authentication, and forms remain deferred
- 453 legacy 301 redirects generated from `docs/old-site-inventory.json`
- Metadata, canonical, Open Graph/Twitter, Organization JSON-LD, sitemap, and robots foundations
- No WordPress, database tables, authentication, or live forms

## Commands

```bash
npm run dev
npm run lint
npm run validate:redirects
npm run build
npm run start
```

Open <http://localhost:3000> during local development.

## Content rules

- Components must not hard-code church facts that belong in `src/content/`.
- Do not change `needs-verification` values to `verified` without named owner approval recorded in `docs/CONTENT_VERIFICATION.md`.
- Do not infer upcoming events from historical WordPress records.
- Keep verification-gated routes no-indexed until their content is materially complete.
- Do not connect forms, giving, registrations, newsletters, or media accounts until ownership and data handling are approved.
- Do not reuse Motivation Church assets, implementation, branding, copy, or exact layouts.
- Add photographs only with documented ownership/consent, descriptive alt text, and approved crops.

## Architecture

The current Pages Router is retained for this milestone to minimize migration risk. Shared UI is mounted in `_app.tsx`; page metadata uses the installed Pages Router `next/head` API. Redirects are read from the audited JSON inventory in `next.config.ts`. The validator independently checks the Markdown ledger, JSON inventory, and statically discoverable page destinations.

See:

- [`docs/FUTURE_ARCHITECTURE.md`](./docs/FUTURE_ARCHITECTURE.md)
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md)
- [`docs/COMPONENT_LIBRARY.md`](./docs/COMPONENT_LIBRARY.md)
- [`docs/IMPLEMENTATION_STATUS.md`](./docs/IMPLEMENTATION_STATUS.md)
- [`docs/VERIFICATION_CHANGELOG.md`](./docs/VERIFICATION_CHANGELOG.md)
- [`docs/ASSET_REGISTER.md`](./docs/ASSET_REGISTER.md)
- [`docs/QA_REPORT.md`](./docs/QA_REPORT.md)
- [`docs/MESSAGES_ARCHITECTURE.md`](./docs/MESSAGES_ARCHITECTURE.md)
- [`docs/PLATFORM_FOUNDATION.md`](./docs/PLATFORM_FOUNDATION.md)
