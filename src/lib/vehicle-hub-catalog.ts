import type { HubCategorySlug } from "@/features/marketplace/types";
import { optimizeImageUrl, unsplash } from "@/lib/media-urls";

const hero = (photoId: string) =>
  optimizeImageUrl(unsplash(photoId, 900), { w: 480, h: 320, q: 82 });

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
    heroImage: hero("photo-1492144534655-ae79c964c9d7"),
  },
  {
    id: "bikes",
    label: "Bikes",
    tagline: "2W & scooters",
    heroImage: hero("photo-1558981806-6f4c4215d264"),
  },
  {
    id: "auto",
    label: "Auto",
    tagline: "Commercial & taxi",
    heroImage: hero("photo-1544620347-c4fd4a3d5957"),
  },
  {
    id: "trucks",
    label: "Trucks",
    tagline: "LCV & HCV",
    heroImage: hero("photo-1586191582150-76830be2127c"),
  },
  {
    id: "buses",
    label: "Buses",
    tagline: "Fleet & coach",
    heroImage: hero("photo-1533105079780-92b9be482077"),
  },
  {
    id: "equipment",
    label: "Equipment",
    tagline: "Earthmoving & agri",
    heroImage: hero("photo-1581094794329-c8112a89af12"),
  },
  {
    id: "ev",
    label: "EV",
    tagline: "Electric vehicles",
    heroImage: hero("photo-1593941707879-2c2b2cd97e2a"),
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
