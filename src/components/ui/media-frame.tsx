import Image from "next/image";
import type { ContentImage } from "@/types/content";

interface MediaFrameProps {
  label: string;
  ratio?: "landscape" | "portrait" | "wide";
  tone?: "cobalt" | "coral" | "sage" | "gold";
  image?: ContentImage;
  sizes?: string;
}

export function MediaFrame({
  label,
  ratio = "landscape",
  tone = "cobalt",
  image,
  sizes = "(max-width: 48rem) 100vw, (max-width: 100rem) 50vw, 52rem",
}: MediaFrameProps) {
  return (
    <div
      className={`media-frame media-${ratio} media-${tone}${image ? " media-has-image" : ""}`}
      role={image ? undefined : "img"}
      aria-label={image ? undefined : label}
    >
      {image ? <Image className="media-image" src={image.src} alt={image.alt} fill sizes={sizes} /> : <span className="media-label">{label}</span>}
    </div>
  );
}
