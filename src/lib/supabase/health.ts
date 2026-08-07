import { getSupabasePublicConfig, getSupabasePublicEnvironmentStatus } from "./config";

export type SupabaseConnectionState = "connected" | "misconfigured" | "unavailable";

export interface SupabaseConnectionStatus {
  checkedAt: string;
  latencyMs: number | null;
  state: SupabaseConnectionState;
}

const HEALTH_CHECK_TIMEOUT_MS = 5_000;

/**
 * Checks the project's Auth health endpoint without reading application data,
 * creating a session, or using the service-role key.
 */
export async function checkSupabaseConnection(): Promise<SupabaseConnectionStatus> {
  const checkedAt = new Date().toISOString();

  if (!getSupabasePublicEnvironmentStatus().ready) {
    return { checkedAt, latencyMs: null, state: "misconfigured" };
  }

  const { url, publishableKey } = getSupabasePublicConfig();
  const startedAt = performance.now();

  try {
    const response = await fetch(new URL("auth/v1/health", `${url.replace(/\/+$/, "")}/`), {
      cache: "no-store",
      headers: { apikey: publishableKey },
      signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
    });

    return {
      checkedAt,
      latencyMs: Math.round(performance.now() - startedAt),
      state: response.ok ? "connected" : "unavailable",
    };
  } catch {
    return {
      checkedAt,
      latencyMs: Math.round(performance.now() - startedAt),
      state: "unavailable",
    };
  }
}
