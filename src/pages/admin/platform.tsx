import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import packageMetadata from "../../../package.json";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { getPlanningCenterDiagnostics } from "@/lib/planning-center/diagnostics";
import type { PlanningCenterEndpointStatus } from "@/lib/planning-center/types";
import { checkSupabaseConnection, type SupabaseConnectionState } from "@/lib/supabase/health";
import { getSupabasePublicEnvironmentStatus } from "@/lib/supabase/config";
import { getSupabaseServerEnvironmentStatus } from "@/lib/supabase/server";
import { getYouTubeEnvironmentStatus } from "@/lib/youtube/client";
import { getCurrentLiveVideo } from "@/lib/youtube/live";
import { getCreativePipelineDiagnostics } from "@/lib/creative/diagnostics";

type CheckTone = "healthy" | "unavailable" | "warning";

interface PlatformCheck {
  detail: string;
  label: string;
  tone: CheckTone;
  value: string;
}

interface PlatformPageProps {
  checks: PlatformCheck[];
}

function connectionPresentation(state: SupabaseConnectionState, latencyMs: number | null) {
  if (state === "connected") {
    return {
      detail: latencyMs === null ? "Remote project responded." : `Remote project responded in ${latencyMs} ms.`,
      tone: "healthy" as const,
      value: "Connected",
    };
  }

  if (state === "misconfigured") {
    return {
      detail: "The public project configuration is incomplete or invalid.",
      tone: "warning" as const,
      value: "Needs configuration",
    };
  }

  return {
    detail: "The remote project did not return a healthy response.",
    tone: "unavailable" as const,
    value: "Unavailable",
  };
}

function planningCenterPresentation(status: PlanningCenterEndpointStatus) {
  if (status.state === "reachable") {
    return {
      detail: status.latencyMs === null ? "Planning Center responded." : `Planning Center responded in ${status.latencyMs} ms.`,
      tone: "healthy" as const,
      value: "Reachable",
    };
  }

  if (status.state === "not-configured") {
    return {
      detail: "The server-only Planning Center credentials are not both present.",
      tone: "warning" as const,
      value: "Not checked",
    };
  }

  const value = status.state === "unauthorized"
    ? "Unauthorized"
    : status.state === "forbidden"
      ? "Forbidden"
      : status.state === "rate-limited"
        ? "Rate limited"
        : "Unavailable";

  return {
    detail: "The endpoint did not return a successful response.",
    tone: "unavailable" as const,
    value,
  };
}

export const getServerSideProps: GetServerSideProps<PlatformPageProps> = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  const [connection, planningCenter, youtube, creative] = await Promise.all([
    checkSupabaseConnection(),
    getPlanningCenterDiagnostics(0),
    getCurrentLiveVideo(),
    getCreativePipelineDiagnostics(),
  ]);
  const connectionCheck = connectionPresentation(connection.state, connection.latencyMs);
  const publicEnvironment = getSupabasePublicEnvironmentStatus();
  const serverEnvironment = getSupabaseServerEnvironmentStatus();
  const environmentReady = publicEnvironment.ready && serverEnvironment.serviceRoleKey === "configured";
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
  const vercelEnvironment = process.env.VERCEL_ENV;
  const planningCenterEnvironmentReady = planningCenter.environment.ready;
  const youtubeEnvironment = getYouTubeEnvironmentStatus();
  const youtubeApiValue = youtube.apiReachable === true
    ? "Reachable"
    : youtube.apiReachable === false
      ? "Unavailable"
      : "Not checked";
  const youtubeState = youtube.video
    ? youtube.video.state[0].toUpperCase() + youtube.video.state.slice(1)
    : "Unavailable";

  return {
    props: {
      checks: [
        {
          label: "Supabase connection",
          ...connectionCheck,
        },
        {
          detail: environmentReady
            ? "Public project settings and the server-only credential are present."
            : "One or more required project settings are missing or invalid.",
          label: "Environment variables",
          tone: environmentReady ? "healthy" : "warning",
          value: environmentReady ? "Configured" : "Needs attention",
        },
        {
          detail: "Server-rendered health checks run in the Node.js runtime.",
          label: "Runtime",
          tone: "healthy",
          value: `Node.js ${process.versions.node}`,
        },
        {
          detail: commit ? `Deployment commit ${commit}.` : "No deployment commit is attached to this local build.",
          label: "Build information",
          tone: "healthy",
          value: `Version ${packageMetadata.version}`,
        },
        {
          detail: vercelEnvironment
            ? "Environment reported by the Vercel runtime."
            : "This request is running outside Vercel.",
          label: "Vercel environment",
          tone: "healthy",
          value: vercelEnvironment ?? "Local development",
        },
        {
          detail: planningCenterEnvironmentReady
            ? "Both required server-only variables are present."
            : "One or both required server-only variables are missing.",
          label: "Planning Center environment",
          tone: planningCenterEnvironmentReady ? "healthy" : "warning",
          value: planningCenterEnvironmentReady ? "Configured" : "Missing",
        },
        {
          label: "Planning Center API",
          ...planningCenterPresentation(planningCenter.api),
        },
        {
          label: "Planning Center organization",
          ...planningCenterPresentation(planningCenter.organization),
        },
        {
          label: "Planning Center Calendar",
          ...planningCenterPresentation(planningCenter.calendar),
        },
        {
          label: "Planning Center Registrations",
          ...planningCenterPresentation(planningCenter.registrationsEndpoint),
        },
        {
          label: "Planning Center Groups",
          ...planningCenterPresentation(planningCenter.groupsEndpoint),
        },
        {
          label: "Planning Center Services",
          ...planningCenterPresentation(planningCenter.servicesEndpoint),
        },
        {
          label: "Planning Center Check-Ins",
          ...planningCenterPresentation(planningCenter.checkInsEndpoint),
        },
        {
          detail: "Server-only YouTube Data API credential presence.",
          label: "YouTube API configured",
          tone: youtubeEnvironment.apiKey === "configured" ? "healthy" : "warning",
          value: youtubeEnvironment.apiKey === "configured" ? "Configured" : "Missing",
        },
        {
          detail: "Server-only channel configuration presence.",
          label: "YouTube channel configured",
          tone: youtubeEnvironment.channelId === "configured" ? "healthy" : "warning",
          value: youtubeEnvironment.channelId === "configured" ? "Configured" : "Missing",
        },
        {
          detail: "YouTube Data API response status; no response body or key is displayed.",
          label: "YouTube API reachable",
          tone: youtube.apiReachable === true ? "healthy" : youtube.apiReachable === null ? "warning" : "unavailable",
          value: youtubeApiValue,
        },
        {
          detail: "Resolved from public, embeddable videos owned by the configured channel.",
          label: "YouTube current state",
          tone: youtube.video ? "healthy" : "warning",
          value: youtubeState,
        },
        {
          detail: "The identifier value is never displayed.",
          label: "YouTube video ID",
          tone: youtube.video ? "healthy" : "warning",
          value: youtube.video ? "Resolved" : "Not resolved",
        },
        {
          detail: "Server-only image generation provider presence; the credential is never displayed.",
          label: "Creative AI provider",
          tone: creative.aiProvider.configured ? "healthy" : "warning",
          value: creative.aiProvider.configured ? "Configured" : "Missing",
        },
        {
          detail: "Private event-art bucket status for permanent generated assets.",
          label: "Creative storage",
          tone: creative.registry.storage === "available" ? "healthy" : "warning",
          value: creative.registry.storage === "available" ? "Available" : creative.registry.storage === "missing" ? "Migration required" : "Unavailable",
        },
        {
          detail: `${creative.eligibleCalendarCandidates} strict public Calendar candidates; ${creative.eventsMissingArtwork} currently lack provider artwork.`,
          label: "Creative eligibility",
          tone: "healthy",
          value: `${creative.eligibleCalendarCandidates} eligible`,
        },
      ],
    },
  };
};

export default function PlatformPage({
  checks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <SiteHead
        title="Platform Health | Living Message Church"
        description="Connection and runtime status for the Living Message Church website platform."
        path="/admin/platform"
        noIndex
      />
      <div className="platform-page">
        <Container size="content">
          <header className="platform-header">
            <p className="eyebrow">Platform foundation</p>
            <h1>System health</h1>
            <p>Non-sensitive connectivity and deployment checks for the website platform.</p>
          </header>

          <section className="platform-status-panel" aria-labelledby="platform-status-title">
            <div className="platform-status-heading">
              <div>
                <p className="eyebrow">Current request</p>
                <h2 id="platform-status-title">Platform status</h2>
              </div>
              <span className="platform-live-indicator">Live check</span>
            </div>

            <dl className="platform-check-list">
              {checks.map((check) => (
                <div className="platform-check" key={check.label}>
                  <dt>
                    <span className={`platform-check-icon platform-check-${check.tone}`} aria-hidden="true">
                      {check.tone === "healthy" ? "✓" : "!"}
                    </span>
                    <span>{check.label}</span>
                  </dt>
                  <dd>
                    <strong>{check.value}</strong>
                    <span>{check.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="platform-security-note">
            Credential values, project identifiers, and connection details are never rendered on this page.
          </p>
          <Link className="platform-back-link" href="/admin/platform/planning-center">
            Open Planning Center diagnostics →
          </Link>
          <Link className="platform-back-link" href="/admin/events/creative">
            Open event creative diagnostics →
          </Link>
        </Container>
      </div>
    </>
  );
}
