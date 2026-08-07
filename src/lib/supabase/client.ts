import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "./config";

let browserClient: SupabaseClient | undefined;

/**
 * Returns one browser-scoped Supabase client. No authentication behavior is
 * configured here; cookie-backed sessions are intentionally deferred.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (!browserClient) {
    const { url, publishableKey } = getSupabasePublicConfig();
    browserClient = createClient(url, publishableKey);
  }

  return browserClient;
}
