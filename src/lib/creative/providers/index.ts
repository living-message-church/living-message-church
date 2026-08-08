import type { EventArtworkGenerationRequest } from "../types";
import { openAIEventArtworkProvider } from "./openai";

export function getEventArtworkProvider() {
  return openAIEventArtworkProvider;
}

export async function generateEventArtwork(request: EventArtworkGenerationRequest) {
  return getEventArtworkProvider().generate(request);
}

export function getCreativeProviderEnvironmentStatus() {
  const provider = getEventArtworkProvider();
  return { configured: provider.configured(), model: provider.model, provider: provider.name };
}
