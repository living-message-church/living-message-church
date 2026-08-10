import Image from "next/image";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { getEventFeed } from "@/lib/events/event-source";
import type { ChurchEvent } from "@/types/content";

interface EventPageProps {
  event: ChurchEvent;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // Event slugs come from a live read-only provider. Resolve them on first request
    // instead of multiplying Planning Center calls during a production build.
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<EventPageProps> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const feed = await getEventFeed();
  const event = feed.items.find((item) => item.slug === slug);

  if (!event) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { event }, revalidate: 300 };
};

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 3v3M19 3v3M4 8h16M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export default function EventDetailPage({ event }: InferGetStaticPropsType<typeof getStaticProps>) {
  const description = event.description?.value || event.summary.value;
  const date = event.start?.value.replace(/^.* · Next /, "");
  const externalLabel = event.actionLabel === "Register" ? "Register for event" : "View in Church Center";
  const structuredData = event.startAt ? {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title.value,
    startDate: event.startAt.value,
    ...(event.endAt ? { endDate: event.endAt.value } : {}),
    ...(description ? { description } : {}),
    ...(event.image ? { image: [event.image.src] } : {}),
    ...(event.location ? { location: { "@type": "Place", name: event.location.value } } : {}),
    ...(event.registrationUrl ? { url: event.registrationUrl.value } : {}),
  } : undefined;

  return (
    <>
      <SiteHead
        title={`${event.title.value} | Living Message Church`}
        description={event.summary.value || `Event information for ${event.title.value} at Living Message Church.`}
        path={`/events/${event.slug}`}
        structuredData={structuredData}
      />
      <main className="event-detail">
        <Container size="editorial">
          <Link className="event-detail-back" href="/events"><span aria-hidden="true">←</span> All events</Link>

          <div className="event-detail-artwork">
            {event.image ? (
              <Image
                src={event.image.src}
                alt={event.image.alt}
                fill
                priority
                sizes="(max-width: 96rem) 92vw, 90rem"
              />
            ) : (
              <span>{event.title.value}</span>
            )}
          </div>

          <div className="event-detail-layout">
            <article className="event-detail-copy">
              <p className="eyebrow">Upcoming event</p>
              <h1>{event.title.value}</h1>
              {description ? <p className="event-detail-description">{description}</p> : null}
            </article>

            <aside className="event-detail-facts" aria-label="Event details">
              {event.location ? (
                <div className="event-detail-fact">
                  <LocationIcon />
                  <span>{event.location.value}</span>
                </div>
              ) : null}
              {date ? (
                <div className="event-detail-fact">
                  <CalendarIcon />
                  <span>{date}</span>
                </div>
              ) : null}
              {event.registrationUrl ? (
                <a className="event-detail-cta" href={event.registrationUrl.value} target="_blank" rel="noreferrer">
                  {externalLabel}<span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </aside>
          </div>
        </Container>
      </main>
    </>
  );
}
