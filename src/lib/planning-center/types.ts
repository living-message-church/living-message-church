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
  registrations: {
    calendarConnections: number;
    records: number;
    scheduledOpenRecords: number;
  };
  services: {
    calendarConnections: number;
    linkedServiceTypes: number;
  };
}
