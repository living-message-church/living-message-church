import type { NormalizedEvent, PlanningCenterCanonicalEventDiagnostic } from "@/lib/planning-center/types";
import type { CreativeEligibilityResult } from "./types";

export function evaluateCreativeEligibility(
  event: NormalizedEvent,
  diagnostic: PlanningCenterCanonicalEventDiagnostic,
  now = new Date(),
): CreativeEligibilityResult {
  const reasons: string[] = [];
  if (!event.providerIds.calendarEventIds.length) reasons.push("No Calendar-origin provider ID.");
  if (event.publicVisibility !== "published") reasons.push("Not explicitly published by Planning Center.");
  if (diagnostic.eligibility !== "public") reasons.push(`Canonical eligibility is ${diagnostic.eligibility}.`);
  if (diagnostic.ambiguityFlags.length) reasons.push("Canonical relationship state is ambiguous.");
  if (!event.occurrences.some((occurrence) => new Date(occurrence.startAt).getTime() > now.getTime())) {
    reasons.push("No future occurrence remains.");
  }
  return { eligible: reasons.length === 0, reasons };
}
