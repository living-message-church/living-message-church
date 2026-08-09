import type { CallToAction, ContentImage, SeoContent } from "@/types/content";

interface KidsDistrict {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  highlights: string[];
  tone: "paper" | "mist" | "night";
  image: ContentImage;
}

interface KidsVisitStep {
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
  neighborhood: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    facts: Array<{ value: string; label: string }>;
  };
  districts: KidsDistrict[];
  visit: {
    eyebrow: string;
    title: string;
    body: string;
    steps: KidsVisitStep[];
  };
  final: {
    eyebrow: string;
    title: string;
    body: string;
    actions: CallToAction[];
  };
}

const districtImage = (src: string, alt: string): ContentImage => ({
  src,
  alt,
  status: "approved-temporary",
  credit: "Original AI-assisted LM Kids neighborhood artwork created for this project",
});

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
  neighborhood: {
    eyebrow: "Explore the neighborhood",
    title: "One big place to grow.",
    body:
      "Every part of the LM Kids neighborhood represents something children need on Sunday: truth, joy, room to learn, and people who are ready to welcome them.",
    note:
      "The illustrated districts are a storytelling device for the ministry experience, not a map of the church facility.",
    facts: [
      { value: "Through 5th", label: "Grade" },
      { value: "Bible-centered", label: "Curriculum" },
      { value: "Matching sticker", label: "Secure pickup" },
    ],
  },
  districts: [
    {
      id: "local-school",
      number: "01",
      label: "Local School",
      title: "Big truth, made clear.",
      body:
        "Bible-centered curriculum gives every Sunday a clear foundation, with each message described as pointing children to Christ.",
      highlights: ["Bible-centered curriculum", "Messages that point to Christ"],
      tone: "paper",
      image: districtImage(
        "/images/kids/lm-kids-district-local-school.webp",
        "Illustrated children learning together around a table in the LM Kids neighborhood school.",
      ),
    },
    {
      id: "park-playground",
      number: "02",
      label: "Park & Playground",
      title: "Room for joy.",
      body:
        "Learning and laughter belong in the same place. A welcoming environment gives children room to participate and discover together.",
      highlights: ["Learning and laughter", "A welcoming environment"],
      tone: "mist",
      image: districtImage(
        "/images/kids/lm-kids-district-playground.webp",
        "Illustrated children playing together in the LM Kids neighborhood park and playground.",
      ),
    },
    {
      id: "skate-park",
      number: "03",
      label: "Skate Park",
      title: "Every child gets room to try.",
      body:
        "LM Kids is designed with children in mind—a place where they can learn, ask questions, and enter the room with confidence.",
      highlights: ["Made for learning", "Questions are welcome"],
      tone: "paper",
      image: districtImage(
        "/images/kids/lm-kids-district-skate-park.webp",
        "Illustrated children encouraging one another while learning to skateboard in the LM Kids neighborhood.",
      ),
    },
    {
      id: "community-garden",
      number: "04",
      label: "Community Garden",
      title: "Faith grows together.",
      body:
        "LM Kids brings clear teaching and genuine connection into the same space so children can hear truth and know they belong.",
      highlights: ["A clear foundation", "Connection with other children"],
      tone: "mist",
      image: districtImage(
        "/images/kids/lm-kids-district-community-garden.webp",
        "Illustrated children planting, watering, and sharing produce in the LM Kids neighborhood garden.",
      ),
    },
    {
      id: "home",
      number: "05",
      label: "Home",
      title: "Families belong here, too.",
      body:
        "LM Kids serves children through fifth grade. Exact room assignments and age groupings are being confirmed, and a team member can help when you arrive.",
      highlights: ["Children through fifth grade", "Help finding the right room"],
      tone: "paper",
      image: districtImage(
        "/images/kids/lm-kids-district-home.webp",
        "Illustrated children, family members, and leaders talking together in a warm neighborhood home.",
      ),
    },
    {
      id: "cafe-game-room",
      number: "06",
      label: "Café & Game Room",
      title: "Friendship has a seat.",
      body:
        "Learning, laughter, and a welcoming environment make natural room for children to connect and enjoy Sunday together.",
      highlights: ["Natural connection", "A warm Sunday welcome"],
      tone: "night",
      image: districtImage(
        "/images/kids/lm-kids-district-cafe-game-room.webp",
        "Illustrated children playing games, building, and welcoming a friend in the LM Kids neighborhood café and game room.",
      ),
    },
  ],
  visit: {
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
