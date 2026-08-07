import Image from "next/image";
import {
  contactInformation,
  externalServiceLinks,
  homePhotography,
  newHereDetails,
  pageContent,
  pagePhotography,
  serviceTimes,
} from "@/content";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { SiteHead } from "@/components/seo/site-head";

export function PlanYourVisitPage() {
  const content = pageContent.newHere;
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");
  const visitForm = externalServiceLinks.find((link) => link.id === "plan-visit");
  const heroImage = pagePhotography["/plan-your-visit"];

  return (
    <>
      <SiteHead {...content.seo} />

      <section className="visit-page-hero" aria-labelledby="visit-page-title">
        <Image
          alt={heroImage.alt}
          className="visit-page-hero-image"
          fill
          preload
          sizes="100vw"
          src={heroImage.src}
        />
        <div className="visit-page-hero-scrim" />
        <Container className="visit-page-hero-inner" size="hero">
          <div className="visit-page-hero-copy">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 id="visit-page-title">Plan your visit.</h1>
            <p>Walking into a new church can feel like a big step. Know what to expect before you arrive.</p>
            <div className="action-group">
              {visitForm ? <ActionLink external href={visitForm.url.value} label="Tell us you’re coming" style="primary" /> : null}
              <ActionLink external href={contactInformation.directionsUrl.value} label="Get directions" style="secondary" />
            </div>
          </div>

          <aside className="visit-page-service-card" aria-label="Sunday service details">
            <span>Join us this Sunday</span>
            <div>
              {inPerson.map((service) => <strong key={service.id}>{service.time}</strong>)}
            </div>
            <p>{contactInformation.address.value.display}</p>
          </aside>
        </Container>
      </section>

      <Section className="visit-essentials-section" tone="paper" labelledBy="visit-essentials-title" containerSize="editorial">
        <div className="visit-essentials-heading">
          <Eyebrow>Sunday at Living Message</Eyebrow>
          <Heading as="h2" id="visit-essentials-title">{newHereDetails.essentialsTitle}</Heading>
        </div>
        <dl className="visit-essentials-grid">
          <div><dt>Services</dt><dd>{inPerson.map((service) => service.time).join(" · ")}</dd></div>
          <div><dt>Location</dt><dd>{contactInformation.address.value.street}<br />{contactInformation.address.value.locality}, {contactInformation.address.value.region} {contactInformation.address.value.postalCode}</dd></div>
          <div><dt>Need help?</dt><dd><a href={`tel:${contactInformation.phone.value.replaceAll("-", "")}`}>{contactInformation.phone.value}</a></dd></div>
        </dl>
      </Section>

      <Section className="visit-expect-section" tone="sun" labelledBy="visit-expect-title" containerSize="editorial">
        <div className="visit-expect-intro">
          <Eyebrow>{newHereDetails.expectationsEyebrow}</Eyebrow>
          <Heading as="h2" id="visit-expect-title">{newHereDetails.expectationsTitle}</Heading>
          <p>{newHereDetails.expectationsIntro}</p>
        </div>
        <div className="visit-expect-list">
          {newHereDetails.details.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.body}</p></div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="kids" className="visit-kids-section" tone="paper" labelledBy="visit-kids-title" containerClassName="visit-kids-layout" containerSize="editorial">
        <MediaFrame
          image={homePhotography.ministries.kids}
          label={homePhotography.ministries.kids.alt}
          ratio="portrait"
          sizes="(max-width: 48rem) 100vw, 48vw"
          tone="sage"
        />
        <div className="visit-kids-copy">
          <Eyebrow>{newHereDetails.kidsEyebrow}</Eyebrow>
          <Heading as="h2" id="visit-kids-title">{newHereDetails.kidsTitle}</Heading>
          <p className="lede">{newHereDetails.kidsBody}</p>
          <p>Check-in stations are located through the lobby in the hallway, and a team member can help you get started.</p>
        </div>
      </Section>

      <Section className="visit-final-invitation" tone="ink" labelledBy="visit-final-title" containerClassName="visit-final-layout" containerSize="editorial">
        <div>
          <Eyebrow>Your first Sunday</Eyebrow>
          <Heading as="h2" id="visit-final-title">Come as you are. We’ll help with the rest.</Heading>
        </div>
        <div>
          <p className="lede">Choose the service time that works for you and enter at Suite 308.</p>
          <div className="action-group">
            {visitForm ? <ActionLink external href={visitForm.url.value} label="Plan your visit" style="primary" /> : null}
            <ActionLink href="/contact" label="Ask a question" style="secondary" />
          </div>
        </div>
      </Section>
    </>
  );
}
