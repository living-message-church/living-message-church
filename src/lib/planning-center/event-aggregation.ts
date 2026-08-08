import { planningCenterGet } from "./client";
import { PLANNING_CENTER_API_VERSIONS } from "./config";
import type {
  NormalizedEvent,
  PlanningCenterCanonicalEventDiagnostic,
  PlanningCenterCollectionResponse,
  PlanningCenterEndpointStatus,
  PlanningCenterEventRelationshipDiagnostics,
  PlanningCenterProduct,
  PlanningCenterResource,
  PlanningCenterSingleResponse,
} from "./types";

const PAGE_SIZE = 100;
const CACHE_TTL_MS = 60_000;

interface CalendarParentAttributes {
  approval_status?: string | null;
  description?: string | null;
  featured?: boolean;
  image_url?: string | null;
  link_only?: boolean;
  name?: string | null;
  registration_url?: string | null;
  summary?: string | null;
  updated_at?: string | null;
  visible_in_church_center?: boolean;
}

interface CalendarInstanceAttributes {
  all_day_event?: boolean;
  church_center_url?: string | null;
  compact_recurrence_description?: string | null;
  ends_at?: string | null;
  location?: string | null;
  name?: string | null;
  published_ends_at?: string | null;
  published_starts_at?: string | null;
  starts_at?: string | null;
}

interface EventConnectionAttributes {
  connected_to_id?: string | number | null;
  connected_to_name?: string | null;
  connected_to_type?: string | null;
  connected_to_url?: string | null;
  product_name?: string | null;
  promoted?: boolean;
}

interface FeedAttributes {
  default_church_center_visibility?: string | null;
  feed_type?: string | null;
  name?: string | null;
  source_id?: string | number | null;
}

interface SignupAttributes {
  archived?: boolean;
  at_maximum_capacity?: boolean;
  closed?: boolean;
  description?: string | null;
  logo_url?: string | null;
  name?: string | null;
  new_registration_url?: string | null;
  open?: boolean;
  updated_at?: string | null;
}

interface GroupAttributes {
  archived_at?: string | null;
  description_as_plain_text?: string | null;
  events_listed?: boolean;
  events_visibility?: string | null;
  header_image?: {
    medium?: string | null;
    original?: string | null;
  } | null;
  listed?: boolean;
  name?: string | null;
  public_church_center_web_url?: string | null;
  updated_at?: string | null;
}

interface GroupEventAttributes {
  canceled?: boolean;
  ends_at?: string | null;
  name?: string | null;
  starts_at?: string | null;
}

interface ServiceTypeAttributes {
  archived_at?: string | null;
  name?: string | null;
}

interface CheckInEventAttributes {
  archived_at?: string | null;
  name?: string | null;
}

interface CheckInIntegrationAttributes {
  remote_app?: string | null;
  remote_id?: string | number | null;
  remote_type?: string | null;
}

interface SourceCollection<T> {
  items: PlanningCenterResource<T>[];
  status: PlanningCenterEndpointStatus;
  total: number;
}

interface RelationshipSources {
  calendarInstances: SourceCollection<CalendarInstanceAttributes>;
  calendarParents: SourceCollection<CalendarParentAttributes>;
  checkInEvents: SourceCollection<CheckInEventAttributes>;
  checkInLinks: SourceCollection<CheckInIntegrationAttributes>;
  connectionsByCalendarId: Map<string, PlanningCenterResource<EventConnectionAttributes>[]>;
  feeds: SourceCollection<FeedAttributes>;
  groupEvents: SourceCollection<GroupEventAttributes>;
  groups: SourceCollection<GroupAttributes>;
  registrations: SourceCollection<SignupAttributes>;
  serviceTypes: SourceCollection<ServiceTypeAttributes>;
}

export interface PlanningCenterEventAggregationResult {
  calendarStatus: PlanningCenterEndpointStatus;
  candidates: PlanningCenterCanonicalEventDiagnostic[];
  checkInsStatus: PlanningCenterEndpointStatus;
  diagnostics: PlanningCenterEventRelationshipDiagnostics;
  events: NormalizedEvent[];
  servicesStatus: PlanningCenterEndpointStatus;
}

let cachedResult: { expiresAt: number; value: PlanningCenterEventAggregationResult } | null = null;
let pendingResult: Promise<PlanningCenterEventAggregationResult> | null = null;

function endpointStatus(latencyMs: number, statusCode: number): PlanningCenterEndpointStatus {
  return { latencyMs, state: "reachable", statusCode };
}

function oneRelationshipId(resource: PlanningCenterResource<unknown>, key: string) {
  const value = resource.relationships?.[key]?.data;
  return value && !Array.isArray(value) ? value.id : null;
}

async function getAllPages<T>(
  path: string,
  apiVersion: string,
  query: Record<string, boolean | number | string | undefined>,
): Promise<SourceCollection<T>> {
  const items: PlanningCenterResource<T>[] = [];
  let latencyMs = 0;
  let offset = 0;
  let statusCode = 200;
  let total = Number.POSITIVE_INFINITY;

  while (offset < total) {
    const response = await planningCenterGet<PlanningCenterCollectionResponse<T>>(path, {
      apiVersion,
      query: { ...query, offset, per_page: PAGE_SIZE },
    });
    items.push(...response.data.data);
    latencyMs += response.latencyMs;
    statusCode = response.statusCode;
    total = response.data.meta?.total_count ?? items.length;
    offset += PAGE_SIZE;
  }

  return {
    items,
    status: endpointStatus(latencyMs, statusCode),
    total: Number.isFinite(total) ? total : items.length,
  };
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, work: (item: T) => Promise<R>) {
  const results = new Array<R>(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await work(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

async function readRelationshipSources(): Promise<RelationshipSources> {
  const calendarParents = await getAllPages<CalendarParentAttributes>(
    "/calendar/v2/events",
    PLANNING_CENTER_API_VERSIONS.calendar,
    {
      "fields[Event]": "name,description,summary,image_url,registration_url,visible_in_church_center,featured,link_only,approval_status,updated_at,feed,tags",
      filter: "future",
      include: "feed,tags",
    },
  );

  const [calendarInstances, feeds, registrations, groups, groupEvents, serviceTypes, checkInEvents, checkInLinks] = await Promise.all([
    getAllPages<CalendarInstanceAttributes>(
      "/calendar/v2/event_instances",
      PLANNING_CENTER_API_VERSIONS.calendar,
      {
        "fields[EventInstance]": "name,starts_at,ends_at,published_starts_at,published_ends_at,church_center_url,location,all_day_event,compact_recurrence_description,event",
        filter: "future",
        order: "starts_at",
      },
    ),
    getAllPages<FeedAttributes>(
      "/calendar/v2/feeds",
      PLANNING_CENTER_API_VERSIONS.calendar,
      { "fields[Feed]": "name,feed_type,source_id,default_church_center_visibility" },
    ),
    getAllPages<SignupAttributes>(
      "/registrations/v2/signups",
      PLANNING_CENTER_API_VERSIONS.registrations,
      {
        "fields[Signup]": "name,description,archived,open,closed,at_maximum_capacity,new_registration_url,logo_url,updated_at,next_signup_time",
        filter: "unarchived",
        include: "next_signup_time",
      },
    ),
    getAllPages<GroupAttributes>(
      "/groups/v2/groups",
      PLANNING_CENTER_API_VERSIONS.groups,
      {
        "fields[Group]": "name,description_as_plain_text,header_image,listed,events_listed,events_visibility,archived_at,public_church_center_web_url,updated_at",
      },
    ),
    getAllPages<GroupEventAttributes>(
      "/groups/v2/events",
      PLANNING_CENTER_API_VERSIONS.groups,
      {
        "fields[Event]": "name,starts_at,ends_at,canceled,group,repeating_event",
        filter: "upcoming",
        order: "starts_at",
      },
    ),
    getAllPages<ServiceTypeAttributes>(
      "/services/v2/service_types",
      PLANNING_CENTER_API_VERSIONS.services,
      { "fields[ServiceType]": "name,archived_at" },
    ),
    getAllPages<CheckInEventAttributes>(
      "/check-ins/v2/events",
      PLANNING_CENTER_API_VERSIONS.checkIns,
      { "fields[Event]": "name,archived_at" },
    ),
    getAllPages<CheckInIntegrationAttributes>(
      "/check-ins/v2/integration_links",
      PLANNING_CENTER_API_VERSIONS.checkIns,
      { "fields[IntegrationLink]": "remote_app,remote_id,remote_type,local" },
    ),
  ]);

  const connectionRows = await mapWithConcurrency(calendarParents.items, 4, async (event) => {
    const response = await planningCenterGet<PlanningCenterCollectionResponse<EventConnectionAttributes>>(
      `/calendar/v2/events/${event.id}/event_connections`,
      {
        apiVersion: PLANNING_CENTER_API_VERSIONS.calendar,
        query: {
          "fields[EventConnection]": "connected_to_id,connected_to_name,connected_to_type,connected_to_url,product_name,promoted",
          per_page: PAGE_SIZE,
        },
      },
    );
    return [event.id, response.data.data] as const;
  });

  const connectionsByCalendarId = new Map(connectionRows);
  const connectedRegistrationIds = new Set(
    connectionRows.flatMap(([, connections]) => connections
      .filter((item) => item.attributes.product_name === "registrations")
      .map((item) => String(item.attributes.connected_to_id ?? ""))
      .filter(Boolean)),
  );
  const knownRegistrationIds = new Set(registrations.items.map((item) => item.id));
  const missingRegistrationIds = [...connectedRegistrationIds].filter((id) => !knownRegistrationIds.has(id));

  if (missingRegistrationIds.length) {
    const archivedConnections = await mapWithConcurrency(missingRegistrationIds, 3, async (id) => {
      const response = await planningCenterGet<PlanningCenterSingleResponse<SignupAttributes>>(
        `/registrations/v2/signups/${id}`,
        {
          apiVersion: PLANNING_CENTER_API_VERSIONS.registrations,
          query: {
            "fields[Signup]": "name,description,archived,open,closed,at_maximum_capacity,new_registration_url,logo_url,updated_at",
          },
        },
      );
      return response.data.data;
    });
    registrations.items.push(...archivedConnections);
  }

  return {
    calendarInstances,
    calendarParents,
    checkInEvents,
    checkInLinks,
    connectionsByCalendarId,
    feeds,
    groupEvents,
    groups,
    registrations,
    serviceTypes,
  };
}

function normalizeTitle(value: string | null | undefined) {
  return value?.trim().toLocaleLowerCase("en-US").replace(/\s+/g, " ") ?? "";
}

function groupBy<T>(items: T[], keyFor: (item: T) => string) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFor(item);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.values()];
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "event";
}

function connectionIds(
  sources: RelationshipSources,
  calendarId: string,
  product: string,
) {
  return (sources.connectionsByCalendarId.get(calendarId) ?? [])
    .filter((item) => item.attributes.product_name === product)
    .map((item) => String(item.attributes.connected_to_id ?? ""))
    .filter(Boolean);
}

function latestDate(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1) ?? null;
}

function buildAggregation(sources: RelationshipSources): PlanningCenterEventAggregationResult {
  const registrationMap = new Map(sources.registrations.items.map((item) => [item.id, item]));
  const groupMap = new Map(sources.groups.items.map((item) => [item.id, item]));
  const publicParents = sources.calendarParents.items.filter((item) => (
    item.attributes.visible_in_church_center === true
    && item.attributes.approval_status === "A"
    && item.attributes.link_only !== true
  ));
  const publicParentIds = new Set(publicParents.map((item) => item.id));
  const excludedParents = sources.calendarParents.items.filter((item) => !publicParentIds.has(item.id));
  const exclusionReasons = excludedParents.reduce((counts, item) => {
    if (item.attributes.link_only === true) counts.linkOnly += 1;
    else if (item.attributes.approval_status !== "A") counts.notApproved += 1;
    else if (item.attributes.visible_in_church_center !== true) counts.notChurchCenterPublished += 1;
    else counts.other += 1;
    return counts;
  }, { linkOnly: 0, notApproved: 0, notChurchCenterPublished: 0, other: 0 });
  const publicInstances = sources.calendarInstances.items.filter((item) => {
    const parentId = oneRelationshipId(item as PlanningCenterResource<unknown>, "event");
    return Boolean(parentId && publicParentIds.has(parentId));
  });

  const roots = new Map(publicParents.map((item) => [item.id, item.id]));
  const find = (id: string): string => {
    const parent = roots.get(id) ?? id;
    if (parent === id) return id;
    const root = find(parent);
    roots.set(id, root);
    return root;
  };
  const union = (first: string, second: string) => {
    const firstRoot = find(first);
    const secondRoot = find(second);
    if (firstRoot === secondRoot) return;
    const winner = firstRoot.localeCompare(secondRoot, undefined, { numeric: true }) < 0 ? firstRoot : secondRoot;
    const loser = winner === firstRoot ? secondRoot : firstRoot;
    roots.set(loser, winner);
  };

  const titleGroups = groupBy(publicParents, (item) => normalizeTitle(item.attributes.name));
  for (const titleGroup of titleGroups) {
    for (let firstIndex = 0; firstIndex < titleGroup.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < titleGroup.length; secondIndex += 1) {
        const first = titleGroup[firstIndex];
        const second = titleGroup[secondIndex];
        const firstGroups = new Set(connectionIds(sources, first.id, "groups"));
        const sharesExactGroup = connectionIds(sources, second.id, "groups").some((id) => firstGroups.has(id));
        if (sharesExactGroup) union(first.id, second.id);
      }
    }
  }

  const components = groupBy(publicParents, (item) => find(item.id));
  const checkInByRegistration = new Map<string, string[]>();
  for (const link of sources.checkInLinks.items) {
    if (link.attributes.remote_app !== "registrations") continue;
    const registrationId = String(link.attributes.remote_id ?? "");
    const localId = oneRelationshipId(link as PlanningCenterResource<unknown>, "local");
    if (!registrationId || !localId) continue;
    checkInByRegistration.set(registrationId, [...(checkInByRegistration.get(registrationId) ?? []), localId]);
  }

  const eligibleGroupEvents = sources.groupEvents.items.filter((item) => {
    const groupId = oneRelationshipId(item as PlanningCenterResource<unknown>, "group");
    const group = groupId ? groupMap.get(groupId) : null;
    if (!group) return false;
    return item.attributes.canceled !== true
      && Boolean(item.attributes.starts_at)
      && group.attributes.archived_at == null
      && group.attributes.listed === true
      && group.attributes.events_listed === true
      && group.attributes.events_visibility === "public";
  });

  const events = components.map<NormalizedEvent>((component) => {
    const ordered = [...component].sort((first, second) => {
      const featuredDifference = Number(Boolean(second.attributes.featured)) - Number(Boolean(first.attributes.featured));
      if (featuredDifference) return featuredDifference;
      const descriptionDifference = (second.attributes.description?.length ?? 0) - (first.attributes.description?.length ?? 0);
      return descriptionDifference || first.id.localeCompare(second.id, undefined, { numeric: true });
    });
    const primary = ordered[0];
    const calendarIds = component.map((item) => item.id).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const instances = publicInstances
      .filter((item) => {
        const parentId = oneRelationshipId(item as PlanningCenterResource<unknown>, "event");
        return Boolean(parentId && calendarIds.includes(parentId));
      })
      .sort((first, second) => String(first.attributes.starts_at).localeCompare(String(second.attributes.starts_at)));
    const groupIds = [...new Set(calendarIds.flatMap((id) => connectionIds(sources, id, "groups")))];
    const registrationIds = [...new Set(calendarIds.flatMap((id) => connectionIds(sources, id, "registrations")))];
    const serviceTypeIds = [...new Set(calendarIds.flatMap((id) => connectionIds(sources, id, "services")))];
    const directCheckInIds = [...new Set(calendarIds.flatMap((id) => connectionIds(sources, id, "check-ins")))];
    const registrationCheckInIds = registrationIds.flatMap((id) => checkInByRegistration.get(id) ?? []);
    const checkInEventIds = [...new Set([...directCheckInIds, ...registrationCheckInIds])];
    // Relationship proof uses the provider occurrence timestamp, not the
    // presentation-only published timestamp. This intentionally keeps schedule
    // differences quarantined rather than inferring that two records are one.
    const instanceStartTimes = new Set(instances.map((item) => item.attributes.starts_at).filter(Boolean));
    const matchedGroupEvents = eligibleGroupEvents.filter((item) => {
      const groupId = oneRelationshipId(item as PlanningCenterResource<unknown>, "group");
      return Boolean(groupId && groupIds.includes(groupId) && item.attributes.starts_at && instanceStartTimes.has(item.attributes.starts_at));
    });
    const registrations = registrationIds.map((id) => registrationMap.get(id)).filter(Boolean) as PlanningCenterResource<SignupAttributes>[];
    const registration = registrations.find((item) => item.attributes.open && !item.attributes.closed)
      ?? registrations[0]
      ?? null;
    const registrationStatus = !registration
      ? null
      : registration.attributes.at_maximum_capacity
        ? "full" as const
        : registration.attributes.open && !registration.attributes.closed
          ? "open" as const
          : registration.attributes.closed || registration.attributes.archived
            ? "closed" as const
            : "unavailable" as const;
    const relatedGroup = groupIds
      .map((id) => groupMap.get(id))
      .find((item) => item?.attributes.listed && item.attributes.public_church_center_web_url) ?? null;
    const firstInstance = instances[0];
    const products = new Set<PlanningCenterProduct>(["calendar"]);
    if (groupIds.length || matchedGroupEvents.length) products.add("groups");
    if (registrationIds.length) products.add("registrations");
    if (serviceTypeIds.length) products.add("services");
    if (checkInEventIds.length) products.add("check-ins");
    const title = primary.attributes.name?.trim() || firstInstance?.attributes.name?.trim() || "Event";

    return {
      category: null,
      description: primary.attributes.description?.trim()
        || primary.attributes.summary?.trim()
        || registration?.attributes.description?.trim()
        || relatedGroup?.attributes.description_as_plain_text?.trim()
        || null,
      featured: component.some((item) => item.attributes.featured === true),
      group: relatedGroup ? {
        id: relatedGroup.id,
        publicUrl: relatedGroup.attributes.public_church_center_web_url?.trim() || null,
      } : null,
      id: `planning-center:${calendarIds.join("+")}`,
      imageUrl: primary.attributes.image_url?.trim()
        || registration?.attributes.logo_url?.trim()
        || relatedGroup?.attributes.header_image?.original
        || relatedGroup?.attributes.header_image?.medium
        || null,
      occurrences: instances.flatMap((item) => {
        const startAt = item.attributes.published_starts_at ?? item.attributes.starts_at;
        if (!startAt) return [];
        return [{
          allDay: Boolean(item.attributes.all_day_event),
          endAt: item.attributes.published_ends_at ?? item.attributes.ends_at ?? null,
          id: item.id,
          location: item.attributes.location?.trim() || null,
          startAt,
        }];
      }),
      providerIds: {
        calendarEventIds: calendarIds,
        calendarInstanceIds: instances.map((item) => item.id),
        checkInEventIds,
        groupEventIds: matchedGroupEvents.map((item) => item.id),
        groupIds,
        registrationIds,
        serviceTypeIds,
      },
      publicUrl: firstInstance?.attributes.church_center_url?.trim() || "https://livingmessagechurch.churchcenter.com/calendar",
      publicVisibility: "published",
      recurrence: firstInstance?.attributes.compact_recurrence_description?.trim() || null,
      registration: registrationStatus ? {
        available: registrationStatus === "open",
        full: registrationStatus === "full",
        status: registrationStatus,
        url: registrationStatus === "open" ? registration?.attributes.new_registration_url?.trim() || null : null,
      } : null,
      slug: `${slugify(title)}-${calendarIds[0]}`,
      sourceMetadata: {
        products: [...products].sort(),
        updatedAt: latestDate([
          ...component.map((item) => item.attributes.updated_at),
          ...registrations.map((item) => item.attributes.updated_at),
          relatedGroup?.attributes.updated_at,
        ]),
      },
      title,
    };
  }).sort((first, second) => (
    (first.occurrences[0]?.startAt ?? "").localeCompare(second.occurrences[0]?.startAt ?? "")
  ));

  const allConnections = [...sources.connectionsByCalendarId.values()].flat();
  const connectedParentIds = [...sources.connectionsByCalendarId.entries()]
    .filter(([, items]) => items.length)
    .map(([id]) => id);
  const groupCalendarConnections = allConnections.filter((item) => item.attributes.product_name === "groups").length;
  const registrationCalendarConnections = allConnections.filter((item) => item.attributes.product_name === "registrations").length;
  const connectedRegistrationIds = new Set(allConnections
    .filter((item) => item.attributes.product_name === "registrations")
    .map((item) => String(item.attributes.connected_to_id ?? ""))
    .filter(Boolean));
  const serviceCalendarConnections = allConnections.filter((item) => item.attributes.product_name === "services").length;
  const checkInCalendarConnections = allConnections.filter((item) => item.attributes.product_name === "check-ins").length;
  const mergedGroupEventIds = new Set(events.flatMap((event) => event.providerIds.groupEventIds));
  const publicTitleComponents = groupBy(events, (event) => normalizeTitle(event.title));
  const ambiguousSameTitleClusters = publicTitleComponents.filter((items) => items.length > 1).length;
  const repeatedTitleEventIds = new Set(
    publicTitleComponents.filter((items) => items.length > 1).flatMap((items) => items.map((item) => item.id)),
  );
  const recurringOverlapEventIds = new Set<string>();
  for (const titleComponent of publicTitleComponents.filter((items) => items.length > 1)) {
    for (let firstIndex = 0; firstIndex < titleComponent.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < titleComponent.length; secondIndex += 1) {
        const first = titleComponent[firstIndex];
        const second = titleComponent[secondIndex];
        const firstTimes = new Set(first.occurrences.map((item) => item.startAt));
        if (second.occurrences.some((item) => firstTimes.has(item.startAt))) {
          recurringOverlapEventIds.add(first.id);
          recurringOverlapEventIds.add(second.id);
        }
      }
    }
  }
  const unmatchedGroupEvents = eligibleGroupEvents.filter((item) => !mergedGroupEventIds.has(item.id));
  const unmatchedGroupIds = new Set(unmatchedGroupEvents
    .map((item) => oneRelationshipId(item as PlanningCenterResource<unknown>, "group"))
    .filter((id): id is string => Boolean(id)));
  const checkInTitles = new Map<string, string[]>();
  for (const item of sources.checkInEvents.items) {
    const title = normalizeTitle(item.attributes.name);
    if (!title) continue;
    checkInTitles.set(title, [...(checkInTitles.get(title) ?? []), item.id]);
  }
  const feedOriginEvents = sources.calendarParents.items.filter((item) => {
    const feedId = oneRelationshipId(item as PlanningCenterResource<unknown>, "feed");
    return Boolean(feedId && feedId !== "calendar");
  }).length;
  const openScheduledRegistrations = sources.registrations.items.filter((item) => {
    const nextTime = oneRelationshipId(item as PlanningCenterResource<unknown>, "next_signup_time");
    return item.attributes.open === true && item.attributes.closed !== true && Boolean(nextTime);
  }).length;
  const linkedServiceTypes = new Set(allConnections
    .filter((item) => item.attributes.product_name === "services")
    .map((item) => String(item.attributes.connected_to_id ?? ""))
    .filter(Boolean));
  const mergedCalendarParents = publicParents.length - components.length;

  const candidates = events.map<PlanningCenterCanonicalEventDiagnostic>((event) => {
    const ambiguityFlags: PlanningCenterCanonicalEventDiagnostic["ambiguityFlags"] = [];
    const mergeReasons: PlanningCenterCanonicalEventDiagnostic["mergeReasons"] = [];
    const sameTitleSeries = repeatedTitleEventIds.has(event.id);
    const hasScheduleMismatch = event.providerIds.groupIds.some((id) => unmatchedGroupIds.has(id));
    const directCheckInIds = new Set(event.providerIds.calendarEventIds.flatMap((id) => connectionIds(sources, id, "check-ins")));
    const hasRegistrationCheckIn = event.providerIds.checkInEventIds.some((id) => !directCheckInIds.has(id));
    const sameNameCheckInIds = checkInTitles.get(normalizeTitle(event.title)) ?? [];
    const hasUnlinkedCrossProductRecord = !sameTitleSeries
      && event.providerIds.checkInEventIds.length === 0
      && sameNameCheckInIds.some((id) => !event.providerIds.checkInEventIds.includes(id));

    if (sameTitleSeries) ambiguityFlags.push("same-title");
    if (recurringOverlapEventIds.has(event.id)) ambiguityFlags.push("recurring-overlap");
    if (hasScheduleMismatch) ambiguityFlags.push("schedule-mismatch");
    if (hasUnlinkedCrossProductRecord) ambiguityFlags.push("unlinked-cross-product-record");

    if (event.providerIds.calendarInstanceIds.length > 1) mergeReasons.push("calendar-parent-instances");
    if (event.providerIds.calendarEventIds.length > 1) mergeReasons.push("shared-exact-group-id");
    if (event.providerIds.groupIds.length) mergeReasons.push("exact-event-connection-group");
    if (event.providerIds.groupEventIds.length) mergeReasons.push("exact-group-id-and-timestamp");
    if (event.providerIds.registrationIds.length) mergeReasons.push("exact-event-connection-registration");
    if (directCheckInIds.size) mergeReasons.push("exact-event-connection-check-ins");
    if (hasRegistrationCheckIn) mergeReasons.push("exact-registration-check-ins-link");
    if (event.providerIds.serviceTypeIds.length) mergeReasons.push("exact-event-connection-services");

    const eligibility = hasUnlinkedCrossProductRecord
      ? "ambiguous" as const
      : ambiguityFlags.length
        ? "public-needs-cleanup" as const
        : "public" as const;

    return {
      ambiguityFlags,
      canonicalId: event.id,
      checkInRelationship: event.providerIds.checkInEventIds.length > 0,
      contributingProducts: event.sourceMetadata.products,
      eligibility,
      exclusionReason: null,
      groupRelationship: event.providerIds.groupIds.length > 0,
      imageAvailable: Boolean(event.imageUrl),
      locationAvailable: event.occurrences.some((item) => Boolean(item.location)),
      mergeReasons,
      occurrenceCount: event.occurrences.length,
      providerIds: event.providerIds,
      registrationRelationship: {
        present: event.providerIds.registrationIds.length > 0,
        status: event.registration?.status ?? null,
      },
      seriesModel: sameTitleSeries
        ? "multiple-recurring-series-kept-separate"
        : event.occurrences.length > 1
          ? "recurring-series"
          : "single-event",
      servicesRelationship: event.providerIds.serviceTypeIds.length > 0,
      title: event.title,
    };
  });

  const eligibility = {
    ambiguous: candidates.filter((item) => item.eligibility === "ambiguous").length,
    internal: 0,
    past: 0,
    public: candidates.filter((item) => item.eligibility === "public").length,
    "public-needs-cleanup": candidates.filter((item) => item.eligibility === "public-needs-cleanup").length,
    "public-registration-only": candidates.filter((item) => item.eligibility === "public-registration-only").length,
  };

  const diagnostics: PlanningCenterEventRelationshipDiagnostics = {
    ambiguous: {
      sameTitleCalendarClusters: ambiguousSameTitleClusters,
      unmatchedPublicGroupOccurrences: eligibleGroupEvents.length - mergedGroupEventIds.size,
    },
    calendar: {
      futureInstances: sources.calendarInstances.total,
      futureParents: sources.calendarParents.total,
      publicInstances: publicInstances.length,
      publicParents: publicParents.length,
    },
    canonicalEvents: events.length,
    checkIns: {
      directCalendarConnections: checkInCalendarConnections,
      events: sources.checkInEvents.total,
      registrationIntegrationLinks: sources.checkInLinks.items.filter((item) => item.attributes.remote_app === "registrations").length,
    },
    connectedCalendarParents: connectedParentIds.length,
    connectionRecords: allConnections.length,
    coverage: {
      checkInLinked: candidates.filter((item) => item.checkInRelationship).length,
      groupLinked: candidates.filter((item) => item.groupRelationship).length,
      images: candidates.filter((item) => item.imageAvailable).length,
      locations: candidates.filter((item) => item.locationAvailable).length,
      registrationLinked: candidates.filter((item) => item.registrationRelationship.present).length,
      servicesLinked: candidates.filter((item) => item.servicesRelationship).length,
    },
    eligibility,
    excludedEvents: sources.calendarParents.total - publicParents.length,
    exclusionReasons,
    feeds: {
      feedOriginEvents,
      records: sources.feeds.total,
    },
    groups: {
      calendarConnections: groupCalendarConnections,
      eligibleFutureOccurrences: eligibleGroupEvents.length,
      futureEventRecords: sources.groupEvents.total,
      mergedOccurrences: mergedGroupEventIds.size,
    },
    mergedRecords: mergedCalendarParents + mergedGroupEventIds.size,
    publicEvents: events.length,
    registrations: {
      calendarConnections: registrationCalendarConnections,
      records: sources.registrations.total,
      scheduledOpenRecords: openScheduledRegistrations,
      unlinkedPublicCandidates: sources.registrations.items.filter((item) => (
        item.attributes.open === true
        && item.attributes.closed !== true
        && Boolean(item.attributes.new_registration_url)
        && !connectedRegistrationIds.has(item.id)
      )).length,
    },
    services: {
      calendarConnections: serviceCalendarConnections,
      linkedServiceTypes: linkedServiceTypes.size,
    },
  };

  return {
    calendarStatus: sources.calendarParents.status,
    candidates,
    checkInsStatus: sources.checkInEvents.status,
    diagnostics,
    events,
    servicesStatus: sources.serviceTypes.status,
  };
}

/** Read-only, exact-ID event aggregation. Public pages intentionally do not consume this yet. */
export async function getPlanningCenterEventAggregation() {
  if (cachedResult && cachedResult.expiresAt > Date.now()) return cachedResult.value;
  if (pendingResult) return pendingResult;

  pendingResult = readRelationshipSources().then(buildAggregation);
  try {
    const value = await pendingResult;
    cachedResult = { expiresAt: Date.now() + CACHE_TTL_MS, value };
    return value;
  } finally {
    pendingResult = null;
  }
}
