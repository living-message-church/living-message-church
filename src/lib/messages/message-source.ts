import type { ContentFeedResult, Message } from "@/types/content";

export interface MessageSourceAdapter {
  getMessages(): Promise<ContentFeedResult<Message>>;
}

class UnconfiguredMessageSource implements MessageSourceAdapter {
  async getMessages(): Promise<ContentFeedResult<Message>> {
    return {
      status: "unavailable",
      provider: "unconfigured",
      items: [],
      message:
        "The message archive is unavailable until the canonical YouTube channel and Podbean status are approved.",
      checkedAt: "2026-08-06",
    };
  }
}

// Replace only after docs/CONTENT_VERIFICATION.md identifies an approved source.
export const messageSource: MessageSourceAdapter = new UnconfiguredMessageSource();

export async function getMessageFeed() {
  try {
    return await messageSource.getMessages();
  } catch {
    return {
      status: "unavailable",
      provider: "unconfigured",
      items: [],
      message: "Messages are temporarily unavailable.",
      checkedAt: "2026-08-06",
    } satisfies ContentFeedResult<Message>;
  }
}
