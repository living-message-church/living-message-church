import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { getCreativePipelineDiagnostics } from "@/lib/creative/diagnostics";
import { inferCreativeStylePreset } from "@/lib/creative/presets";
import { buildEventArtworkPrompt } from "@/lib/creative/prompt-builder";
import { scanEligibleCalendarEvents } from "@/lib/creative/scan";

interface CreativeEventPreview {
  canonicalId: string;
  date: string;
  imageUrl: string | null;
  promptSummary: string;
  registrationLinked: boolean;
  stylePreset: string;
  title: string;
}

interface CreativeAdminProps {
  diagnostics: Awaited<ReturnType<typeof getCreativePipelineDiagnostics>>;
  events: CreativeEventPreview[];
}

export const getServerSideProps: GetServerSideProps<CreativeAdminProps> = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  const [diagnostics, candidates] = await Promise.all([
    getCreativePipelineDiagnostics(),
    scanEligibleCalendarEvents(),
  ]);
  const events = candidates.filter((candidate) => candidate.eligibility.eligible).map((candidate) => {
    const preset = inferCreativeStylePreset(candidate.event.title, candidate.event.category);
    const prompt = buildEventArtworkPrompt(candidate.event, preset);
    return {
      canonicalId: candidate.event.id,
      date: candidate.event.occurrences[0]?.startAt ?? "",
      imageUrl: candidate.event.imageUrl,
      promptSummary: prompt.publicSummary,
      registrationLinked: candidate.event.providerIds.registrationIds.length > 0,
      stylePreset: preset.name,
      title: candidate.event.title,
    };
  });
  return { props: { diagnostics, events } };
};

function displayDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" }).format(date);
}

export default function CreativeAdminPage({ diagnostics, events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const metrics = [
    ["Eligible Calendar events", diagnostics.eligibleCalendarCandidates],
    ["Registration linked", diagnostics.registrationLinkedCanonicalEvents],
    ["Unlinked registrations held", diagnostics.unlinkedRegistrationCandidates],
    ["Missing Planning Center art", diagnostics.eventsMissingArtwork],
    ["Jobs pending", diagnostics.registry.jobsPending ?? "—"],
    ["Approved assets", diagnostics.registry.approvedAssets ?? "—"],
  ];

  return (
    <>
      <SiteHead title="Event Creative | Living Message Church" description="Sanitized event creative workflow diagnostics." path="/admin/events/creative" noIndex />
      <div className="platform-page">
        <Container size="standard">
          <header className="platform-header">
            <p className="eyebrow">Creative pipeline</p>
            <h1>Event artwork review</h1>
            <p>Read-only Calendar candidates and sanitized creative direction. Generation and approval remain disabled until admin authentication is implemented.</p>
            <Link className="platform-back-link" href="/admin/platform">← Platform health</Link>
          </header>

          <section className="platform-status-panel" aria-labelledby="creative-status-title">
            <div className="platform-status-heading">
              <div><p className="eyebrow">Safe preview</p><h2 id="creative-status-title">Pipeline status</h2></div>
              <span className="platform-live-indicator">No mutations</span>
            </div>
            <div className="platform-metrics">
              {metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}
            </div>
            <p className="platform-security-note">
              Provider: {diagnostics.aiProvider.configured ? "Configured" : "Not configured"} · Database: {diagnostics.registry.state} · Private storage: {diagnostics.registry.storage}. No credential values are rendered.
            </p>
            <div className="creative-disabled-actions">
              <button disabled title="Admin authentication is required">Scan eligible Calendar events</button>
            </div>
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
                    <p>{displayDate(event.date)}</p>
                    <dl>
                      <div><dt>Registration</dt><dd>{event.registrationLinked ? "Verified relationship" : "No verified relationship"}</dd></div>
                      <div><dt>Prompt summary</dt><dd>{event.promptSummary}</dd></div>
                    </dl>
                    <div className="creative-concepts" aria-label="Concept review unavailable">
                      {["Concept A", "Concept B", "Concept C"].map((label) => <span key={label}>{label}<small>Awaiting authenticated generation</small></span>)}
                    </div>
                    <div className="creative-disabled-actions">
                      {['Approve', 'Reject', 'Regenerate', 'Select concept'].map((action) => <button disabled key={action} title="Admin authentication is required">{action}</button>)}
                    </div>
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
