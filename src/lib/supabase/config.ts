export const SUPABASE_PUBLIC_ENVIRONMENT_VARIABLES = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
] as const;

export type EnvironmentVariableState = "configured" | "invalid" | "missing";

export interface SupabasePublicEnvironmentStatus {
  publishableKey: EnvironmentVariableState;
  ready: boolean;
  url: EnvironmentVariableState;
}

export class SupabaseConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseConfigurationError";
  }
}

function getUrlState(value: string | undefined): EnvironmentVariableState {
  if (!value?.trim()) return "missing";

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.hostname === "localhost" ? "configured" : "invalid";
  } catch {
    return "invalid";
  }
}

function getValueState(value: string | undefined): EnvironmentVariableState {
  return value?.trim() ? "configured" : "missing";
}

export function getSupabasePublicEnvironmentStatus(): SupabasePublicEnvironmentStatus {
  const url = getUrlState(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publishableKey = getValueState(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  return {
    url,
    publishableKey,
    ready: url === "configured" && publishableKey === "configured",
  };
}

export function getSupabasePublicConfig() {
  const status = getSupabasePublicEnvironmentStatus();

  if (!status.ready) {
    const invalidVariables = [
      status.url !== "configured" ? SUPABASE_PUBLIC_ENVIRONMENT_VARIABLES[0] : null,
      status.publishableKey !== "configured" ? SUPABASE_PUBLIC_ENVIRONMENT_VARIABLES[1] : null,
    ].filter(Boolean);

    throw new SupabaseConfigurationError(
      `Supabase public configuration is incomplete: ${invalidVariables.join(", ")}`,
    );
  }

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!.trim(),
  };
}
