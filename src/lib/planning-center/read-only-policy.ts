/**
 * Planning Center is the canonical system of record.
 *
 * This application is permanently a read-only consumer. If a future feature
 * needs to modify Planning Center, implementation must stop and the requirement
 * must be reported instead of adding a write method, scope, or permission.
 */
export const PLANNING_CENTER_READ_ONLY_METHOD = "GET" as const;

export function assertPlanningCenterReadOnlyMethod(
  method: string,
): asserts method is typeof PLANNING_CENTER_READ_ONLY_METHOD {
  if (method !== PLANNING_CENTER_READ_ONLY_METHOD) {
    throw new Error("Planning Center access is read-only; write methods are prohibited.");
  }
}
