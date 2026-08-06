import { homePhotography, homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { AccentHeading, Eyebrow } from "@/components/ui/typography";

export function VisitEditorial() {
  const content = homeSections.visit;

  return (
    <Section className="visit-section" tone={content.tone} labelledBy="visit-title" containerClassName="feature-grid visit-grid" containerSize="editorial">
      <div className="visit-visual">
        <MediaFrame
          image={homePhotography.visit}
          label="Living Message Church gathered for worship"
          ratio="landscape"
          tone="gold"
          sizes="(max-width: 48rem) 100vw, (max-width: 100rem) 62vw, 56rem"
        />
      </div>
      <div className="feature-copy visit-copy">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <AccentHeading id="visit-title" title={content.title} accent={content.titleAccent} />
        <p>{content.body}</p>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
    </Section>
  );
}
