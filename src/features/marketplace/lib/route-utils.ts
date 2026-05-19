import type { HubCategorySlug, VehicleConditionSlug } from "../types";
import type { VehicleCategory, VehicleFilters } from "@/types/vehicle";

const HUB_SLUGS: HubCategorySlug[] = [
  "cars",
  "bikes",
  "trucks",
  "buses",
  "auto",
  "equipment",
  "ev",
];

export function parseHubCategorySlug(param?: string): HubCategorySlug | undefined {
  return HUB_SLUGS.includes(param as HubCategorySlug) ? (param as HubCategorySlug) : undefined;
}

export function parseConditionSlug(param?: string): VehicleConditionSlug | undefined {
  return param === "new" || param === "used" ? param : undefined;
}

export function buyListingPath(hub: HubCategorySlug, condition: VehicleConditionSlug): string {
  return `/buy/${hub}/${condition}`;
}

export function sellListingPath(hub: HubCategorySlug): string {
  return `/sell/${hub}`;
}

export function sellPageTitle(hub: HubCategorySlug): string {
  const labels: Record<HubCategorySlug, string> = {
    cars: "used car",
    bikes: "used bike",
    trucks: "used truck",
    buses: "used bus",
    auto: "used auto",
    equipment: "used equipment",
    ev: "used EV",
  };
  return `Sell your ${labels[hub]}`;
}

export type SellFormDefaults = {
  category: string;
  bodyType: string;
  condition: "used";
  owners: number;
  fuelType?: string;
};

export function hubToSellFormDefaults(hub: HubCategorySlug): SellFormDefaults {
  const base: SellFormDefaults = { condition: "used", owners: 1, category: "used-cars", bodyType: "SUV" };
  switch (hub) {
    case "cars":
      return { ...base, category: "used-cars", bodyType: "SUV" };
    case "bikes":
      return { ...base, category: "bikes", bodyType: "Bike" };
    case "trucks":
      return { ...base, category: "trucks", bodyType: "Truck" };
    case "buses":
      return { ...base, category: "buses", bodyType: "Bus" };
    case "ev":
      return { ...base, category: "ev", bodyType: "EV", fuelType: "Electric" };
    case "auto":
      return { ...base, category: "used-cars", bodyType: "Auto" };
    case "equipment":
      return { ...base, category: "trucks", bodyType: "Equipment" };
    default:
      return base;
  }
}

export function hubCategoryLabel(hub: HubCategorySlug): string {
  const labels: Record<HubCategorySlug, string> = {
    cars: "Cars",
    bikes: "Bikes",
    trucks: "Trucks",
    buses: "Buses",
    auto: "Auto",
    equipment: "Equipment",
    ev: "Electric Vehicles",
  };
  return labels[hub];
}

export function hubCategoryToFilters(
  hub: HubCategorySlug,
  condition: VehicleConditionSlug
): VehicleFilters {
  const base: VehicleFilters = { condition };

  switch (hub) {
    case "cars":
      return { ...base, category: condition === "new" ? "new-cars" : "used-cars" };
    case "bikes":
      return { ...base, category: "bikes" };
    case "trucks":
      return { ...base, category: "trucks" };
    case "buses":
      return { ...base, category: "buses" };
    case "ev":
      return { ...base, category: "ev" };
    case "auto":
      return { ...base, hubCategory: "auto" };
    case "equipment":
      return { ...base, hubCategory: "equipment" };
    default:
      return base;
  }
}

export function hubToVehicleCategory(hub: HubCategorySlug, condition: VehicleConditionSlug): VehicleCategory | undefined {
  const filters = hubCategoryToFilters(hub, condition);
  return filters.category;
}

export function listingPageTitle(hub: HubCategorySlug, condition: VehicleConditionSlug): string {
  const cond = condition === "new" ? "New" : "Used";
  return `${cond} ${hubCategoryLabel(hub)}`;
}
