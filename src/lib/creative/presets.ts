import type { CreativeStylePreset } from "./types";

export const CREATIVE_STYLE_PRESETS = [
  { slug: "prayer", name: "Prayer", description: "Calm, contemplative editorial artwork.", promptRules: { palette: ["blue", "cream"], mood: ["calm", "contemplative", "minimal"], negativeSpace: true } },
  { slug: "students", name: "Students", description: "Energetic and contemporary youth direction.", promptRules: { palette: ["orange", "black", "white"], mood: ["energetic", "youthful"], photography: "modern" } },
  { slug: "kids", name: "Kids", description: "Bright, playful, warm family direction.", promptRules: { palette: ["bright", "warm"], mood: ["playful", "family-friendly"] } },
  { slug: "community", name: "Community", description: "Authentic documentary community photography.", promptRules: { palette: ["warm neutrals"], mood: ["welcoming", "human"], photography: "documentary" } },
  { slug: "worship", name: "Worship", description: "Cinematic, atmospheric worship direction.", promptRules: { palette: ["dark", "light contrast"], mood: ["cinematic", "restrained"] } },
  { slug: "holiday", name: "Holiday", description: "Sophisticated seasonal artwork without clichés.", promptRules: { mood: ["seasonal", "sophisticated"], avoid: ["clip-art", "clichés"] } },
  { slug: "conference", name: "Conference", description: "Bold editorial concept for major gatherings.", promptRules: { mood: ["bold", "editorial", "high-impact"], negativeSpace: true } },
  { slug: "general", name: "General", description: "Premium neutral Living Message fallback.", promptRules: { palette: ["blue", "cream", "warm neutral"], mood: ["premium", "minimal", "authentic"], negativeSpace: true } },
] satisfies CreativeStylePreset[];

export function getCreativeStylePreset(slug: string | null | undefined) {
  return CREATIVE_STYLE_PRESETS.find((preset) => preset.slug === slug) ?? CREATIVE_STYLE_PRESETS.at(-1)!;
}

export function inferCreativeStylePreset(title: string, category: string | null) {
  const haystack = `${title} ${category ?? ""}`.toLowerCase();
  if (/prayer/.test(haystack)) return getCreativeStylePreset("prayer");
  if (/student|youth|young adult/.test(haystack)) return getCreativeStylePreset("students");
  if (/kid|child|family/.test(haystack)) return getCreativeStylePreset("kids");
  if (/worship|service/.test(haystack)) return getCreativeStylePreset("worship");
  if (/christmas|easter|good friday|holiday/.test(haystack)) return getCreativeStylePreset("holiday");
  if (/conference|retreat/.test(haystack)) return getCreativeStylePreset("conference");
  if (/group|community|breakfast|dinner|outreach/.test(haystack)) return getCreativeStylePreset("community");
  return getCreativeStylePreset("general");
}
