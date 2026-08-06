import { homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function VisitEditorial() {
  const content = homeSections.visit;
  return (
    <Section tone={content.tone} labelledBy="visit-title" containerClassName="feature-grid">
      <MediaFrame label="Reserved for approved first-visit and welcome-team photography" ratio="landscape" tone="gold" />
      <div className="feature-copy">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading id="visit-title">{content.title}</Heading>
        <p>{content.body}</p>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
    </Section>
  );
}
