"use client";

import { type MouseEvent, useId, useRef, useState } from "react";
import type { Message } from "@/types/content";

export function YouTubeEmbed({
  inlinePlaying,
  message,
  onInlinePlayingChange,
  presentation = "inline",
}: {
  inlinePlaying?: boolean;
  message: Message;
  onInlinePlayingChange?: (playing: boolean) => void;
  presentation?: "inline" | "cinema" | "inline-with-cinema";
}) {
  const [internalInlinePlaying, setInternalInlinePlaying] = useState(false);
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const instanceId = useId().replaceAll(":", "");
  const videoId = message.youtubeVideoId?.value;
  const isInlinePlaying = inlinePlaying ?? internalInlinePlaying;
  const supportsCinema = presentation !== "inline";

  const setInlinePlaying = (playing: boolean) => {
    if (inlinePlaying === undefined) setInternalInlinePlaying(playing);
    onInlinePlayingChange?.(playing);
  };

  if (!videoId) {
    return (
      <div className="youtube-player youtube-player-empty" role="status">
        Video playback is not available for this message.
      </div>
    );
  }

  const thumbnail = message.thumbnailUrl?.value ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const ringId = `watch-message-${videoId}-${instanceId}`;
  const openCinema = () => {
    setInlinePlaying(false);
    setCinemaOpen(true);
    dialogRef.current?.showModal();
  };
  const openVideo = () => {
    if (presentation === "cinema") openCinema();
    else setInlinePlaying(true);
  };
  const closeVideo = () => {
    setCinemaOpen(false);
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
        {isInlinePlaying && presentation !== "cinema" ? (
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
        {presentation === "inline-with-cinema" ? (
          <button aria-label={`Open ${message.title.value} in cinema mode`} className="youtube-cinema-trigger" onClick={openCinema} type="button">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
            </svg>
            <span>Cinema</span>
          </button>
        ) : null}
      </div>
      {supportsCinema ? (
        <dialog className="youtube-cinema" onClick={closeFromVeil} onClose={() => setCinemaOpen(false)} ref={dialogRef}>
          <button aria-label="Close cinema player" className="youtube-cinema-close" onClick={closeVideo} type="button">
            <span aria-hidden="true">Close</span>
          </button>
          <div className="youtube-cinema-player">
            {cinemaOpen ? (
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
