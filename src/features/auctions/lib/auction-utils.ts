import type { AuctionListing, AuctionType } from "../types";
import type { DbAuction } from "@/types/database";

export function slugifyAuction(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function mapDbAuction(a: DbAuction): AuctionListing {
  return {
    id: a.id,
    slug: a.slug ?? slugifyAuction(a.title),
    vehicleId: a.vehicle_id,
    organizerId: a.organizer_id,
    title: a.title,
    images: a.images?.length ? a.images : ["https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"],
    startingBid: Number(a.starting_bid),
    currentBid: a.current_bid != null ? Number(a.current_bid) : null,
    reservePrice: a.reserve_price != null ? Number(a.reserve_price) : null,
    bidIncrement: Number(a.bid_increment),
    bidCount: a.bid_count,
    auctionType: (a.auction_type as AuctionType) || "dealer",
    location: a.location ?? "India",
    startsAt: a.starts_at,
    endsAt: a.ends_at,
    status: a.status,
    winnerId: a.winner_id,
    isFeatured: a.is_featured ?? false,
    viewerCount: a.viewer_count ?? 0,
    metadata: (a.metadata as Record<string, unknown>) ?? {},
    createdAt: a.created_at,
  };
}

export function getMinNextBid(auction: Pick<AuctionListing, "currentBid" | "startingBid" | "bidIncrement">): number {
  const base = auction.currentBid ?? auction.startingBid;
  return base + auction.bidIncrement;
}

export function getTimeLeft(endsAt: string): number {
  return Math.max(0, new Date(endsAt).getTime() - Date.now());
}

export function formatCountdown(ms: number): { hours: number; minutes: number; seconds: number; expired: boolean } {
  if (ms <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { hours, minutes, seconds, expired: false };
}

export function isReserveMet(auction: Pick<AuctionListing, "currentBid" | "reservePrice">): boolean {
  if (auction.reservePrice == null) return true;
  return (auction.currentBid ?? 0) >= auction.reservePrice;
}

export function auctionDetailPath(auction: Pick<AuctionListing, "slug" | "status">): string {
  return `/auctions/${auction.status === "live" ? "live" : auction.status}/${auction.slug}`;
}
