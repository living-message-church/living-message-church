import type { SeoContent } from "@/types/content";

const source = "https://www.livingmessagechurch.com/nextsteps/";

export const nextStepsContent = {
  seo: {
    title: "Next Steps Class | Living Message Church",
    description:
      "Connect, serve, and grow through the Next Steps class at Living Message Church in Clermont, Florida.",
    path: "/connect/next-steps",
  } satisfies SeoContent,
  source,
  status: "approved-temporary" as const,
  eyebrow: "Next Steps class",
  title: "Connect. Serve. Grow.",
  intro:
    "Take one clear step toward knowing Living Message Church, meeting its leadership, and finding your place in the church family.",
  registrationLabel: "Register for Next Steps",
  overviewEyebrow: "Let’s grow together",
  overviewTitle: "One class. A clearer way forward.",
  overviewBody:
    "Next Steps is a single class hosted by the Living Message Church leadership team. It is designed to help people connect with the church, discover ways to serve, and keep growing.",
  facts: [
    { label: "When", value: "Sundays" },
    { label: "Time", value: "During the 10:45 AM service" },
    { label: "Format", value: "One class" },
  ],
  pathwayEyebrow: "The pathway",
  pathwayTitle: "Three words that make the next step simple.",
  pathway: [
    {
      number: "01",
      title: "Connect",
      body: "Learn more about Living Message Church and meet members of the leadership team.",
    },
    {
      number: "02",
      title: "Serve",
      body: "Begin discovering where your gifts and interests can support life in the church family.",
    },
    {
      number: "03",
      title: "Grow",
      body: "Take a practical step toward deeper participation, discipleship, and life together.",
    },
  ],
  classEyebrow: "Your next class",
  classTitle: "Ready when you are.",
  classBody:
    "Register through Living Message Church’s current Church Center form. The church’s leadership team hosts the class during the second Sunday service.",
  classImage: {
    src: "/images/ministries/living-message-next-steps-class.webp",
    alt: "Next Steps Class at Living Message Church.",
    status: "approved-temporary" as const,
    credit: "Living Message Church legacy website",
  },
  classActionLabel: "Choose a class",
  principlesEyebrow: "What shapes the pathway",
  principlesTitle: "Humility. Purpose. Love in action.",
  principles: [
    { title: "Humility", reference: "Philippians 2:3" },
    { title: "Purpose", reference: "2 Timothy 1:9" },
    { title: "Love in action", reference: "1 John 3:18" },
  ],
  finalEyebrow: "Come take the next step",
  finalTitle: "You don’t have to figure out connection alone.",
  finalBody: "Choose an upcoming class and let the Living Message team help you find a clear way forward.",
  finalActionLabel: "Register now",
  questionActionLabel: "Ask a question",
};
