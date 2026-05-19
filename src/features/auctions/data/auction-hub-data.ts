import type { LucideIcon } from "lucide-react";
import {
  Car,
  Truck,
  Tractor,
  Gem,
  Building2,
  Bike,
  Bus,
  Gavel,
  Smartphone,
  Monitor,
  Handshake,
  ParkingCircle,
  FileText,
  TruckIcon,
  Landmark,
  Shield,
} from "lucide-react";

export type AuctionServiceId =
  | "physical"
  | "online"
  | "phygital"
  | "private-treaty"
  | "parking"
  | "documentation"
  | "logistics"
  | "financial"
  | "insurance";

export interface AuctionServiceItem {
  id: AuctionServiceId;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const AUCTION_SERVICES: AuctionServiceItem[] = [
  { id: "physical", label: "Physical Bidding", description: "On-yard live gavel", icon: Gavel, href: "/auctions/browse?mode=physical" },
  { id: "online", label: "Online Bidding", description: "Bid from anywhere", icon: Smartphone, href: "/auctions/browse?mode=online" },
  { id: "phygital", label: "Phygital Bidding", description: "Yard + digital", icon: Monitor, href: "/auctions/browse?mode=phygital" },
  { id: "private-treaty", label: "Private Treaty", description: "Direct negotiated sale", icon: Handshake, href: "/auctions/browse?type=dealer" },
  { id: "parking", label: "Parking Services", description: "Secure vehicle storage", icon: ParkingCircle, href: "/services" },
  { id: "documentation", label: "Documentation", description: "RC, NOC & transfer", icon: FileText, href: "/services" },
  { id: "logistics", label: "Logistics", description: "Pan-India transport", icon: TruckIcon, href: "/services" },
  { id: "financial", label: "Financial Services", description: "Loans & refinance", icon: Landmark, href: "/finance" },
  { id: "insurance", label: "Insurance", description: "Auction cover & renewals", icon: Shield, href: "/insurance" },
];

export type AuctionAssetCategoryId =
  | "commercial"
  | "cars"
  | "tractors"
  | "two-wheelers"
  | "buses"
  | "construction"
  | "gold"
  | "real-estate";

export interface AuctionAssetCategory {
  id: AuctionAssetCategoryId;
  label: string;
  subtitle: string;
  image: string;
  href: string;
  countLabel: string;
}

export const AUCTION_ASSET_CATEGORIES: AuctionAssetCategory[] = [
  {
    id: "commercial",
    label: "Commercial Vehicles",
    subtitle: "Trucks, tippers & CV fleets",
    image: "https://images.unsplash.com/photo-1601584114967-902a423690c4?w=800&q=80",
    href: "/auctions/browse?category=commercial",
    countLabel: "420+ lots",
  },
  {
    id: "cars",
    label: "4 Wheelers",
    subtitle: "Cars, SUVs & MUVs",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    href: "/auctions/browse?category=cars",
    countLabel: "1,200+ lots",
  },
  {
    id: "tractors",
    label: "Tractors & Farm",
    subtitle: "Agri & harvest equipment",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    href: "/auctions/browse?category=tractors",
    countLabel: "180+ lots",
  },
  {
    id: "two-wheelers",
    label: "2 Wheelers",
    subtitle: "Bikes & scooters",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    href: "/buy/bikes/used",
    countLabel: "350+ lots",
  },
  {
    id: "buses",
    label: "Buses & Coaches",
    subtitle: "Staff & tourist coaches",
    image: "https://images.unsplash.com/photo-1570125909232-eb763c2a4d17?w=800&q=80",
    href: "/buy/buses/used",
    countLabel: "95+ lots",
  },
  {
    id: "construction",
    label: "Construction Equipment",
    subtitle: "JCB, cranes & mixers",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    href: "/buy/equipment/used",
    countLabel: "140+ lots",
  },
  {
    id: "gold",
    label: "Gold & Assets",
    subtitle: "Bank pledged assets",
    image: "https://images.unsplash.com/photo-1610375461246-83c859cb76fd?w=800&q=80",
    href: "/auctions/browse?category=gold",
    countLabel: "60+ lots",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    subtitle: "Plots & commercial space",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    href: "/auctions/browse?category=real-estate",
    countLabel: "45+ listings",
  },
];

export const AUCTION_HUB_STATES = [
  "All States",
  "Andhra Pradesh",
  "Delhi NCR",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
] as const;

export const AUCTION_CATEGORY_ICONS: Record<string, LucideIcon> = {
  car: Car,
  truck: Truck,
  tractor: Tractor,
  bike: Bike,
  bus: Bus,
  gold: Gem,
  building: Building2,
};

export interface AuctionEvent {
  id: string;
  slug: string;
  city: string;
  state: string;
  mode: "phygital" | "online" | "physical";
  venueName: string;
  yardImage: string;
  vehicleCount: number;
  catalogueUrl: string;
  startsAt: string;
  endsAt: string;
  status: "live" | "upcoming";
  categoryKeys: Array<keyof typeof AUCTION_CATEGORY_ICONS>;
  featuredAuctionSlug?: string;
}

export const MOCK_AUCTION_EVENTS: AuctionEvent[] = [
  {
    id: "ev-mumbai",
    slug: "mumbai-phygital-may",
    city: "Mumbai",
    state: "Maharashtra",
    mode: "phygital",
    venueName: "Motorcart Yard — Turbhe",
    yardImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
    vehicleCount: 186,
    catalogueUrl: "#catalogue-mumbai",
    startsAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    endsAt: new Date(Date.now() + 5 * 3600000).toISOString(),
    status: "live",
    categoryKeys: ["car", "truck", "bike"],
    featuredAuctionSlug: "2023-hyundai-creta-bank-repo-mumbai",
  },
  {
    id: "ev-delhi",
    slug: "delhi-online-week",
    city: "Delhi NCR",
    state: "Delhi NCR",
    mode: "online",
    venueName: "Digital auction hall",
    yardImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
    vehicleCount: 142,
    catalogueUrl: "#catalogue-delhi",
    startsAt: new Date(Date.now() - 1 * 3600000).toISOString(),
    endsAt: new Date(Date.now() + 6 * 3600000).toISOString(),
    status: "live",
    categoryKeys: ["car", "bike"],
    featuredAuctionSlug: "2020-kia-seltos-dealer-auction-delhi",
  },
  {
    id: "ev-bangalore",
    slug: "bangalore-govt-fleet",
    city: "Bengaluru",
    state: "Karnataka",
    mode: "phygital",
    venueName: "Motorcart Hub — Hosur Road",
    yardImage: "https://images.unsplash.com/photo-1590674899484-f7f894cda64e?w=600&q=80",
    vehicleCount: 98,
    catalogueUrl: "#catalogue-bangalore",
    startsAt: new Date(Date.now() + 20 * 3600000).toISOString(),
    endsAt: new Date(Date.now() + 44 * 3600000).toISOString(),
    status: "upcoming",
    categoryKeys: ["car", "bus"],
    featuredAuctionSlug: "2019-maruti-swift-government-bangalore",
  },
  {
    id: "ev-pune",
    slug: "pune-dealer-mega",
    city: "Pune",
    state: "Maharashtra",
    mode: "physical",
    venueName: "Chakan auction ground",
    yardImage: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&q=80",
    vehicleCount: 74,
    catalogueUrl: "#catalogue-pune",
    startsAt: new Date(Date.now() + 48 * 3600000).toISOString(),
    endsAt: new Date(Date.now() + 72 * 3600000).toISOString(),
    status: "upcoming",
    categoryKeys: ["car", "tractor"],
    featuredAuctionSlug: "2024-tata-nexon-ev-upcoming",
  },
  {
    id: "ev-chennai",
    slug: "chennai-bank-repo",
    city: "Chennai",
    state: "Tamil Nadu",
    mode: "phygital",
    venueName: "Ambattur industrial estate",
    yardImage: "https://images.unsplash.com/photo-1519003722824-194b4459a2c0?w=600&q=80",
    vehicleCount: 121,
    catalogueUrl: "#catalogue-chennai",
    startsAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    endsAt: new Date(Date.now() + 4 * 3600000).toISOString(),
    status: "live",
    categoryKeys: ["car", "truck", "bus"],
  },
  {
    id: "ev-hyderabad",
    slug: "hyderabad-cv-auction",
    city: "Hyderabad",
    state: "Telangana",
    mode: "online",
    venueName: "Cloud bidding room",
    yardImage: "https://images.unsplash.com/photo-1469854523086-cc02afe5c88?w=600&q=80",
    vehicleCount: 63,
    catalogueUrl: "#catalogue-hyderabad",
    startsAt: new Date(Date.now() + 12 * 3600000).toISOString(),
    endsAt: new Date(Date.now() + 36 * 3600000).toISOString(),
    status: "upcoming",
    categoryKeys: ["truck", "bus"],
  },
];
