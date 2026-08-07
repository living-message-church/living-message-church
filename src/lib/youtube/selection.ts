import type { NormalizedYouTubeVideo, YouTubeThumbnail, YouTubeVideoResource } from "./types";

function timestamp(value: string | undefined) {
  if (!value) return Number.NaN;
  return new Date(value).getTime();
}

function thumbnailUrl(thumbnails: Record<string, YouTubeThumbnail> | undefined) {
  if (!thumbnails) return null;
  for (const key of ["maxres", "standard", "high", "medium", "default"]) {
    const thumbnail = thumbnails[key];
    if (thumbnail?.url) return thumbnail.url;
  }
  return null;
}

function normalized(resource: YouTubeVideoResource, state: NormalizedYouTubeVideo["state"]) {
  const videoId = resource.id?.trim();
  const title = resource.snippet?.title?.trim();
  const publishedAt = resource.snippet?.publishedAt;
  if (!videoId || !title || !publishedAt) return null;

  return {
    actualStartTime: resource.liveStreamingDetails?.actualStartTime ?? null,
    publishedAt,
    scheduledStartTime: resource.liveStreamingDetails?.scheduledStartTime ?? null,
    state,
    thumbnailUrl: thumbnailUrl(resource.snippet?.thumbnails),
    title,
    videoId,
  } satisfies NormalizedYouTubeVideo;
}

/** Selects Live first, then nearest Upcoming, then newest playable completed/uploaded video. */
export function selectCurrentYouTubeVideo(
  resources: YouTubeVideoResource[],
  channelId: string,
  now = Date.now(),
): NormalizedYouTubeVideo | null {
  const playable = resources.filter((resource) => (
    resource.snippet?.channelId === channelId
    && resource.status?.embeddable === true
    && resource.status?.privacyStatus === "public"
  ));

  const live = playable
    .filter((resource) => resource.snippet?.liveBroadcastContent === "live" && !resource.liveStreamingDetails?.actualEndTime)
    .sort((first, second) => timestamp(second.liveStreamingDetails?.actualStartTime) - timestamp(first.liveStreamingDetails?.actualStartTime))[0];
  if (live) return normalized(live, "live");

  const upcoming = playable
    .filter((resource) => {
      const scheduled = timestamp(resource.liveStreamingDetails?.scheduledStartTime);
      return !resource.liveStreamingDetails?.actualEndTime
        && resource.snippet?.liveBroadcastContent === "upcoming"
        && Number.isFinite(scheduled)
        && scheduled > now;
    })
    .sort((first, second) => timestamp(first.liveStreamingDetails?.scheduledStartTime) - timestamp(second.liveStreamingDetails?.scheduledStartTime))[0];
  if (upcoming) return normalized(upcoming, "upcoming");

  const completed = playable
    .filter((resource) => resource.snippet?.liveBroadcastContent !== "live" && resource.snippet?.liveBroadcastContent !== "upcoming")
    .sort((first, second) => timestamp(second.snippet?.publishedAt) - timestamp(first.snippet?.publishedAt))[0];
  return completed ? normalized(completed, "offline") : null;
}
