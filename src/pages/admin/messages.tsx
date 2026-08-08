import type { GetServerSideProps } from "next";
import { localMessages } from "@/content";
import { MessageAdminPrototype } from "@/components/messages/message-admin-prototype";
import { SiteHead } from "@/components/seo/site-head";
import { adminLoginRedirect, getAdminIdentity } from "@/lib/supabase/auth";

export const getServerSideProps: GetServerSideProps = async ({ req, res, resolvedUrl }) => {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  const identity = await getAdminIdentity(req, res);
  if (!identity) return { redirect: { destination: adminLoginRedirect(resolvedUrl), permanent: false } };
  return { props: {} };
};

export default function MessageAdminPage() {
  return (
    <>
      <SiteHead
        title="Message Library Admin Prototype | Living Message Church"
        description="A non-persistent interface prototype for Living Message Church sermon metadata and categories."
        path="/admin/messages"
        noIndex
      />
      <MessageAdminPrototype initialMessages={localMessages} />
    </>
  );
}
