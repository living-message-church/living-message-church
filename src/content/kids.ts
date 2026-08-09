import type { CallToAction, ContentImage, SeoContent } from "@/types/content";

interface KidsTouchpoint {
  mark: string;
  title: string;
  body: string;
}

interface KidsJourneyStep {
  number: string;
  title: string;
  body: string;
}

export interface KidsPageContent {
  seo: SeoContent;
  hero: {
    eyebrow: string;
    title: {
      lead: string;
      accent: string;
      end: string;
    };
    body: string;
    logo: ContentImage;
    image: ContentImage;
    actions: CallToAction[];
  };
  touchpoints: {
    eyebrow: string;
    title: string;
    body: string;
    items: KidsTouchpoint[];
  };
  ages: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    image: ContentImage;
    actions: CallToAction[];
  };
  experience: {
    eyebrow: string;
    title: string;
    body: string;
    image: ContentImage;
    bullets: string[];
  };
  arrival: {
    eyebrow: string;
    title: string;
    body: string;
    steps: KidsJourneyStep[];
  };
  final: {
    eyebrow: string;
    title: string;
    body: string;
    actions: CallToAction[];
  };
}

export const kidsPageContent: KidsPageContent = {
  seo: {
    path: "/lmkids",
    title: "LM Kids | Living Message Church",
    description:
      "Discover LM Kids at Living Message Church: Bible-centered learning, joyful connection, and a welcoming first-Sunday experience for children through fifth grade.",
    // Exact room age bands, safeguarding, allergies, accessibility, and ministry leadership remain under review.
    noIndex: true,
  },
  hero: {
    eyebrow: "LM Kids",
    title: {
      lead: "Big truth.",
      accent: "Bright",
      end: "wonder.",
    },
    body:
      "LM Kids uses Bible-centered curriculum with each message pointing children to Christ. The ministry emphasizes learning, laughter, and a welcoming environment.",
    logo: {
      src: "/images/brand/lmkids.svg",
      alt: "LM Kids logo.",
      status: "approved-temporary",
      credit: "User-supplied lmkids.svg",
    },
    image: {
      src: "/images/kids/lm-kids-city-community-branded.webp",
      alt: "An illustrated LM Kids neighborhood with homes, a community garden, playground, school, youth space, and skate park at night.",
      status: "approved-temporary",
      credit: "User-supplied city artwork with the official user-supplied LM Kids logo",
    },
    actions: [
      { label: "Plan your visit", href: "/plan-your-visit", style: "primary" },
      { label: "Ask a question", href: "/contact", style: "secondary" },
    ],
  },
  touchpoints: {
    eyebrow: "What shapes every Sunday",
    title: "Made for faith. Built for kids.",
    body:
      "A clear ministry rhythm gives children room to hear truth, ask questions, laugh, and know they belong.",
    items: [
      {
        mark: "01",
        title: "Know the story",
        body: "Bible-centered curriculum gives every gathering a clear foundation.",
      },
      {
        mark: "02",
        title: "Meet Jesus",
        body: "Each message is described as pointing children to Christ.",
      },
      {
        mark: "03",
        title: "Make friends",
        body: "Learning and laughter create natural room for children to connect.",
      },
      {
        mark: "04",
        title: "Feel welcome",
        body: "A warm environment helps every child enter the room with confidence.",
      },
    ],
  },
  ages: {
    eyebrow: "Ages & rooms",
    title: "A place to grow through fifth grade.",
    body:
      "LM Kids serves children through fifth grade with Bible-centered teaching, laughter, and a welcoming environment designed with kids in mind.",
    note:
      "Room assignments and exact age groupings are being confirmed. A team member can help your family find the right room when you arrive.",
    image: {
      src: "/images/kids/lm-kids-learn-laugh-belong.webp",
      alt: "Illustrated children celebrating together beneath an LM Kids tree mural with the words Laugh, Learn, and Belong.",
      status: "approved-temporary",
      credit: "User-supplied LM Kids artwork",
    },
    actions: [{ label: "Ask about age groups", href: "/contact", style: "secondary" }],
  },
  experience: {
    eyebrow: "Inside LM Kids",
    title: "Wonder belongs in the room.",
    body:
      "Children are invited into Bible-centered learning that points them to Christ in an environment created for curiosity, joy, and connection.",
    image: {
      src: "/images/kids/lm-kids-wonder-room.webp",
      alt: "Illustrated children relaxing, laughing, and spending time together on bright red seats in a glowing woodland setting.",
      status: "approved-temporary",
      credit: "User-supplied LM Kids wonder-room artwork",
    },
    bullets: ["Bible-centered", "Christ-focused", "Made for learning", "Warm and welcoming"],
  },
  arrival: {
    eyebrow: "Your first Sunday",
    title: "From the lobby to pickup—made simple.",
    body:
      "The current visitor guide places children’s self check-in stations through the lobby in the hallway. A team member can help, and a matching security sticker is used for pickup.",
    steps: [
      {
        number: "01",
        title: "Find check-in",
        body: "Head through the lobby to the children’s check-in area in the hallway.",
      },
      {
        number: "02",
        title: "Meet the team",
        body: "Use a self check-in station, with a team member available to help.",
      },
      {
        number: "03",
        title: "Keep your sticker",
        body: "The current visitor guide says a matching security sticker is used for pickup.",
      },
    ],
  },
  final: {
    eyebrow: "Ready for Sunday?",
    title: "Big questions are welcome here.",
    body:
      "Plan your Sunday or contact the church before you arrive. No question is too small when you’re bringing your family for the first time.",
    actions: [
      { label: "Plan your visit", href: "/plan-your-visit", style: "primary" },
      { label: "Contact the church", href: "/contact", style: "secondary" },
    ],
  },
};
