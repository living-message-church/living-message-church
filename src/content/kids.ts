import type { CallToAction, ContentImage, SeoContent } from "@/types/content";

interface KidsDistrict {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  highlights: string[];
  principle: string;
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
  gospelStudy: {
    eyebrow: string;
    title: string;
    body: string;
    principles: Array<{
      number: string;
      title: string;
      body: string;
      tone: "navy" | "coral" | "violet" | "gold" | "sky" | "sage";
    }>;
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
  gospelStudy: {
    eyebrow: "Every week in LM Kids",
    title: "The gospel, made clear for growing hearts.",
    body:
      "Kids experience the good news of the gospel through Bible study that is rooted in Scripture, centered on Jesus, and made meaningful for where they are growing.",
    principles: [
      {
        number: "01",
        title: "Christ Centered",
        body: "It’s all about Jesus, and every story points back to Him.",
        tone: "navy",
      },
      {
        number: "02",
        title: "Heart Transforming",
        body: "The gospel encourages true transformation—not simple behavior modification.",
        tone: "coral",
      },
      {
        number: "03",
        title: "Age Aligned",
        body: "Each LM Kids group studies the same section of Scripture in an age-aware way.",
        tone: "violet",
      },
      {
        number: "04",
        title: "Chronological",
        body: "Kids study the Bible’s narrative in order, from Genesis to Revelation.",
        tone: "gold",
      },
      {
        number: "05",
        title: "Theologically Rich",
        body: "Every session is doctrinally sound, thorough, and presented with children in mind.",
        tone: "sky",
      },
      {
        number: "06",
        title: "Missionally Minded",
        body: "Every session calls kids to share and live out the gospel.",
        tone: "sage",
      },
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
      principle: "Theologically Rich",
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
      principle: "Heart Transforming",
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
      principle: "Missionally Minded",
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
        "From Genesis to Revelation, children discover how every part of the Bible belongs to one unfolding story of redemption.",
      highlights: ["The Bible in narrative order", "One unfolding gospel story"],
      principle: "Chronological",
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
        "Each LM Kids group approaches the same Scripture in a way designed for its stage of learning. A team member can help your family find the right room when you arrive.",
      highlights: ["Age-aware Bible study", "Help finding the right room"],
      principle: "Age Aligned",
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
        "Every story points children back to Jesus. Learning, laughter, and friendship make natural room for that good news to be heard together.",
      highlights: ["Every story points to Jesus", "A warm Sunday welcome"],
      principle: "Christ Centered",
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
