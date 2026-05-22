/**
 * Non-vehicle media (parts, services, marketing). Vehicle imagery → vehicle-media-registry.
 */
import { optimizeImageUrl, pexels, unsplash } from "@/lib/media-urls";
import {
  getVehicleHero,
  HUB_HERO_IMAGES,
  hashKey,
  pickGallery,
  SEGMENT_DEFAULTS,
} from "./vehicle-media-registry";

export {
  getModelImages,
  getVehicleGallery,
  getVehicleHero,
  HUB_HERO_IMAGES,
  hashKey,
  pickGallery,
  inferVehicleSegment,
  isListingSafeUrl,
  SEGMENT_DEFAULTS,
} from "./vehicle-media-registry";

function px(id: number, w = 900): string {
  return optimizeImageUrl(
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`,
    { w, h: w, q: 88 }
  );
}

const workshop = pexels(3802508, 900);

export const MEDIA_DEFAULTS = {
  vehicle: SEGMENT_DEFAULTS.cars,
  vehicleWide: px(1149137, 1400),
  part: workshop,
  auction: SEGMENT_DEFAULTS.cars,
  dealerCover: optimizeImageUrl(unsplash("photo-1568605117036-5fe5e7bab0b7"), { w: 1000 }),
  finance: optimizeImageUrl(unsplash("photo-1454165804606-c3d57bc86b40"), { w: 1200 }),
  communityCover: optimizeImageUrl(unsplash("photo-1449824913935-59a10b8d2000"), { w: 1200 }),
  avatar: px(170811, 400),
} as const;

export const ECOSYSTEM_HERO_IMAGES = {
  cars: HUB_HERO_IMAGES.cars,
  bikes: HUB_HERO_IMAGES.bikes,
  trucks: HUB_HERO_IMAGES.trucks,
  buses: HUB_HERO_IMAGES.buses,
  ev: HUB_HERO_IMAGES.ev,
  auto: HUB_HERO_IMAGES.auto,
} as const;

export const PARTS_CATEGORY_IMAGES: Record<string, readonly string[]> = {
  tyres: [px(3802508, 900), px(1149137, 900)],
  battery: [px(4480506, 900), px(3807277, 900)],
  "brake-parts": [workshop, px(279949, 900)],
  "engine-parts": [workshop, px(1149137, 900)],
  lubricants: [px(279949, 900), workshop],
  electronics: [px(170811, 900), SEGMENT_DEFAULTS.cars],
  accessories: [px(3802508, 900), SEGMENT_DEFAULTS.cars],
  "body-parts": [SEGMENT_DEFAULTS.cars, px(116675, 900)],
  "interior-parts": [SEGMENT_DEFAULTS.cars, px(244206, 900)],
};

export function getPartImages(categorySlug: string, slug: string, seed = 0): string[] {
  const pool = PARTS_CATEGORY_IMAGES[categorySlug] ?? PARTS_CATEGORY_IMAGES.accessories!;
  return pickGallery(pool, `${categorySlug}|${slug}`, seed, 3);
}

export const PARTS_BRAND_TILES = [
  { name: "Bosch", image: getPartImages("engine-parts", "bosch", 0)[0]! },
  { name: "Michelin", image: getPartImages("tyres", "michelin", 1)[0]! },
  { name: "Exide", image: getPartImages("battery", "exide", 2)[0]! },
  { name: "Castrol", image: getPartImages("lubricants", "castrol", 3)[0]! },
  { name: "Mann", image: getPartImages("engine-parts", "mann", 4)[0]! },
  { name: "Brembo", image: getPartImages("brake-parts", "brembo", 5)[0]! },
  { name: "Apollo", image: getPartImages("tyres", "apollo", 6)[0]! },
  { name: "Amaron", image: getPartImages("battery", "amaron", 7)[0]! },
] as const;

export const SERVICE_CATEGORY_IMAGES: Record<string, string> = {
  "car-servicing": workshop,
  "denting-painting": SEGMENT_DEFAULTS.cars,
  "car-wash": px(3802508, 800),
  "ppf-coating": SEGMENT_DEFAULTS.cars,
  "ceramic-coating": px(170811, 800),
  "ac-repair": px(4480506, 800),
  "battery-replacement": px(4480506, 800),
  "tyre-replacement": px(3802508, 800),
  "insurance-renewal": MEDIA_DEFAULTS.finance,
  "rc-transfer": MEDIA_DEFAULTS.dealerCover,
};

export const HOME_SERVICE_CARDS = [
  { id: "wash", image: px(3802508, 600) },
  { id: "repair", image: workshop },
  { id: "detailing", image: px(170811, 600) },
  { id: "rsa", image: MEDIA_DEFAULTS.finance },
] as const;

export function homeServiceImage(id: string): string {
  return HOME_SERVICE_CARDS.find((c) => c.id === id)?.image ?? SEGMENT_DEFAULTS.cars;
}

export const FEATURED_VEHICLE_IMAGES = {
  creta: getVehicleHero({ brand: "Hyundai", model: "Creta", bodyType: "SUV", category: "used-cars" }),
  nexonEv: getVehicleHero({ brand: "Tata", model: "Nexon EV", bodyType: "SUV", category: "ev", fuelType: "Electric" }),
  himalayan: getVehicleHero({ brand: "Royal Enfield", model: "Himalayan", bodyType: "Bike", category: "bikes" }),
  tata407: getVehicleHero({ brand: "Tata", model: "407", bodyType: "Truck", category: "trucks" }),
} as const;

export const AUCTION_LISTING_IMAGES = [
  getVehicleHero({ brand: "Honda", model: "City", bodyType: "Sedan", category: "used-cars" }),
  getVehicleHero({ brand: "Kia", model: "Seltos", bodyType: "SUV", category: "used-cars", seed: 1 }),
  getVehicleHero({ brand: "Maruti", model: "Swift", bodyType: "Hatchback", category: "used-cars", seed: 2 }),
  getVehicleHero({ brand: "Hyundai", model: "Creta", bodyType: "SUV", category: "used-cars", seed: 3 }),
] as const;

export const COMMUNITY_POST_IMAGES = {
  luxury: SEGMENT_DEFAULTS.cars,
  suv: getVehicleHero({ brand: "Hyundai", model: "Creta", bodyType: "SUV", category: "used-cars" }),
  ev: getVehicleHero({ brand: "Tata", model: "Nexon EV", bodyType: "SUV", category: "ev", fuelType: "Electric" }),
  roadTrip: MEDIA_DEFAULTS.communityCover,
} as const;

export const COMMUNITY_AVATARS = [
  px(170811, 200),
  px(1149137, 200),
  px(116675, 200),
  px(244206, 200),
] as const;

export function dealerCoverImage(slug: string, index: number): string {
  const covers = [
    MEDIA_DEFAULTS.dealerCover,
    SEGMENT_DEFAULTS.cars,
    HUB_HERO_IMAGES.ev,
    HUB_HERO_IMAGES.bikes,
    HUB_HERO_IMAGES.trucks,
    MEDIA_DEFAULTS.communityCover,
  ];
  return pickGallery(covers, slug, index, 1)[0]!;
}

export function serviceCenterImage(name: string, seed: number): string[] {
  const pool = [workshop, px(3802508, 900), SEGMENT_DEFAULTS.cars, px(170811, 900)];
  return pickGallery(pool, name, seed, 2);
}
