import type { PageContent } from "@/types/content";
import { SiteHead } from "@/components/seo/site-head";
import { PageHero } from "./page-hero";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { ActionLink } from "@/components/ui/action-link";

export function StagedPage({ content }: { content: PageContent }) {
  return (
    <>
      <SiteHead {...content.seo} noIndex />
      <PageHero content={content} />
      <Section tone="paper" labelledBy="staged-content-title" containerClassName="reading-content">
        <Heading as="h2" id="staged-content-title" size="section">This page is being thoughtfully prepared.</Heading>
        <p>{content.intro}</p>
        <p>For current help, service details, or directions, use the visitor and contact pages.</p>
        <div className="action-group">
          <ActionLink label="New Here" href="/new-here" style="primary" />
          <ActionLink label="Contact" href="/contact" style="secondary" />
        </div>
      </Section>
    </>
  );
}
