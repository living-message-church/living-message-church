import type { Message } from "@/types/content";

export const featuredMessage: Message = {
  id: "pending-latest-message",
  title: {
    value: "The latest message is being prepared",
    status: "needs-verification",
    source: "docs/CONTENT_GAPS.md",
  },
  summary: {
    value:
      "Living Message teaches through the Bible line by line and in context. A verified message feed will be connected in a later milestone.",
    status: "needs-verification",
    source: "docs/CONTENT_GAPS.md",
  },
  availability: "pending-verification",
};
