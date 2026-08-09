import Image from "next/image";
import Link from "next/link";
import { connectPageContent as content } from "@/content";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { ActionGroup } from "@/components/ui/action-link";
import { AccentHeading, Eyebrow } from "@/components/ui/typography";

export function ConnectPage() {
  return (
    <>
      <SiteHead {...content.seo} />

      <section className="connect-hero" aria-labelledby="connect-hero-title">
        <Image
          className="connect-hero-image"
          src={content.hero.image.src}
          alt={content.hero.image.alt}
          fill
          priority
          sizes="100vw"
        />
        <div className="connect-hero-scrim" aria-hidden="true" />
        <Container className="connect-hero-inner" size="hero">
          <div className="connect-hero-copy">
            <Eyebrow>{content.hero.eyebrow}</Eyebrow>
            <h1 id="connect-hero-title">
              {content.hero.titleLead}
              <em>{content.hero.titleAccent}</em>
              <span>{content.hero.titleEnd}</span>
            </h1>
            <p>{content.hero.body}</p>
            <ActionGroup actions={content.hero.actions} />
          </div>
        </Container>
      </section>

      <section className="connect-introduction" aria-labelledby="connect-intro-title">
        <Container className="connect-introduction-layout" size="editorial">
          <Eyebrow>{content.introduction.eyebrow}</Eyebrow>
          <AccentHeading
            as="h2"
            id="connect-intro-title"
            title={content.introduction.title}
            accent={content.introduction.titleAccent}
          />
          <p>{content.introduction.body}</p>
        </Container>
      </section>

      <section id="connect-pathways" className="connect-pathways" aria-labelledby="connect-pathways-title">
        <Container size="editorial">
          <header className="connect-pathways-heading">
            <Eyebrow>{content.pathwaysEyebrow}</Eyebrow>
            <h2 id="connect-pathways-title">{content.pathwaysTitle}</h2>
          </header>

          <div className="connect-pathway-grid">
            {content.pathways.map((pathway) => (
              <Link
                className={`connect-pathway connect-pathway-${pathway.layout} connect-pathway-${pathway.id}`}
                href={pathway.href}
                key={pathway.id}
              >
                <div className="connect-pathway-image">
                  <Image
                    src={pathway.image.src}
                    alt={pathway.image.alt}
                    fill
                    sizes={pathway.layout === "wide" ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 38vw"}
                  />
                </div>
                <div className="connect-pathway-copy">
                  <span className="connect-pathway-number">{pathway.number}</span>
                  <div>
                    <h3>{pathway.title}</h3>
                    <p>{pathway.summary}</p>
                    <span className="connect-pathway-action">
                      {pathway.linkLabel} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="connect-final" aria-labelledby="connect-final-title">
        <Container className="connect-final-layout" size="editorial">
          <Eyebrow>{content.final.eyebrow}</Eyebrow>
          <div>
            <h2 id="connect-final-title">{content.final.title}</h2>
            <p>{content.final.body}</p>
            <ActionGroup actions={content.final.actions} />
          </div>
        </Container>
      </section>
    </>
  );
}
