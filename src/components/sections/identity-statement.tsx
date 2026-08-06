import { homePhotography, homeSections } from "@/content";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function IdentityStatement() {
  const content = homeSections.identity;
  return (
    <Section className="identity-section" tone={content.tone} labelledBy="identity-title" containerClassName="identity-layout">
      <div className="identity-copy">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading id="identity-title">{content.title}</Heading>
        <p className="lede">{content.body}</p>
      </div>
      <div className="identity-media">
        <MediaFrame
          image={homePhotography.ministries["next-steps"]}
          label="Living Message Church community connection"
          ratio="portrait"
          tone="coral"
          sizes="(max-width: 48rem) 100vw, (max-width: 70rem) 42vw, 30rem"
        />
      </div>
    </Section>
  );
}
