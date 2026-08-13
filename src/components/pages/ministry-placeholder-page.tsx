import type { PageContent } from "@/types/content";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";

export function MinistryPlaceholderPage({ content }: { content: PageContent }) {
  return (
    <>
      <SiteHead {...content.seo} />
      <PageHero content={content} />
    </>
  );
}
