import type { LucideIcon } from "lucide-react";
import {
  Bike,
  BusFront,
  Car,
  CarTaxiFront,
  Gavel,
  Landmark,
  MessageCircle,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import type { HeroDashboardCard } from "./hero-hub-config";

/** Phase 1 — India vehicle ecosystem: dealers, bankers, community, auctions */
export const PHASE1_TAGLINE =
  "Buy & sell new & used vehicles · bank-grade finance · live auctions · dealer community";

export const PHASE1_ROTATING_LINES = [
  "New & used cars for every city.",
  "Dealer inventory & lead CRM.",
  "Bank & NBFC loan partnerships.",
  "Live auctions — cars to commercial.",
  "India's auto social network.",
] as const;

export const PHASE1_USPS = [
  {
    id: "ecosystem",
    title: "Unified vehicle hubs",
    description: "Cars, bikes, trucks, buses, auto & EV — each with buy, sell, finance & service.",
  },
  {
    id: "community",
    title: "Auto social layer",
    description: "Facebook-style community for owners, dealers & reviewers — verified & moderated.",
  },
  {
    id: "auctions",
    title: "Transparent auctions",
    description: "Dealer stock, bank repo & fleet disposals with live bidding & AI fair value.",
  },
  {
    id: "finance",
    title: "Lender marketplace",
    description: "Banks, NBFCs & DSAs — pre-approval, fleet finance & commercial loans in one flow.",
  },
] as const;

export type Phase1EcosystemHub = {
  id: string;
  label: string;
  tagline: string;
  href: string;
  icon: LucideIcon;
  stat: string;
  highlight?: boolean;
};

export const PHASE1_ECOSYSTEM_HUBS: Phase1EcosystemHub[] = [
  {
    id: "cars",
    label: "Cars",
    tagline: "New & pre-owned",
    href: "/cars",
    icon: Car,
    stat: "2.1L+ listings",
    highlight: true,
  },
  {
    id: "bikes",
    label: "Bikes",
    tagline: "2W & scooters",
    href: "/bikes",
    icon: Bike,
    stat: "85K+ listings",
  },
  {
    id: "trucks",
    label: "Trucks",
    tagline: "LCV & HCV",
    href: "/trucks",
    icon: Truck,
    stat: "12K+ commercial",
  },
  {
    id: "buses",
    label: "Buses",
    tagline: "Fleet & coaches",
    href: "/buses",
    icon: BusFront,
    stat: "3K+ fleet",
  },
  {
    id: "auto",
    label: "Auto",
    tagline: "Passenger & cargo",
    href: "/auto",
    icon: CarTaxiFront,
    stat: "18K+ listings",
  },
  {
    id: "ev",
    label: "Electric",
    tagline: "Cars & 2W EV",
    href: "/ev",
    icon: Zap,
    stat: "28K+ EV",
    highlight: true,
  },
];

export const PHASE1_AUDIENCE = [
  {
    id: "dealers",
    label: "Car dealers",
    description: "New & used inventory, leads, storefront & CRM workspace.",
    href: "/signup",
    icon: Store,
    cta: "Dealer signup",
  },
  {
    id: "banks",
    label: "Banks & NBFCs",
    description: "Loan products, repo auctions & fleet finance partnerships.",
    href: "/finance",
    icon: Landmark,
    cta: "Partner with us",
  },
  {
    id: "buyers",
    label: "Buyers & owners",
    description: "Search, compare, finance & join the owner community.",
    href: "/buy",
    icon: Users,
    cta: "Browse vehicles",
  },
  {
    id: "community",
    label: "Creators & clubs",
    description: "Reviews, groups & viral auto content — grow your following.",
    href: "/community",
    icon: MessageCircle,
    cta: "Join community",
  },
] as const;

export const PHASE1_ECOSYSTEM_DASHBOARD: HeroDashboardCard[] = [
  {
    type: "listing",
    title: "Creta SX(O) 2024",
    price: 1485000,
    meta: "Certified · Mumbai",
    href: "/used-cars",
    image: "https://images.unsplash.com/photo-1617788138017-80837c34d4af?w=400&q=80",
    badge: "Pre-owned",
  },
  {
    type: "auction",
    title: "Honda City repo lot",
    price: 782000,
    meta: "04:22:18 left · 34 bids",
    href: "/auctions",
    badge: "LIVE",
    live: true,
  },
  {
    type: "loan",
    title: "Loan pre-approved",
    price: 1200000,
    meta: "HDFC · 8.9% · Bank partner",
    href: "/finance",
  },
  {
    type: "ai",
    title: "Community trending",
    subtitle: "128K members · 4.2K posts today",
    href: "/community",
  },
];

export const PHASE1_DASHBOARD_TAGS = [
  "18 car repo auctions today",
  "8.5K verified dealers",
  "128K+ community members",
];

export const PHASE1_SPOTLIGHT = {
  community: {
    eyebrow: "Phase 1 · Social",
    title: "Vehicle community — like Facebook, built for India",
    description:
      "Owners post reviews & purchases. Dealers run promotions. Verified badges, groups by city & segment, and AI moderation.",
    stats: ["128K+ members", "4.2K posts / day", "240+ cities"],
    href: "/community",
    cta: "Explore community",
    secondaryHref: "/signup",
    secondaryCta: "Create dealer account",
  },
  auction: {
    eyebrow: "Phase 1 · Auctions",
    title: "Live auctions for dealers & bankers",
    description:
      "Bid on dealer inventory, bank repossessions & fleet disposals. Transparent timers, fair-value AI, and instant finance hooks.",
    stats: ["142 live lots", "Repo & dealer stock", "Fleet weekly"],
    href: "/auctions",
    cta: "View live auctions",
    secondaryHref: "/finance",
    secondaryCta: "Fleet finance",
  },
} as const;
