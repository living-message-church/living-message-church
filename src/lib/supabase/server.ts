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
 * Reports only whether the server-only key exists. The key is deliberately not
 * returned or used until an approved administrative use case requires it.
 */
export function getSupabaseServerEnvironmentStatus(): SupabaseServerEnvironmentStatus {
  return {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ? "configured" : "missing",
  };
}
