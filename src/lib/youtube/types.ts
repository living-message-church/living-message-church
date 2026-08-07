export type YouTubeEnvironmentState = "configured" | "missing";
export type YouTubeVideoState = "live" | "upcoming" | "offline";
export type YouTubeResolutionStatus = "available" | "unavailable" | "unconfigured";

export interface YouTubeEnvironmentStatus {
  apiKey: YouTubeEnvironmentState;
  channelId: YouTubeEnvironmentState;
  ready: boolean;
}

export interface NormalizedYouTubeVideo {
  actualStartTime: string | null;
  publishedAt: string;
  scheduledStartTime: string | null;
  state: YouTubeVideoState;
  thumbnailUrl: string | null;
  title: string;
  videoId: string;
}

export interface YouTubeLiveResolution {
  apiReachable: boolean | null;
  checkedAt: string;
  status: YouTubeResolutionStatus;
  video: NormalizedYouTubeVideo | null;
}

export interface YouTubeApiListResponse<T> {
  items?: T[];
}

export interface YouTubeChannelResource {
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
  id?: string;
}

export interface YouTubePlaylistItemResource {
  contentDetails?: {
    videoId?: string;
  };
  snippet?: {
    videoOwnerChannelId?: string;
  };
}

export interface YouTubeThumbnail {
  height?: number;
  url?: string;
  width?: number;
}

export interface YouTubeVideoResource {
  id?: string;
  liveStreamingDetails?: {
    actualEndTime?: string;
    actualStartTime?: string;
    scheduledStartTime?: string;
  };
  snippet?: {
    channelId?: string;
    liveBroadcastContent?: "live" | "none" | "upcoming";
    publishedAt?: string;
    thumbnails?: Record<string, YouTubeThumbnail>;
    title?: string;
  };
  status?: {
    embeddable?: boolean;
    privacyStatus?: string;
    uploadStatus?: string;
  };
}
