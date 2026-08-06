import type { LeadershipPerson } from "@/types/content";

const source = "https://www.livingmessagechurch.com/the-team/";
const person = (
  id: string,
  name: string,
  title: string,
  group: LeadershipPerson["group"],
): LeadershipPerson => ({
  id,
  name: { value: name, status: "needs-verification", source },
  title: { value: title, status: "needs-verification", source },
  group,
});

// Do not render this roster as current until every name/title is approved.
export const leadership: LeadershipPerson[] = [
  person("brian-broadway", "Brian Broadway", "Lead Pastor / Bishop", "pastoral"),
  person("allison-broadway", "Allison Broadway", "Administrator", "pastoral"),
  person("brad-banker", "Brad Banker", "Elder", "elder"),
  person("garry-grant", "Garry Grant", "Elder", "elder"),
  person("carlos-martinez", "Carlos Martinez", "Elder", "elder"),
  person("ricky-ortiz", "Ricky Ortiz", "Associate Pastor", "pastoral"),
  person("dwayne-bishop", "Dwayne Bishop", "Deacon / Connection", "deacon"),
  person("dennis-carter", "Dennis Carter", "Deacon", "deacon"),
  person("nathanael-edmund", "Nathanael Edmund", "Deacon / Worship Pastor", "deacon"),
  person("nathan-lehman", "Nathan Lehman", "Deacon / Connection", "deacon"),
  person("stephen-mcpherson", "Stephen McPherson", "Deacon / Men’s Leader", "deacon"),
  person("alfredo-olivo", "Alfredo Olivo Jr.", "Deacon", "deacon"),
  person("kaidyn-exline", "Kaidyn Exline", "Children’s & Nursery Director", "ministry"),
  person("jaime-simons", "Jaime Simons", "Facilities Director", "ministry"),
  person("alejandro-hernandez", "Alejandro Hernandez", "Young Adults Director", "ministry"),
  person("dawn-simons", "Dawn Simons", "Hospitality Director", "ministry"),
];
