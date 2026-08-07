import { planningCenterGet } from "./client";
import { PLANNING_CENTER_API_VERSIONS } from "./config";
import type {
  NormalizedGroup,
  PlanningCenterAdapterResult,
  PlanningCenterCollectionResponse,
} from "./types";

interface GroupAttributes {
  archived_at?: string | null;
  description_as_plain_text?: string | null;
  header_image?: {
    medium?: string | null;
    original?: string | null;
    thumbnail?: string | null;
  } | null;
  listed?: boolean;
  name?: string | null;
  public_church_center_web_url?: string | null;
  schedule?: string | null;
}

const PAGE_SIZE = 100;

/** Reads Church Center-listed group metadata only; never memberships or people. */
export async function getPublishedGroups(): Promise<PlanningCenterAdapterResult<NormalizedGroup>> {
  const response = await planningCenterGet<PlanningCenterCollectionResponse<GroupAttributes>>(
    "/groups/v2/groups",
    {
      apiVersion: PLANNING_CENTER_API_VERSIONS.groups,
      query: {
        "fields[Group]": "archived_at,description_as_plain_text,header_image,listed,name,public_church_center_web_url,schedule",
        order: "name",
        per_page: PAGE_SIZE,
      },
    },
  );

  const items = response.data.data.flatMap<NormalizedGroup>((resource) => {
    const attributes = resource.attributes;
    const title = attributes.name?.trim();
    const publicUrl = attributes.public_church_center_web_url?.trim();

    if (!attributes.listed || attributes.archived_at || !title || !publicUrl) return [];

    return [{
      description: attributes.description_as_plain_text?.trim() || null,
      imageUrl: attributes.header_image?.medium ?? attributes.header_image?.original ?? null,
      publicUrl,
      published: true,
      schedule: attributes.schedule?.trim() || null,
      source: "planning-center-groups",
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
