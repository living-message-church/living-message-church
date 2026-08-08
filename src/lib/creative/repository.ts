import { createSupabaseAdminClient, getSupabaseServerEnvironmentStatus } from "@/lib/supabase/server";
import type { CreativeRegistryMetrics, CreativeReviewJob, ResolvedEventArtwork } from "./types";

let creativeOverridesUnavailableUntil = 0;

function isMissingRelation(message: string) {
  return /does not exist|schema cache|could not find/i.test(message);
}

export async function getCreativeRegistryMetrics(): Promise<CreativeRegistryMetrics> {
  if (getSupabaseServerEnvironmentStatus().serviceRoleKey !== "configured") {
    return { approvedAssets: null, audit: "unavailable", generationFailures: null, jobsPending: null, pendingApprovals: null, rejectedAssets: null, state: "unavailable", storage: "unavailable" };
  }
  try {
    const client = createSupabaseAdminClient();
    const [jobs, pending, approved, rejected, failed, audit, buckets] = await Promise.all([
      client.from("event_creative_jobs").select("id", { count: "exact", head: true }).in("generation_status", ["queued", "generating"]),
      client.from("event_creative_assets").select("id", { count: "exact", head: true }).eq("status", "pending_review"),
      client.from("event_creative_assets").select("id", { count: "exact", head: true }).eq("status", "approved"),
      client.from("event_creative_assets").select("id", { count: "exact", head: true }).eq("status", "rejected"),
      client.from("event_creative_jobs").select("id", { count: "exact", head: true }).eq("generation_status", "failed"),
      client.from("creative_audit_log").select("id", { count: "exact", head: true }),
      client.storage.listBuckets(),
    ]);
    const firstError = jobs.error ?? pending.error ?? approved.error ?? rejected.error ?? failed.error;
    if (firstError) {
      return {
        approvedAssets: null, generationFailures: null, jobsPending: null, pendingApprovals: null, rejectedAssets: null,
        audit: audit.error ? (isMissingRelation(audit.error.message) ? "not-migrated" : "unavailable") : "available",
        state: isMissingRelation(firstError.message) ? "not-migrated" : "unavailable",
        storage: buckets.error ? "unavailable" : buckets.data.some((bucket) => bucket.id === "event-art") ? "available" : "missing",
      };
    }
    return {
      approvedAssets: approved.count ?? 0,
      audit: audit.error ? (isMissingRelation(audit.error.message) ? "not-migrated" : "unavailable") : "available",
      generationFailures: failed.count ?? 0,
      jobsPending: jobs.count ?? 0,
      pendingApprovals: pending.count ?? 0,
      rejectedAssets: rejected.count ?? 0,
      state: "available",
      storage: buckets.error ? "unavailable" : buckets.data.some((bucket) => bucket.id === "event-art") ? "available" : "missing",
    };
  } catch {
    return { approvedAssets: null, audit: "unavailable", generationFailures: null, jobsPending: null, pendingApprovals: null, rejectedAssets: null, state: "unavailable", storage: "unavailable" };
  }
}

/** Returns private, short-lived concept previews for an authenticated admin page only. */
export async function getCreativeReviewJobs(canonicalEventIds: string[]): Promise<CreativeReviewJob[]> {
  if (!canonicalEventIds.length || getSupabaseServerEnvironmentStatus().serviceRoleKey !== "configured") return [];
  try {
    const client = createSupabaseAdminClient();
    const jobs = await client.from("event_creative_jobs")
      .select("id,canonical_event_id,created_at,generation_status,generation_version,event_creative_assets(id,created_at,height,model,provider,status,storage_path,width)")
      .in("canonical_event_id", canonicalEventIds)
      .order("generation_version", { ascending: false });
    if (jobs.error || !jobs.data) return [];
    const output: CreativeReviewJob[] = [];
    for (const row of jobs.data) {
      const assets = [];
      for (const asset of row.event_creative_assets ?? []) {
        const signed = await client.storage.from("event-art").createSignedUrl(asset.storage_path, 600);
        if (signed.error || !signed.data?.signedUrl) continue;
        assets.push({
          createdAt: asset.created_at,
          height: asset.height,
          id: asset.id,
          model: asset.model,
          provider: asset.provider,
          signedUrl: signed.data.signedUrl,
          status: asset.status,
          width: asset.width,
        });
      }
      output.push({
        assets,
        canonicalEventId: row.canonical_event_id,
        createdAt: row.created_at,
        generationStatus: row.generation_status,
        generationVersion: row.generation_version,
        id: row.id,
      });
    }
    return output;
  } catch {
    return [];
  }
}

export async function getCreativeTestMetrics(canonicalEventId: string) {
  try {
    const client = createSupabaseAdminClient();
    const [jobs, concepts, approvals, override] = await Promise.all([
      client.from("event_creative_jobs").select("id", { count: "exact", head: true }).eq("canonical_event_id", canonicalEventId),
      client.from("event_creative_assets").select("id", { count: "exact", head: true }).eq("canonical_event_id", canonicalEventId),
      client.from("event_creative_assets").select("id", { count: "exact", head: true }).eq("canonical_event_id", canonicalEventId).eq("status", "approved"),
      client.from("event_creative_overrides").select("selected_asset_id,public_enabled").eq("canonical_event_id", canonicalEventId).maybeSingle(),
    ]);
    if (jobs.error || concepts.error || approvals.error || override.error) return null;
    let publicOverrideResolved = false;
    if (override.data?.public_enabled && override.data.selected_asset_id) {
      const selected = await client
        .from("event_creative_assets")
        .select("id")
        .eq("id", override.data.selected_asset_id)
        .eq("status", "approved")
        .maybeSingle();
      publicOverrideResolved = !selected.error && Boolean(selected.data);
    }
    return {
      approvals: approvals.count ?? 0,
      concepts: concepts.count ?? 0,
      jobs: jobs.count ?? 0,
      publicOverrideResolved,
    };
  } catch {
    return null;
  }
}

/** Returns only an approved, public-enabled override; pending assets never resolve. */
export async function getApprovedCreativeArtwork(canonicalEventId: string): Promise<ResolvedEventArtwork | null> {
  if (creativeOverridesUnavailableUntil > Date.now()) return null;
  try {
    const client = createSupabaseAdminClient();
    const override = await client.from("event_creative_overrides")
      .select("selected_asset_id")
      .eq("canonical_event_id", canonicalEventId)
      .eq("public_enabled", true)
      .maybeSingle();
    if (override.error) {
      if (isMissingRelation(override.error.message)) creativeOverridesUnavailableUntil = Date.now() + 60_000;
      return null;
    }
    if (!override.data?.selected_asset_id) return null;
    const asset = await client.from("event_creative_assets")
      .select("storage_path,width,height,status")
      .eq("id", override.data.selected_asset_id)
      .eq("status", "approved")
      .maybeSingle();
    if (asset.error || !asset.data) return null;
    const signed = await client.storage.from("event-art").createSignedUrl(asset.data.storage_path, 3600);
    if (signed.error || !signed.data?.signedUrl) return null;
    return {
      alt: "Living Message Church event artwork",
      height: asset.data.height,
      source: "approved-creative",
      url: signed.data.signedUrl,
      width: asset.data.width,
    };
  } catch {
    return null;
  }
}
