import type { CallToAction, ContentImage, SeoContent } from "@/types/content";

interface KidsPrinciple {
  number: string;
  title: string;
  body: string;
}

interface KidsArrivalStep {
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
  introduction: {
    eyebrow: string;
    title: string;
    body: string;
    image: ContentImage;
  };
  experience: {
    eyebrow: string;
    title: string;
    body: string;
    image: ContentImage;
    principles: KidsPrinciple[];
  };
  arrival: {
    eyebrow: string;
    title: string;
    body: string;
    steps: KidsArrivalStep[];
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
    path: "/connect/kids",
    title: "LMC Kids | Living Message Church",
    description:
      "Learn what Living Message Church currently shares about LMC Kids and prepare for children’s check-in on Sunday.",
    // Ages, safeguarding, allergies, accessibility, and ministry leadership remain under review.
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
      "LMC Kids uses Bible-centered curriculum with each message pointing children to Christ. The ministry emphasizes learning, laughter, and a welcoming environment.",
    logo: {
      src: "/images/brand/living-message-kids-logo.svg",
      alt: "LMC Kids logo.",
      status: "approved-temporary",
      credit: "User-supplied LMKids Logo.svg",
    },
    image: {
      src: "/images/kids/living-message-kids-room.jpg",
      alt: "Children taking part in an activity in the Living Message Church kids room.",
      status: "approved-temporary",
      credit: "Living Message Church legacy website",
    },
    actions: [
      { label: "Plan your visit", href: "/plan-your-visit", style: "primary" },
      { label: "Ask a question", href: "/contact", style: "secondary" },
    ],
  },
  introduction: {
    eyebrow: "A place for children",
    title: "A Sunday designed with children in mind.",
    body:
      "The current LMC Kids description centers Scripture, Christ, learning, laughter, and a welcoming environment.",
    image: {
      src: "/images/kids/lm-kids-learn-laugh-belong.png",
      alt: "Illustrated scene of children holding hands beneath a tree mural reading Learn, Laugh, Belong.",
      status: "approved-temporary",
      credit: "User-supplied LM Kids artwork",
    },
  },
  experience: {
    eyebrow: "Inside LMC Kids",
    title: "Scripture, wonder, and room to be a kid.",
    body:
      "Children are invited into Bible-centered learning that points them to Christ in an environment created for learning and laughter.",
    image: {
      src: "/images/connect/living-message-kids-community.jpg",
      alt: "Children gathering on colorful seats in the Living Message Church kids room.",
      status: "approved-temporary",
      credit:
        "https://www.livingmessagechurch.com/wp-content/uploads/2024/12/Kids-Min-2.png",
    },
    principles: [
      {
        number: "01",
        title: "Bible-centered",
        body: "The curriculum is described as pointing children to Christ throughout Scripture.",
      },
      {
        number: "02",
        title: "Made for learning",
        body: "The ministry emphasizes an environment where children can learn and engage.",
      },
      {
        number: "03",
        title: "Warm and welcoming",
        body: "Laughter and welcome are part of the current LMC Kids invitation.",
      },
    ],
  },
  arrival: {
    eyebrow: "Your first check-in",
    title: "A simple arrival, one step at a time.",
    body:
      "The current visitor guide places children’s self check-in stations through the lobby in the hallway. A team member can help, and a matching security sticker is used for pickup.",
    steps: [
      {
        number: "01",
        title: "Head through the lobby",
        body: "The children’s check-in area is located in the hallway beyond the lobby.",
      },
      {
        number: "02",
        title: "Check in",
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
    eyebrow: "Questions before Sunday?",
    title: "Your first visit can feel simple.",
    body:
      "Plan your Sunday or contact the church before you arrive. No question is too small when you’re bringing your family for the first time.",
    actions: [
      { label: "Plan your visit", href: "/plan-your-visit", style: "primary" },
      { label: "Contact the church", href: "/contact", style: "secondary" },
    ],
  },
};
