import { contactInformation, externalServiceLinks, newHereDetails, pageContent, serviceTimes } from "@/content";
import { ActionLink } from "@/components/ui/action-link";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export default function NewHerePage() {
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");
  const visitForm = externalServiceLinks.find((link) => link.id === "plan-visit");
  return (
    <>
      <SiteHead {...pageContent.newHere.seo} />
      <PageHero content={pageContent.newHere} />
      <Section tone="sun" labelledBy="visit-facts-title">
        <Heading as="h2" id="visit-facts-title" size="section">{newHereDetails.essentialsTitle}</Heading>
        <div className="facts-grid">
          <article className="fact"><h3>When</h3><p>Sundays at {inPerson.map((service) => service.time).join(" and ")}</p></article>
          <article className="fact"><h3>Where</h3><p>{contactInformation.address.value.display}</p></article>
          <article className="fact"><h3>Questions</h3><p><a href={`tel:${contactInformation.phone.value.replaceAll("-", "")}`}>{contactInformation.phone.value}</a></p></article>
        </div>
      </Section>
      <Section id="kids" tone="paper" labelledBy="expect-title">
        <div className="section-intro"><p className="eyebrow">{newHereDetails.expectationsEyebrow}</p><Heading as="h2" id="expect-title">{newHereDetails.expectationsTitle}</Heading><p>{newHereDetails.expectationsIntro}</p></div>
        <div className="visit-list">{newHereDetails.details.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        <div className="action-group">
          {visitForm ? <ActionLink label={visitForm.label} href={visitForm.url.value} style="primary" external /> : null}
          <ActionLink label="Get directions" href={contactInformation.directionsUrl.value} style="secondary" external />
        </div>
      </Section>
      <Section tone="sage" labelledBy="questions-title" containerClassName="editorial-split">
        <p className="eyebrow">{newHereDetails.questionsEyebrow}</p><div><Heading as="h2" id="questions-title">{newHereDetails.questionsTitle}</Heading><p className="lede">{newHereDetails.questionsBody}</p><ActionLink label="Contact us" href="/contact" style="primary" /></div>
      </Section>
    </>
  );
}
