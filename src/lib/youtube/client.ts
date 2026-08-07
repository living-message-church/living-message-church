import type { YouTubeEnvironmentStatus } from "./types";

const YOUTUBE_API_ORIGIN = "https://www.googleapis.com";
const YOUTUBE_API_TIMEOUT_MS = 7_000;

export class YouTubeConfigurationError extends Error {
  constructor() {
    super("YouTube server configuration is incomplete.");
    this.name = "YouTubeConfigurationError";
  }
}

export class YouTubeApiError extends Error {
  readonly reachable: boolean;
  readonly statusCode: number | null;

  constructor({ reachable, statusCode = null }: { reachable: boolean; statusCode?: number | null }) {
    super(reachable ? "YouTube returned an unsuccessful response." : "YouTube could not be reached.");
    this.name = "YouTubeApiError";
    this.reachable = reachable;
    this.statusCode = statusCode;
  }
}

function configured(value: string | undefined) {
  return value?.trim() ? "configured" as const : "missing" as const;
}

/** Returns presence states only. Values never leave the server integration. */
export function getYouTubeEnvironmentStatus(): YouTubeEnvironmentStatus {
  const apiKey = configured(process.env.YOUTUBE_API_KEY);
  const channelId = configured(process.env.YOUTUBE_CHANNEL_ID);
  return { apiKey, channelId, ready: apiKey === "configured" && channelId === "configured" };
}

export function getYouTubeServerConfig() {
  if (typeof window !== "undefined") throw new YouTubeConfigurationError();
  const status = getYouTubeEnvironmentStatus();
  if (!status.ready) throw new YouTubeConfigurationError();

  return {
    apiKey: process.env.YOUTUBE_API_KEY!.trim(),
    channelId: process.env.YOUTUBE_CHANNEL_ID!.trim(),
  };
}

export async function youtubeApiGet<T>(
  resource: "channels" | "playlistItems" | "videos",
  query: Record<string, number | string>,
): Promise<T> {
  const { apiKey } = getYouTubeServerConfig();
  const url = new URL(`/youtube/v3/${resource}`, YOUTUBE_API_ORIGIN);
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(YOUTUBE_API_TIMEOUT_MS),
    });
    if (!response.ok) throw new YouTubeApiError({ reachable: true, statusCode: response.status });

    try {
      return await response.json() as T;
    } catch {
      throw new YouTubeApiError({ reachable: true, statusCode: response.status });
    }
  } catch (error) {
    if (error instanceof YouTubeApiError) throw error;
    throw new YouTubeApiError({ reachable: false });
  }
}
