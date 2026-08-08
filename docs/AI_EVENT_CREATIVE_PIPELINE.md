# AI Event Creative Pipeline

Status: secure administration implemented; the first live generation remains blocked by deployment prerequisites.

## Architecture

```text
Planning Center Calendar -- GET --> exact relationship resolver
                                      |
                                      v
                                canonical event
                                      |
                          strict public eligibility gate
                                      |
                                      v
                         Supabase creative workflow state
                                      |
                           server-only image provider
                                      |
                                      v
                        private event-art storage bucket
                                      |
                            explicit human approval
                                      |
                                      v
                            public artwork resolver
```

There is no path from the platform back to Planning Center. Calendar is the discovery source. Registrations, Groups, Check-Ins, and Services enrich a candidate only through the exact relationships documented in `PLANNING_CENTER_EVENT_RELATIONSHIPS.md`. Unlinked Registrations are counted for review and never become standalone events or generation jobs.

## Eligibility

An event qualifies only when it:

- originates from a future Calendar record;
- is explicitly Church Center published and approved;
- has canonical eligibility `public` (not `public-needs-cleanup`);
- has no ambiguity flags;
- retains a future occurrence.

Generation is appropriate only when approved LMC artwork does not exist, Planning Center artwork is absent, an authenticated administrator requests regeneration, or a material source change is intentionally reviewed. Page rendering never triggers generation.

## Supabase schema

Migration `202608080001_ai_event_creative_pipeline.sql` creates:

- `event_creative_jobs`: minimal Calendar/Registration identity, source version, prompt version, generation reason, status, and immutable generation version;
- `event_creative_assets`: permanent storage identity, dimensions, sanitized prompt, provider/model, and review state;
- `event_creative_overrides`: the selected approved asset and public enablement switch;
- `creative_style_presets`: future-admin-compatible brand directions.

Full Planning Center records are not copied. RLS is enabled. No anonymous write policies exist. The migration is authored but must be applied through the approved Supabase deployment workflow.

## Storage

`event-art` is a **private** bucket accepting WebP images up to 15 MB. Paths are `event-art/{canonical_event_id}/{asset_id}.webp`; the bucket prefix is implicit in Storage calls. Assets are immutable versions and are not overwritten during regeneration. Historical rejected generations remain available to authenticated administrators until an approved retention policy says otherwise.

Private storage prevents pending or rejected concepts from becoming public. The public resolver issues a one-hour signed URL only after both conditions are true:

1. the selected asset status is `approved`;
2. its canonical override has `public_enabled = true`.

## Prompt and provider boundary

`buildEventArtworkPrompt()` uses only public canonical event fields, season, verified public Registration availability, verified public Group relationship, and a selected preset. It excludes attendee, person, contact, submission, giving, private note, and Check-In participant data. Prompts prohibit baked-in text, logos, readable Bible verses, invented LMC members, Motivation Church derivation, and generic church-stock clichés.

The provider-neutral `EventArtworkProvider` currently has an OpenAI implementation using GPT Image 2. The provider returns base64 WebP, which is cropped server-side to a true 1600×900 output with Sharp before private upload. Three distinct concepts are requested sequentially for each authenticated generation job. The implementation follows the official [GPT Image 2 model documentation](https://developers.openai.com/api/docs/models/gpt-image-2).

If `OPENAI_API_KEY` is absent, diagnostics show `Not configured`, jobs can record `provider_not_configured`, and public pages continue with Planning Center or approved local fallback art.

## Approval lifecycle

```text
queued -> generating -> pending_review -> approved -> public
                                  \-> rejected
                  \-> failed / provider_not_configured
```

Regeneration creates a new job/version and never overwrites history. `approveCreativeAsset()` and `rejectCreativeAsset()` modify Supabase only. No browser-callable mutation endpoint exists.

## Admin security blocker

`/admin/events/creative` is no-index and read-only. It shows sanitized Calendar-origin candidates, current Planning Center artwork state, style direction, prompt summary, and Concept A/B/C placeholders. Approve, Reject, Regenerate, and Select Concept controls are disabled.

Supabase Auth now protects every `/admin/*` route. `admin` and `viewer` roles come only from administrator-controlled Auth `app_metadata`; all server-rendered pages verify the user through Supabase Auth, and every mutation repeats the check server-side. Viewer access is inspect-only.

Creative actions use a same-origin JSON POST endpoint. Scan, generation, regeneration, approval, rejection, and selection record audit identity in Supabase and never write Planning Center. V1 generation is hard-limited to one selected test event to prevent accidental mass spend.

Live activation remains blocked because `202608080002_secure_creative_admin.sql` is not yet applied, no Auth users are provisioned, and `OPENAI_API_KEY` is missing locally. The controls truthfully remain disabled until the applicable requirements are configured.

## Single-event test selection

The v1 test gate selects `planning-center:22003630`, **Youth Ministry Volunteer Training**. It is future, strict-public, unambiguous, Calendar-origin, has a substantive public description, and lacks Planning Center artwork. No other canonical event may be generated by the v1 endpoint. No concepts were generated or approved during this milestone because audit storage, a provisioned administrator, and the provider credential are not all available.

## Public artwork precedence

1. approved, public-enabled LMC creative override from Supabase;
2. authoritative public Planning Center/connected artwork;
3. approved local LMC fallback.

Presentation components receive only `ResolvedEventArtwork`; they do not know the AI or source provider. The strict public Events adapter now uses this resolver, but no public page triggers generation.

## Failure behavior

- Planning Center unavailable: no new scan; existing approved artwork remains resolvable.
- Supabase unavailable or migration absent: Planning Center artwork/fallback remains available.
- AI provider unavailable: no public failure; generation reports a safe status.
- ambiguous or cleanup candidate: quarantined before creative entry.
- unlinked Registration: diagnostics only.
