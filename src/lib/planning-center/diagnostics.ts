import { planningCenterGet, PlanningCenterRequestError } from "./client";
import { getPlanningCenterEnvironmentStatus, PLANNING_CENTER_API_VERSIONS } from "./config";
import { getPlanningCenterEventAggregation } from "./event-aggregation";
import { getPublishedGroups } from "./groups";
import { getPublicRegistrationOpportunities } from "./registrations";
import type {
  PlanningCenterDiagnostics,
  PlanningCenterEndpointStatus,
  PlanningCenterSingleResponse,
} from "./types";

const notConfigured: PlanningCenterEndpointStatus = {
  latencyMs: null,
  state: "not-configured",
  statusCode: null,
};

function statusFromError(error: unknown): PlanningCenterEndpointStatus {
  if (!(error instanceof PlanningCenterRequestError)) {
    return { latencyMs: null, state: "unavailable", statusCode: null };
  }

  const state = error.code === "configuration"
    ? "not-configured"
    : error.code === "unauthorized"
      ? "unauthorized"
      : error.code === "forbidden"
        ? "forbidden"
        : error.code === "rate-limited"
          ? "rate-limited"
          : "unavailable";

  return { latencyMs: error.latencyMs, state, statusCode: error.statusCode };
}

function settledStatus<T extends { status: PlanningCenterEndpointStatus }>(
  result: PromiseSettledResult<T>,
): PlanningCenterEndpointStatus {
  return result.status === "fulfilled" ? result.value.status : statusFromError(result.reason);
}

function apiStatus(statuses: PlanningCenterEndpointStatus[]): PlanningCenterEndpointStatus {
  const success = statuses.find((status) => status.state === "reachable");
  if (success) return success;

  // Any HTTP status proves api.planningcenteronline.com was reachable, even if
  // credentials or product permissions prevented the resource from loading.
  const httpResponse = statuses.find((status) => status.statusCode !== null);
  if (httpResponse) {
    return {
      latencyMs: httpResponse.latencyMs,
      state: "reachable",
      statusCode: httpResponse.statusCode,
    };
  }

  return statuses[0] ?? { latencyMs: null, state: "unavailable", statusCode: null };
}

async function checkOrganization() {
  const response = await planningCenterGet<PlanningCenterSingleResponse<Record<string, unknown>>>(
    "/people/v2",
    { apiVersion: PLANNING_CENTER_API_VERSIONS.people },
  );

  // Organization data is intentionally discarded. Only the response status is retained.
  return {
    status: {
      latencyMs: response.latencyMs,
      state: "reachable" as const,
      statusCode: response.statusCode,
    },
  };
}

export async function getPlanningCenterDiagnostics(sampleLimit = 3): Promise<PlanningCenterDiagnostics> {
  const checkedAt = new Date().toISOString();
  const environment = getPlanningCenterEnvironmentStatus();

  if (!environment.ready) {
    return {
      api: notConfigured,
      calendar: notConfigured,
      checkedAt,
      environment,
      events: { samples: [], totalDiscovered: null, truncated: false },
      groups: { samples: [], totalDiscovered: null, truncated: false },
      groupsEndpoint: notConfigured,
      organization: notConfigured,
      registrations: { samples: [], totalDiscovered: null, truncated: false },
      registrationsEndpoint: notConfigured,
      relationships: null,
      servicesEndpoint: notConfigured,
      checkInsEndpoint: notConfigured,
    };
  }

  const [organizationResult, aggregationResult, registrationsResult, groupsResult] = await Promise.allSettled([
    checkOrganization(),
    getPlanningCenterEventAggregation(),
    getPublicRegistrationOpportunities(),
    getPublishedGroups(),
  ]);

  const organization = settledStatus(organizationResult);
  const calendar = aggregationResult.status === "fulfilled"
    ? aggregationResult.value.calendarStatus
    : statusFromError(aggregationResult.reason);
  const checkInsEndpoint = aggregationResult.status === "fulfilled"
    ? aggregationResult.value.checkInsStatus
    : statusFromError(aggregationResult.reason);
  const servicesEndpoint = aggregationResult.status === "fulfilled"
    ? aggregationResult.value.servicesStatus
    : statusFromError(aggregationResult.reason);
  const registrationsEndpoint = settledStatus(registrationsResult);
  const groupsEndpoint = settledStatus(groupsResult);

  return {
    api: apiStatus([organization, calendar, registrationsEndpoint, groupsEndpoint, servicesEndpoint, checkInsEndpoint]),
    calendar,
    checkInsEndpoint,
    checkedAt,
    environment,
    events: aggregationResult.status === "fulfilled"
      ? {
          samples: aggregationResult.value.events.slice(0, sampleLimit),
          totalDiscovered: aggregationResult.value.events.length,
          truncated: false,
        }
      : { samples: [], totalDiscovered: null, truncated: false },
    groups: groupsResult.status === "fulfilled"
      ? {
          samples: groupsResult.value.items.slice(0, sampleLimit),
          totalDiscovered: groupsResult.value.totalDiscovered,
          truncated: groupsResult.value.truncated,
        }
      : { samples: [], totalDiscovered: null, truncated: false },
    groupsEndpoint,
    organization,
    relationships: aggregationResult.status === "fulfilled" ? aggregationResult.value.diagnostics : null,
    registrations: registrationsResult.status === "fulfilled"
      ? {
          samples: registrationsResult.value.items.slice(0, sampleLimit),
          totalDiscovered: registrationsResult.value.totalDiscovered,
          truncated: registrationsResult.value.truncated,
        }
      : { samples: [], totalDiscovered: null, truncated: false },
    registrationsEndpoint,
    servicesEndpoint,
  };
}
