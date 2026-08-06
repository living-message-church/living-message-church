import { useEffect, useState } from "react";
import { homeSections, contactInformation, serviceTimes } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/typography";

function HeroBackgroundVideo() {
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 48rem)");
    const updatePlayback = () => setMotionEnabled(!motionPreference.matches);

    updatePlayback();
    motionPreference.addEventListener("change", updatePlayback);
    return () => motionPreference.removeEventListener("change", updatePlayback);
  }, []);

  if (!motionEnabled) return null;

  return (
    <video
      className="hero-video"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/images/hero/living-message-church-community-poster.jpg"
      aria-hidden="true"
    >
      <source src="/videos/living-message-church-community-promo.mp4" type="video/mp4" />
    </video>
  );
}

export function Hero() {
  const content = homeSections.hero;
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");
  const titleLines = content.title.split("\n");
  return (
    <section className="hero" aria-labelledby="home-title">
      <div className="hero-media" aria-hidden="true">
        <HeroBackgroundVideo />
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <Container className="hero-grid" size="hero">
        <div className="hero-copy">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <Heading as="h1" id="home-title" size="display">
            {titleLines.map((line, index) => <span className={index === titleLines.length - 1 ? "hero-title-serif" : undefined} key={line}>{line}</span>)}
          </Heading>
          <p className="lede">{content.body}</p>
          {content.actions ? <ActionGroup actions={content.actions} /> : null}
        </div>
        <div className="hero-side">
          <div className="hero-fact-card">
            <span className="hero-invite">Join us this Sunday</span>
            <div className="hero-times" aria-label={`Sunday service times: ${inPerson.map((service) => service.time).join(" and ")}`}>
              {inPerson.map((service) => <strong key={service.id}>{service.time}</strong>)}
            </div>
            <small>{contactInformation.address.value.street}</small>
          </div>
        </div>
      </Container>
    </section>
  );
}
