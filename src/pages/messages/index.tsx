import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { stagedPages } from "@/content";
import { MessageLibrary } from "@/components/messages/message-library";
import { MessageArchive } from "@/components/messages/message-archive";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { Section } from "@/components/ui/section";
import { getMessageFeed } from "@/lib/messages/message-source";

export const getStaticProps: GetStaticProps = async () => ({
  props: { feed: await getMessageFeed() },
});

export default function MessagesPage({ feed }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SiteHead {...stagedPages.messages.seo} noIndex />
      <PageHero content={stagedPages.messages} />
      <Section tone="paper" containerClassName="message-library-container">
        {feed.status === "available" && feed.items.length ? <MessageLibrary messages={feed.items} /> : <MessageArchive feed={feed} />}
      </Section>
    </>
  );
}
