interface MediaFrameProps {
  label: string;
  ratio?: "landscape" | "portrait" | "wide";
  tone?: "cobalt" | "coral" | "sage" | "gold";
}

// Intentional local placeholder: audited legacy photos cannot be migrated until
// ownership, consent, recency, and alt text are approved.
export function MediaFrame({ label, ratio = "landscape", tone = "cobalt" }: MediaFrameProps) {
  return (
    <div className={`media-frame media-${ratio} media-${tone}`} role="img" aria-label={label}>
      <span className="media-mark" aria-hidden="true">LM</span>
      <span className="media-label">{label}</span>
    </div>
  );
}
