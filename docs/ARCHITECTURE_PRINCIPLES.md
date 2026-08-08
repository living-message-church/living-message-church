# Architecture Principles

## Systems of record

- Planning Center owns operational church facts and is permanently GET-only from this platform.
- Supabase owns Living Message creative workflow state, approvals, and private generated assets.
- The Next.js website owns normalized presentation, SEO, and public rendering.

Synchronization is always Planning Center → Living Message Platform, never the reverse. If a feature requires a Planning Center mutation, implementation must stop and propose a read-only alternative.

## Provider boundaries

Provider APIs are isolated under `src/lib`. React components consume normalized internal models and never hold credentials or provider request logic. Raw provider records and errors do not cross into browser props.

## Publication

Provider readability is not publication permission. Canonical identity, explicit public visibility, ambiguity quarantine, and editorial approval are distinct gates. AI output is non-public until an approved asset is explicitly selected and enabled.

