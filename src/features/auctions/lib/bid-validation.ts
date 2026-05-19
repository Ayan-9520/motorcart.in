import type { AuctionListing } from "../types";
import { getMinNextBid } from "./auction-utils";

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_BIDS_PER_WINDOW = 8;

interface BidAttempt {
  at: number;
  amount: number;
}

const clientAttempts = new Map<string, BidAttempt[]>();

export function validateBidClient(
  auction: AuctionListing,
  amount: number,
  userId: string
): { valid: boolean; error?: string; minBid: number } {
  const minBid = getMinNextBid(auction);

  if (auction.status !== "live") {
    return { valid: false, error: "Auction is not live", minBid };
  }

  if (Date.now() > new Date(auction.endsAt).getTime()) {
    return { valid: false, error: "Auction has ended", minBid };
  }

  if (amount < minBid) {
    return { valid: false, error: `Minimum bid is ₹${minBid.toLocaleString("en-IN")}`, minBid };
  }

  const key = `${auction.id}:${userId}`;
  const now = Date.now();
  const attempts = (clientAttempts.get(key) ?? []).filter((a) => now - a.at < RATE_LIMIT_WINDOW_MS);
  if (attempts.length >= MAX_BIDS_PER_WINDOW) {
    return { valid: false, error: "Too many bids. Please wait.", minBid };
  }

  return { valid: true, minBid };
}

export function recordBidAttempt(auctionId: string, userId: string, amount: number) {
  const key = `${auctionId}:${userId}`;
  const attempts = clientAttempts.get(key) ?? [];
  attempts.push({ at: Date.now(), amount });
  clientAttempts.set(key, attempts.slice(-20));
}
