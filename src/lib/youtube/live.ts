import {
  getYouTubeEnvironmentStatus,
  getYouTubeServerConfig,
  YouTubeApiError,
  YouTubeConfigurationError,
  youtubeApiGet,
} from "./client";
import { selectCurrentYouTubeVideo } from "./selection";
import type {
  YouTubeApiListResponse,
  YouTubeChannelResource,
  YouTubeLiveResolution,
  YouTubePlaylistItemResource,
  YouTubeVideoResource,
} from "./types";

const LIVE_STATUS_CACHE_MS = 55_000;
const CANDIDATE_LIMIT = 25;

let cached: { expiresAt: number; result: YouTubeLiveResolution } | null = null;
let pending: Promise<YouTubeLiveResolution> | null = null;

async function resolveCurrentLiveVideo(): Promise<YouTubeLiveResolution> {
  const checkedAt = new Date().toISOString();
  if (!getYouTubeEnvironmentStatus().ready) {
    return { apiReachable: null, checkedAt, status: "unconfigured", video: null };
  }

  try {
    const { channelId } = getYouTubeServerConfig();
    const channels = await youtubeApiGet<YouTubeApiListResponse<YouTubeChannelResource>>("channels", {
      id: channelId,
      maxResults: 1,
      part: "contentDetails",
    });
    const uploadsPlaylistId = channels.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      return { apiReachable: true, checkedAt, status: "unavailable", video: null };
    }

    const playlist = await youtubeApiGet<YouTubeApiListResponse<YouTubePlaylistItemResource>>("playlistItems", {
      maxResults: CANDIDATE_LIMIT,
      part: "contentDetails,snippet",
      playlistId: uploadsPlaylistId,
    });
    const ids = Array.from(new Set((playlist.items ?? [])
      .filter((item) => !item.snippet?.videoOwnerChannelId || item.snippet.videoOwnerChannelId === channelId)
      .map((item) => item.contentDetails?.videoId?.trim())
      .filter((id): id is string => Boolean(id))));
    if (!ids.length) {
      return { apiReachable: true, checkedAt, status: "unavailable", video: null };
    }

    const videos = await youtubeApiGet<YouTubeApiListResponse<YouTubeVideoResource>>("videos", {
      id: ids.join(","),
      maxResults: CANDIDATE_LIMIT,
      part: "snippet,liveStreamingDetails,status",
    });
    const video = selectCurrentYouTubeVideo(videos.items ?? [], channelId);
    return { apiReachable: true, checkedAt, status: video ? "available" : "unavailable", video };
  } catch (error) {
    if (error instanceof YouTubeConfigurationError) {
      return { apiReachable: null, checkedAt, status: "unconfigured", video: null };
    }
    return {
      apiReachable: error instanceof YouTubeApiError ? error.reachable : false,
      checkedAt,
      status: "unavailable",
      video: null,
    };
  }
}

/** Cached server-only resolver. No browser request contains the API key. */
export async function getCurrentLiveVideo(): Promise<YouTubeLiveResolution> {
  const now = Date.now();
  if (cached && cached.expiresAt > now) return cached.result;
  if (pending) return pending;

  pending = resolveCurrentLiveVideo().then((result) => {
    cached = { expiresAt: Date.now() + LIVE_STATUS_CACHE_MS, result };
    return result;
  }).finally(() => {
    pending = null;
  });
  return pending;
}
