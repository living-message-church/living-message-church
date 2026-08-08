import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { getCreativePipelineDiagnostics } from "@/lib/creative/diagnostics";
import { inferCreativeStylePreset } from "@/lib/creative/presets";
import { buildEventArtworkPrompt } from "@/lib/creative/prompt-builder";
import { scanEligibleCalendarEvents } from "@/lib/creative/scan";
import { AdminSession } from "@/components/admin/admin-session";
import { adminLoginRedirect, getAdminIdentity, type AdminIdentity } from "@/lib/supabase/auth";
import { getCreativeReviewJobs } from "@/lib/creative/repository";
import type { CreativeReviewJob } from "@/lib/creative/types";
import { CREATIVE_V1_TEST_EVENT_ID } from "@/lib/creative/test-event";

interface CreativeEventPreview {
  canonicalId: string;
  date: string;
  imageUrl: string | null;
  promptSummary: string;
  registrationLinked: boolean;
  reviewJobs: CreativeReviewJob[];
  stylePreset: string;
  testEvent: boolean;
  title: string;
}

interface CreativeAdminProps {
  diagnostics: Awaited<ReturnType<typeof getCreativePipelineDiagnostics>>;
  events: CreativeEventPreview[];
  identity: AdminIdentity;
}

export const getServerSideProps: GetServerSideProps<CreativeAdminProps> = async ({ req, res, resolvedUrl }) => {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  const identity = await getAdminIdentity(req, res);
  if (!identity) return { redirect: { destination: adminLoginRedirect(resolvedUrl), permanent: false } };
  const [diagnostics, candidates] = await Promise.all([
    getCreativePipelineDiagnostics(),
    scanEligibleCalendarEvents(),
  ]);
  const eligibleCandidates = candidates.filter((candidate) => candidate.eligibility.eligible);
  const reviewJobs = await getCreativeReviewJobs(eligibleCandidates.map((candidate) => candidate.event.id));
  const events = eligibleCandidates.map((candidate) => {
    const preset = inferCreativeStylePreset(candidate.event.title, candidate.event.category);
    const prompt = buildEventArtworkPrompt(candidate.event, preset);
    return {
      canonicalId: candidate.event.id,
      date: candidate.event.occurrences[0]?.startAt ?? "",
      imageUrl: candidate.event.imageUrl,
      promptSummary: prompt.publicSummary,
      registrationLinked: candidate.event.providerIds.registrationIds.length > 0,
      reviewJobs: reviewJobs.filter((job) => job.canonicalEventId === candidate.event.id),
      stylePreset: preset.name,
      testEvent: candidate.event.id === CREATIVE_V1_TEST_EVENT_ID,
      title: candidate.event.title,
    };
  });
  return { props: { diagnostics, events, identity } };
};

function displayDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" }).format(date);
}

export default function CreativeAdminPage({ diagnostics, events, identity }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const canMutate = identity.role === "admin" && diagnostics.registry.audit === "available";

  async function runAction(action: string, canonicalEventId?: string, assetId?: string) {
    setBusy(`${action}:${assetId ?? canonicalEventId ?? "all"}`);
    setActionError(null);
    const response = await fetch("/api/admin/creative", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, assetId, canonicalEventId }),
    });
    const body = await response.json() as { error?: string };
    if (!response.ok) setActionError(body.error ?? "The creative action failed.");
    else await router.replace(router.asPath);
    setBusy(null);
  }
  const metrics = [
    ["Eligible Calendar events", diagnostics.eligibleCalendarCandidates],
    ["Registration linked", diagnostics.registrationLinkedCanonicalEvents],
    ["Unlinked registrations held", diagnostics.unlinkedRegistrationCandidates],
    ["Missing Planning Center art", diagnostics.eventsMissingArtwork],
    ["Jobs pending", diagnostics.registry.jobsPending ?? "—"],
    ["Approved assets", diagnostics.registry.approvedAssets ?? "—"],
    ["Test concepts stored", diagnostics.test?.concepts ?? "—"],
    ["Test override", diagnostics.test?.publicOverrideResolved ? "Resolved" : "Not resolved"],
  ];

  return (
    <>
      <SiteHead title="Event Creative | Living Message Church" description="Sanitized event creative workflow diagnostics." path="/admin/events/creative" noIndex />
      <div className="platform-page">
        <Container size="standard">
          <header className="platform-header">
            <AdminSession identity={identity} />
            <p className="eyebrow">Creative pipeline</p>
            <h1>Event artwork review</h1>
            <p>Authenticated review of Calendar-origin creative work. Planning Center remains read-only; every creative mutation is confined to Supabase.</p>
            <Link className="platform-back-link" href="/admin/platform">← Platform health</Link>
          </header>

          <section className="platform-status-panel" aria-labelledby="creative-status-title">
            <div className="platform-status-heading">
              <div><p className="eyebrow">Safe preview</p><h2 id="creative-status-title">Pipeline status</h2></div>
              <span className="platform-live-indicator">{identity.role === "admin" ? "Admin" : "Viewer"}</span>
            </div>
            <div className="platform-metrics">
              {metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}
            </div>
            <p className="platform-security-note">
              Provider: {diagnostics.aiProvider.configured ? "Configured" : "Not configured"} · Database: {diagnostics.registry.state} · Audit: {diagnostics.registry.audit} · Private storage: {diagnostics.registry.storage}. No credential values are rendered.
            </p>
            <div className="creative-disabled-actions">
              <button disabled={!canMutate || busy !== null} onClick={() => runAction("scan")}>Scan eligible Calendar events</button>
            </div>
            {actionError ? <p className="admin-form-error" role="alert">{actionError}</p> : null}
          </section>

          <section className="platform-samples" aria-labelledby="creative-candidates-title">
            <div className="platform-samples-heading"><p className="eyebrow">Calendar-origin only</p><h2 id="creative-candidates-title">Eligible canonical candidates</h2></div>
            <div className="creative-preview-grid">
              {events.map((event) => (
                <article className="creative-preview-card" key={event.canonicalId}>
                  <div className="creative-preview-image" style={event.imageUrl ? { backgroundImage: `url(${event.imageUrl})` } : undefined}>
                    <span>{event.imageUrl ? "Planning Center artwork" : "Artwork needed"}</span>
                  </div>
                  <div className="creative-preview-copy">
                    <p className="eyebrow">{event.stylePreset}</p>
                    <h3>{event.title}</h3>
                    {event.testEvent ? <span className="platform-live-indicator">Single v1 test event</span> : null}
                    <p>{displayDate(event.date)}</p>
                    <dl>
                      <div><dt>Registration</dt><dd>{event.registrationLinked ? "Verified relationship" : "No verified relationship"}</dd></div>
                      <div><dt>Prompt summary</dt><dd>{event.promptSummary}</dd></div>
                    </dl>
                    {event.reviewJobs.length ? event.reviewJobs.map((job) => (
                      <div className="creative-review-job" key={job.id}>
                        <p>Generation {job.generationVersion} · {job.generationStatus} · {displayDate(job.createdAt)}</p>
                        <div className="creative-concepts" aria-label={`Generation ${job.generationVersion} concepts`}>
                          {job.assets.map((asset, index) => (
                            <article key={asset.id}>
                              <div className="creative-concept-image" style={{ backgroundImage: `url(${asset.signedUrl})` }} />
                              <strong>Concept {String.fromCharCode(65 + index)}</strong>
                              <small>{asset.provider} · {asset.model} · {asset.status}</small>
                              <div className="creative-disabled-actions">
                                <button disabled={!canMutate || busy !== null} onClick={() => runAction("approve", event.canonicalId, asset.id)}>Approve</button>
                                <button disabled={!canMutate || busy !== null} onClick={() => runAction("select", event.canonicalId, asset.id)}>Select</button>
                                <button disabled={!canMutate || busy !== null} onClick={() => runAction("reject", event.canonicalId, asset.id)}>Reject</button>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    )) : (
                      <div className="creative-concepts"><span>Concept A<small>Not generated</small></span><span>Concept B<small>Not generated</small></span><span>Concept C<small>Not generated</small></span></div>
                    )}
                    {event.testEvent ? (
                      <div className="creative-disabled-actions">
                        <button disabled={!canMutate || !diagnostics.aiProvider.configured || busy !== null} onClick={() => runAction(event.reviewJobs.length ? "regenerate" : "generate", event.canonicalId)}>
                          {event.reviewJobs.length ? "Regenerate three concepts" : "Generate three concepts"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
