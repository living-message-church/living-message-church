import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminIdentity, requireAdminRole } from "@/lib/supabase/auth";
import type { AuthenticatedCreativeAdmin } from "@/lib/creative/workflow";

function firstHeader(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function assertSameOriginPost(req: NextApiRequest) {
  if (req.method !== "POST") throw new Error("METHOD_NOT_ALLOWED");
  const contentType = firstHeader(req.headers["content-type"]);
  if (!contentType?.toLowerCase().includes("application/json")) throw new Error("UNSUPPORTED_MEDIA_TYPE");
  const origin = firstHeader(req.headers.origin);
  const forwardedHost = firstHeader(req.headers["x-forwarded-host"]);
  const host = forwardedHost ?? firstHeader(req.headers.host);
  const protocol = firstHeader(req.headers["x-forwarded-proto"]) ?? (host?.startsWith("localhost") ? "http" : "https");
  if (!origin || !host || origin !== `${protocol}://${host}`) throw new Error("INVALID_ORIGIN");
}

export async function requireCreativeAdmin(req: NextApiRequest, res: NextApiResponse): Promise<AuthenticatedCreativeAdmin> {
  const identity = await getAdminIdentity(req, res);
  if (!identity) throw new Error("AUTHENTICATION_REQUIRED");
  requireAdminRole(identity);
  return { authenticated: true, email: identity.email, role: "admin", subject: identity.userId };
}
