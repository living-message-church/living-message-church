"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  nextService,
  resolutionStatus,
  video,
}: {
  nextService: { date: string; eyebrow: string; label: string; time: string } | null;
  resolutionStatus: YouTubeResolutionStatus;
  video: NormalizedYouTubeVideo | null;
}) {
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const cinemaTriggerRef = useRef<HTMLButtonElement>(null);
  const cinemaCloseRef = useRef<HTMLButtonElement>(null);
  const schedule = video?.state === "upcoming" ? scheduledLabel(video.scheduledStartTime) : null;
  const apiUnavailable = resolutionStatus !== "available";
  const playableVideo = video?.state === "live" || video?.state === "upcoming" ? video : null;
  const liveEmbedUrl = playableVideo
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(playableVideo.videoId)}?rel=0`
    : null;

  useEffect(() => {
    if (!cinemaOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCinemaOpen(false);
        window.requestAnimationFrame(() => cinemaTriggerRef.current?.focus());
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    cinemaCloseRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [cinemaOpen]);

  const closeCinema = () => {
    setCinemaOpen(false);
    window.requestAnimationFrame(() => cinemaTriggerRef.current?.focus());
  };

  return (
    <div className="online-live-media">
      <div className="online-live-media-heading">
        <span className={video?.state === "live" ? "is-live" : undefined}>{stateLabel(video)}</span>
        {schedule ? <time dateTime={video?.scheduledStartTime ?? undefined}>{schedule}</time> : null}
      </div>
      {cinemaOpen ? <button aria-label="Exit cinema mode" className="youtube-cinema-veil" onClick={closeCinema} type="button" /> : null}
      <div
        aria-label={cinemaOpen ? "Living Message Church live stream cinema player" : undefined}
        aria-modal={cinemaOpen || undefined}
        className={`youtube-player online-live-player${cinemaOpen ? " youtube-player-cinema" : ""}`}
        role={cinemaOpen ? "dialog" : undefined}
      >
        {liveEmbedUrl ? (
          <iframe
            src={liveEmbedUrl}
            title="Living Message Church live stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="online-live-offline" role="status">
            <svg className="online-live-offline-waves" aria-hidden="true" viewBox="0 0 960 540" preserveAspectRatio="none">
              <path d="M-80 125C105 10 235 250 430 132S740 35 1040 166" />
              <path d="M-100 224C90 86 258 348 466 211S778 104 1050 270" />
              <path d="M-70 326C126 184 294 435 512 310S804 216 1038 372" />
              <path d="M-110 421C116 291 312 506 538 410S826 322 1058 470" />
            </svg>
            <div className="online-live-offline-orbit" aria-hidden="true">
              <svg className="online-live-offline-ring" viewBox="0 0 140 140">
                <defs>
                  <path id="online-live-orbit-path" d="M70 70m-55 0a55 55 0 1 1 110 0a55 55 0 1 1-110 0" />
                </defs>
                <text>
                  <textPath href="#online-live-orbit-path" startOffset="1%" textLength="338" lengthAdjust="spacing">
                    LIVING MESSAGE CHURCH • NEXT BROADCAST •
                  </textPath>
                </text>
              </svg>
              <span className="online-live-offline-logo">
                <Image alt="" height={92} src="/images/brand/living-message-tree.svg" width={92} />
              </span>
            </div>
          </div>
        )}
        {nextService && !cinemaOpen ? (
          <aside className="online-live-schedule" aria-label="Next scheduled live service">
            <p>{nextService.eyebrow}</p>
            <strong>{nextService.date}</strong>
            <span>{nextService.label} {nextService.time}</span>
          </aside>
        ) : null}
        {liveEmbedUrl ? cinemaOpen ? (
          <button aria-label="Exit cinema mode" className="youtube-cinema-close" onClick={closeCinema} ref={cinemaCloseRef} type="button">
            <span aria-hidden="true">Close</span>
          </button>
        ) : (
          <button aria-label="Open live stream in cinema mode" className="youtube-cinema-trigger" onClick={() => setCinemaOpen(true)} ref={cinemaTriggerRef} type="button">
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
  );
}
