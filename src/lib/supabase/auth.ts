import { createServerClient, serializeCookieHeader } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getSupabasePublicConfig } from "./config";

export type AdminRole = "admin" | "viewer";

export interface AdminIdentity {
  email: string | null;
  role: AdminRole;
  userId: string;
}

type RequestLike = GetServerSidePropsContext["req"] | NextApiRequest;
type ResponseLike = GetServerSidePropsContext["res"] | NextApiResponse;

function appendSetCookie(res: ResponseLike, values: string[]) {
  const current = res.getHeader("Set-Cookie");
  const existing = Array.isArray(current) ? current.map(String) : current ? [String(current)] : [];
  res.setHeader("Set-Cookie", [...existing, ...values]);
}

export function createSupabaseRequestClient(req: RequestLike, res: ResponseLike) {
  const { url, publishableKey } = getSupabasePublicConfig();
  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return Object.entries(req.cookies).map(([name, value]) => ({ name, value: value ?? "" }));
      },
      setAll(cookiesToSet) {
        appendSetCookie(res, cookiesToSet.map(({ name, value, options }) => serializeCookieHeader(name, value, options)));
      },
    },
  });
}

function roleFromUser(user: User): AdminRole | null {
  const value = user.app_metadata?.admin_role;
  return value === "admin" || value === "viewer" ? value : null;
}

/** Uses a server-confirmed Supabase Auth user; client-provided role data is ignored. */
export async function getAdminIdentity(req: RequestLike, res: ResponseLike): Promise<AdminIdentity | null> {
  const client = createSupabaseRequestClient(req, res);
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return null;
  const role = roleFromUser(data.user);
  if (!role) return null;
  return { email: data.user.email ?? null, role, userId: data.user.id };
}

export function requireAdminRole(identity: AdminIdentity | null): asserts identity is AdminIdentity & { role: "admin" } {
  if (!identity || identity.role !== "admin") {
    throw new Error("Administrator authorization is required.");
  }
}

export function adminLoginRedirect(resolvedUrl: string) {
  const next = resolvedUrl.startsWith("/admin/") || resolvedUrl === "/admin/platform"
    ? resolvedUrl
    : "/admin/platform";
  return `/admin/login?next=${encodeURIComponent(next)}`;
}
