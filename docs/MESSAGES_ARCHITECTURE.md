# Messages and sermon library architecture

Updated: 2026-08-06

## Current milestone

The public message experience now consumes the verified Living Message Church YouTube channel through a provider-neutral, no-database adapter. It deliberately separates normalized sermon records, the provider adapter, public presentation, and admin presentation so a future authenticated YouTube Data API or Supabase repository can extend the archive without rewriting the visual components.

No Supabase client, schema, authentication, storage bucket, upload endpoint, or dependency was added in this milestone.

## Verified source

The user identified the Living Message Church Streams page as the message source of truth:

- Streams page: `https://www.youtube.com/@livingmessagechurch/streams`
- canonical channel ID: `UC-YctizZq1wTbhgn3tQOJqA`
- public Atom feed: `https://www.youtube.com/feeds/videos.xml?channel_id=UC-YctizZq1wTbhgn3tQOJqA`

The official page metadata and public feed resolve to the same channel ID. The adapter uses the feed’s title, publication date, description, thumbnail, watch URL, and video ID without credentials. It sorts newest-first and marks the first record as featured. Categories are generated only from explicit title/description metadata—such as livestream, online service, a named Bible book—and publication year.

The credential-free Atom feed exposes the newest 15 records, so it is a recent archive rather than a claim of complete channel history. The four previously approved production-page records (`BFGOKJx3KDI`, `rHPTve0MYkQ`, `BY2GSlbN1qA`, and `zPLS9tL04XU`) remain only as a network-failure fallback. `/messages` is indexable and included in the sitemap. No `VideoObject` structured data is emitted because detailed sermon metadata has not yet been editorially approved.

## Implemented experience

### Public

- Homepage featured message uses the newest feed record in a privacy-enhanced `youtube-nocookie.com` iframe and revalidates hourly.
- `/messages` includes the newest feed record as its featured player, publication dates, evidence-backed category chips, keyword search, responsive video cards, empty results, and player selection without leaving the page.
- Thumbnails come from the verified feed’s YouTube media metadata; the local fallback uses standard YouTube thumbnail URLs for its approved IDs.
- `/online-church` consumes the same normalized feed and verified channel ID for a click-to-load live player. Past-message actions lead to the dedicated `/messages` archive. The unresolved online-service time is omitted, so the completed route is indexable without publishing a disputed schedule.

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

1. Confirm the message metadata/editorial owner and whether the online-service schedule can be published.
2. Decide whether complete channel history should come from the authenticated YouTube Data API, a one-time import, or the future Supabase editorial repository.
3. Approve Supabase project ownership, authentication roles, RLS policy, storage strategy, upload limits, and backups.
4. Add migrations and generated types only after that approval.
5. Extend or replace the public-feed adapter behind the existing normalized interface.
6. Enable create/update/category/upload actions behind authenticated admin access.
7. Add approved per-message routes, canonical metadata, Open Graph images, transcripts/captions, and `VideoObject` schema.
