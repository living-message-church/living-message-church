import { createSupabaseAdminClient, getSupabaseServerEnvironmentStatus } from "@/lib/supabase/server";
import type { CreativeRegistryMetrics, ResolvedEventArtwork } from "./types";

function isMissingRelation(message: string) {
  return /does not exist|schema cache|could not find/i.test(message);
}

export async function getCreativeRegistryMetrics(): Promise<CreativeRegistryMetrics> {
  if (getSupabaseServerEnvironmentStatus().serviceRoleKey !== "configured") {
    return { approvedAssets: null, generationFailures: null, jobsPending: null, pendingApprovals: null, rejectedAssets: null, state: "unavailable", storage: "unavailable" };
  }
  try {
    const client = createSupabaseAdminClient();
    const [jobs, pending, approved, rejected, failed, buckets] = await Promise.all([
      client.from("event_creative_jobs").select("id", { count: "exact", head: true }).in("generation_status", ["queued", "generating"]),
      client.from("event_creative_assets").select("id", { count: "exact", head: true }).eq("status", "pending_review"),
      client.from("event_creative_assets").select("id", { count: "exact", head: true }).eq("status", "approved"),
      client.from("event_creative_assets").select("id", { count: "exact", head: true }).eq("status", "rejected"),
      client.from("event_creative_jobs").select("id", { count: "exact", head: true }).eq("generation_status", "failed"),
      client.storage.listBuckets(),
    ]);
    const firstError = jobs.error ?? pending.error ?? approved.error ?? rejected.error ?? failed.error;
    if (firstError) {
      return {
        approvedAssets: null, generationFailures: null, jobsPending: null, pendingApprovals: null, rejectedAssets: null,
        state: isMissingRelation(firstError.message) ? "not-migrated" : "unavailable",
        storage: buckets.error ? "unavailable" : buckets.data.some((bucket) => bucket.id === "event-art") ? "available" : "missing",
      };
    }
    return {
      approvedAssets: approved.count ?? 0,
      generationFailures: failed.count ?? 0,
      jobsPending: jobs.count ?? 0,
      pendingApprovals: pending.count ?? 0,
      rejectedAssets: rejected.count ?? 0,
      state: "available",
      storage: buckets.error ? "unavailable" : buckets.data.some((bucket) => bucket.id === "event-art") ? "available" : "missing",
    };
  } catch {
    return { approvedAssets: null, generationFailures: null, jobsPending: null, pendingApprovals: null, rejectedAssets: null, state: "unavailable", storage: "unavailable" };
  }
}

/** Returns only an approved, public-enabled override; pending assets never resolve. */
export async function getApprovedCreativeArtwork(canonicalEventId: string): Promise<ResolvedEventArtwork | null> {
  try {
    const client = createSupabaseAdminClient();
    const override = await client.from("event_creative_overrides")
      .select("selected_asset_id")
      .eq("canonical_event_id", canonicalEventId)
      .eq("public_enabled", true)
      .maybeSingle();
    if (override.error || !override.data?.selected_asset_id) return null;
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
