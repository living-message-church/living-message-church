export type PlanningCenterEnvironmentState = "configured" | "missing";

export type PlanningCenterEndpointState =
  | "reachable"
  | "unavailable"
  | "forbidden"
  | "unauthorized"
  | "rate-limited"
  | "not-configured";

export interface PlanningCenterEnvironmentStatus {
  clientId: PlanningCenterEnvironmentState;
  ready: boolean;
  secret: PlanningCenterEnvironmentState;
}

export interface PlanningCenterEndpointStatus {
  latencyMs: number | null;
  state: PlanningCenterEndpointState;
  statusCode: number | null;
}

export interface PlanningCenterResource<TAttributes> {
  attributes: TAttributes;
  id: string;
  relationships?: Record<string, PlanningCenterRelationship>;
  type: string;
}

export interface PlanningCenterResourceIdentifier {
  id: string;
  type: string;
}

export interface PlanningCenterRelationship {
  data: PlanningCenterResourceIdentifier | PlanningCenterResourceIdentifier[] | null;
}

export interface PlanningCenterCollectionResponse<TAttributes> {
  data: PlanningCenterResource<TAttributes>[];
  included?: PlanningCenterResource<Record<string, unknown>>[];
  links?: Record<string, string | null>;
  meta?: {
    count?: number;
    total_count?: number;
  };
}

export interface PlanningCenterSingleResponse<TAttributes> {
  data: PlanningCenterResource<TAttributes>;
}

export interface PlanningCenterRequestOptions {
  apiVersion: string;
  query?: Record<string, boolean | number | string | undefined>;
}

export interface PlanningCenterAdapterResult<T> {
  items: T[];
  status: PlanningCenterEndpointStatus;
  totalDiscovered: number;
  truncated: boolean;
}

/** Legacy Calendar-only projection retained for the Online Church schedule. */
export interface CalendarEventProjection {
  allDay: boolean;
  description: string | null;
  endAt: string | null;
  imageUrl: string | null;
  location: string | null;
  publicUrl: string;
  source: "planning-center-calendar";
  startAt: string;
  title: string;
}

export type PlanningCenterProduct =
  | "calendar"
  | "check-ins"
  | "groups"
  | "registrations"
  | "services";

export type PlanningCenterEventAmbiguityClass =
  | "conflicting-dates"
  | "conflicting-locations"
  | "recurring-overlap"
  | "same-ministry"
  | "same-title"
  | "schedule-mismatch"
  | "unlinked-cross-product-record"
  | "unverified-duplicate";

export type PlanningCenterEventEligibility =
  | "ambiguous"
  | "internal"
  | "past"
  | "public"
  | "public-needs-cleanup"
  | "public-registration-only";

export type PlanningCenterEventMergeReason =
  | "calendar-parent-instances"
  | "exact-event-connection-check-ins"
  | "exact-event-connection-group"
  | "exact-event-connection-registration"
  | "exact-event-connection-services"
  | "exact-group-id-and-timestamp"
  | "exact-registration-check-ins-link"
  | "shared-exact-group-id";

export type PlanningCenterEventSeriesModel =
  | "multiple-recurring-series-kept-separate"
  | "recurring-series"
  | "single-event";

export interface NormalizedEventOccurrence {
  allDay: boolean;
  endAt: string | null;
  id: string;
  location: string | null;
  startAt: string;
}

/**
 * Relationship-aware public event assembled from exact Planning Center IDs.
 * This model is intentionally not wired to public pages until the ambiguous
 * relationship clusters recorded by diagnostics receive human verification.
 */
export interface NormalizedEvent {
  category: string | null;
  description: string | null;
  featured: boolean;
  group: {
    id: string;
    publicUrl: string | null;
  } | null;
  id: string;
  imageUrl: string | null;
  occurrences: NormalizedEventOccurrence[];
  providerIds: {
    calendarEventIds: string[];
    calendarInstanceIds: string[];
    checkInEventIds: string[];
    groupEventIds: string[];
    groupIds: string[];
    registrationIds: string[];
    serviceTypeIds: string[];
  };
  publicUrl: string;
  publicVisibility: "published";
  recurrence: string | null;
  registration: {
    available: boolean;
    full: boolean;
    status: "closed" | "full" | "open" | "unavailable";
    url: string | null;
  } | null;
  slug: string;
  sourceMetadata: {
    products: PlanningCenterProduct[];
    updatedAt: string | null;
  };
  title: string;
}

/** Sanitized evidence record for the no-index diagnostics route. */
export interface PlanningCenterCanonicalEventDiagnostic {
  ambiguityFlags: PlanningCenterEventAmbiguityClass[];
  canonicalId: string;
  checkInRelationship: boolean;
  contributingProducts: PlanningCenterProduct[];
  eligibility: PlanningCenterEventEligibility;
  exclusionReason: string | null;
  groupRelationship: boolean;
  imageAvailable: boolean;
  locationAvailable: boolean;
  mergeReasons: PlanningCenterEventMergeReason[];
  occurrenceCount: number;
  providerIds: NormalizedEvent["providerIds"];
  registrationRelationship: {
    present: boolean;
    status: "closed" | "full" | "open" | "unavailable" | null;
  };
  seriesModel: PlanningCenterEventSeriesModel;
  servicesRelationship: boolean;
  title: string;
}

/** A public signup opportunity, never an attendee or submitted registration. */
export interface NormalizedRegistration {
  closesAt: string | null;
  description: string | null;
  full: boolean;
  open: boolean;
  opensAt: string | null;
  publicUrl: string;
  source: "planning-center-registrations";
  title: string;
}

export interface NormalizedGroup {
  description: string | null;
  imageUrl: string | null;
  publicUrl: string;
  published: true;
  schedule: string | null;
  source: "planning-center-groups";
  title: string;
}

export interface PlanningCenterDiagnostics {
  api: PlanningCenterEndpointStatus;
  calendar: PlanningCenterEndpointStatus;
  checkedAt: string;
  environment: PlanningCenterEnvironmentStatus;
  events: {
    candidates: PlanningCenterCanonicalEventDiagnostic[];
    samples: NormalizedEvent[];
    totalDiscovered: number | null;
    truncated: boolean;
  };
  groups: {
    samples: NormalizedGroup[];
    totalDiscovered: number | null;
    truncated: boolean;
  };
  organization: PlanningCenterEndpointStatus;
  registrations: {
    samples: NormalizedRegistration[];
    totalDiscovered: number | null;
    truncated: boolean;
  };
  registrationsEndpoint: PlanningCenterEndpointStatus;
  groupsEndpoint: PlanningCenterEndpointStatus;
  relationships: PlanningCenterEventRelationshipDiagnostics | null;
  servicesEndpoint: PlanningCenterEndpointStatus;
  checkInsEndpoint: PlanningCenterEndpointStatus;
}

export interface PlanningCenterEventRelationshipDiagnostics {
  ambiguous: {
    sameTitleCalendarClusters: number;
    unmatchedPublicGroupOccurrences: number;
  };
  calendar: {
    futureInstances: number;
    futureParents: number;
    publicInstances: number;
    publicParents: number;
  };
  canonicalEvents: number;
  checkIns: {
    directCalendarConnections: number;
    events: number;
    registrationIntegrationLinks: number;
  };
  connectedCalendarParents: number;
  connectionRecords: number;
  excludedEvents: number;
  exclusionReasons: {
    linkOnly: number;
    notApproved: number;
    notChurchCenterPublished: number;
    other: number;
  };
  feeds: {
    feedOriginEvents: number;
    records: number;
  };
  groups: {
    calendarConnections: number;
    eligibleFutureOccurrences: number;
    futureEventRecords: number;
    mergedOccurrences: number;
  };
  mergedRecords: number;
  publicEvents: number;
  coverage: {
    checkInLinked: number;
    groupLinked: number;
    images: number;
    locations: number;
    registrationLinked: number;
    servicesLinked: number;
  };
  eligibility: Record<PlanningCenterEventEligibility, number>;
  registrations: {
    calendarConnections: number;
    records: number;
    scheduledOpenRecords: number;
    unlinkedPublicCandidates: number;
  };
  services: {
    calendarConnections: number;
    linkedServiceTypes: number;
  };
}
