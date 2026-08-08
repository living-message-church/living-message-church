import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig, type EnvironmentVariableState } from "./config";

export interface SupabaseServerEnvironmentStatus {
  serviceRoleKey: EnvironmentVariableState;
}

/**
 * Creates a request-independent, publishable-key client for server work that
 * does not act on behalf of a signed-in user. RLS remains in force.
 */
export function createSupabaseServerClient(): SupabaseClient {
  const { url, publishableKey } = getSupabasePublicConfig();

  return createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

/**
 * Creates a server-only service-role client for approved platform workflows.
 * Never import this helper from a Client Component or expose it through a
 * browser-callable route. The creative pipeline uses it only after an
 * authenticated administrative boundary is available.
 */
export function createSupabaseAdminClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("The Supabase admin client is server-only.");
  }

  const { url } = getSupabasePublicConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!serviceRoleKey) {
    throw new Error("Supabase administrative configuration is incomplete.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

/**
 * Reports only whether the server-only key exists. Its value is never returned.
 */
export function getSupabaseServerEnvironmentStatus(): SupabaseServerEnvironmentStatus {
  return {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ? "configured" : "missing",
  };
}
