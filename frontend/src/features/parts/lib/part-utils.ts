import type { AppRole } from "@/types/database";
import type { PartCategorySlug, PartProduct } from "../types";

const DEALER_ROLES: AppRole[] = [
  "dealer",
  "used_car_dealer",
  "new_car_dealer",
  "bike_dealer",
  "truck_dealer",
];

export function isDealerRole(role: AppRole | undefined): boolean {
  return role != null && DEALER_ROLES.includes(role);
}

export function displayUnitPrice(part: PartProduct, role: AppRole | undefined): number {
  if (isDealerRole(role) && part.wholesalePrice != null && part.wholesalePrice > 0) {
    return part.wholesalePrice;
  }
  return part.price;
}

export function partDetailPath(part: Pick<PartProduct, "slug" | "categorySlug">): string {
  return `/parts/${part.categorySlug}/${part.slug}`;
}

export function slugifyPartName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function parseCategoryParam(param: string | undefined): PartCategorySlug | undefined {
  const valid = [
    "engine-parts",
    "battery",
    "tyres",
    "brake-parts",
    "accessories",
    "lubricants",
    "electronics",
    "body-parts",
    "interior-parts",
  ] as const;
  return valid.includes(param as PartCategorySlug) ? (param as PartCategorySlug) : undefined;
}
