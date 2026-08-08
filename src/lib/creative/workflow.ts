import { randomUUID } from "node:crypto";
import type { NormalizedEvent } from "@/lib/planning-center/types";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { buildEventArtworkPrompt } from "./prompt-builder";
import { inferCreativeStylePreset } from "./presets";
import { generateEventArtwork } from "./providers";
import type { CreativeCandidate } from "./types";

export interface AuthenticatedCreativeAdmin {
  authenticated: true;
  subject: string;
}

function requireAdmin(actor: AuthenticatedCreativeAdmin) {
  if (actor.authenticated !== true || !actor.subject.trim()) {
    throw new Error("Authenticated creative administration is required.");
  }
}

function safePathSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-|-$/g, "").slice(0, 160);
}

/** Writes only Supabase. The canonical event was previously read from Planning Center via GET. */
export async function generateCreativeConcepts(
  actor: AuthenticatedCreativeAdmin,
  candidate: CreativeCandidate,
  reason: "manual" | "missing-artwork" | "source-change",
) {
  requireAdmin(actor);
  if (!candidate.eligibility.eligible) {
    throw new Error("Only strict public canonical Calendar events may enter generation.");
  }
  const event: NormalizedEvent = candidate.event;
  if (reason === "missing-artwork" && candidate.planningCenterImageAvailable) {
    throw new Error("The event already has authoritative Planning Center artwork.");
  }
  const client = createSupabaseAdminClient();
  const preset = inferCreativeStylePreset(event.title, event.category);
  const prompt = buildEventArtworkPrompt(event, preset);
  const versions = await client.from("event_creative_jobs")
    .select("generation_version")
    .eq("canonical_event_id", event.id)
    .order("generation_version", { ascending: false })
    .limit(1);
  if (versions.error) throw new Error("Creative registry is unavailable.");
  const version = Number(versions.data?.[0]?.generation_version ?? 0) + 1;
  const job = await client.from("event_creative_jobs").insert({
    canonical_event_id: event.id,
    category: event.category,
    event_title: event.title,
    generation_reason: reason,
    generation_status: "generating",
    generation_version: version,
    planning_center_calendar_id: event.providerIds.calendarEventIds[0],
    planning_center_registration_id: event.providerIds.registrationIds[0] ?? null,
    prompt_version: prompt.version,
    source_updated_at: event.sourceMetadata.updatedAt,
  }).select("id").single();
  if (job.error || !job.data) throw new Error("Creative job could not be created.");

  try {
    const concepts = await generateEventArtwork({ aspectRatio: "16:9", conceptCount: 3, prompt, stylePreset: preset });
    for (const concept of concepts) {
      const assetId = randomUUID();
      const storagePath = `${safePathSegment(event.id)}/${assetId}.webp`;
      const upload = await client.storage.from("event-art").upload(storagePath, Buffer.from(concept.bytes), {
        cacheControl: "31536000",
        contentType: concept.mimeType,
        upsert: false,
      });
      if (upload.error) throw new Error("Generated artwork could not be stored.");
      const asset = await client.from("event_creative_assets").insert({
        asset_type: "website-16x9",
        canonical_event_id: event.id,
        height: concept.height,
        id: assetId,
        job_id: job.data.id,
        model: concept.model,
        prompt: prompt.prompt,
        provider: concept.provider,
        status: "pending_review",
        storage_path: storagePath,
        width: concept.width,
      });
      if (asset.error) throw new Error("Generated artwork metadata could not be stored.");
    }
    await client.from("event_creative_jobs").update({ generation_status: "pending_review" }).eq("id", job.data.id);
    return { conceptCount: concepts.length, jobId: job.data.id };
  } catch (error) {
    const providerMissing = error instanceof Error && /not configured/i.test(error.message);
    await client.from("event_creative_jobs").update({ generation_status: providerMissing ? "provider_not_configured" : "failed" }).eq("id", job.data.id);
    throw error;
  }
}

/** Approves and selects an asset in Supabase only; Planning Center is untouched. */
export async function approveCreativeAsset(actor: AuthenticatedCreativeAdmin, canonicalEventId: string, assetId: string) {
  requireAdmin(actor);
  const client = createSupabaseAdminClient();
  const approvedAt = new Date().toISOString();
  const asset = await client.from("event_creative_assets").update({
    approved_at: approvedAt,
    approved_by: actor.subject,
    status: "approved",
  }).eq("id", assetId).eq("canonical_event_id", canonicalEventId).select("job_id").single();
  if (asset.error || !asset.data) throw new Error("Creative asset could not be approved.");
  const override = await client.from("event_creative_overrides").upsert({
    canonical_event_id: canonicalEventId,
    public_enabled: true,
    selected_asset_id: assetId,
  });
  if (override.error) throw new Error("Creative override could not be selected.");
  await client.from("event_creative_jobs").update({ generation_status: "approved" }).eq("id", asset.data.job_id);
}

/** Rejects an asset in Supabase without deleting its historical generation. */
export async function rejectCreativeAsset(actor: AuthenticatedCreativeAdmin, assetId: string) {
  requireAdmin(actor);
  const client = createSupabaseAdminClient();
  const result = await client.from("event_creative_assets").update({ status: "rejected" }).eq("id", assetId);
  if (result.error) throw new Error("Creative asset could not be rejected.");
}
