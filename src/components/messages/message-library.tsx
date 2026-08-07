"use client";

import { useMemo, useState } from "react";
import type { Message } from "@/types/content";
import { formatMessageDate } from "@/lib/messages/message-format";
import { YouTubeEmbed } from "./youtube-embed";

export function MessageLibrary({ messages }: { messages: Message[] }) {
  const [activeCategory, setActiveCategory] = useState("All messages");
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const featuredMessage = messages.find((message) => message.featured) ?? messages[0];
  const categories = useMemo(
    () => Array.from(new Set(messages.flatMap((message) => message.categories?.value ?? []))).sort(),
    [messages],
  );
  const filteredMessages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return messages.filter((message) => {
      const categoryValues = message.categories?.value ?? [];
      const matchesCategory = activeCategory === "All messages" || categoryValues.includes(activeCategory);
      const searchText = [
        message.title.value,
        message.summary.value,
        message.speaker?.value ?? "",
        ...categoryValues,
      ].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [activeCategory, messages, query]);

  if (!featuredMessage) return null;

  const featuredPlaybackId = `featured:${featuredMessage.id}`;

  return (
    <div className="message-library">
      <section className="message-library-feature" id="message-player" aria-labelledby="active-message-title">
        <div className="message-library-feature-copy">
          <p className="eyebrow">Featured message</p>
          <h2 id="active-message-title">{featuredMessage.title.value}</h2>
          {featuredMessage.date ? <p className="message-date">{formatMessageDate(featuredMessage.date.value)}</p> : null}
          {featuredMessage.speaker ? <p className="message-speaker">{featuredMessage.speaker.value}</p> : null}
          <p>{featuredMessage.summary.value}</p>
          <div className="message-category-list" aria-label="Message categories">
            {(featuredMessage.categories?.value ?? []).map((category) => <span key={category}>{category}</span>)}
          </div>
        </div>
        <YouTubeEmbed
          inlinePlaying={playingMessageId === featuredPlaybackId}
          message={featuredMessage}
          onInlinePlayingChange={(playing) => setPlayingMessageId(playing ? featuredPlaybackId : null)}
          presentation="inline-with-cinema"
        />
      </section>

      <section className="message-library-browse" aria-labelledby="message-library-title">
        <div className="message-library-heading">
          <div>
            <p className="eyebrow">Message library</p>
            <h2 id="message-library-title">Explore the archive.</h2>
          </div>
          <p>{filteredMessages.length} {filteredMessages.length === 1 ? "message" : "messages"}</p>
        </div>

        <nav className="message-category-filters" aria-label="Filter messages by category">
          {["All messages", ...categories].map((category) => (
            <button
              aria-pressed={activeCategory === category}
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </nav>

        <label className="message-search">
          <span className="sr-only">Search messages</span>
          <span aria-hidden="true">⌕</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, speaker, or category"
            type="search"
            value={query}
          />
          {query ? <button aria-label="Clear message search" onClick={() => setQuery("")} type="button">Clear</button> : null}
        </label>

        {filteredMessages.length ? (
          <div className="message-library-grid">
            {filteredMessages.map((message) => (
              <article className="message-library-card" key={message.id}>
                <YouTubeEmbed
                  controlStyle="simple"
                  inlinePlaying={playingMessageId === message.id}
                  message={message}
                  onInlinePlayingChange={(playing) => setPlayingMessageId(playing ? message.id : null)}
                  presentation="inline-with-cinema"
                />
                <div className="message-library-card-copy">
                  <div className="message-category-list">
                    {(message.categories?.value ?? []).map((category) => <span key={category}>{category}</span>)}
                  </div>
                  <h3>{message.title.value}</h3>
                  {message.date ? <p className="message-date">{formatMessageDate(message.date.value)}</p> : null}
                  {message.speaker ? <p>{message.speaker.value}</p> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="message-library-empty" role="status">
            <h3>No messages match those filters.</h3>
            <button onClick={() => { setActiveCategory("All messages"); setQuery(""); }} type="button">Clear filters</button>
          </div>
        )}
      </section>
    </div>
  );
}
