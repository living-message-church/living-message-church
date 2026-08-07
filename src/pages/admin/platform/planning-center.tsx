import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { getPlanningCenterDiagnostics } from "@/lib/planning-center/diagnostics";
import type {
  NormalizedEvent,
  NormalizedGroup,
  NormalizedRegistration,
  PlanningCenterDiagnostics,
  PlanningCenterEndpointState,
} from "@/lib/planning-center/types";

interface PlanningCenterPageProps {
  diagnostics: PlanningCenterDiagnostics;
}

function stateLabel(state: PlanningCenterEndpointState) {
  return state.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
}

function StatusPill({ state }: { state: PlanningCenterEndpointState }) {
  const tone = state === "reachable" ? "healthy" : state === "not-configured" ? "warning" : "unavailable";
  return <span className={`platform-diagnostic-pill platform-check-${tone}`}>{stateLabel(state)}</span>;
}

function displayDate(value: string | null) {
  if (!value) return "Not supplied";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not supplied"
    : new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function EventSample({ item }: { item: NormalizedEvent }) {
  return (
    <article className="platform-sample-card">
      <p className="eyebrow">Calendar event</p>
      <h3>{item.title}</h3>
      <dl><div><dt>Starts</dt><dd>{displayDate(item.startAt)}</dd></div><div><dt>Location</dt><dd>{item.location ?? "Not supplied"}</dd></div></dl>
      <a href={item.publicUrl} target="_blank" rel="noreferrer">Open public Church Center record <span aria-hidden="true">↗</span></a>
    </article>
  );
}

function RegistrationSample({ item }: { item: NormalizedRegistration }) {
  return (
    <article className="platform-sample-card">
      <p className="eyebrow">Public signup</p>
      <h3>{item.title}</h3>
      <dl><div><dt>Status</dt><dd>{item.open ? "Open" : "Not open"}{item.full ? " · Full" : ""}</dd></div><div><dt>Closes</dt><dd>{displayDate(item.closesAt)}</dd></div></dl>
      <a href={item.publicUrl} target="_blank" rel="noreferrer">Open public registration page <span aria-hidden="true">↗</span></a>
    </article>
  );
}

function GroupSample({ item }: { item: NormalizedGroup }) {
  return (
    <article className="platform-sample-card">
      <p className="eyebrow">Published group</p>
      <h3>{item.title}</h3>
      <dl><div><dt>Schedule</dt><dd>{item.schedule ?? "Not supplied"}</dd></div><div><dt>Visibility</dt><dd>Listed on Church Center</dd></div></dl>
      <a href={item.publicUrl} target="_blank" rel="noreferrer">Open public Church Center record <span aria-hidden="true">↗</span></a>
    </article>
  );
}

export const getServerSideProps: GetServerSideProps<PlanningCenterPageProps> = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  return { props: { diagnostics: await getPlanningCenterDiagnostics() } };
};

export default function PlanningCenterPlatformPage({
  diagnostics,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const endpointRows = [
    ["API", diagnostics.api.state],
    ["Organization", diagnostics.organization.state],
    ["Calendar", diagnostics.calendar.state],
    ["Registrations", diagnostics.registrationsEndpoint.state],
    ["Groups", diagnostics.groupsEndpoint.state],
  ] as const;
  const samples = [
    ...diagnostics.events.samples.map((item) => <EventSample item={item} key={`event-${item.publicUrl}`} />),
    ...diagnostics.registrations.samples.map((item) => <RegistrationSample item={item} key={`registration-${item.publicUrl}`} />),
    ...diagnostics.groups.samples.map((item) => <GroupSample item={item} key={`group-${item.publicUrl}`} />),
  ];

  return (
    <>
      <SiteHead
        title="Planning Center Diagnostics | Living Message Church"
        description="Read-only Planning Center adapter diagnostics for the Living Message Church platform."
        path="/admin/platform/planning-center"
        noIndex
      />
      <div className="platform-page">
        <Container size="content">
          <header className="platform-header">
            <p className="eyebrow">Planning Center foundation</p>
            <h1>Provider diagnostics</h1>
            <p>Sanitized, read-only checks for public Calendar, signup, and published Groups data.</p>
            <Link href="/admin/platform" className="platform-back-link">← System health</Link>
          </header>

          <section className="platform-status-panel" aria-labelledby="planning-status-title">
            <div className="platform-status-heading">
              <div><p className="eyebrow">Current request</p><h2 id="planning-status-title">Connection status</h2></div>
              <span className="platform-live-indicator">Live check</span>
            </div>
            <dl className="platform-check-list">
              <div className="platform-check"><dt>Environment</dt><dd><strong>{diagnostics.environment.ready ? "Configured" : "Missing"}</strong><span>Credential values are never displayed.</span></dd></div>
              {endpointRows.map(([label, state]) => <div className="platform-check" key={label}><dt>{label}</dt><dd><StatusPill state={state} /></dd></div>)}
            </dl>
          </section>

          <section className="platform-metrics" aria-label="Planning Center discovery counts">
            <article><span>Upcoming public events</span><strong>{diagnostics.events.totalDiscovered ?? "—"}</strong></article>
            <article><span>Public signup opportunities</span><strong>{diagnostics.registrations.totalDiscovered ?? "—"}</strong></article>
            <article><span>Published groups</span><strong>{diagnostics.groups.totalDiscovered ?? "—"}</strong></article>
          </section>

          <section className="platform-samples" aria-labelledby="planning-samples-title">
            <div className="platform-samples-heading"><p className="eyebrow">Normalized output</p><h2 id="planning-samples-title">Safe sample records</h2></div>
            {samples.length ? <div className="platform-sample-grid">{samples}</div> : <p className="platform-empty-state">No public samples are available. Add valid server credentials or confirm product permissions, then reload this page.</p>}
          </section>

          <p className="platform-security-note">No organization profile, people, members, attendees, submitted registrations, giving records, contact details, or credential values are included in this page’s server-rendered props.</p>
        </Container>
      </div>
    </>
  );
}
