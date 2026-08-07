import type { Ministry } from "@/types/content";

export const ministries: Ministry[] = [
  {
    id: "kids",
    name: {
      value: "LMC Kids",
      status: "needs-verification",
      source: "https://www.livingmessagechurch.com/plan-your-visit/",
    },
    summary: {
      value: "A welcoming environment where children learn about Christ throughout Scripture.",
      status: "needs-verification",
      source: "https://www.livingmessagechurch.com/",
    },
    audience: {
      value: "Children through fifth grade; starting age needs confirmation.",
      status: "needs-verification",
      source: "docs/CONTENT_GAPS.md",
    },
    href: "/plan-your-visit#kids",
    availability: "staged",
  },
  {
    id: "groups",
    name: {
      value: "Groups & Growth",
      status: "needs-verification",
      source: "https://www.livingmessagechurch.com/",
    },
    summary: {
      value: "Opportunities for genuine connection, discipleship, and life together.",
      status: "needs-verification",
      source: "https://www.livingmessagechurch.com/",
    },
    href: "/connect",
    availability: "staged",
  },
  {
    id: "next-steps",
    name: {
      value: "Next Steps",
      status: "needs-verification",
      source: "https://www.livingmessagechurch.com/nextsteps/",
    },
    summary: {
      value: "A path to connect, serve, and grow with the church family.",
      status: "needs-verification",
      source: "https://www.livingmessagechurch.com/nextsteps/",
    },
    href: "/connect/next-steps",
    availability: "staged",
  },
];
