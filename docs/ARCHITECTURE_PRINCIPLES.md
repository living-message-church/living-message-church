# Architecture Principles

## Secure administrative boundary

Administrative access uses Supabase Auth with no public signup. Next.js Proxy refreshes sessions but is never the sole authorization control. Server-confirmed users and administrator-controlled `app_metadata.admin_role` values gate protected pages and mutations. Creative writes are same-origin POST requests, audited in Supabase, and may never create a path back into Planning Center.

## Systems of record

- Planning Center owns operational church facts and is permanently GET-only from this platform.
- Supabase owns Living Message creative workflow state, approvals, and private generated assets.
- The Next.js website owns normalized presentation, SEO, and public rendering.

Synchronization is always Planning Center → Living Message Platform, never the reverse. If a feature requires a Planning Center mutation, implementation must stop and propose a read-only alternative.

## Provider boundaries

Provider APIs are isolated under `src/lib`. React components consume normalized internal models and never hold credentials or provider request logic. Raw provider records and errors do not cross into browser props.

## Publication

Provider readability is not publication permission. Canonical identity, explicit public visibility, ambiguity quarantine, and editorial approval are distinct gates. AI output is non-public until an approved asset is explicitly selected and enabled.
