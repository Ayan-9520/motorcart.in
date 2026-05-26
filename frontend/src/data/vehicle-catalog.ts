/**
 * Full Indian vehicle catalog — generated from master templates.
 * Merged with Supabase in vehicle.service when backend is connected.
 */
import type { VehicleListing } from "@/types/vehicle";
import { buildVehicleCatalog } from "@/data/build-vehicle-catalog";

export const MOCK_VEHICLES: VehicleListing[] = buildVehicleCatalog();

export const VEHICLE_BRANDS = [...new Set(MOCK_VEHICLES.map((v) => v.brand))].sort();
export const VEHICLE_CITIES = [...new Set(MOCK_VEHICLES.map((v) => v.city))].sort();
export const VEHICLE_BODY_TYPES = [...new Set(MOCK_VEHICLES.map((v) => v.bodyType))].sort();
export const VEHICLE_COLORS = [...new Set(MOCK_VEHICLES.map((v) => v.color).filter(Boolean))] as string[];

export const CATALOG_STATS = {
  total: MOCK_VEHICLES.length,
  newCars: MOCK_VEHICLES.filter((v) => v.category === "new-cars").length,
  usedCars: MOCK_VEHICLES.filter((v) => v.category === "used-cars").length,
  bikes: MOCK_VEHICLES.filter((v) => v.category === "bikes").length,
  ev: MOCK_VEHICLES.filter((v) => v.category === "ev").length,
  trucks: MOCK_VEHICLES.filter((v) => v.category === "trucks").length,
  buses: MOCK_VEHICLES.filter((v) => v.category === "buses").length,
} as const;
