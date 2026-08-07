import type { NormalizedYouTubeVideo, YouTubeResolutionStatus } from "@/lib/youtube/types";

const channelLiveUrl = "https://www.youtube.com/@LivingMessageChurch/live";

function stateLabel(video: NormalizedYouTubeVideo | null) {
  if (video?.state === "live") return "LIVE NOW";
  if (video?.state === "upcoming") return "Next live service";
  if (video) return "Latest Message";
  return "Live stream";
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
  const schedule = video?.state === "upcoming" ? scheduledLabel(video.scheduledStartTime) : null;
  const apiUnavailable = resolutionStatus !== "available";

  return (
    <div className="online-live-media">
      <div className="online-live-media-heading">
        <span className={video?.state === "live" ? "is-live" : undefined}>{stateLabel(video)}</span>
        {schedule ? <time dateTime={video?.scheduledStartTime ?? undefined}>{schedule}</time> : null}
      </div>
      <div className="youtube-player online-live-player">
        {video ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.videoId)}?rel=0`}
            title={`Living Message Church — ${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="youtube-player-empty" role="status">
            <div>
              <strong>Church Online is temporarily unavailable here.</strong>
              <span>You can still check the verified Living Message Church YouTube channel.</span>
            </div>
          </div>
        )}
      </div>
      {apiUnavailable ? (
        <p className="online-live-fallback-note">
          Live status could not be refreshed. <a href={channelLiveUrl} target="_blank" rel="noreferrer">Check YouTube <span aria-hidden="true">↗</span></a>
        </p>
      ) : null}
    </div>
  );
}
