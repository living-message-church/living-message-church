"use client";

import { type MouseEvent, useRef, useState } from "react";
import type { Message } from "@/types/content";

export function YouTubeEmbed({
  message,
  presentation = "inline",
}: {
  message: Message;
  presentation?: "inline" | "cinema";
}) {
  const [playing, setPlaying] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoId = message.youtubeVideoId?.value;

  if (!videoId) {
    return (
      <div className="youtube-player youtube-player-empty" role="status">
        Video playback is not available for this message.
      </div>
    );
  }

  const thumbnail = message.thumbnailUrl?.value ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const ringId = `watch-message-${videoId}`;
  const openVideo = () => {
    if (presentation === "cinema") {
      dialogRef.current?.showModal();
    }
    setPlaying(true);
  };
  const closeVideo = () => {
    setPlaying(false);
    dialogRef.current?.close();
  };
  const closeFromVeil = (event: MouseEvent<HTMLDialogElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left
      || event.clientX > bounds.right
      || event.clientY < bounds.top
      || event.clientY > bounds.bottom
    ) closeVideo();
  };

  return (
    <>
      <div className="youtube-player">
        {playing && presentation === "inline" ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`Watch ${message.title.value}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            aria-label={`${presentation === "cinema" ? "Open cinema player for" : "Play"} ${message.title.value}`}
            className="youtube-facade"
            onClick={openVideo}
            style={{ backgroundImage: `url(${thumbnail})` }}
            type="button"
          >
            <span className="youtube-facade-shade" aria-hidden="true" />
            <span className="youtube-facade-control" aria-hidden="true">
              <svg className="youtube-facade-ring" viewBox="0 0 120 120">
                <defs>
                  <path id={ringId} d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
                </defs>
                <text>
                  <textPath
                    href={`#${ringId}`}
                    lengthAdjust="spacing"
                    startOffset="1%"
                    textLength="283"
                  >
                    WATCH MESSAGE • LIVING MESSAGE CHURCH •
                  </textPath>
                </text>
              </svg>
              <span className="youtube-play-circle">
                <span className="youtube-play-icon" />
              </span>
            </span>
          </button>
        )}
      </div>
      {presentation === "cinema" ? (
        <dialog className="youtube-cinema" onClick={closeFromVeil} onClose={() => setPlaying(false)} ref={dialogRef}>
          <button aria-label="Close cinema player" className="youtube-cinema-close" onClick={closeVideo} type="button">
            <span aria-hidden="true">Close</span>
          </button>
          <div className="youtube-cinema-player">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title={`Watch ${message.title.value}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : null}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
