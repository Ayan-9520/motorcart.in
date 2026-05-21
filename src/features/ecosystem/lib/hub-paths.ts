import type { EcosystemHubSlug } from "../types";
import { ECOSYSTEM_HUB_SLUGS } from "../types";

export function hubLandingPath(slug: EcosystemHubSlug): string {
  return `/${slug}`;
}

export function hubSearchPath(slug: EcosystemHubSlug, query?: string): string {
  const params = new URLSearchParams({ hub: slug });
  if (query?.trim()) params.set("q", query.trim());
  return `/search?${params.toString()}`;
}

export function hubBuyPath(slug: EcosystemHubSlug, condition: "new" | "used" = "used"): string {
  if (slug === "cars" && condition === "new") return "/new-cars";
  if (slug === "cars" && condition === "used") return "/used-cars";
  return `/buy/${slug}/${condition}`;
}

export function hubSellPath(slug: EcosystemHubSlug): string {
  return `/sell/${slug}`;
}

export function parseEcosystemHubFromPath(pathname: string): EcosystemHubSlug | undefined {
  const segment = pathname.replace(/^\//, "").split("/")[0];
  return ECOSYSTEM_HUB_SLUGS.includes(segment as EcosystemHubSlug)
    ? (segment as EcosystemHubSlug)
    : undefined;
}

export function isEcosystemHubPath(pathname: string): boolean {
  return parseEcosystemHubFromPath(pathname) !== undefined;
}
