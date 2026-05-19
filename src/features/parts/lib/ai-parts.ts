import type { PartProduct } from "../types";

export function scorePartForUser(part: PartProduct, hints: { vehicle?: string; category?: string }): number {
  let s = part.rating * 10 + (part.isFeatured ? 15 : 0);
  if (hints.category && part.categorySlug === hints.category) s += 25;
  if (hints.vehicle) {
    const m = part.compatibility.some((c) =>
      c.toLowerCase().includes(hints.vehicle!.toLowerCase())
    );
    if (m) s += 40;
  }
  if (part.stock < 5) s -= 5;
  if (part.stock > 50) s += 5;
  return Math.round(s);
}

export function recommendParts(
  catalog: PartProduct[],
  hints: { vehicle?: string; category?: string },
  limit = 6
): PartProduct[] {
  return [...catalog]
    .filter((p) => p.isActive && p.stock > 0)
    .map((p) => ({ p, s: scorePartForUser(p, hints) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}
