import type { PageContent } from "@/types/content";

export const growthGroupsContent = {
  page: {
    seo: {
      path: "/connect/groups",
      title: "Growth Groups | Living Message Church",
      description:
        "Explore semester-based Growth Groups at Living Message Church, including the planned 2027 curriculum rotations.",
      noIndex: true,
    },
    eyebrow: "Growth",
    title: "Truth for belief. Practice for life.",
    intro:
      "Eight-week classes rotate through the year, pairing theological depth with practical Christian living.",
  } satisfies PageContent,
  overview: {
    eyebrow: "Growth Groups",
    title: "A clear path toward mature faith.",
    body:
      "Growth Groups are structured, semester-based classes designed to strengthen both orthodoxy—what Christians believe—and orthopraxy—how Christians live.",
    facts: [
      { label: "Format", value: "Eight-week classes within Winter, Spring, and Fall rotations" },
      { label: "Meeting time", value: "Thursday nights at 7:00 PM" },
      { label: "Location", value: "Living Message Church · 20180 US Highway 27, Suite 308 · Clermont, FL 34715" },
      { label: "Signup", value: "Church Center app through Planning Center Groups" },
    ],
  },
  curriculum: {
    eyebrow: "2027 Curriculum",
    title: "Depth for every season.",
    intro:
      "The rotation moves between a foundational course and focused classes for spiritual formation, the home, godliness, and church history.",
    semesters: [
      {
        id: "foundations",
        number: "01",
        season: "Winter Semester",
        dates: "January 12 – March 28, 2027",
        title: "Foundations",
        status: "Core course",
        body:
          "Foundations gives a clear, biblical grasp of who God is and what Christians believe, what the gospel is and accomplishes, and how the gospel shapes the daily rhythms of Christian living. It moves from basic Christian literacy toward settled confidence in the faith and the practices that sustain a lifetime of walking with Christ.",
      },
      {
        id: "spring",
        number: "02",
        season: "Spring Semester",
        dates: "April 18 – July 4, 2027",
        title: "Curriculum to be announced",
        status: "Coming later",
        body: "The Spring curriculum has not yet been selected. Details will remain in Church Center once approved.",
      },
      {
        id: "summer-fall",
        number: "03",
        season: "Summer / Fall Semester",
        dates: "August 1 – October 17, 2027",
        title: "Curriculum to be announced",
        status: "Coming later",
        body: "The Summer / Fall curriculum has not yet been selected. Details will remain in Church Center once approved.",
      },
    ],
  },
  winterOptions: {
    eyebrow: "Offered alongside Foundations",
    title: "Focused classes for everyday discipleship.",
    intro: "One of these classes is planned to run alongside Foundations during the Winter rotation.",
    classes: [
      "Abiding in Christ: Growing Closer to God",
      "Building Christ-Centered Homes",
      "Practicing Godliness: Spiritual Disciplines and Means of Grace",
      "Church History",
    ],
  },
  closing: {
    eyebrow: "Take the next step",
    title: "Grow in truth. Live it together.",
    body:
      "Registration will be managed through the Church Center app. Contact Living Message Church if you need help finding the current group when enrollment opens.",
  },
};
