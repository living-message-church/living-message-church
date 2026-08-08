-- Secure Creative Admin
-- Roles live in Supabase Auth app_metadata.admin_role and are provisioned manually.
-- This migration adds immutable application-level mutation auditing only.

create table if not exists public.creative_audit_log (
  id uuid primary key default gen_random_uuid(),
  acting_user_id uuid not null references auth.users(id) on delete restrict,
  acting_user_email text,
  action text not null check (action in (
    'creative_scanned',
    'creative_generated',
    'creative_regenerated',
    'creative_approved',
    'creative_rejected',
    'creative_selected',
    'creative_published'
  )),
  canonical_event_id text,
  job_id uuid references public.event_creative_jobs(id) on delete set null,
  asset_id uuid references public.event_creative_assets(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists creative_audit_log_actor_created_idx
on public.creative_audit_log (acting_user_id, created_at desc);

create index if not exists creative_audit_log_event_created_idx
on public.creative_audit_log (canonical_event_id, created_at desc);

alter table public.creative_audit_log enable row level security;

-- No anon/authenticated policies are intentionally created. All writes pass
-- through a server-confirmed admin role and the server-only service client.
revoke all on public.creative_audit_log from anon, authenticated;

comment on table public.creative_audit_log is
'Append-only audit identity for LMC creative mutations. Never contains secrets or private Planning Center data.';
