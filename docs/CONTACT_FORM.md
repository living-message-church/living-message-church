# Contact Form

The public `/contact` form delivers messages through Resend. It does not store submissions in the application database.

## Server-only configuration

The application expects these variables locally and in Vercel:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Values are read only inside the API route’s server bundle and must never use the `NEXT_PUBLIC_` prefix. `CONTACT_TO_EMAIL` may contain a comma-separated recipient list. The visitor’s address is set as `Reply-To`; the authenticated Living Message Church domain remains the sender.

## Request safeguards

- POST-only JSON endpoint with same-origin validation
- strict field length and type validation
- hidden honeypot field and minimum completion time
- best-effort in-memory rate limiting (five requests per IP per 15 minutes)
- 16 KB request-body limit
- escaped HTML plus plain-text email output
- generic public provider errors; credentials and provider payloads are never returned

The in-memory rate limiter reduces casual abuse but is not a durable, globally shared serverless control. Before a high-volume public campaign, add an approved distributed limiter or challenge provider without sending visitor data to an unapproved service.

## Delivery behavior

The sender displays as `Living Message Church Website <CONTACT_FROM_EMAIL>`. Replies go to the visitor’s submitted email address. A failed delivery leaves the form contents intact and offers the church’s published email address as a fallback.

No automated live-delivery test runs during builds. After deployment, an authorized owner should submit one ordinary test message, confirm receipt and Reply-To behavior, and then remove the test message from the destination mailbox according to church policy.
