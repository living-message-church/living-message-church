import type { ContentFeedResult, Message } from "@/types/content";
import { localMessages } from "@/content/messages";

export interface MessageSourceAdapter {
  getMessages(): Promise<ContentFeedResult<Message>>;
}

class LocalMessageSource implements MessageSourceAdapter {
  async getMessages(): Promise<ContentFeedResult<Message>> {
    return {
      status: "available",
      provider: "local",
      items: localMessages,
      message:
        "Temporary local records sourced from the current Living Message Church sermon page. Supabase is not connected.",
      checkedAt: "2026-08-06",
    };
  }
}

// Keep this provider-neutral boundary when Supabase becomes the editorial source.
export const messageSource: MessageSourceAdapter = new LocalMessageSource();

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
