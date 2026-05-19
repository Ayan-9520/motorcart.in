import type { VehicleListing, VehicleMetadata } from "@/types/vehicle";
import { slugify } from "@/lib/vehicle-utils";
import {
  COLORS,
  DEALERS_MASTER,
  INDIAN_CITIES,
  VEHICLE_TEMPLATES,
  type VehicleTemplate,
} from "@/data/india-vehicle-master";
import { getModelImages } from "@/data/vehicle-model-images";
import { computeListingPrice, computeOriginalPrice } from "@/data/vehicle-pricing";

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length]!;
}

function randBetween(min: number, max: number, seed: number): number {
  const t = Math.abs(Math.sin(seed * 9999) * 10000);
  return Math.floor(min + (t % 1) * (max - min + 1));
}

function buildListing(
  template: VehicleTemplate,
  variant: string,
  cityIdx: number,
  listingSeed: number
): VehicleListing {
  const city = INDIAN_CITIES[cityIdx % INDIAN_CITIES.length]!;
  const area = pick(city.areas, listingSeed);
  const year = randBetween(template.yearMin, template.yearMax, listingSeed + 1);
  const isNew = template.newOnly || (!template.usedOnly && listingSeed % 3 === 0);
  const condition = isNew ? "new" : "used";
  const category = template.category;

  const kms =
    condition === "new"
      ? randBetween(500, template.kmsMax, listingSeed + 2)
      : randBetween(8000, template.kmsMax, listingSeed + 2);

  const variantIndex = Math.max(0, template.variants.indexOf(variant));
  const price = computeListingPrice(template, variantIndex, condition, year, kms, listingSeed);
  const originalPrice =
    condition === "used" && listingSeed % 2 === 0
      ? computeOriginalPrice(price, condition, listingSeed)
      : condition === "new"
        ? computeOriginalPrice(price, condition, listingSeed)
        : undefined;

  const fuel = pick(template.fuels, listingSeed);
  const transmission = pick(template.transmissions, listingSeed + 4);
  const color = pick(COLORS, listingSeed + 5);
  const dealer = pick(
    DEALERS_MASTER.filter((d) => d.city === city.city || listingSeed % 3 === 0),
    listingSeed
  );

  const id = `v-${listingSeed}-${slugify(`${template.brand}-${template.model}-${variant}`).slice(0, 24)}`;
  const slug = slugify(`${year}-${template.brand}-${template.model}-${variant}-${city.city}-${listingSeed}`);

  const images = getModelImages(template.brand, template.model, template.bodyType, listingSeed);
  const aiScore = randBetween(78, 98, listingSeed + 6);
  const isFeatured = listingSeed % 11 === 0;
  const isCertified = condition === "used" ? listingSeed % 4 !== 0 : true;

  const metadata: VehicleMetadata = {
    emiRate: Number((8.5 + (listingSeed % 30) / 10).toFixed(2)),
    specifications: {
      engine: fuel === "Electric" ? "Electric Motor" : `${randBetween(1, 2, listingSeed)}.${randBetween(0, 9, listingSeed)}L`,
      mileage:
        fuel === "Electric"
          ? `${randBetween(250, 500, listingSeed)} km/charge`
          : `${randBetween(14, 24, listingSeed)} kmpl`,
      seating: template.bodyType === "Bus" ? "26" : template.bodyType === "MPV" ? "7" : "5",
    },
  };

  if (condition === "new") {
    metadata.onRoadPrice = Math.round(price * 1.12);
    metadata.exShowroomPrice = price;
    metadata.emiRate = Number((8.75 + (listingSeed % 20) / 10).toFixed(2));
    metadata.waitingPeriod = pick(["2 weeks", "4 weeks", "6 weeks", "Immediate"], listingSeed);
    metadata.rating = Number((4.2 + (listingSeed % 8) / 10).toFixed(1));
    metadata.has360 = listingSeed % 3 === 0;
    if (listingSeed % 5 === 0) metadata.offerTag = pick(["Festival offer", "Exchange bonus", "Corporate discount"], listingSeed);
    if (isFeatured) metadata.isLatestLaunch = true;
  } else {
    metadata.inspectionScore = randBetween(82, 98, listingSeed);
    metadata.fairPriceLabel = pick(["great-deal", "fair-price", "fair-price"], listingSeed) as VehicleMetadata["fairPriceLabel"];
    metadata.certificationProgram = pick(
      ["Maruti True Value", "Hyundai Promise", "Mahindra First Choice", "Toyota U Trust", "Honda Auto Terrace"],
      listingSeed
    );
    metadata.warrantyIncluded = listingSeed % 3 !== 0;
    metadata.serviceHistoryAvailable = listingSeed % 5 !== 0;
    metadata.rcVerified = true;
    metadata.insuranceActive = listingSeed % 4 !== 0;
    if (originalPrice) metadata.discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
    if (listingSeed % 7 === 0) metadata.loanPreApproved = true;
  }

  if (fuel === "Electric") {
    metadata.specifications!.mileage = `${randBetween(280, 480, listingSeed)} km/charge`;
  }

  return {
    id,
    slug,
    title: `${year} ${template.brand} ${template.model} ${variant}`.trim(),
    brand: template.brand,
    model: template.model,
    variant,
    year,
    price,
    originalPrice,
    fuelType: fuel,
    transmission,
    bodyType: template.bodyType,
    category,
    kmsDriven: kms,
    owners: condition === "new" ? 1 : randBetween(1, 2, listingSeed),
    color,
    city: city.city,
    state: city.state,
    location: `${area}, ${city.city}`,
    images,
    features: [...template.features],
    description: `${condition === "new" ? "Brand new" : "Well maintained"} ${template.brand} ${template.model} ${variant} — ${fuel}, ${transmission}. Available at ${dealer.name}, ${city.city}.`,
    isCertified,
    isFeatured,
    condition,
    status: "available",
    aiPriceScore: aiScore,
    dealerId: dealer.id,
    dealerName: dealer.name,
    dealerSlug: dealer.slug,
    dealerPhone: dealer.phone,
    dealerRating: dealer.rating,
    dealerVerified: dealer.verified,
    metadata,
    createdAt: new Date(Date.UTC(2025, (listingSeed % 12), (listingSeed % 28) + 1)).toISOString(),
  };
}

/** Generate full marketplace catalog from master templates */
export function buildVehicleCatalog(): VehicleListing[] {
  const listings: VehicleListing[] = [];
  let seed = 0;

  for (const template of VEHICLE_TEMPLATES) {
    const variants = template.variants;
    const citiesPerVariant = template.category === "bikes" || template.bodyType === "Auto" ? 2 : 3;

    for (let vi = 0; vi < variants.length; vi++) {
      for (let ci = 0; ci < citiesPerVariant; ci++) {
        listings.push(buildListing(template, variants[vi]!, ci, seed));
        seed++;
      }
    }
  }

  return listings;
}
