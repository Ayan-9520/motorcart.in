import type { LucideIcon } from "lucide-react";

/** Six primary vehicle worlds — each has its own hub landing & services */
export type EcosystemHubSlug = "cars" | "bikes" | "trucks" | "buses" | "ev" | "auto";

export const ECOSYSTEM_HUB_SLUGS: EcosystemHubSlug[] = [
  "cars",
  "bikes",
  "trucks",
  "buses",
  "ev",
  "auto",
];

export interface HubServiceItem {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  featured?: boolean;
}

export interface HubFilterChip {
  id: string;
  label: string;
  href: string;
}

export interface HubPromoBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
  variant: "primary" | "soft";
}

export interface VehicleHubDefinition {
  slug: EcosystemHubSlug;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  stats: { listings: string; dealers: string };
  searchPlaceholder: string;
  brands: string[];
  budgets: string[];
  filters: HubFilterChip[];
  banners: HubPromoBanner[];
  services: HubServiceItem[];
}
