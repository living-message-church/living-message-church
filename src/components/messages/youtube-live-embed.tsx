"use client";

import { useState } from "react";

export function YouTubeLiveEmbed({
  channelId,
  thumbnailUrl,
}: {
  channelId: string;
  thumbnailUrl?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const ringId = "watch-living-message-live";

  return (
    <div className="youtube-player online-live-player">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/live_stream?channel=${encodeURIComponent(channelId)}&autoplay=1&rel=0`}
          title="Living Message Church live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          aria-label="Start the Living Message Church live player"
          className="youtube-facade"
          onClick={() => setPlaying(true)}
          style={thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : undefined}
          type="button"
        >
          <span className="youtube-facade-shade online-live-shade" aria-hidden="true" />
          <span className="online-live-label" aria-hidden="true">Live channel</span>
          <span className="youtube-facade-control" aria-hidden="true">
            <svg className="youtube-facade-ring" viewBox="0 0 120 120">
              <defs>
                <path id={ringId} d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href={`#${ringId}`} lengthAdjust="spacing" startOffset="1%" textLength="283">
                  WATCH LIVE • LIVING MESSAGE CHURCH •
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
  );
}
