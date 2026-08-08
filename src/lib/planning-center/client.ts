import {
  getPlanningCenterConfig,
  PLANNING_CENTER_API_BASE_URL,
  PLANNING_CENTER_REQUEST_TIMEOUT_MS,
  PlanningCenterConfigurationError,
} from "./config";
import {
  assertPlanningCenterReadOnlyMethod,
  PLANNING_CENTER_READ_ONLY_METHOD,
} from "./read-only-policy";
import type { PlanningCenterRequestOptions } from "./types";

type PlanningCenterErrorCode =
  | "configuration"
  | "forbidden"
  | "http"
  | "invalid-response"
  | "network"
  | "rate-limited"
  | "timeout"
  | "unauthorized";

export class PlanningCenterRequestError extends Error {
  readonly code: PlanningCenterErrorCode;
  readonly latencyMs: number | null;
  readonly retryAfterSeconds: number | null;
  readonly statusCode: number | null;

  constructor({
    code,
    latencyMs = null,
    retryAfterSeconds = null,
    statusCode = null,
  }: {
    code: PlanningCenterErrorCode;
    latencyMs?: number | null;
    retryAfterSeconds?: number | null;
    statusCode?: number | null;
  }) {
    super(safeMessage(code));
    this.name = "PlanningCenterRequestError";
    this.code = code;
    this.latencyMs = latencyMs;
    this.retryAfterSeconds = retryAfterSeconds;
    this.statusCode = statusCode;
  }
}

function safeMessage(code: PlanningCenterErrorCode) {
  switch (code) {
    case "configuration": return "Planning Center is not configured.";
    case "unauthorized": return "Planning Center rejected the configured credentials.";
    case "forbidden": return "Planning Center denied access to this product.";
    case "rate-limited": return "Planning Center temporarily rate limited this request.";
    case "timeout": return "Planning Center did not respond before the request timeout.";
    case "invalid-response": return "Planning Center returned an unexpected response.";
    default: return "Planning Center is currently unavailable.";
  }
}

function errorCodeForStatus(status: number): PlanningCenterErrorCode {
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 429) return "rate-limited";
  return "http";
}

function parseRetryAfter(value: string | null) {
  if (!value) return null;
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : null;
}

function createUrl(path: string, query: PlanningCenterRequestOptions["query"]) {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new PlanningCenterRequestError({ code: "invalid-response" });
  }

  const url = new URL(path, PLANNING_CENTER_API_BASE_URL);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });
  return url;
}

export interface PlanningCenterResponse<T> {
  data: T;
  latencyMs: number;
  statusCode: number;
}

/**
 * Minimal read-only Planning Center client. It intentionally exposes GET only,
 * keeps Basic credentials inside server execution, and never returns raw errors.
 */
export async function planningCenterGet<T>(
  path: string,
  options: PlanningCenterRequestOptions,
): Promise<PlanningCenterResponse<T>> {
  assertPlanningCenterReadOnlyMethod(PLANNING_CENTER_READ_ONLY_METHOD);

  let credentials: ReturnType<typeof getPlanningCenterConfig>;
  try {
    credentials = getPlanningCenterConfig();
  } catch (error) {
    if (error instanceof PlanningCenterConfigurationError) {
      throw new PlanningCenterRequestError({ code: "configuration" });
    }
    throw error;
  }

  const authorization = Buffer.from(`${credentials.clientId}:${credentials.secret}`).toString("base64");
  const startedAt = performance.now();

  try {
    const response = await fetch(createUrl(path, options.query), {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Basic ${authorization}`,
        "X-PCO-API-Version": options.apiVersion,
      },
      method: PLANNING_CENTER_READ_ONLY_METHOD,
      signal: AbortSignal.timeout(PLANNING_CENTER_REQUEST_TIMEOUT_MS),
    });
    const latencyMs = Math.round(performance.now() - startedAt);

    if (!response.ok) {
      throw new PlanningCenterRequestError({
        code: errorCodeForStatus(response.status),
        latencyMs,
        retryAfterSeconds: parseRetryAfter(response.headers.get("retry-after")),
        statusCode: response.status,
      });
    }

    try {
      return {
        data: await response.json() as T,
        latencyMs,
        statusCode: response.status,
      };
    } catch {
      throw new PlanningCenterRequestError({
        code: "invalid-response",
        latencyMs,
        statusCode: response.status,
      });
    }
  } catch (error) {
    if (error instanceof PlanningCenterRequestError) throw error;

    const timedOut = error instanceof DOMException && error.name === "TimeoutError";
    throw new PlanningCenterRequestError({
      code: timedOut ? "timeout" : "network",
      latencyMs: Math.round(performance.now() - startedAt),
    });
  }
}
