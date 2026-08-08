import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

function safeDestination(value: string | string[] | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate?.startsWith("/admin/") || candidate === "/admin/platform" ? candidate : "/admin/platform";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const result = await getSupabaseBrowserClient().auth.signInWithPassword({ email, password });
    if (result.error) {
      setError("The email or password was not accepted.");
      setBusy(false);
      return;
    }
    await router.replace(safeDestination(router.query.next));
  }

  return (
    <>
      <SiteHead title="Admin Sign In | Living Message Church" description="Authorized platform administration." path="/admin/login" noIndex />
      <div className="platform-page admin-login-page">
        <Container size="reading">
          <section className="platform-status-panel admin-login-panel" aria-labelledby="admin-login-title">
            <p className="eyebrow">Authorized access</p>
            <h1 id="admin-login-title">Platform sign in</h1>
            <p>Accounts are provisioned manually. Public account creation is not available.</p>
            <form className="admin-login-form" onSubmit={submit}>
              <label>Email<input name="email" type="email" autoComplete="username" required /></label>
              <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
              {error ? <p className="admin-form-error" role="alert">{error}</p> : null}
              <button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
            </form>
          </section>
        </Container>
      </div>
    </>
  );
}
