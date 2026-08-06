"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Message } from "@/types/content";

function cleanCategory(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 40);
}

export function MessageAdminPrototype({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(() => structuredClone(initialMessages));
  const [query, setQuery] = useState("");
  const categories = useMemo(
    () => Array.from(new Set(messages.flatMap((message) => message.categories?.value ?? []))).sort(),
    [messages],
  );
  const visibleMessages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return messages;
    return messages.filter((message) => [
      message.title.value,
      message.summary.value,
      message.speaker?.value ?? "",
      ...(message.categories?.value ?? []),
    ].join(" ").toLowerCase().includes(normalizedQuery));
  }, [messages, query]);

  function updateMessage(messageId: string, update: (message: Message) => Message) {
    setMessages((current) => current.map((message) => message.id === messageId ? update(message) : message));
  }

  function addCategory(messageId: string, value: string) {
    const category = cleanCategory(value);
    if (!category) return;
    updateMessage(messageId, (message) => {
      const current = message.categories?.value ?? [];
      if (current.some((item) => item.toLowerCase() === category.toLowerCase())) return message;
      return {
        ...message,
        categories: {
          value: [...current, category],
          status: "approved-temporary",
          source: "Local admin interface prototype",
        },
      };
    });
  }

  function removeCategory(messageId: string, category: string) {
    updateMessage(messageId, (message) => ({
      ...message,
      categories: message.categories ? {
        ...message.categories,
        value: message.categories.value.filter((item) => item !== category),
      } : undefined,
    }));
  }

  function deleteCategory(category: string) {
    setMessages((current) => current.map((message) => ({
      ...message,
      categories: message.categories ? {
        ...message.categories,
        value: message.categories.value.filter((item) => item !== category),
      } : undefined,
    })));
  }

  return (
    <div className="message-admin-page">
      <header className="message-admin-header">
        <div>
          <p className="eyebrow">Admin prototype</p>
          <h1>Message library admin</h1>
          <p>Prepare sermon video, editorial metadata, search categories, and future uploads in one place.</p>
        </div>
        <Link href="/messages">View message library <span aria-hidden="true">↗</span></Link>
      </header>

      <aside className="message-admin-notice" role="note">
        <strong>Interface preview only.</strong>
        <span>Changes live in this browser session and reset on refresh. Authentication, Supabase persistence, storage, and audit history are not connected.</span>
      </aside>

      <section className="message-admin-panel" aria-labelledby="upload-title">
        <div className="message-admin-panel-heading">
          <div>
            <p className="eyebrow">New message</p>
            <h2 id="upload-title">Upload and describe a sermon.</h2>
          </div>
          <p>The final workflow will accept a video upload or YouTube URL, then save searchable metadata.</p>
        </div>
        <div className="message-upload-grid" aria-disabled="true">
          <label><span>Message title</span><input disabled placeholder="Enter the sermon title" /></label>
          <label><span>YouTube URL</span><input disabled placeholder="https://youtube.com/watch?v=…" /></label>
          <label className="message-upload-description"><span>Description</span><textarea disabled placeholder="Add the message summary and search description" /></label>
          <label className="message-upload-file"><span>Video upload</span><input disabled type="file" accept="video/*" /><small>Available after private admin storage and upload limits are configured.</small></label>
          <button disabled type="button">Supabase setup required</button>
        </div>
      </section>

      <section className="message-admin-panel" aria-labelledby="message-admin-list-title">
        <div className="message-admin-panel-heading">
          <div>
            <p className="eyebrow">Video metadata</p>
            <h2 id="message-admin-list-title">Sermon details and categories</h2>
          </div>
          <p>Edit the local preview below. The future save adapter will write the same fields to Supabase.</p>
        </div>

        <label className="message-admin-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Find a message</span>
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Find a message by title, speaker, description, or category" type="search" value={query} />
          {query ? <button onClick={() => setQuery("")} type="button">Clear</button> : null}
        </label>

        <div className="message-admin-category-manager" aria-label="Library categories">
          <strong>Library categories</strong>
          <div>
            {categories.map((category) => (
              <button aria-label={`Delete ${category} from the local library preview`} key={category} onClick={() => deleteCategory(category)} type="button">
                {category} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        </div>

        <p className="message-admin-count">Showing {visibleMessages.length} of {messages.length} messages</p>

        <div className="message-admin-list">
          {visibleMessages.map((message) => (
            <article className="message-admin-row" key={message.id}>
              <div className="message-admin-row-heading">
                <span className="message-admin-video-icon" aria-hidden="true">▶</span>
                <div>
                  <strong>{message.title.value}</strong>
                  <span>{message.youtubeVideoId ? `YouTube · ${message.youtubeVideoId.value}` : "Upload pending"}</span>
                </div>
              </div>

              <div className="message-admin-fields">
                <label>
                  <span>Display title</span>
                  <input
                    onChange={(event) => updateMessage(message.id, (current) => ({ ...current, title: { ...current.title, value: event.target.value } }))}
                    value={message.title.value}
                  />
                </label>
                <label>
                  <span>Meta title</span>
                  <input
                    maxLength={70}
                    onChange={(event) => updateMessage(message.id, (current) => ({ ...current, meta: { title: event.target.value, description: current.meta?.description ?? "", keywords: current.meta?.keywords ?? [] } }))}
                    value={message.meta?.title ?? ""}
                  />
                </label>
                <label className="message-admin-description-field">
                  <span>Meta description</span>
                  <textarea
                    maxLength={170}
                    onChange={(event) => updateMessage(message.id, (current) => ({ ...current, meta: { title: current.meta?.title ?? current.title.value, description: event.target.value, keywords: current.meta?.keywords ?? [] } }))}
                    value={message.meta?.description ?? ""}
                  />
                </label>
              </div>

              <div className="message-admin-tags">
                <span>Categories</span>
                <div>
                  {(message.categories?.value ?? []).map((category) => (
                    <button aria-label={`Remove ${category} from ${message.title.value}`} key={category} onClick={() => removeCategory(message.id, category)} type="button">
                      {category} <span aria-hidden="true">×</span>
                    </button>
                  ))}
                </div>
                <form onSubmit={(event: FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const data = new FormData(form);
                  addCategory(message.id, String(data.get("category") ?? ""));
                  form.reset();
                }}>
                  <label>
                    <span className="sr-only">Add a category to {message.title.value}</span>
                    <input name="category" placeholder="Type a category and press Enter" maxLength={40} />
                  </label>
                  <button type="submit">Add category</button>
                </form>
              </div>

              <footer>
                <span>Preview changes are local</span>
                <button disabled type="button">Save after Supabase setup</button>
              </footer>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
