import { homePhotography, homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function VisitEditorial() {
  const content = homeSections.visit;
  const accent = content.titleAccent ?? "";
  const accentStart = accent ? content.title.indexOf(accent) : -1;
  const hasAccent = accent.length > 0 && accentStart >= 0;

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
        <Heading id="visit-title">
          {hasAccent ? (
            <>
              <span>{content.title.slice(0, accentStart).trim()}</span>
              <em>{accent}</em>
              <span>{content.title.slice(accentStart + accent.length).trim()}</span>
            </>
          ) : content.title}
        </Heading>
        <p>{content.body}</p>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
    </Section>
  );
}
