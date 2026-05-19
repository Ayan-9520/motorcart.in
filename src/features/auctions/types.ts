import type { AuctionStatus } from "@/types/database";

export type AuctionType = "dealer" | "bank_repo" | "government";

export const AUCTION_TYPE_LABELS: Record<AuctionType, string> = {
  dealer: "Dealer Auction",
  bank_repo: "Bank Repo",
  government: "Government Auction",
};

export interface AuctionListing {
  id: string;
  slug: string;
  vehicleId: string;
  organizerId: string;
  title: string;
  images: string[];
  startingBid: number;
  currentBid: number | null;
  reservePrice: number | null;
  bidIncrement: number;
  bidCount: number;
  auctionType: AuctionType;
  location: string;
  startsAt: string;
  endsAt: string;
  status: AuctionStatus;
  winnerId: string | null;
  isFeatured: boolean;
  viewerCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AuctionBid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName?: string;
  amount: number;
  isAutoBid: boolean;
  createdAt: string;
}

export interface AuctionMessage {
  id: string;
  auctionId: string;
  userId: string | null;
  displayName: string;
  message: string;
  isSystem: boolean;
  createdAt: string;
}

export interface AutoBidConfig {
  auctionId: string;
  maxAmount: number;
  isActive: boolean;
}

export interface BidValidationResult {
  valid: boolean;
  minBid: number;
  error?: string;
  riskScore?: number;
}

export interface AuctionAnalytics {
  totalAuctions: number;
  liveCount: number;
  totalBids: number;
  totalRevenue: number;
  avgBidsPerAuction: number;
  reserveMetRate: number;
}
