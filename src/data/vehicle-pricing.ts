import type { VehicleTemplate } from "@/data/india-vehicle-master";

function roundTo(n: number, step: number): number {
  return Math.round(n / step) * step;
}

/** Variant-tier ex-showroom / market price aligned to Indian listing norms */
export function computeListingPrice(
  template: VehicleTemplate,
  variantIndex: number,
  condition: "new" | "used",
  year: number,
  kms: number,
  seed: number
): number {
  const variants = template.variants.length;
  const tier = variants <= 1 ? 0.55 : variantIndex / (variants - 1);
  let price = template.priceMin + (template.priceMax - template.priceMin) * tier;

  if (condition === "used") {
    const yearSpan = Math.max(1, template.yearMax - template.yearMin);
    const ageYears = template.yearMax - year;
    const ageDep = 1 - ageYears / (yearSpan + 2) * 0.28;
    const kmDep = 1 - Math.min(kms / template.kmsMax, 1) * 0.12;
    price *= ageDep * kmDep;
    if (template.category === "bikes" || template.bodyType === "Auto") {
      price *= 0.92;
    }
  }

  const step =
    template.category === "bikes"
      ? 500
      : template.bodyType === "Auto"
        ? 5000
        : price >= 2_000_000
          ? 25_000
          : price >= 800_000
            ? 10_000
            : 5_000;

  const jitterSteps = (seed % 5) - 2;
  price = roundTo(price + jitterSteps * step, step);
  price = Math.max(template.priceMin * (condition === "used" ? 0.52 : 0.98), price);
  price = Math.min(template.priceMax * (condition === "new" ? 1.02 : 1.05), price);

  return price;
}

export function computeOriginalPrice(
  price: number,
  condition: "new" | "used",
  seed: number
): number | undefined {
  if (condition === "new") {
    return roundTo(price * 1.1, price >= 500_000 ? 5_000 : 1_000);
  }
  const pct = 4 + (seed % 9);
  return roundTo(price * (1 + pct / 100), price >= 500_000 ? 5_000 : 1_000);
}
