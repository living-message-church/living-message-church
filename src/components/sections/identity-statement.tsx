import { homeSections } from "@/content";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function IdentityStatement() {
  const content = homeSections.identity;
  return (
    <Section className="identity-section" tone={content.tone} labelledBy="identity-title" containerClassName="editorial-split identity-layout">
      <Eyebrow>{content.eyebrow}</Eyebrow>
      <div className="identity-copy">
        <Heading id="identity-title">{content.title}</Heading>
        <p className="lede">{content.body}</p>
      </div>
    </Section>
  );
}
