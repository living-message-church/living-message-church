import Image from "next/image";
import { teamContent } from "@/content";
import { SiteHead } from "@/components/seo/site-head";
import { SundayInvitation } from "@/components/sections/sunday-invitation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import type { TeamMember } from "@/types/content";

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="team-card">
      <div className="team-card-image">
        <Image
          alt={member.image.alt}
          fill
          sizes="(max-width: 48rem) 82vw, (max-width: 72rem) 42vw, 22vw"
          src={member.image.src}
        />
      </div>
      <div className="team-card-copy">
        <h3>{member.name.value}</h3>
        <p>{member.title.value}</p>
      </div>
    </article>
  );
}

export function TeamPage() {
  const { hero, introduction, tiers } = teamContent;

  return (
    <>
      <SiteHead {...teamContent.seo} />

      <section className="team-hero" aria-labelledby="team-page-title">
        <Image
          alt={hero.image.alt}
          className="team-hero-image"
          fill
          preload
          sizes="100vw"
          src={hero.image.src}
        />
        <div className="team-hero-scrim" />
        <Container className="team-hero-inner" size="hero">
          <div className="team-hero-copy">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="team-page-title">{hero.title}</h1>
            <p>{hero.body}</p>
          </div>
        </Container>
      </section>

      <Section
        className="team-directory"
        tone="paper"
        labelledBy="team-directory-title"
        containerSize="editorial"
      >
        <header className="team-directory-intro">
          <Eyebrow>{introduction.eyebrow}</Eyebrow>
          <Heading as="h2" id="team-directory-title">{introduction.title}</Heading>
          <p>{introduction.body}</p>
        </header>

        <div className="team-tier-list">
          {tiers.map((tier, index) => (
            <section className="team-tier" key={tier.id} aria-labelledby={`${tier.id}-title`}>
              <header className="team-tier-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 id={`${tier.id}-title`}>{tier.label}</h2>
                  <p>{tier.summary}</p>
                </div>
              </header>
              <div className={`team-grid team-grid-${tier.id}`}>
                {tier.members.map((member) => <TeamCard key={member.id} member={member} />)}
              </div>
            </section>
          ))}
        </div>
      </Section>

      <SundayInvitation />
    </>
  );
}
