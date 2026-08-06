import { homePhotography, homeSections, serviceTimes } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function VisitEditorial() {
  const content = homeSections.visit;
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");

  return (
    <Section className="visit-section" tone={content.tone} labelledBy="visit-title" containerClassName="feature-grid visit-grid">
      <div className="visit-visual">
        <div className="visit-image-shell">
          <MediaFrame
            image={homePhotography.visit}
            label="Living Message Church gathered for worship"
            ratio="landscape"
            tone="gold"
            sizes="(max-width: 48rem) 100vw, (max-width: 100rem) 58vw, 58rem"
          />
        </div>
        <div className="visit-time-card">
          <span>Join us this Sunday</span>
          <div aria-label={`Sunday service times: ${inPerson.map((service) => service.time).join(" and ")}`}>
            {inPerson.map((service) => <strong key={service.id}>{service.time}</strong>)}
          </div>
        </div>
        <span className="visit-orbit visit-orbit-one" aria-hidden="true" />
        <span className="visit-orbit visit-orbit-two" aria-hidden="true" />
      </div>
      <div className="feature-copy visit-copy">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading id="visit-title">{content.title}</Heading>
        <p>{content.body}</p>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
    </Section>
  );
}
