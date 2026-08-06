import { homeSections, contactInformation, serviceTimes } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { MediaFrame } from "@/components/ui/media-frame";

export function Hero() {
  const content = homeSections.hero;
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");
  return (
    <section className="hero" aria-labelledby="home-title">
      <Container className="hero-grid">
        <div className="hero-copy">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <Heading as="h1" id="home-title" size="display">{content.title}</Heading>
          <p className="lede">{content.body}</p>
          {content.actions ? <ActionGroup actions={content.actions} /> : null}
        </div>
        <div className="hero-visual">
          <MediaFrame label="Reserved for approved Living Message Church community photography" ratio="portrait" tone="coral" />
          <div className="hero-fact-card">
            <span>Sundays</span>
            <strong>{inPerson.map((service) => service.time).join(" · ")}</strong>
            <small>{contactInformation.address.value.street}</small>
          </div>
        </div>
      </Container>
    </section>
  );
}
