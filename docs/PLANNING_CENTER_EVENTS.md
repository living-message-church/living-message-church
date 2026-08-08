# Planning Center Public Events

Status: strict public index activated August 7, 2026.

## Source and eligibility

Planning Center Calendar is the discovery source. The public adapter consumes the relationship-aware canonical event model and publishes only candidates classified exactly as `public`. It excludes `public-needs-cleanup`, `ambiguous`, internal, expired, link-only, hidden, and unapproved records.

Registrations enrich a Calendar event only through an exact EventConnection. A verified open Signup changes the CTA to **Register** and supplies its Church Center URL. Without that exact relationship, the CTA is **View event** and links to the public Calendar record. Unlinked Registrations never become events.

## Presentation

`/events` uses a wide, white editorial canvas with a simple Events introduction and chronological horizontal rows. Each row contains current artwork, next occurrence or recurrence context, title, public description, location when supplied, and one authoritative action. The visual principles were informed by the clear hierarchy and generous event rows on [Motivation Church’s Events page](https://motivation.church/events), without copying its layout, artwork, branding, or content.

The homepage consumes the same feed but displays only the first three events. No duplicate event store exists in application content.

## Artwork precedence

1. approved and public-enabled LMC creative override;
2. public Planning Center or exact connected-product artwork;
3. one of the approved local LMC fallback photographs.

Pending or rejected generated artwork never resolves publicly.

## Caching and failure behavior

- Planning Center aggregation is GET-only and cached in-process for 60 seconds.
- `/events` uses five-minute ISR.
- The public adapter returns sanitized normalized fields only.
- Provider failure renders a calm unavailable state; raw errors are never exposed.
- Public event pages never trigger artwork generation.

## Current activation boundary

The live snapshot produced 21 canonical candidates, of which 12 pass the strict public gate. Eight cleanup candidates and one ambiguous candidate remain quarantined. Dynamic `/events/[slug]` detail pages are not part of this pass; Church Center remains the detail and registration destination.

