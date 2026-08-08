-- AI Event Creative Pipeline v1
-- Planning Center remains GET-only. These tables store only LMC creative state.

create extension if not exists pgcrypto;

create table if not exists public.event_creative_jobs (
  id uuid primary key default gen_random_uuid(),
  planning_center_calendar_id text not null,
  planning_center_registration_id text,
  canonical_event_id text not null,
  event_title text not null,
  source_updated_at timestamptz,
  category text,
  generation_status text not null default 'queued' check (generation_status in (
    'queued', 'generating', 'pending_review', 'approved', 'rejected', 'failed', 'provider_not_configured'
  )),
  prompt_version text not null,
  generation_reason text not null,
  generation_version integer not null default 1 check (generation_version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (canonical_event_id, generation_version)
);

create table if not exists public.event_creative_assets (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.event_creative_jobs(id) on delete cascade,
  canonical_event_id text not null,
  asset_type text not null default 'website-16x9',
  image_url text,
  storage_path text not null unique,
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  prompt text not null,
  provider text not null,
  model text not null,
  status text not null default 'pending_review' check (status in ('generated', 'pending_review', 'approved', 'rejected')),
  approved_at timestamptz,
  approved_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.event_creative_overrides (
  canonical_event_id text primary key,
  selected_asset_id uuid references public.event_creative_assets(id) on delete set null,
  public_enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.creative_style_presets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  prompt_rules jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_creative_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_event_creative_jobs_updated_at on public.event_creative_jobs;
create trigger set_event_creative_jobs_updated_at before update on public.event_creative_jobs
for each row execute function public.set_creative_updated_at();

drop trigger if exists set_event_creative_overrides_updated_at on public.event_creative_overrides;
create trigger set_event_creative_overrides_updated_at before update on public.event_creative_overrides
for each row execute function public.set_creative_updated_at();

drop trigger if exists set_creative_style_presets_updated_at on public.creative_style_presets;
create trigger set_creative_style_presets_updated_at before update on public.creative_style_presets
for each row execute function public.set_creative_updated_at();

alter table public.event_creative_jobs enable row level security;
alter table public.event_creative_assets enable row level security;
alter table public.event_creative_overrides enable row level security;
alter table public.creative_style_presets enable row level security;

-- No anonymous mutation policies exist. The future authenticated admin layer
-- will perform workflow writes server-side with the service role.
create policy "public may read approved creative assets"
on public.event_creative_assets for select
using (status = 'approved');

create policy "public may read enabled creative overrides"
on public.event_creative_overrides for select
using (public_enabled = true);

create policy "public may read active creative presets"
on public.creative_style_presets for select
using (active = true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-art', 'event-art', false, 15728640, array['image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into public.creative_style_presets (slug, name, description, prompt_rules)
values
  ('prayer', 'Prayer', 'Calm, contemplative editorial artwork.', '{"palette":["blue","cream"],"mood":["calm","contemplative","minimal"],"negativeSpace":true}'::jsonb),
  ('students', 'Students', 'Energetic and contemporary youth direction.', '{"palette":["orange","black","white"],"mood":["energetic","youthful"],"photography":"modern"}'::jsonb),
  ('kids', 'Kids', 'Bright, playful, warm family direction.', '{"palette":["bright","warm"],"mood":["playful","family-friendly"]}'::jsonb),
  ('community', 'Community', 'Authentic documentary community photography.', '{"palette":["warm neutrals"],"mood":["welcoming","human"],"photography":"documentary"}'::jsonb),
  ('worship', 'Worship', 'Cinematic, atmospheric worship direction.', '{"palette":["dark","light contrast"],"mood":["cinematic","restrained"]}'::jsonb),
  ('holiday', 'Holiday', 'Sophisticated seasonal artwork without clichés.', '{"mood":["seasonal","sophisticated"],"avoid":["clip-art","cliches"]}'::jsonb),
  ('conference', 'Conference', 'Bold editorial concept for major gatherings.', '{"mood":["bold","editorial","high-impact"],"negativeSpace":true}'::jsonb),
  ('general', 'General', 'Premium neutral Living Message fallback.', '{"palette":["blue","cream","warm neutral"],"mood":["premium","minimal","authentic"],"negativeSpace":true}'::jsonb)
on conflict (slug) do nothing;
