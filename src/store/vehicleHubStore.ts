import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HubCategorySlug } from "@/features/marketplace/types";
import { hubLandingPath } from "@/features/ecosystem/lib/hub-paths";
import type { EcosystemHubSlug } from "@/features/ecosystem/types";

/** Six primary vehicle ecosystems — navbar & home hub grid */
export const PRIMARY_VEHICLE_HUBS: EcosystemHubSlug[] = [
  "cars",
  "bikes",
  "auto",
  "trucks",
  "buses",
  "ev",
];

export function isPrimaryVehicleHub(hub: string): hub is EcosystemHubSlug {
  return PRIMARY_VEHICLE_HUBS.includes(hub as EcosystemHubSlug);
}

export function hubBuyPath(hub: HubCategorySlug): string {
  return `/buy?hub=${hub}`;
}

export function hubSellPath(hub: HubCategorySlug): string {
  return `/sell?hub=${hub}`;
}

/** Dedicated ecosystem landing — Cars, Bikes, Trucks, etc. */
export function hubEcosystemPath(hub: EcosystemHubSlug): string {
  return hubLandingPath(hub);
}

/** Buy/sell marketplace when already inside buy or sell flows */
export function resolveHubMarketplacePath(pathname: string, hub: HubCategorySlug): string {
  if (pathname.startsWith("/sell")) return hubSellPath(hub);
  if (pathname.startsWith("/buy")) return hubBuyPath(hub);
  return hubEcosystemPath(hub as EcosystemHubSlug);
}

interface VehicleHubState {
  activeHub: HubCategorySlug;
  setActiveHub: (hub: HubCategorySlug) => void;
}

export const useVehicleHubStore = create<VehicleHubState>()(
  persist(
    (set) => ({
      activeHub: "cars",
      setActiveHub: (activeHub) => set({ activeHub }),
    }),
    { name: "motorcart-vehicle-hub" }
  )
);
