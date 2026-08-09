import type { CallToAction, ContentImage, SeoContent } from "@/types/content";

interface KidsPrinciple {
  number: string;
  title: string;
  body: string;
}

interface KidsValue {
  icon: "book" | "cross" | "bulb" | "heart";
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
    values: KidsValue[];
  };
  age: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    actions: CallToAction[];
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
      src: "/images/brand/lmkids.svg",
      alt: "LM Kids logo.",
      status: "approved-temporary",
      credit: "User-supplied lmkids.svg",
    },
    image: {
      src: "/images/kids/lm-kids-city-community-hero.webp",
      alt: "An illustrated LM Kids neighborhood with homes, a community garden, playground, school, youth space, and skate park at night.",
      status: "approved-temporary",
      credit: "User-supplied LM Kids city artwork",
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
      src: "/images/kids/lm-kids-learn-laugh-belong.webp",
      alt: "Illustrated children celebrating together beneath an LM Kids tree mural with the words Laugh, Learn, and Belong.",
      status: "approved-temporary",
      credit: "User-supplied LM Kids artwork",
    },
    values: [
      {
        icon: "book",
        title: "Scripture",
        body: "Bible-centered curriculum gives every Sunday a clear foundation.",
      },
      {
        icon: "cross",
        title: "Christ",
        body: "Each message is described as pointing children to Christ.",
      },
      {
        icon: "bulb",
        title: "Learning",
        body: "Children have room to learn, engage, and discover together.",
      },
      {
        icon: "heart",
        title: "Welcome",
        body: "Laughter and a welcoming environment shape the invitation.",
      },
    ],
  },
  age: {
    eyebrow: "Who LM Kids serves",
    title: "A place to grow through fifth grade.",
    body:
      "LMC Kids serves children through fifth grade with Bible-centered learning, laughter, and a welcoming environment.",
    note:
      "Bringing a baby or younger child? Contact the church before Sunday and the team can help confirm the right room for your family.",
    actions: [{ label: "Ask about LM Kids", href: "/contact", style: "secondary" }],
  },
  experience: {
    eyebrow: "Inside LMC Kids",
    title: "Scripture, wonder, and room to be a kid.",
    body:
      "Children are invited into Bible-centered learning that points them to Christ in an environment created for learning and laughter.",
    image: {
      src: "/images/kids/lm-kids-wonder-room.webp",
      alt: "Illustrated children relaxing, laughing, and spending time together on bright red seats in a glowing woodland setting.",
      status: "approved-temporary",
      credit: "User-supplied LM Kids wonder-room artwork",
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
