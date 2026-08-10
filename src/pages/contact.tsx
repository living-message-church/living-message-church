import { contactInformation, contactPageDetails, pageContent, serviceTimes } from "@/content";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { ActionLink } from "@/components/ui/action-link";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");
  return (
    <>
      <SiteHead {...pageContent.contact.seo} />
      <PageHero content={pageContent.contact} />
      <Section id="directions" tone="paper" labelledBy="contact-title" containerClassName="contact-grid">
        <div>
          <p className="eyebrow">{contactPageDetails.detailsEyebrow}</p>
          <Heading as="h2" id="contact-title">{contactPageDetails.detailsTitle}</Heading>
          <ul className="contact-list">
            <li><span>Address</span>{contactInformation.address.value.display}</li>
            <li><span>Sunday gatherings</span>{inPerson.map((service) => service.time).join(" and ")}</li>
            <li><span>Phone</span><a href={`tel:${contactInformation.phone.value.replaceAll("-", "")}`}>{contactInformation.phone.value}</a></li>
            <li><span>Email</span><a href={`mailto:${contactInformation.email.value}`}>{contactInformation.email.value}</a></li>
          </ul>
          <div className="action-group"><ActionLink label="Open directions" href={contactInformation.directionsUrl.value} style="primary" external /></div>
        </div>
        <div className="contact-form-panel">
          <p className="eyebrow">{contactPageDetails.formEyebrow}</p>
          <Heading as="h2" size="section">{contactPageDetails.formTitle}</Heading>
          <p>{contactPageDetails.formBody}</p>
          <ContactForm />
          <a className="contact-email-fallback" href={`mailto:${contactInformation.email.value}`}>{contactPageDetails.emailLabel}</a>
        </div>
      </Section>
    </>
  );
}
