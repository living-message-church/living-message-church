import sharp from "sharp";
import type { EventArtworkConcept, EventArtworkGenerationRequest, EventArtworkProvider } from "../types";

const OPENAI_IMAGE_ENDPOINT = "https://api.openai.com/v1/images/generations";
const MODEL = "gpt-image-2";

interface OpenAIImageResponse {
  data?: Array<{ b64_json?: string }>;
}

export class CreativeProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CreativeProviderError";
  }
}

async function generateOne(prompt: string, concept: number): Promise<EventArtworkConcept> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) throw new CreativeProviderError("Image provider is not configured.");

  const response = await fetch(OPENAI_IMAGE_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt: `${prompt} Concept ${concept}: provide a distinct art-directed composition while preserving the same brand rules.`,
      size: "1536x1024",
      quality: "medium",
      output_format: "webp",
    }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) throw new CreativeProviderError(`Image provider request failed with HTTP ${response.status}.`);
  const payload = await response.json() as OpenAIImageResponse;
  const base64 = payload.data?.[0]?.b64_json;
  if (!base64) throw new CreativeProviderError("Image provider returned no usable image data.");

  const bytes = await sharp(Buffer.from(base64, "base64"))
    .resize(1600, 900, { fit: "cover", position: "attention" })
    .webp({ quality: 88 })
    .toBuffer();
  return { bytes: new Uint8Array(bytes), height: 900, mimeType: "image/webp", model: MODEL, provider: "openai", width: 1600 };
}

export const openAIEventArtworkProvider: EventArtworkProvider = {
  configured: () => Boolean(process.env.OPENAI_API_KEY?.trim()),
  model: MODEL,
  name: "openai",
  async generate(request: EventArtworkGenerationRequest) {
    const concepts: EventArtworkConcept[] = [];
    for (let index = 1; index <= request.conceptCount; index += 1) {
      concepts.push(await generateOne(request.prompt.prompt, index));
    }
    return concepts;
  },
};
