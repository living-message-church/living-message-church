# Verification changelog

Updated: 2026-08-06

This log records only values marked `Verified` or `Approved for Temporary Use` in `CONTENT_VERIFICATION.md`. No unresolved item was promoted during this milestone.

| Item | Previous value | Approved value | Approving source or note | Affected route or component |
| --- | --- | --- | --- | --- |
| Church public name | Living Message Church | Living Message Church | `CONTENT_VERIFICATION.md` marks the public name Verified; no conflict was found in the production inventory. | Global `siteIdentity`; metadata; wordmark; footer; Organization JSON-LD; all page titles |

## Reconciliation result

- The verified public name was already correctly represented in `src/content/site.ts` with `status: "verified"`; no code value changed.
- No registry row is currently marked `Approved for Temporary Use`.
- Deprecated historical phone numbers, events, campaigns, registrations, and suspicious links remain excluded from public content.
- All other values retain `needs-verification` metadata. They were not rewritten, approved, or silently promoted.
- Priority routes remain `noindex` where approved church-specific content is materially incomplete.
