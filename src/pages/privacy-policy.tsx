import { legalContent, pageContent } from "@/content";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export default function PrivacyPolicyPage() {
  return <><SiteHead {...pageContent.privacy.seo} noIndex /><PageHero content={pageContent.privacy} /><Section tone="paper" containerClassName="reading-content">{legalContent.privacySections.map((section) => <section key={section.title}><Heading as="h2" size="section">{section.title}</Heading><p>{section.body}</p></section>)}</Section></>;
}
