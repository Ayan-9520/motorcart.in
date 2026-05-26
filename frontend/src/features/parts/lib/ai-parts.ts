import type { HubCategorySlug } from "@/features/marketplace/types";
import { partMatchesVehicleHub } from "@/lib/vehicle-hub-catalog";
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
  hints: { vehicle?: string; category?: string; hub?: HubCategorySlug | null },
  limit = 6
): PartProduct[] {
  const hub = hints.hub ?? null;
  let pool = catalog.filter((p) => p.isActive && p.stock > 0);
  if (hub) pool = pool.filter((p) => partMatchesVehicleHub(p, hub));
  return [...pool]
    .map((p) => ({ p, s: scorePartForUser(p, hints) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}
