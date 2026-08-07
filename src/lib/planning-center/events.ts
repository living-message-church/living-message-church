import { planningCenterGet } from "./client";
import { PLANNING_CENTER_API_VERSIONS } from "./config";
import type {
  NormalizedEvent,
  PlanningCenterAdapterResult,
  PlanningCenterCollectionResponse,
} from "./types";

interface CalendarEventInstanceAttributes {
  all_day_event?: boolean;
  church_center_url?: string | null;
  description?: string | null;
  ends_at?: string | null;
  image_url?: string | null;
  location?: string | null;
  name?: string | null;
  published_ends_at?: string | null;
  published_starts_at?: string | null;
  starts_at?: string | null;
}

const PAGE_SIZE = 100;

export async function getUpcomingEvents(): Promise<PlanningCenterAdapterResult<NormalizedEvent>> {
  const response = await planningCenterGet<PlanningCenterCollectionResponse<CalendarEventInstanceAttributes>>(
    "/calendar/v2/event_instances",
    {
      apiVersion: PLANNING_CENTER_API_VERSIONS.calendar,
      query: {
        "fields[EventInstance]": "name,description,starts_at,ends_at,published_starts_at,published_ends_at,image_url,church_center_url,location,all_day_event",
        filter: "future",
        order: "starts_at",
        per_page: PAGE_SIZE,
      },
    },
  );

  const items = response.data.data.flatMap<NormalizedEvent>((resource) => {
    const attributes = resource.attributes;
    const title = attributes.name?.trim();
    const publicUrl = attributes.church_center_url?.trim();
    const startAt = attributes.published_starts_at ?? attributes.starts_at;

    if (!title || !publicUrl || !startAt) return [];

    return [{
      allDay: Boolean(attributes.all_day_event),
      description: attributes.description?.trim() || null,
      endAt: attributes.published_ends_at ?? attributes.ends_at ?? null,
      imageUrl: attributes.image_url?.trim() || null,
      location: attributes.location?.trim() || null,
      publicUrl,
      source: "planning-center-calendar",
      startAt,
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
