import type { NextApiRequest, NextApiResponse } from "next";
import { sendContactEmail } from "@/lib/resend/contact";
import { contactTopics, type ContactSubmission, type ContactTopic } from "@/lib/resend/types";

type ContactBody = Partial<Record<"name" | "email" | "phone" | "topic" | "message" | "company", unknown>> & {
  consent?: unknown;
  startedAt?: unknown;
};

type RateEntry = { count: number; resetAt: number };
const rateLimit = new Map<string, RateEntry>();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;

function firstHeader(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getClientKey(req: NextApiRequest) {
  const forwarded = firstHeader(req.headers["x-forwarded-for"]);
  return forwarded?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimit.get(key);
  if (!current || current.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

function isSameOrigin(req: NextApiRequest) {
  const origin = firstHeader(req.headers.origin);
  const host = firstHeader(req.headers["x-forwarded-host"]) ?? firstHeader(req.headers.host);
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: ContactBody): { submission?: ContactSubmission; error?: string } {
  const name = stringValue(body.name);
  const email = stringValue(body.email).toLowerCase();
  const phone = stringValue(body.phone);
  const topic = stringValue(body.topic) as ContactTopic;
  const message = stringValue(body.message);

  if (name.length < 2 || name.length > 100) return { error: "Please enter your name." };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (phone.length > 40) return { error: "Please enter a valid phone number." };
  if (!(topic in contactTopics)) return { error: "Please choose a topic." };
  if (message.length < 10 || message.length > 5000) return { error: "Please enter a message between 10 and 5,000 characters." };
  if (body.consent !== true) return { error: "Please confirm that we may use your details to respond." };

  return { submission: { name, email, phone, topic, message } };
}

export const config = { api: { bodyParser: { sizeLimit: "16kb" } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST required." });
  }
  if (!firstHeader(req.headers["content-type"])?.toLowerCase().includes("application/json")) {
    return res.status(415).json({ error: "JSON required." });
  }
  if (!isSameOrigin(req)) return res.status(403).json({ error: "Request origin rejected." });
  if (isRateLimited(getClientKey(req))) {
    return res.status(429).json({ error: "Please wait a few minutes before sending another message." });
  }

  const body = (req.body ?? {}) as ContactBody;
  if (stringValue(body.company)) return res.status(200).json({ ok: true });

  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < 2_000 || elapsed > 24 * 60 * 60 * 1000) {
    return res.status(400).json({ error: "Please refresh the page and try again." });
  }

  const result = validate(body);
  if (!result.submission) return res.status(400).json({ error: result.error });

  try {
    await sendContactEmail(result.submission);
    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "CONTACT_DELIVERY_FAILED";
    if (message === "CONTACT_EMAIL_NOT_CONFIGURED") {
      return res.status(503).json({ error: "Contact delivery is temporarily unavailable." });
    }
    console.error("Contact delivery failed", { reason: message });
    return res.status(502).json({ error: "We could not send your message. Please try again or email the church directly." });
  }
}
