import type { PlanningCenterEnvironmentStatus } from "./types";

export const PLANNING_CENTER_ENVIRONMENT_VARIABLES = [
  "PLANNING_CENTER_CLIENT_ID",
  "PLANNING_CENTER_SECRET",
] as const;

export const PLANNING_CENTER_API_BASE_URL = "https://api.planningcenteronline.com";
export const PLANNING_CENTER_REQUEST_TIMEOUT_MS = 8_000;

export const PLANNING_CENTER_API_VERSIONS = {
  calendar: "2022-07-07",
  groups: "2023-07-10",
  people: "2021-08-17",
  registrations: "2025-05-01",
} as const;

export class PlanningCenterConfigurationError extends Error {
  constructor() {
    super("Planning Center server configuration is incomplete.");
    this.name = "PlanningCenterConfigurationError";
  }
}

function configured(value: string | undefined) {
  return value?.trim() ? "configured" as const : "missing" as const;
}

/** Returns presence states only. Credential values never leave this module. */
export function getPlanningCenterEnvironmentStatus(): PlanningCenterEnvironmentStatus {
  const clientId = configured(process.env.PLANNING_CENTER_CLIENT_ID);
  const secret = configured(process.env.PLANNING_CENTER_SECRET);

  return {
    clientId,
    secret,
    ready: clientId === "configured" && secret === "configured",
  };
}

/** Server-only credential accessor. Never call from a Client Component. */
export function getPlanningCenterConfig() {
  if (typeof window !== "undefined") {
    throw new PlanningCenterConfigurationError();
  }

  const status = getPlanningCenterEnvironmentStatus();
  if (!status.ready) throw new PlanningCenterConfigurationError();

  return {
    clientId: process.env.PLANNING_CENTER_CLIENT_ID!.trim(),
    secret: process.env.PLANNING_CENTER_SECRET!.trim(),
  };
}
