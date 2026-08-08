import { getPlanningCenterEventAggregation } from "@/lib/planning-center/event-aggregation";
import { evaluateCreativeEligibility } from "./eligibility";
import type { CreativeCandidate } from "./types";

/**
 * GET-only Planning Center preview. It does not queue jobs or write Supabase.
 * A future authenticated server action may persist this preview to Supabase.
 */
export async function scanEligibleCalendarEvents(): Promise<CreativeCandidate[]> {
  const aggregation = await getPlanningCenterEventAggregation();
  const diagnostics = new Map(aggregation.candidates.map((candidate) => [candidate.canonicalId, candidate]));
  return aggregation.events.map((event) => {
    const diagnostic = diagnostics.get(event.id);
    return {
      eligibility: diagnostic
        ? evaluateCreativeEligibility(event, diagnostic)
        : { eligible: false, reasons: ["Canonical diagnostics are unavailable."] },
      event,
      planningCenterImageAvailable: Boolean(event.imageUrl),
    };
  });
}
