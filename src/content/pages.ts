import type { PageContent, SeoContent } from "@/types/content";

const page = (
  path: string,
  title: string,
  description: string,
  eyebrow: string,
  heading: string,
  intro: string,
  noIndex = false,
): PageContent => ({
  seo: { path, title, description, noIndex },
  eyebrow,
  title: heading,
  intro,
});

export const pageContent = {
  home: {
    title: "Living Message Church | Clermont, Florida",
    description:
      "Plan a visit to Living Message Church in Clermont, Florida, and learn about Sunday gatherings, Bible teaching, connection, and outreach.",
    path: "/",
  } satisfies SeoContent,
  newHere: page(
    "/plan-your-visit",
    "Plan Your Visit | Living Message Church",
    "Find Sunday times, location, parking, children’s check-in, and what to expect at Living Message Church.",
    "I’m new",
    "Your first Sunday can feel simple.",
    "Here’s what the current church site says you can expect—and the practical details to help you arrive with confidence.",
  ),
  contact: page(
    "/contact",
    "Contact | Living Message Church",
    "Find the current address, phone number, email, and directions for Living Message Church in Clermont, Florida.",
    "Contact",
    "We’re here to help.",
    "Reach out with a question or use the current location details to plan your visit.",
  ),
  privacy: page(
    "/privacy-policy",
    "Privacy Policy | Living Message Church",
    "Read the current privacy notice for Living Message Church.",
    "Policy",
    "Privacy policy",
    "This interim policy page preserves the scope of the current public notice while legal and technical review is completed.",
  ),
  photoRelease: page(
    "/photo-release",
    "Photo Release | Living Message Church",
    "Read the current photography, audio, and video notice for Living Message Church events and programs.",
    "Policy",
    "Photo and media notice",
    "This interim notice preserves the subject of the current release while safeguarding and legal review is completed.",
  ),
};

export const stagedPages: Record<string, PageContent> = {
  about: page("/about", "About | Living Message Church", "Learn about Living Message Church.", "About", "A church community shaped by Scripture.", "The church story, beliefs, and leadership are being prepared from reviewed source content."),
  gallery: page("/about/gallery", "Gallery | Living Message Church", "A future gallery of Living Message Church community life.", "About", "Church life, honestly seen.", "Photography will be added only after ownership, consent, relevance, and alt text are approved."),
  connect: page("/connect", "Connect | Living Message Church", "Explore connection and ministry pathways at Living Message Church.", "Connect", "There is a next step for you.", "Ministry and group details are being prepared with their leaders."),
  messages: page("/messages", "Messages | Living Message Church", "Watch recent Living Message Church services and explore the verified YouTube archive by title, date, and category.", "Messages", "Teaching rooted in the text.", "Watch the newest service and explore recent livestreams from the verified Living Message Church YouTube channel."),
  live: page("/online-church", "Church Online | Living Message Church", "Watch Living Message Church online when a service is streaming and explore recent services from the verified YouTube channel.", "Church Online", "Church wherever you are.", "Watch live or explore recent Living Message Church messages."),
  events: page("/events", "Events | Living Message Church", "See upcoming Living Message Church events.", "Events", "Make room for life together.", "Only current events will publish after the authoritative source and registration workflow are confirmed."),
  outreach: page("/outreach", "Outreach | Living Message Church", "Learn about Living Message Church outreach and Find, Feed & Restore.", "Outreach", "Practical hope for families.", "The current site centers Find, Feed & Restore; program and relationship details remain under owner review."),
  give: page("/give", "Give | Living Message Church", "Learn about giving to Living Message Church through its specialist giving provider.", "Give", "Generosity with a trusted handoff.", "Giving remains with Church Center. The account destination and finance-approved explanatory copy require confirmation."),
};

export const legalContent = {
  privacySections: [
    {
      title: "Information and contact",
      body: "The current public policy discusses contact and profile information, marketing communications, surveys, and information people choose to provide.",
    },
    {
      title: "Cookies, analytics, and external services",
      body: "The current policy acknowledges cookies, tracking, security, and third-party links. The final policy must name the services actually used by the new website.",
    },
    {
      title: "Review required",
      body: "An effective date, retention periods, user rights, children’s privacy, processors, consent choices, and a verified privacy contact remain pending legal and technical approval.",
    },
  ],
  photoSections: [
    {
      title: "Current notice scope",
      body: "The existing public notice states that photography, audio, or video recording may occur at church events and programs and may be used in church communications.",
    },
    {
      title: "Review required",
      body: "The final notice must define guardian consent for minors, an accessible opt-out process, event signage, withdrawal requests, storage and use duration, and a verified contact.",
    },
  ],
};

export const newHereDetails = {
  essentialsTitle: "Everything you need for Sunday.",
  expectationsEyebrow: "What to expect",
  expectationsTitle: "Arrive with confidence.",
  expectationsIntro:
    "A first visit is a meaningful step. Here is what the current Living Message visitor guide says you can expect when you arrive.",
  details: [
    { title: "Parking and arrival", body: "Follow the Living Message Church signs when you arrive. Parking is available around the building, and door greeters can help you find your way." },
    { title: "Children’s check-in", body: "Self check-in stations are located through the lobby in the hallway. A team member can help, and a matching security sticker is used for pickup." },
    { title: "Worship and teaching", body: "Sunday includes contemporary Christian worship, church updates, and Christ-centered, Scripture-saturated teaching that is usually expository." },
    { title: "Meet a pastor", body: "Pastors and elders are available after the service and wear name tags so guests can easily introduce themselves and ask questions." },
    { title: "Find connection", body: "Connect Cards are available on the chairs and by QR code in the lobby. The connection team can follow up, pray with you, and help with next steps." },
  ],
  kidsEyebrow: "LMC Kids",
  kidsTitle: "A Sunday designed with children in mind.",
  kidsBody: "LMC Kids uses Bible-centered curriculum with each message pointing children to Christ. The ministry emphasizes learning, laughter, and a welcoming environment.",
  questionsEyebrow: "Still wondering?",
  questionsTitle: "Ask before you arrive.",
  questionsBody: "No question is too small when you’re planning a first visit.",
};

export const contactPageDetails = {
  detailsEyebrow: "Current contact details",
  detailsTitle: "Come by or reach out.",
  formEyebrow: "Contact form",
  formTitle: "A secure form is coming next.",
  formBody:
    "No information is collected here yet. Form recipients, privacy, retention, and spam protection must be approved before launch.",
  emailLabel: "Email the church instead",
};

export const givePageDetails = {
  providerEyebrow: "Specialist provider",
  providerTitle: "Giving stays with Church Center.",
  providerBody: "The website does not collect or process payment details.",
};
