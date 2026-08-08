import type { NextApiRequest, NextApiResponse } from "next";
import { assertSameOriginPost, requireCreativeAdmin } from "@/lib/admin/request-security";
import { scanEligibleCalendarEvents } from "@/lib/creative/scan";
import { CREATIVE_V1_TEST_EVENT_ID } from "@/lib/creative/test-event";
import {
  approveCreativeAsset,
  generateCreativeConcepts,
  recordCreativeScan,
  rejectCreativeAsset,
  selectCreativeAsset,
} from "@/lib/creative/workflow";

type Action = "approve" | "generate" | "regenerate" | "reject" | "scan" | "select";

function bodyString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  try {
    assertSameOriginPost(req);
    const actor = await requireCreativeAdmin(req, res);
    const action = bodyString(req.body?.action) as Action;
    const canonicalEventId = bodyString(req.body?.canonicalEventId);
    const assetId = bodyString(req.body?.assetId);

    if (action === "scan") {
      const candidates = await scanEligibleCalendarEvents();
      const eligibleCount = candidates.filter((candidate) => candidate.eligibility.eligible).length;
      await recordCreativeScan(actor, eligibleCount);
      return res.status(200).json({ eligibleCount, ok: true });
    }

    if (action === "generate" || action === "regenerate") {
      if (canonicalEventId !== CREATIVE_V1_TEST_EVENT_ID) {
        return res.status(409).json({ error: "V1 generation is restricted to the approved single test event." });
      }
      const candidates = await scanEligibleCalendarEvents();
      const candidate = candidates.find((item) => item.event.id === canonicalEventId);
      if (!candidate) return res.status(404).json({ error: "Eligible canonical event not found." });
      const result = await generateCreativeConcepts(actor, candidate, action === "regenerate" ? "manual" : "missing-artwork");
      return res.status(200).json({ ...result, ok: true });
    }

    if (!canonicalEventId || !assetId) return res.status(400).json({ error: "Event and asset are required." });
    if (action === "approve") await approveCreativeAsset(actor, canonicalEventId, assetId);
    else if (action === "reject") await rejectCreativeAsset(actor, canonicalEventId, assetId);
    else if (action === "select") await selectCreativeAsset(actor, canonicalEventId, assetId);
    else return res.status(400).json({ error: "Unsupported creative action." });
    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Creative request failed.";
    if (message === "METHOD_NOT_ALLOWED") return res.status(405).json({ error: "POST required." });
    if (message === "UNSUPPORTED_MEDIA_TYPE") return res.status(415).json({ error: "JSON required." });
    if (message === "INVALID_ORIGIN") return res.status(403).json({ error: "Request origin rejected." });
    if (message === "AUTHENTICATION_REQUIRED") return res.status(401).json({ error: "Authentication required." });
    if (/authorization|required/i.test(message)) return res.status(403).json({ error: "Administrator access required." });
    return res.status(503).json({ error: message });
  }
}
