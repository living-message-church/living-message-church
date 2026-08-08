# Administrative Authentication

Status: implemented; production activation requires one manually provisioned user and the secure-admin migration.

## Architecture

Administrative identity uses Supabase Auth with cookie-backed SSR sessions through `@supabase/ssr`. There is no public signup route. `/admin/login` offers password sign-in only for users created or approved by a Supabase project administrator.

Next.js 16 `src/proxy.ts` refreshes and optimistically verifies the Supabase session for `/admin/*`. It is not the authorization authority. Every protected page calls `supabase.auth.getUser()` again on the server, and every creative POST repeats the verified-user and role checks at the mutation boundary.

## Roles

Roles are stored in protected Supabase Auth `app_metadata.admin_role`:

- `admin`: inspect diagnostics and scan, generate, regenerate, select, approve, reject, and publish creative state;
- `viewer`: inspect protected diagnostics and creative previews only.

The application never reads a role from request JSON, query strings, `user_metadata`, or browser state. Supabase documents `app_metadata` as administrator-controlled, unlike user-editable metadata.

Provision users manually in Supabase Auth, then set `app_metadata.admin_role` to exactly `admin` or `viewer`. Do not enable public signup. Users without one of those exact roles are treated as unauthorized.

## Mutation security

`POST /api/admin/creative` is the only browser-callable creative mutation boundary. It requires:

1. POST (never GET);
2. `application/json`;
3. an exact same-origin `Origin`/host match;
4. a server-confirmed Supabase Auth user;
5. `app_metadata.admin_role = admin`;
6. the append-only audit table to be reachable.

The endpoint exposes no Supabase service key, OpenAI key, or Planning Center credential. Planning Center is only read through the existing GET-only canonical event service.

## Audit identity

Migration `202608080002_secure_creative_admin.sql` adds `creative_audit_log`. Every creative action records the acting Supabase user ID, optional account email, action, canonical event ID, relevant job/asset ID, timestamp, and non-sensitive metadata. The table has RLS enabled and no `anon` or `authenticated` access policy; only the server-side service boundary can append/read it.

## Deployment prerequisites

The base creative tables and private `event-art` bucket are reachable. The secure-admin migration is currently **not applied**. Apply reviewed migrations through the linked CLI workflow:

```bash
npx supabase login
npx supabase link --project-ref <PROJECT_REF>
npx supabase db push --linked
```

Alternatively, run the exact contents of `supabase/migrations/202608080002_secure_creative_admin.sql` in the project SQL editor after review. Then manually provision an Auth user and assign `app_metadata.admin_role`.

Until both steps are complete, the UI remains view-only and the mutation service rejects work rather than creating unaudited state.

## Cache and privacy

Protected pages send `Cache-Control: private, no-store`. Pending/rejected artwork is displayed only through ten-minute signed URLs embedded in an authenticated admin response. Approved public artwork uses a one-hour signed delivery URL and is selected only when the asset is approved and its override is public-enabled.
