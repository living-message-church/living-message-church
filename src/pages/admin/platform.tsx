import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import packageMetadata from "../../../package.json";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { checkSupabaseConnection, type SupabaseConnectionState } from "@/lib/supabase/health";
import { getSupabasePublicEnvironmentStatus } from "@/lib/supabase/config";
import { getSupabaseServerEnvironmentStatus } from "@/lib/supabase/server";

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

export const getServerSideProps: GetServerSideProps<PlatformPageProps> = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  const connection = await checkSupabaseConnection();
  const connectionCheck = connectionPresentation(connection.state, connection.latencyMs);
  const publicEnvironment = getSupabasePublicEnvironmentStatus();
  const serverEnvironment = getSupabaseServerEnvironmentStatus();
  const environmentReady = publicEnvironment.ready && serverEnvironment.serviceRoleKey === "configured";
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
  const vercelEnvironment = process.env.VERCEL_ENV;

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
        </Container>
      </div>
    </>
  );
}
