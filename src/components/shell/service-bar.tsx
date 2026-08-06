import { contactInformation, serviceTimes } from "@/content";
import { Container } from "@/components/ui/container";

export function ServiceBar() {
  const inPerson = serviceTimes.filter((service) => service.format === "in-person");
  return (
    <div className="service-bar">
      <Container className="service-bar-inner">
        <p>
          <strong>Sundays</strong> {inPerson.map((service) => service.time).join(" & ")}
        </p>
        <a href={contactInformation.directionsUrl.value} target="_blank" rel="noreferrer">
          Clermont, Florida <span aria-hidden="true">↗</span>
        </a>
      </Container>
    </div>
  );
}
