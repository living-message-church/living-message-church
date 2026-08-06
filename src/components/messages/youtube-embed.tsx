"use client";

import Image from "next/image";
import { useState } from "react";
import type { Message } from "@/types/content";

export function YouTubeEmbed({ message }: { message: Message }) {
  const [playing, setPlaying] = useState(false);
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

  return (
    <div className="youtube-player">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`Watch ${message.title.value}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          aria-label={`Play ${message.title.value}`}
          className="youtube-facade"
          onClick={() => setPlaying(true)}
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
                <textPath href={`#${ringId}`}>WATCH MESSAGE • LIVING MESSAGE CHURCH • </textPath>
              </text>
            </svg>
            <span className="youtube-tree-circle">
              <Image
                alt=""
                className="youtube-tree-mark"
                height={92}
                src="/images/brand/living-message-church-logo.svg"
                width={288}
              />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
