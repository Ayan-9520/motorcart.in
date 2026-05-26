import type { HubCategorySlug } from "@/features/marketplace/types";
import { HUB_HERO_IMAGES } from "@/lib/media/india-media-catalog";

/** Vehicle segments for parts & services — aligned with marketplace hubs */
export const VEHICLE_HUB_ENTRIES: readonly {
  id: HubCategorySlug;
  label: string;
  tagline: string;
  heroImage: string;
}[] = [
  {
    id: "cars",
    label: "Cars",
    tagline: "Hatchback to SUV",
    heroImage: HUB_HERO_IMAGES.cars,
  },
  {
    id: "bikes",
    label: "Bikes",
    tagline: "2W & scooters",
    heroImage: HUB_HERO_IMAGES.bikes,
  },
  {
    id: "auto",
    label: "Auto",
    tagline: "Commercial & taxi",
    heroImage: HUB_HERO_IMAGES.auto,
  },
  {
    id: "trucks",
    label: "Trucks",
    tagline: "LCV & HCV",
    heroImage: HUB_HERO_IMAGES.trucks,
  },
  {
    id: "buses",
    label: "Buses",
    tagline: "Fleet & coach",
    heroImage: HUB_HERO_IMAGES.buses,
  },
  {
    id: "equipment",
    label: "Equipment",
    tagline: "Earthmoving & agri",
    heroImage: HUB_HERO_IMAGES.equipment,
  },
  {
    id: "ev",
    label: "EV",
    tagline: "Electric vehicles",
    heroImage: HUB_HERO_IMAGES.ev,
  },
] as const;

const HUB_ID_SET = new Set<HubCategorySlug>(VEHICLE_HUB_ENTRIES.map((e) => e.id));

export function parseVehicleHubParam(value: string | null | undefined): HubCategorySlug | null {
  if (!value) return null;
  const v = value.trim().toLowerCase() as HubCategorySlug;
  return HUB_ID_SET.has(v) ? v : null;
}

export function partMatchesVehicleHub(
  part: { vehicleHubs?: HubCategorySlug[] | undefined },
  hub: HubCategorySlug | null
): boolean {
  if (!hub) return true;
  const hubs = part.vehicleHubs;
  if (!hubs?.length) return true;
  return hubs.includes(hub);
}

export function centerMatchesVehicleHub(
  center: { vehicleHubs?: HubCategorySlug[] | undefined },
  hub: HubCategorySlug | null
): boolean {
  if (!hub) return true;
  const hubs = center.vehicleHubs;
  if (!hubs?.length) return true;
  return hubs.includes(hub);
}
