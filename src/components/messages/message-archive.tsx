import { homePhotography } from "@/content";
import type { ContentFeedResult, Message } from "@/types/content";
import { Card } from "@/components/ui/card";
import { MediaFrame } from "@/components/ui/media-frame";
import { formatMessageDate } from "@/lib/messages/message-format";

export function MessageArchive({ feed }: { feed: ContentFeedResult<Message> }) {
  if (feed.status === "unavailable" || feed.items.length === 0) {
    return (
      <Card className="feed-empty-state">
        <span className="card-index">00</span>
        <div>
          <h2>Message source pending</h2>
          <p>{feed.message}</p>
          <p className="feed-meta">No sermon metadata or media IDs have been inferred.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="message-card-grid">
      {feed.items.map((message) => (
        <Card className="message-card" key={message.id}>
          <MediaFrame image={homePhotography.message} label={`Living Message Church teaching photography for ${message.title.value}`} ratio="wide" tone="cobalt" sizes="(max-width: 48rem) 100vw, 33vw" />
          <div className="card-copy">
            <h2>{message.title.value}</h2>
            {message.date ? <p className="message-date">{formatMessageDate(message.date.value)}</p> : null}
            <p>{message.summary.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
