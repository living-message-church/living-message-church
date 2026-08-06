# Messages and sermon library architecture

Updated: 2026-08-06

## Current milestone

The message experience is now a functional, no-database prototype. It deliberately separates normalized sermon records, the provider adapter, public presentation, and admin presentation so Supabase can replace the local repository without rewriting the visual components.

No Supabase client, schema, authentication, storage bucket, upload endpoint, or dependency was added in this milestone.

## Approved temporary source

The current Living Message Church production sermon page is the temporary source for four public YouTube records:

- `https://www.livingmessagechurch.com/sermons-living-message-church-clermont/`
- featured production-page link: `BFGOKJx3KDI`
- embedded production-page videos: `rHPTve0MYkQ`, `BY2GSlbN1qA`, `zPLS9tL04XU`

Titles and the speaker display name were checked through YouTube’s public oEmbed response. Editorial display titles normalize technical source titles without changing their subject. The production page does not prove that these are the newest chronological recordings or resolve the conflicting canonical-channel records in `CONTENT_VERIFICATION.md`; therefore the records remain `approved-temporary`, `/messages` remains no-indexed, and no `VideoObject` structured data is emitted yet.

## Implemented experience

### Public

- Homepage featured message uses a privacy-enhanced `youtube-nocookie.com` iframe.
- `/messages` includes a featured player, category chips, keyword search, responsive video cards, empty results, and player selection without leaving the page.
- Temporary thumbnails come from the YouTube thumbnail endpoint for the production-page video IDs.
- `/messages/live` continues to use the provider-neutral archive component; livestream ownership and schedule are still unresolved.

### Admin prototype

`/admin/messages` is a no-index, non-persistent visual prototype. It includes:

- future upload and YouTube URL fields, visibly disabled until storage is configured;
- title, meta-title, and meta-description editing in local React state;
- per-message category creation and removal;
- library-wide category deletion in local React state;
- metadata/category search;
- explicit messaging that changes reset on refresh.

This route is not an operational admin. It has no authentication or write endpoint and must not be connected to production data until access control exists.

## Sales Hub reference principles

The local `sales-hub` project was inspected for interaction principles only. The sermon prototype adopts the useful product ideas—clear admin hierarchy, wide search, compact category pills, row-based metadata editing, public category filters, and provider-independent records—using Living Message’s own typography, palette, spacing, components, and content. No Sales Hub source, branding, proprietary copy, or exact layout was copied.

## Recommended Supabase model

Use migrations and generated TypeScript types when Supabase is authorized.

### `messages`

- `id uuid primary key`
- `slug text unique not null`
- `title text not null`
- `description text`
- `speaker text`
- `scripture text`
- `series text`
- `published_at timestamptz`
- `status text` constrained to `draft`, `published`, or `archived`
- `featured boolean default false`
- `media_kind text` constrained to `youtube` or `upload`
- `youtube_video_id text`
- `storage_path text`
- `thumbnail_path text`
- `duration_seconds integer`
- `meta_title text`
- `meta_description text`
- `meta_keywords text[]`
- `created_at`, `updated_at`, `created_by`, `updated_by`

Require a database constraint that exactly one usable media source exists for a published record.

### `message_categories`

- `id uuid primary key`
- `name text not null`
- `slug text unique not null`
- `description text`
- `display_order integer`
- `created_at`, `updated_at`

### `message_category_assignments`

- `message_id uuid references messages on delete cascade`
- `category_id uuid references message_categories on delete cascade`
- composite primary key on both IDs

Category deletion should require confirmation and show how many messages will be affected. Prefer archive/merge for established public categories so old URLs and analytics do not silently lose meaning.

## Storage and upload requirements

- Use a private admin upload workflow with server-side authorization; never expose a service-role key.
- Decide whether Supabase Storage is suitable for full sermon video sizes, bandwidth, transcoding, streaming range requests, and cost before choosing it as the media host.
- If video uploads remain native, validate type and size before signed upload, store originals privately, generate a streaming-compatible derivative and poster, and retain processing status/error fields.
- YouTube should remain available as a specialist video host. A message can reference YouTube without copying the video into Supabase.
- Captions/transcripts, poster rights, retention, deletion, and backup/export behavior require approval.

## Security and publishing requirements

- Add authenticated staff roles before enabling `/admin/messages` writes.
- RLS: anonymous users may read only `published` messages and public categories; only approved communications/pastoral roles may insert, update, publish, feature, or archive.
- Keep draft and audit fields inaccessible to anonymous clients.
- Validate and normalize slugs, YouTube IDs, metadata lengths, category names, and upload MIME types server-side.
- Preserve an audit history for publish status, title, media source, category deletion, and featured-message changes.
- Do not emit sermon schema, publish dates, speakers, scripture, series, or canonical detail URLs until the record is approved.

## Adapter transition

`src/lib/messages/message-source.ts` is the switch point. The future Supabase adapter should return the existing normalized `ContentFeedResult<Message>` shape. Public components must not query Supabase directly. During outages, serve a cached last-known-good published set or the truthful unavailable state.

## Next implementation milestone

1. Confirm the canonical YouTube channel and message metadata owner.
2. Approve Supabase project ownership, authentication roles, RLS policy, storage strategy, upload limits, and backups.
3. Add migrations and generated types.
4. Replace the local adapter with a server-only Supabase adapter.
5. Enable create/update/category/upload actions behind authenticated admin access.
6. Add approved per-message routes, canonical metadata, Open Graph images, transcripts/captions, and `VideoObject` schema.
