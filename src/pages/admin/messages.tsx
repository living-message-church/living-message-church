import { localMessages } from "@/content";
import { MessageAdminPrototype } from "@/components/messages/message-admin-prototype";
import { SiteHead } from "@/components/seo/site-head";

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
