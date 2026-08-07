# Proposed sitemap

Audit date: 2026-08-05

The primary navigation should remain concise: **New Here, About, Connect, Messages, Events, Outreach, Give, Contact**. Home is reached through the logo. “Plan Your Visit” is the persistent primary CTA.

```text
/
├── plan-your-visit
├── about-living-message-church-clermont
├── about
│   ├── beliefs
│   ├── pastor
│   ├── leadership
│   └── gallery (only if a curated, consent-cleared gallery is approved)
├── connect
│   ├── kids
│   ├── youth
│   ├── young-adults
│   ├── groups
│   └── next-steps
├── messages
│   ├── live
│   └── [slug]
├── events
│   └── [slug]
├── outreach
├── give
├── contact
├── privacy-policy
└── photo-release
```

## Top-level pages

| Page | Primary user need | Core content |
| --- | --- | --- |
| Home | “Is this church for me, and when/where can I come?” | Welcome, current times/location, identity, Plan a Visit, latest message, upcoming events, ministry gateways, outreach, Sunday invitation. |
| New Here | “What will happen on my first visit?” | Times/address/directions, parking/entrance/accessibility, kids check-in/safety, worship/teaching/service length, pastors, attire, FAQs, optional visit form. |
| About | “Who are you and what shapes this church?” | Mission/values, family philosophy, story/history/name origin, teaching emphasis, gateways to beliefs and leadership. |
| Connect | “Where do I belong or serve?” | Ministry/group cards, serving/Next Steps path, active signup links. |
| Messages | “What do you teach?” | Featured latest message, search/filter archive, structured sermon metadata, live-service link. |
| Events | “What is happening next?” | Current event cards, date/time/location/audience/registration; no expired recurrence dump. |
| Outreach | “How does the church serve the community/world?” | Find, Feed & Restore, volunteer/donate links, approved missions/partners. |
| Give | “How and why can I give safely?” | Approved stewardship copy, giving methods, Church Center handoff, help/receipt contact. |
| Contact | “How can I reach or find you?” | Verified phone/email/address/map, general contact, prayer/care routing if approved, response expectations. |

## Child-page justification

- **Beliefs** is long, doctrinal, and important enough to remain separate from the narrative About page.
- **Leadership** combines pastor biography and the 16-person public team roster without overloading About.
- **Gallery** is justified by two existing gallery pages, but only if image consent, relevance, and alt text can be resolved.
- **Kids, Youth, Young Adults, Groups** reflect ministries repeatedly evidenced in current/legacy content; they should launch only with verified owners and useful details.
- **Next Steps** has a distinct class/registration action and deserves a stable route.
- **Messages Live** separates the scheduled livestream from the on-demand archive.
- **Dynamic message/event details** provide stable sharing/SEO routes from structured records; only valid records should exist.

## Navigation behavior

- Desktop primary row: New Here, About, Connect, Messages, Events, Outreach, Give, Contact; Plan Your Visit button.
- Mobile menu: the same order, with Plan Your Visit visible near the top and service time/address available without opening multiple levels.
- Footer: times/address/directions, phone/email, social links, Resources/Connect/Ministries groupings, Give, legal pages, and photo release.
- Do not put every ministry or partner in the primary row; use Connect/Outreach landing pages and the footer.

## Content dependencies before routes launch

- `/connect/kids`, `/connect/youth`, `/connect/young-adults`, and `/connect/groups` require confirmed ministry data.
- `/messages/[slug]` requires a reliable media import/source and metadata.
- `/events/[slug]` requires an authoritative event source and editorial owner.
- `/give` requires finance-approved copy and verified Church Center account.
- `/about/gallery` requires a curated, consent-cleared image set with alt text.
