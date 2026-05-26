import type { AuctionAssetCategoryId, AuctionServiceId } from "../data/auction-hub-data";

export function auctionBrowsePath(params?: {
  q?: string;
  state?: string;
  status?: string;
  mode?: string;
  category?: AuctionAssetCategoryId | string;
  service?: AuctionServiceId | string;
  type?: string;
}): string {
  const search = new URLSearchParams();
  if (params?.q) search.set("q", params.q);
  if (params?.state && params.state !== "All States") search.set("state", params.state);
  if (params?.status) search.set("status", params.status);
  if (params?.mode) search.set("mode", params.mode);
  if (params?.category) search.set("category", params.category);
  if (params?.service) search.set("service", params.service);
  if (params?.type) search.set("type", params.type);
  const qs = search.toString();
  return qs ? `/auctions/browse?${qs}` : "/auctions/browse";
}

export function auctionEventPath(eventSlug: string): string {
  return `/auctions/browse?event=${eventSlug}`;
}
