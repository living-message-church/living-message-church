import { getPlanningCenterEventAggregation } from "@/lib/planning-center/event-aggregation";
import { getCreativeProviderEnvironmentStatus } from "./providers";
import { getCreativeRegistryMetrics } from "./repository";
import { scanEligibleCalendarEvents } from "./scan";

export async function getCreativePipelineDiagnostics() {
  const [aggregation, candidates, registry] = await Promise.all([
    getPlanningCenterEventAggregation(),
    scanEligibleCalendarEvents(),
    getCreativeRegistryMetrics(),
  ]);
  const eligible = candidates.filter((candidate) => candidate.eligibility.eligible);
  return {
    aiProvider: getCreativeProviderEnvironmentStatus(),
    canonicalPublicEvents: eligible.length,
    eligibleCalendarCandidates: eligible.length,
    eventsMissingArtwork: eligible.filter((candidate) => !candidate.planningCenterImageAvailable).length,
    registrationLinkedCanonicalEvents: eligible.filter((candidate) => candidate.event.providerIds.registrationIds.length > 0).length,
    registry,
    unlinkedRegistrationCandidates: aggregation.diagnostics.registrations.unlinkedPublicCandidates,
  };
}
