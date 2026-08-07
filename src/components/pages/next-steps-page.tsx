import Image from "next/image";
import {
  externalServiceLinks,
  nextStepsContent,
  pagePhotography,
} from "@/content";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { SiteHead } from "@/components/seo/site-head";

export function NextStepsPage() {
  const registration = externalServiceLinks.find((link) => link.id === "next-steps-registration");
  const heroImage = pagePhotography["/connect/next-steps"];

  return (
    <>
      <SiteHead {...nextStepsContent.seo} />

      <section className="next-steps-hero" aria-labelledby="next-steps-title">
        <Image
          alt={heroImage.alt}
          className="next-steps-hero-image"
          fill
          preload
          sizes="100vw"
          src={heroImage.src}
        />
        <div className="next-steps-hero-scrim" />
        <Container className="next-steps-hero-inner" size="hero">
          <div className="next-steps-hero-copy">
            <Eyebrow>{nextStepsContent.eyebrow}</Eyebrow>
            <h1 id="next-steps-title">{nextStepsContent.title}</h1>
            <p>{nextStepsContent.intro}</p>
            {registration ? (
              <div className="action-group">
                <ActionLink external href={registration.url.value} label={nextStepsContent.registrationLabel} style="primary" />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <Section className="next-steps-overview" tone="paper" labelledBy="next-steps-overview-title" containerSize="editorial">
        <div className="next-steps-overview-copy">
          <Eyebrow>{nextStepsContent.overviewEyebrow}</Eyebrow>
          <Heading as="h2" id="next-steps-overview-title">{nextStepsContent.overviewTitle}</Heading>
          <p className="lede">{nextStepsContent.overviewBody}</p>
        </div>
        <dl className="next-steps-facts">
          {nextStepsContent.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="next-steps-pathway" tone="sun" labelledBy="next-steps-pathway-title" containerSize="editorial">
        <div className="next-steps-pathway-heading">
          <Eyebrow>{nextStepsContent.pathwayEyebrow}</Eyebrow>
          <Heading as="h2" id="next-steps-pathway-title">{nextStepsContent.pathwayTitle}</Heading>
        </div>
        <div className="next-steps-pathway-grid">
          {nextStepsContent.pathway.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="next-steps-class" tone="paper" labelledBy="next-steps-class-title" containerClassName="next-steps-class-layout" containerSize="editorial">
        <div className="next-steps-class-image">
          <Image
            alt={nextStepsContent.classImage.alt}
            fill
            sizes="(max-width: 56rem) 100vw, 55vw"
            src={nextStepsContent.classImage.src}
          />
        </div>
        <div className="next-steps-class-copy">
          <Eyebrow>{nextStepsContent.classEyebrow}</Eyebrow>
          <Heading as="h2" id="next-steps-class-title">{nextStepsContent.classTitle}</Heading>
          <p>{nextStepsContent.classBody}</p>
          {registration ? <ActionLink external href={registration.url.value} label={nextStepsContent.classActionLabel} style="primary" /> : null}
        </div>
      </Section>

      <Section className="next-steps-principles" tone="ink" labelledBy="next-steps-principles-title" containerSize="editorial">
        <div className="next-steps-principles-heading">
          <Eyebrow>{nextStepsContent.principlesEyebrow}</Eyebrow>
          <Heading as="h2" id="next-steps-principles-title">{nextStepsContent.principlesTitle}</Heading>
        </div>
        <div className="next-steps-principles-grid">
          {nextStepsContent.principles.map((principle) => (
            <article key={principle.reference}>
              <h3>{principle.title}</h3>
              <p>{principle.reference}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="next-steps-final" tone="paper" labelledBy="next-steps-final-title" containerClassName="next-steps-final-layout" containerSize="editorial">
        <div>
          <Eyebrow>{nextStepsContent.finalEyebrow}</Eyebrow>
          <Heading as="h2" id="next-steps-final-title">{nextStepsContent.finalTitle}</Heading>
        </div>
        <div>
          <p className="lede">{nextStepsContent.finalBody}</p>
          <div className="action-group">
            {registration ? <ActionLink external href={registration.url.value} label={nextStepsContent.finalActionLabel} style="primary" /> : null}
            <ActionLink href="/contact" label={nextStepsContent.questionActionLabel} style="secondary" />
          </div>
        </div>
      </Section>
    </>
  );
}
