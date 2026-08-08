import type { NormalizedEvent } from "@/lib/planning-center/types";

export type CreativeGenerationStatus =
  | "approved"
  | "failed"
  | "generating"
  | "pending_review"
  | "provider_not_configured"
  | "queued"
  | "rejected";

export type CreativeAssetStatus = "approved" | "generated" | "pending_review" | "rejected";

export interface CreativeStylePreset {
  description: string;
  name: string;
  promptRules: {
    avoid?: string[];
    mood: string[];
    negativeSpace?: boolean;
    palette?: string[];
    photography?: string;
  };
  slug: string;
}

export interface EventCreativeJob {
  canonicalEventId: string;
  category: string | null;
  createdAt: string;
  eventTitle: string;
  generationReason: string;
  generationStatus: CreativeGenerationStatus;
  generationVersion: number;
  id: string;
  planningCenterCalendarId: string;
  planningCenterRegistrationId: string | null;
  promptVersion: string;
  sourceUpdatedAt: string | null;
}

export interface EventCreativeAsset {
  canonicalEventId: string;
  createdAt: string;
  height: number;
  id: string;
  jobId: string;
  model: string;
  provider: string;
  status: CreativeAssetStatus;
  storagePath: string;
  width: number;
}

export interface EventArtworkPrompt {
  prompt: string;
  publicSummary: string;
  version: string;
}

export interface EventArtworkConcept {
  bytes: Uint8Array;
  height: number;
  mimeType: "image/webp";
  model: string;
  provider: string;
  width: number;
}

export interface EventArtworkGenerationRequest {
  aspectRatio: "16:9";
  conceptCount: 3;
  prompt: EventArtworkPrompt;
  stylePreset: CreativeStylePreset;
}

export interface EventArtworkProvider {
  configured(): boolean;
  generate(request: EventArtworkGenerationRequest): Promise<EventArtworkConcept[]>;
  model: string;
  name: string;
}

export interface CreativeEligibilityResult {
  eligible: boolean;
  reasons: string[];
}

export interface ResolvedEventArtwork {
  alt: string;
  height: number;
  source: "approved-creative" | "planning-center" | "fallback";
  url: string;
  width: number;
}

export interface CreativeCandidate {
  eligibility: CreativeEligibilityResult;
  event: NormalizedEvent;
  planningCenterImageAvailable: boolean;
}

export interface CreativeRegistryMetrics {
  audit: "available" | "not-migrated" | "unavailable";
  approvedAssets: number | null;
  jobsPending: number | null;
  pendingApprovals: number | null;
  rejectedAssets: number | null;
  generationFailures: number | null;
  state: "available" | "not-migrated" | "unavailable";
  storage: "available" | "missing" | "unavailable";
}

export interface CreativeReviewAsset {
  createdAt: string;
  height: number;
  id: string;
  model: string;
  provider: string;
  signedUrl: string;
  status: CreativeAssetStatus;
  width: number;
}

export interface CreativeReviewJob {
  assets: CreativeReviewAsset[];
  canonicalEventId: string;
  createdAt: string;
  generationStatus: CreativeGenerationStatus;
  generationVersion: number;
  id: string;
}
