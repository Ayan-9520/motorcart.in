import { optimizeImageUrl, unsplash, pexels } from "@/lib/media-urls";

const tyre = optimizeImageUrl(unsplash("photo-1558618666-fcd25c85f82e"), { w: 900, h: 900 });
const battery = pexels(4480506, 900);
const brake = optimizeImageUrl(unsplash("photo-1486262715619-67b85e0b08d3"), { w: 900, h: 900 });
const engine = optimizeImageUrl(unsplash("photo-1487754183691-776549f5c0e4"), { w: 900, h: 900 });
const oil = optimizeImageUrl(unsplash("photo-1607860108855-645f04393433"), { w: 900, h: 900 });
const electronics = optimizeImageUrl(unsplash("photo-1503376780353-7e5256eae237"), { w: 900, h: 900 });
const accessory = optimizeImageUrl(unsplash("photo-1619761368361-28717e7ac6b7"), { w: 900, h: 900 });
const body = optimizeImageUrl(unsplash("photo-1609521263047-f8f205293f24"), { w: 900, h: 900 });
const interior = optimizeImageUrl(unsplash("photo-1503376780353-7e5256eae237"), { w: 900, h: 900 });

/** Category-specific product photography */
export const PARTS_CATEGORY_IMAGES: Record<string, string[]> = {
  tyres: [tyre, optimizeImageUrl(unsplash("photo-1558618666-fcd25c85f82e"), { w: 900 })],
  battery: [battery, pexels(3807277, 900)],
  "brake-parts": [brake, optimizeImageUrl(unsplash("photo-1486262715619-67b85e0b08d3"), { w: 900 })],
  "engine-parts": [engine, optimizeImageUrl(unsplash("photo-1492144534655-ae79c964c9d7"), { w: 900 })],
  lubricants: [oil, pexels(279949, 900)],
  electronics: [electronics, optimizeImageUrl(unsplash("photo-1549317661-bd32c8ce0db2"), { w: 900 })],
  accessories: [accessory, pexels(3802508, 900)],
  "body-parts": [body, optimizeImageUrl(unsplash("photo-1617788138017-80837c34d4af"), { w: 900 })],
  "interior-parts": [interior, optimizeImageUrl(unsplash("photo-1519641471654-76cebc7a341f"), { w: 900 })],
};

export function getPartImages(categorySlug: string, slug: string, seed = 0): string[] {
  const pool = PARTS_CATEGORY_IMAGES[categorySlug] ?? PARTS_CATEGORY_IMAGES.accessories!;
  const hero = pool[seed % pool.length]!;
  return [...new Set([hero, ...pool])].slice(0, 3);
}
