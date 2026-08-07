export type PlanningCenterEnvironmentState = "configured" | "missing";

export type PlanningCenterEndpointState =
  | "reachable"
  | "unavailable"
  | "forbidden"
  | "unauthorized"
  | "rate-limited"
  | "not-configured";

export interface PlanningCenterEnvironmentStatus {
  appId: PlanningCenterEnvironmentState;
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
  type: string;
}

export interface PlanningCenterCollectionResponse<TAttributes> {
  data: PlanningCenterResource<TAttributes>[];
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

export interface NormalizedEvent {
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
}
