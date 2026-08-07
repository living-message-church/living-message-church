import { planningCenterGet } from "./client";
import { PLANNING_CENTER_API_VERSIONS } from "./config";
import type {
  NormalizedRegistration,
  PlanningCenterAdapterResult,
  PlanningCenterCollectionResponse,
} from "./types";

interface SignupAttributes {
  archived?: boolean;
  at_maximum_capacity?: boolean;
  close_at?: string | null;
  closed?: boolean;
  description?: string | null;
  name?: string | null;
  new_registration_url?: string | null;
  open?: boolean;
  open_at?: string | null;
}

const PAGE_SIZE = 100;

/** Reads public signup opportunities only; never submitted registrations or attendees. */
export async function getPublicRegistrationOpportunities(): Promise<PlanningCenterAdapterResult<NormalizedRegistration>> {
  const response = await planningCenterGet<PlanningCenterCollectionResponse<SignupAttributes>>(
    "/registrations/v2/signups",
    {
      apiVersion: PLANNING_CENTER_API_VERSIONS.registrations,
      query: {
        "fields[Signup]": "archived,at_maximum_capacity,close_at,closed,description,name,new_registration_url,open,open_at",
        filter: "unarchived",
        per_page: PAGE_SIZE,
      },
    },
  );

  const items = response.data.data.flatMap<NormalizedRegistration>((resource) => {
    const attributes = resource.attributes;
    const title = attributes.name?.trim();
    const publicUrl = attributes.new_registration_url?.trim();

    if (attributes.archived || !title || !publicUrl) return [];

    return [{
      closesAt: attributes.close_at ?? null,
      description: attributes.description?.trim() || null,
      full: Boolean(attributes.at_maximum_capacity),
      open: Boolean(attributes.open) && !attributes.closed,
      opensAt: attributes.open_at ?? null,
      publicUrl,
      source: "planning-center-registrations",
      title,
    }];
  });

  return {
    items,
    status: { latencyMs: response.latencyMs, state: "reachable", statusCode: response.statusCode },
    totalDiscovered: items.length,
    truncated: (response.data.meta?.total_count ?? 0) > PAGE_SIZE,
  };
}
