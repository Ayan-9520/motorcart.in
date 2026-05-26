/**
 * Module registry placeholder — use for lazy route chunks or feature flags later.
 */
export const MODULE_REGISTRY = {
  marketplace: "src/features/marketplace",
  vehicles: "src/features/vehicles",
  finance: "src/features/finance",
  auctions: "src/features/auctions",
  parts: "src/features/parts",
  services: "src/features/service-booking",
  community: "src/features/community",
} as const;

export type ModuleKey = keyof typeof MODULE_REGISTRY;
