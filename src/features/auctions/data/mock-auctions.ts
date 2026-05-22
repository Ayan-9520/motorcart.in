import type { AuctionListing, AuctionBid, AuctionMessage } from "../types";
import { AUCTION_LISTING_IMAGES, getModelImages } from "@/lib/media/india-media-catalog";
import { resolveAuctionImages } from "@/lib/media/resolve-images";

const img = AUCTION_LISTING_IMAGES[0];
const img2 = AUCTION_LISTING_IMAGES[1];
const img3 = AUCTION_LISTING_IMAGES[2];
const img4 = AUCTION_LISTING_IMAGES[3];
const imgEv = getModelImages("Tata", "Nexon EV", "SUV", 0, {
  category: "ev",
  fuelType: "Electric",
})[0]!;
const imgBike = getModelImages("Royal Enfield", "Classic 350", "Bike", 0, { category: "bikes" })[0]!;

const endsIn = (hours: number) => new Date(Date.now() + hours * 3600000).toISOString();
const startsIn = (hours: number) => new Date(Date.now() + hours * 3600000).toISOString();
const startedAgo = (hours: number) => new Date(Date.now() - hours * 3600000).toISOString();

export const MOCK_AUCTIONS: AuctionListing[] = [
  {
    id: "a1",
    slug: "2023-hyundai-creta-bank-repo-mumbai",
    vehicleId: "v1",
    organizerId: "org1",
    title: "2023 Hyundai Creta SX — HDFC Bank Repo",
    images: [img],
    startingBid: 650000,
    currentBid: 782000,
    reservePrice: 750000,
    bidIncrement: 5000,
    bidCount: 34,
    auctionType: "bank_repo",
    location: "Mumbai",
    startsAt: startedAgo(2),
    endsAt: endsIn(4),
    status: "live",
    winnerId: null,
    isFeatured: true,
    viewerCount: 128,
    metadata: {},
    createdAt: new Date().toISOString(),
  },
  {
    id: "a2",
    slug: "2020-kia-seltos-dealer-auction-delhi",
    vehicleId: "v2",
    organizerId: "org2",
    title: "2020 Kia Seltos HTX — Premium Motors Auction",
    images: [img2],
    startingBid: 950000,
    currentBid: 1085000,
    reservePrice: 1100000,
    bidIncrement: 10000,
    bidCount: 28,
    auctionType: "dealer",
    location: "Delhi",
    startsAt: startedAgo(1),
    endsAt: endsIn(6),
    status: "live",
    winnerId: null,
    isFeatured: true,
    viewerCount: 94,
    metadata: {},
    createdAt: new Date().toISOString(),
  },
  {
    id: "a3",
    slug: "2019-maruti-swift-government-bangalore",
    vehicleId: "v3",
    organizerId: "org3",
    title: "2019 Maruti Swift — Government Fleet Disposal",
    images: [img3],
    startingBid: 320000,
    currentBid: 385000,
    reservePrice: null,
    bidIncrement: 3000,
    bidCount: 19,
    auctionType: "government",
    location: "Bangalore",
    startsAt: startedAgo(3),
    endsAt: endsIn(2),
    status: "live",
    winnerId: null,
    isFeatured: false,
    viewerCount: 67,
    metadata: {},
    createdAt: new Date().toISOString(),
  },
  {
    id: "a4",
    slug: "2024-tata-nexon-ev-upcoming",
    vehicleId: "v4",
    organizerId: "org1",
    title: "2024 Tata Nexon EV — Upcoming Dealer Auction",
    images: [img3],
    startingBid: 1200000,
    currentBid: null,
    reservePrice: 1150000,
    bidIncrement: 10000,
    bidCount: 0,
    auctionType: "dealer",
    location: "Pune",
    startsAt: startsIn(24),
    endsAt: endsIn(48),
    status: "upcoming",
    winnerId: null,
    isFeatured: true,
    viewerCount: 42,
    metadata: {},
    createdAt: new Date().toISOString(),
  },
  {
    id: "a5",
    slug: "2018-honda-city-ended",
    vehicleId: "v5",
    organizerId: "org2",
    title: "2018 Honda City VX — Auction Ended",
    images: [img2],
    startingBid: 500000,
    currentBid: 612000,
    reservePrice: 580000,
    bidIncrement: 5000,
    bidCount: 41,
    auctionType: "bank_repo",
    location: "Chennai",
    startsAt: startedAgo(72),
    endsAt: startedAgo(1),
    status: "ended",
    winnerId: "user-winner",
    isFeatured: false,
    viewerCount: 0,
    metadata: {},
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_BIDS: Record<string, AuctionBid[]> = {
  a1: [
    { id: "b1", auctionId: "a1", bidderId: "u1", bidderName: "Rahul M.", amount: 782000, isAutoBid: false, createdAt: new Date(Date.now() - 120000).toISOString() },
    { id: "b2", auctionId: "a1", bidderId: "u2", bidderName: "Priya S.", amount: 775000, isAutoBid: false, createdAt: new Date(Date.now() - 300000).toISOString() },
    { id: "b3", auctionId: "a1", bidderId: "u3", bidderName: "Amit P.", amount: 768000, isAutoBid: true, createdAt: new Date(Date.now() - 600000).toISOString() },
  ],
  a2: [
    { id: "b4", auctionId: "a2", bidderId: "u4", bidderName: "Vikram K.", amount: 1085000, isAutoBid: false, createdAt: new Date(Date.now() - 60000).toISOString() },
    { id: "b5", auctionId: "a2", bidderId: "u1", bidderName: "Rahul M.", amount: 1075000, isAutoBid: false, createdAt: new Date(Date.now() - 180000).toISOString() },
  ],
};

for (const auction of MOCK_AUCTIONS) {
  auction.images = resolveAuctionImages(auction.title, auction.images);
}

export const MOCK_MESSAGES: Record<string, AuctionMessage[]> = {
  a1: [
    { id: "m1", auctionId: "a1", userId: null, displayName: "System", message: "Auction is now LIVE", isSystem: true, createdAt: startedAgo(2) },
    { id: "m2", auctionId: "a1", userId: "u1", displayName: "Rahul M.", message: "Great condition vehicle!", isSystem: false, createdAt: new Date(Date.now() - 900000).toISOString() },
  ],
};
