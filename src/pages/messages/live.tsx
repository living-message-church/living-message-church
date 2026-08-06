import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { stagedPages } from "@/content";
import { MessageArchive } from "@/components/messages/message-archive";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { Section } from "@/components/ui/section";
import { getMessageFeed } from "@/lib/messages/message-source";

export const getStaticProps: GetStaticProps = async () => ({
  props: { feed: await getMessageFeed() },
});

export default function LivePage({ feed }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SiteHead {...stagedPages.live.seo} noIndex />
      <PageHero content={stagedPages.live} />
      <Section tone="paper" containerClassName="feed-section">
        <MessageArchive feed={feed} />
      </Section>
    </>
  );
}
