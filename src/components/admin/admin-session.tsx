import { useRouter } from "next/router";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AdminIdentity } from "@/lib/supabase/auth";

export function AdminSession({ identity }: { identity: AdminIdentity }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    await getSupabaseBrowserClient().auth.signOut();
    await router.replace("/admin/login");
  }

  return (
    <div className="admin-session">
      <span>{identity.email ?? "Authenticated user"} · {identity.role}</span>
      <button type="button" onClick={signOut} disabled={busy}>{busy ? "Signing out…" : "Sign out"}</button>
    </div>
  );
}
