import type {
  ContentImage,
  SeoContent,
  TeamMember,
  TeamTier,
  VerificationStatus,
} from "@/types/content";

const source = "https://www.livingmessagechurch.com/the-team/";
const person = (
  id: string,
  name: string,
  title: string,
  group: TeamMember["group"],
  tier: TeamMember["tier"],
  order: number,
  image: string,
): TeamMember => ({
  id,
  name: { value: name, status: "approved-temporary", source },
  title: { value: title, status: "approved-temporary", source },
  group,
  tier,
  order,
  active: true,
  image: {
    src: `/images/leadership/team/${image}`,
    alt: `${name}, ${title} at Living Message Church.`,
    status: "approved-temporary",
    credit: "Living Message Church legacy website",
  },
});

// The current production roster and ordering are approved for temporary use by
// project-owner direction. Individual active status, role wording, and the
// Garry/Gary and Jaime/Jamie source-filename discrepancies remain documented.
export const leadership: TeamMember[] = [
  person("brian-broadway", "Brian Broadway", "Lead Pastor / Bishop", "pastoral", "executive", 1, "brian-broadway.jpg"),
  person("allison-broadway", "Allison Broadway", "Administrator", "pastoral", "executive", 2, "allison-broadway.jpg"),
  person("brad-banker", "Brad Banker", "Elder", "elder", "executive", 3, "brad-banker.jpg"),
  person("garry-grant", "Garry Grant", "Elder", "elder", "executive", 4, "garry-grant.jpg"),
  person("carlos-martinez", "Carlos Martinez", "Elder", "elder", "executive", 5, "carlos-martinez.jpg"),
  person("ricky-ortiz", "Ricky Ortiz", "Associate Pastor", "pastoral", "executive", 6, "ricky-ortiz.jpg"),
  person("dwayne-bishop", "Dwayne Bishop", "Deacon / Connection", "deacon", "deacons", 1, "dwayne-bishop.jpg"),
  person("dennis-carter", "Dennis Carter", "Deacon", "deacon", "deacons", 2, "dennis-carter.jpg"),
  person("nathanael-edmund", "Nathanael Edmund", "Deacon / Worship Pastor", "deacon", "deacons", 3, "nathanael-edmund.jpg"),
  person("nathan-lehman", "Nathan Lehman", "Deacon / Connection", "deacon", "deacons", 4, "nathan-lehman.jpg"),
  person("stephen-mcpherson", "Stephen McPherson", "Deacon / Men’s Leader", "deacon", "deacons", 5, "stephen-mcpherson.jpg"),
  person("alfredo-olivo", "Alfredo Olivo Jr.", "Deacon", "deacon", "deacons", 6, "alfredo-olivo.jpg"),
  person("kaidyn-exline", "Kaidyn Exline", "Children’s & Nursery Director", "ministry", "ministry-leaders", 1, "kaidyn-exline.jpg"),
  person("jaime-simons", "Jaime Simons", "Facilities Director", "ministry", "ministry-leaders", 2, "jaime-simons.jpg"),
  person("alejandro-hernandez", "Alejandro Hernandez", "Young Adults Director", "ministry", "ministry-leaders", 3, "alejandro-hernandez.jpg"),
  person("dawn-simons", "Dawn Simons", "Hospitality Director", "ministry", "ministry-leaders", 4, "dawn-simons.jpg"),
];

const approvedImage = (src: string, alt: string): ContentImage => ({
  src,
  alt,
  status: "approved-temporary",
  credit: "Living Message Church legacy website",
});

export const teamTiers: TeamTier[] = [
  {
    id: "executive",
    label: "Executive Team",
    summary: "Pastoral, administrative, and elder leadership serving the church family.",
    members: leadership.filter((member) => member.active && member.tier === "executive").sort((a, b) => a.order - b.order),
  },
  {
    id: "deacons",
    label: "Deacons",
    summary: "Leaders serving the practical and spiritual life of Living Message Church.",
    members: leadership.filter((member) => member.active && member.tier === "deacons").sort((a, b) => a.order - b.order),
  },
  {
    id: "ministry-leaders",
    label: "Ministry Leaders",
    summary: "People helping ministries and church-wide hospitality flourish.",
    members: leadership.filter((member) => member.active && member.tier === "ministry-leaders").sort((a, b) => a.order - b.order),
  },
];

export const teamContent = {
  seo: {
    title: "Our Team | Living Message Church",
    description:
      "Meet the pastors, elders, deacons, and ministry leaders serving Living Message Church in Clermont, Florida.",
    path: "/about/leadership",
  } satisfies SeoContent,
  source,
  sourceModified: "2026-07-31",
  status: "approved-temporary" as VerificationStatus,
  hero: {
    eyebrow: "Living Message leadership",
    title: "People who serve people.",
    body: "We are a team of like-minded people with a passion for serving God and others.",
    image: approvedImage(
      "/images/leadership/living-message-team-header.jpg",
      "The Living Message Church congregation worshipping together in Clermont, Florida.",
    ),
  },
  introduction: {
    eyebrow: "Our team",
    title: "Leadership shaped by service.",
    body: "Meet the people who help guide, support, and care for the Living Message Church family.",
  },
  tiers: teamTiers,
};
