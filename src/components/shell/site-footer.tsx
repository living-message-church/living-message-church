import Image from "next/image";
import Link from "next/link";
import { contactInformation, footerContent, footerGroups, serviceTimes, siteIdentity, socialChannels } from "@/content";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");
  return (
    <footer className="site-footer">
      <Container size="editorial">
        <div className="footer-lead">
          <p className="eyebrow">{footerContent.eyebrow}</p>
          <p className="footer-invite">{footerContent.invitation}</p>
          <p className="footer-facts">
            Sundays {inPerson.map((service) => service.time).join(" & ")}<br />
            {contactInformation.address.value.display}
          </p>
        </div>
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand" aria-label={`${siteIdentity.name.value} home`}>
              <Image
                className="footer-logo"
                src="/images/brand/living-message-church-logo.svg"
                alt={siteIdentity.name.value}
                width={288}
                height={92}
              />
            </Link>
            <a href={`tel:${contactInformation.phone.value.replaceAll("-", "")}`}>{contactInformation.phone.value}</a>
            <a href={`mailto:${contactInformation.email.value}`}>{contactInformation.email.value}</a>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteIdentity.name.value}</p>
          <div aria-label="Social media">
            {socialChannels.map((channel) => <a key={channel.platform} href={channel.url.value} target="_blank" rel="noreferrer">{channel.platform}</a>)}
          </div>
        </div>
      </Container>
    </footer>
  );
}
