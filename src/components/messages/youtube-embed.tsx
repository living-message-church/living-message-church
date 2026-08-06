import type { Message } from "@/types/content";

export function YouTubeEmbed({ message }: { message: Message }) {
  const videoId = message.youtubeVideoId?.value;

  if (!videoId) {
    return (
      <div className="youtube-player youtube-player-empty" role="status">
        Video playback is not available for this message.
      </div>
    );
  }

  return (
    <div className="youtube-player">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={`Watch ${message.title.value}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
