import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { getPlanningCenterDiagnostics } from "@/lib/planning-center/diagnostics";
import type {
  NormalizedEvent,
  NormalizedGroup,
  NormalizedRegistration,
  PlanningCenterCanonicalEventDiagnostic,
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
  const firstOccurrence = item.occurrences[0];
  return (
    <article className="platform-sample-card">
      <p className="eyebrow">Calendar event</p>
      <h3>{item.title}</h3>
      <dl><div><dt>Starts</dt><dd>{displayDate(firstOccurrence?.startAt ?? null)}</dd></div><div><dt>Sources</dt><dd>{item.sourceMetadata.products.join(" · ")}</dd></div></dl>
      <a href={item.publicUrl} target="_blank" rel="noreferrer">Open public Church Center record <span aria-hidden="true">↗</span></a>
    </article>
  );
}

function words(value: string) {
  return value.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
}

function CanonicalEventCandidate({ item }: { item: PlanningCenterCanonicalEventDiagnostic }) {
  const relationships = [
    item.registrationRelationship.present ? `Registration (${item.registrationRelationship.status ?? "linked"})` : null,
    item.groupRelationship ? "Group" : null,
    item.checkInRelationship ? "Check-In" : null,
    item.servicesRelationship ? "Services" : null,
  ].filter(Boolean).join(" · ") || "Calendar only";
  const providerIds = Object.entries(item.providerIds)
    .filter(([, ids]) => ids.length)
    .map(([product, ids]) => {
      const visibleIds = ids.slice(0, 4).join(", ");
      const remaining = ids.length > 4 ? ` +${ids.length - 4} more` : "";
      return `${words(product.replace(/Ids$/, ""))}: ${visibleIds}${remaining}`;
    });

  return (
    <article className="platform-sample-card">
      <p className="eyebrow">{words(item.eligibility)}</p>
      <h3>{item.title}</h3>
      <dl>
        <div><dt>Canonical ID</dt><dd>{item.canonicalId}</dd></div>
        <div><dt>Series</dt><dd>{words(item.seriesModel)} · {item.occurrenceCount} occurrence{item.occurrenceCount === 1 ? "" : "s"}</dd></div>
        <div><dt>Products</dt><dd>{item.contributingProducts.map(words).join(" · ")}</dd></div>
        <div><dt>Relationships</dt><dd>{relationships}</dd></div>
        <div><dt>Coverage</dt><dd>{item.imageAvailable ? "Image" : "No image"} · {item.locationAvailable ? "Location" : "No location"}</dd></div>
        <div><dt>Ambiguity</dt><dd>{item.ambiguityFlags.length ? item.ambiguityFlags.map(words).join(" · ") : "None"}</dd></div>
        <div><dt>Merge evidence</dt><dd>{item.mergeReasons.length ? item.mergeReasons.map(words).join(" · ") : "No cross-record merge"}</dd></div>
        <div><dt>Provider IDs</dt><dd>{providerIds.join(" · ")}</dd></div>
        <div><dt>Exclusion</dt><dd>{item.exclusionReason ?? "Not excluded"}</dd></div>
      </dl>
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
    ["Services", diagnostics.servicesEndpoint.state],
    ["Check-Ins", diagnostics.checkInsEndpoint.state],
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
            <p>Sanitized, read-only checks for relationship-aware Calendar, Registrations, Groups, Services, and Check-Ins data.</p>
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

          {diagnostics.relationships ? (
            <section className="platform-metrics" aria-label="Planning Center canonical event counts">
              <article><span>Raw Calendar parents</span><strong>{diagnostics.relationships.calendar.futureParents}</strong></article>
              <article><span>Canonical events</span><strong>{diagnostics.relationships.canonicalEvents}</strong></article>
              <article><span>Exact merged representations</span><strong>{diagnostics.relationships.mergedRecords}</strong></article>
              <article><span>Ambiguous candidates</span><strong>{diagnostics.relationships.eligibility.ambiguous}</strong></article>
              <article><span>Excluded Calendar parents</span><strong>{diagnostics.relationships.excludedEvents}</strong></article>
              <article><span>Registration-linked</span><strong>{diagnostics.relationships.coverage.registrationLinked}</strong></article>
              <article><span>Group-linked</span><strong>{diagnostics.relationships.coverage.groupLinked}</strong></article>
              <article><span>Services-linked</span><strong>{diagnostics.relationships.coverage.servicesLinked}</strong></article>
              <article><span>Image coverage</span><strong>{diagnostics.relationships.coverage.images}/{diagnostics.relationships.canonicalEvents}</strong></article>
              <article><span>Location coverage</span><strong>{diagnostics.relationships.coverage.locations}/{diagnostics.relationships.canonicalEvents}</strong></article>
            </section>
          ) : null}

          {diagnostics.relationships ? (
            <section className="platform-status-panel" aria-labelledby="relationship-status-title">
              <div className="platform-status-heading">
                <div><p className="eyebrow">Relationship aggregation</p><h2 id="relationship-status-title">Sanitized source counts</h2></div>
                <span className="platform-live-indicator">Exact IDs only</span>
              </div>
              <dl className="platform-check-list">
                <div className="platform-check"><dt>Calendar records</dt><dd><strong>{diagnostics.relationships.calendar.futureParents} parents · {diagnostics.relationships.calendar.futureInstances} instances</strong><span>{diagnostics.relationships.calendar.publicParents} parents explicitly published.</span></dd></div>
                <div className="platform-check"><dt>Registration records</dt><dd><strong>{diagnostics.relationships.registrations.records}</strong><span>{diagnostics.relationships.registrations.calendarConnections} exact Calendar connections.</span></dd></div>
                <div className="platform-check"><dt>Group event records</dt><dd><strong>{diagnostics.relationships.groups.futureEventRecords}</strong><span>{diagnostics.relationships.groups.eligibleFutureOccurrences} explicitly public occurrences; {diagnostics.relationships.groups.mergedOccurrences} exact schedule matches.</span></dd></div>
                <div className="platform-check"><dt>Services-linked records</dt><dd><strong>{diagnostics.relationships.services.calendarConnections}</strong><span>{diagnostics.relationships.services.linkedServiceTypes} distinct service types.</span></dd></div>
                <div className="platform-check"><dt>Feed-origin records</dt><dd><strong>{diagnostics.relationships.feeds.feedOriginEvents}</strong><span>{diagnostics.relationships.feeds.records} configured Calendar feeds.</span></dd></div>
                <div className="platform-check"><dt>Connected records</dt><dd><strong>{diagnostics.relationships.connectionRecords}</strong><span>Across {diagnostics.relationships.connectedCalendarParents} Calendar parents.</span></dd></div>
                <div className="platform-check"><dt>Canonical events</dt><dd><strong>{diagnostics.relationships.canonicalEvents}</strong><span>{diagnostics.relationships.mergedRecords} duplicate representations merged by exact relationships.</span></dd></div>
                <div className="platform-check"><dt>Excluded Calendar parents</dt><dd><strong>{diagnostics.relationships.excludedEvents}</strong><span>{diagnostics.relationships.exclusionReasons.notChurchCenterPublished} not Church Center published · {diagnostics.relationships.exclusionReasons.notApproved} not approved · {diagnostics.relationships.exclusionReasons.linkOnly} link-only · {diagnostics.relationships.exclusionReasons.other} other.</span></dd></div>
                <div className="platform-check"><dt>Ambiguous relationships</dt><dd><strong>{diagnostics.relationships.ambiguous.sameTitleCalendarClusters + diagnostics.relationships.ambiguous.unmatchedPublicGroupOccurrences}</strong><span>{diagnostics.relationships.ambiguous.sameTitleCalendarClusters} same-title clusters and {diagnostics.relationships.ambiguous.unmatchedPublicGroupOccurrences} unmatched public Group occurrences remain quarantined.</span></dd></div>
              </dl>
            </section>
          ) : null}

          <section className="platform-samples" aria-labelledby="canonical-candidates-title">
            <div className="platform-samples-heading">
              <p className="eyebrow">Canonical events</p>
              <h2 id="canonical-candidates-title">Sanitized candidate evidence</h2>
            </div>
            {diagnostics.events.candidates.length ? (
              <div className="platform-sample-grid">
                {diagnostics.events.candidates.map((item) => <CanonicalEventCandidate item={item} key={item.canonicalId} />)}
              </div>
            ) : <p className="platform-empty-state">No canonical candidates are available.</p>}
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
