"use client";

import { type MouseEvent, useRef, useState } from "react";
import type { NormalizedYouTubeVideo, YouTubeResolutionStatus } from "@/lib/youtube/types";

const channelLiveUrl = "https://www.youtube.com/@LivingMessageChurch/live";

function stateLabel(video: NormalizedYouTubeVideo | null) {
  if (video?.state === "live") return "LIVE NOW";
  if (video?.state === "upcoming") return "Next live service";
  return "Live channel";
}

function scheduledLabel(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(date);
}

export function YouTubeLiveEmbed({
  resolutionStatus,
  video,
}: {
  resolutionStatus: YouTubeResolutionStatus;
  video: NormalizedYouTubeVideo | null;
}) {
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const schedule = video?.state === "upcoming" ? scheduledLabel(video.scheduledStartTime) : null;
  const apiUnavailable = resolutionStatus !== "available";
  const playableVideo = video?.state === "live" || video?.state === "upcoming" ? video : null;
  const liveEmbedUrl = playableVideo
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(playableVideo.videoId)}?rel=0`
    : null;
  const openCinema = () => {
    setCinemaOpen(true);
    dialogRef.current?.showModal();
  };
  const closeCinema = () => {
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
    ) closeCinema();
  };

  return (
    <>
      <div className="online-live-media">
        <div className="online-live-media-heading">
          <span className={video?.state === "live" ? "is-live" : undefined}>{stateLabel(video)}</span>
          {schedule ? <time dateTime={video?.scheduledStartTime ?? undefined}>{schedule}</time> : null}
        </div>
        <div className="youtube-player online-live-player">
          {liveEmbedUrl && !cinemaOpen ? (
            <iframe
              src={liveEmbedUrl}
              title="Living Message Church live stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : !cinemaOpen ? (
            <div className="online-live-offline" role="status">
              <span className="online-live-offline-mark" aria-hidden="true"><span /></span>
              <strong>The next broadcast will appear here.</strong>
              <p>Living Message Church is not streaming right now.</p>
              <a href={channelLiveUrl} target="_blank" rel="noreferrer">View the live channel <span aria-hidden="true">↗</span></a>
            </div>
          ) : null}
          {liveEmbedUrl ? (
            <button aria-label="Open live stream in cinema mode" className="youtube-cinema-trigger" onClick={openCinema} type="button">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
              </svg>
              <span>Cinema</span>
            </button>
          ) : null}
        </div>
        {apiUnavailable ? (
          <p className="online-live-fallback-note">
            Live status could not be refreshed. <a href={channelLiveUrl} target="_blank" rel="noreferrer">Check YouTube <span aria-hidden="true">↗</span></a>
          </p>
        ) : null}
      </div>
      <dialog className="youtube-cinema" onClick={closeFromVeil} onClose={() => setCinemaOpen(false)} ref={dialogRef}>
        <button aria-label="Close cinema player" className="youtube-cinema-close" onClick={closeCinema} type="button">
          <span aria-hidden="true">Close</span>
        </button>
        <div className="youtube-cinema-player">
          {cinemaOpen && liveEmbedUrl ? (
            <iframe
              src={`${liveEmbedUrl}&autoplay=1`}
              title="Living Message Church live stream — cinema mode"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
