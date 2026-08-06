import { contactInformation, homeSections, serviceTimes } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function SundayInvitation() {
  const content = homeSections.invitation;
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");
  return (
    <Section className="invitation-section" tone={content.tone} labelledBy="invitation-title" containerClassName="invitation-grid">
      <div><Eyebrow>{content.eyebrow}</Eyebrow><Heading id="invitation-title" size="page">{content.title}</Heading></div>
      <div className="invitation-details"><p className="lede">Sundays<br /><strong>{inPerson.map((service) => service.time).join(" & ")}</strong></p><p>{contactInformation.address.value.display}</p>{content.actions ? <ActionGroup actions={content.actions} /> : null}</div>
    </Section>
  );
}
