# Verification changelog

Updated: 2026-08-06

This log records only values marked `Verified` or `Approved for Temporary Use` in `CONTENT_VERIFICATION.md`. The user-supplied canonical YouTube Streams URL resolved the channel and recent-message metadata conflicts during this milestone; all other unresolved items remain unchanged.

| Item | Previous value | Approved value | Approving source or note | Affected route or component |
| --- | --- | --- | --- | --- |
| Church public name | Living Message Church | Living Message Church | `CONTENT_VERIFICATION.md` marks the public name Verified; no conflict was found in the production inventory. | Global `siteIdentity`; metadata; wordmark; footer; Organization JSON-LD; all page titles |
| Canonical YouTube channel | Conflicting channel IDs and handles | `https://www.youtube.com/@livingmessagechurch/streams`; channel ID `UC-YctizZq1wTbhgn3tQOJqA` | User supplied the channel as the source of truth on 2026-08-06; official page metadata and Atom feed resolve to the same ID. | Home latest message; `/messages`; `/messages/live`; footer social link; message adapter |
| Message metadata source | Four approved-temporary legacy records from the production sermon page | Verified canonical YouTube channel feed for recent title, date, description, thumbnail, and video ID metadata | User approval on 2026-08-06; public YouTube Atom feed | Home latest message; `/messages` searchable/category archive; `/messages/live` |
| Next Steps class | Staged Connect · Serve · Grow pathway with schedule and signup withheld | One class on Sundays during the 10:45 AM service, hosted by the Living Message leadership team; registration form `979623` | Current production `/nextsteps/` page; user directed its use on 2026-08-06 | `/connect/next-steps`; “I’m New” navigation; XML sitemap; Church Center handoff |

## Reconciliation result

- The verified public name was already correctly represented in `src/content/site.ts` with `status: "verified"`; no code value changed.
- Next Steps schedule and registration are approved for temporary use from the current production page; duration, childcare, recurrence dates, form ownership, recipient, and retention remain verification blockers.
- Canonical YouTube ownership and video metadata sourcing are now reconciled into `src/content/site.ts` and the provider-neutral message adapter.
- Deprecated historical phone numbers, events, campaigns, registrations, and suspicious links remain excluded from public content.
- All other values retain `needs-verification` metadata. They were not rewritten, approved, or silently promoted.
- Priority routes remain `noindex` where approved church-specific content is materially incomplete.
