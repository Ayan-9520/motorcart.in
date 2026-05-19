import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bike,
  Car,
  Headphones,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import type { DealerVertical, PublicDealer } from "../types";

export interface DealerHubService {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface DealerCategory {
  slug: DealerVertical;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  count: string;
}

export const DEALERS_TRUST_STATS = [
  { label: "8,500+", sub: "Verified dealers" },
  { label: "1.2M+", sub: "Listings live" },
  { label: "4.7★", sub: "Avg rating" },
  { label: "48 cities", sub: "Pan-India" },
] as const;

export const DEALER_HUB_SERVICES: DealerHubService[] = [
  { id: "crm", label: "Dealer CRM", description: "Leads & pipeline", icon: Users, href: "/dashboard/dealer" },
  { id: "ai", label: "DealerBot AI", description: "Pricing & KYC", icon: Sparkles, href: "/ai" },
  { id: "whatsapp", label: "WhatsApp leads", description: "Auto follow-up", icon: MessageCircle, href: "/dashboard/dealer/whatsapp" },
  { id: "inventory", label: "Bulk upload", description: "Excel & API", icon: Store, href: "/dashboard/dealer/inventory" },
  { id: "analytics", label: "Analytics", description: "ROI dashboards", icon: BarChart3, href: "/dashboard/dealer/analytics" },
  { id: "verified", label: "KYC verified", description: "Trust badge", icon: ShieldCheck, href: "/dealers/browse?verified=1" },
  { id: "support", label: "24/7 support", description: "Partner desk", icon: Headphones, href: "/contact" },
  { id: "leads", label: "Buyer leads", description: "Qualified intent", icon: Zap, href: "/dashboard/dealer/leads" },
];

export const DEALER_CATEGORIES: DealerCategory[] = [
  {
    slug: "used-cars",
    label: "Used cars",
    description: "Certified pre-owned",
    icon: Car,
    href: "/dealers/browse?vertical=used-cars",
    count: "4.2K+",
  },
  {
    slug: "new-cars",
    label: "New cars",
    description: "OEM & authorized",
    icon: Store,
    href: "/dealers/browse?vertical=new-cars",
    count: "2.1K+",
  },
  {
    slug: "bikes",
    label: "Bikes & scooters",
    description: "2-wheeler dealers",
    icon: Bike,
    href: "/dealers/browse?vertical=bikes",
    count: "1.4K+",
  },
  {
    slug: "commercial",
    label: "Trucks & buses",
    description: "Fleet & CV",
    icon: Truck,
    href: "/dealers/browse?vertical=commercial",
    count: "620+",
  },
  {
    slug: "ev",
    label: "EV specialists",
    description: "Electric first",
    icon: Zap,
    href: "/dealers/browse?vertical=ev",
    count: "380+",
  },
  {
    slug: "multi-brand",
    label: "Multi-brand",
    description: "All under one roof",
    icon: Users,
    href: "/dealers/browse?vertical=multi-brand",
    count: "890+",
  },
];

export const DEALER_CITY_OPTIONS = [
  "All cities",
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Ahmedabad",
  "Kolkata",
] as const;

export const MOCK_PUBLIC_DEALERS: PublicDealer[] = [
  {
    id: "d1",
    name: "AutoMax Motors",
    slug: "automax-mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    rating: 4.8,
    reviewCount: 1240,
    isVerified: true,
    vertical: "used-cars",
    specialties: ["SUV", "Luxury", "Finance ready"],
    brands: ["Hyundai", "Mahindra", "Toyota"],
    listingCount: 186,
    logoUrl: "/partners/cars/hyundai.svg",
    coverUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    phone: "919876543210",
    sinceYear: 2016,
    responseMins: 12,
  },
  {
    id: "d2",
    name: "GreenDrive EV",
    slug: "greendrive-bangalore",
    city: "Bangalore",
    state: "Karnataka",
    rating: 4.9,
    reviewCount: 892,
    isVerified: true,
    vertical: "ev",
    specialties: ["EV only", "Home charger", "Subsidy help"],
    brands: ["Tata", "MG", "Hyundai"],
    listingCount: 94,
    logoUrl: "/partners/cars/tata.svg",
    coverUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    phone: "919988776655",
    sinceYear: 2021,
    responseMins: 8,
  },
  {
    id: "d3",
    name: "Maruti Arena Delhi",
    slug: "maruti-arena-delhi",
    city: "Delhi NCR",
    state: "Delhi",
    rating: 4.6,
    reviewCount: 2104,
    isVerified: true,
    vertical: "new-cars",
    specialties: ["OEM", "On-road price", "Exchange"],
    brands: ["Maruti Suzuki"],
    listingCount: 42,
    logoUrl: "/partners/cars/maruti.svg",
    coverUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    phone: "919811223344",
    sinceYear: 2012,
    responseMins: 15,
  },
  {
    id: "d4",
    name: "BikeHub",
    slug: "bikehub-delhi",
    city: "Delhi NCR",
    state: "Delhi",
    rating: 4.7,
    reviewCount: 567,
    isVerified: true,
    vertical: "bikes",
    specialties: ["Sport", "Commuter", "EMI"],
    brands: ["Honda", "Bajaj", "TVS"],
    listingCount: 128,
    logoUrl: "/partners/cars/honda.svg",
    coverUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    phone: "919900112233",
    sinceYear: 2018,
    responseMins: 10,
  },
  {
    id: "d5",
    name: "Commercial Motors Pune",
    slug: "commercial-motors-pune",
    city: "Pune",
    state: "Maharashtra",
    rating: 4.5,
    reviewCount: 312,
    isVerified: true,
    vertical: "commercial",
    specialties: ["Trucks", "Fleet lease", "RTO"],
    brands: ["Tata", "Ashok Leyland", "Mahindra"],
    listingCount: 76,
    logoUrl: "/partners/cars/tata.svg",
    coverUrl: "https://images.unsplash.com/photo-1601584111127-372f33222c2b?w=800&q=80",
    phone: "919922334455",
    sinceYear: 2014,
    responseMins: 20,
  },
  {
    id: "d6",
    name: "Toyota Plus Ahmedabad",
    slug: "toyota-plus-ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    rating: 4.9,
    reviewCount: 978,
    isVerified: true,
    vertical: "new-cars",
    specialties: ["Premium", "Test drive", "Insurance"],
    brands: ["Toyota", "Lexus"],
    listingCount: 38,
    logoUrl: "/partners/cars/toyota.svg",
    coverUrl: "https://images.unsplash.com/photo-1621007947412-a984a4f1bb9e?w=800&q=80",
    phone: "919966778899",
    sinceYear: 2010,
    responseMins: 11,
  },
  {
    id: "d7",
    name: "Southern Wheels",
    slug: "southern-wheels-chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    rating: 4.7,
    reviewCount: 445,
    isVerified: true,
    vertical: "multi-brand",
    specialties: ["All segments", "RC transfer", "Warranty"],
    brands: ["Hyundai", "Kia", "Honda"],
    listingCount: 210,
    logoUrl: "/partners/cars/kia.svg",
    coverUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    phone: "919944556677",
    sinceYear: 2015,
    responseMins: 14,
  },
  {
    id: "d8",
    name: "Kia Motors Kolkata",
    slug: "kia-kolkata",
    city: "Kolkata",
    state: "West Bengal",
    rating: 4.8,
    reviewCount: 623,
    isVerified: true,
    vertical: "new-cars",
    specialties: ["OEM offers", "Corporate fleet"],
    brands: ["Kia"],
    listingCount: 29,
    logoUrl: "/partners/cars/kia.svg",
    coverUrl: "https://images.unsplash.com/photo-1619767886555-ef069fb19a73?w=800&q=80",
    phone: "919955667788",
    sinceYear: 2019,
    responseMins: 9,
  },
  {
    id: "d9",
    name: "Fleet Masters Hyderabad",
    slug: "fleet-masters-hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    rating: 4.4,
    reviewCount: 198,
    isVerified: false,
    vertical: "commercial",
    specialties: ["Fleet", "Lease", "Bulk"],
    brands: ["Mahindra", "Tata"],
    listingCount: 55,
    logoUrl: "/partners/cars/mahindra.svg",
    coverUrl: "https://images.unsplash.com/photo-1519003722824-194d445ae2fe?w=800&q=80",
    phone: "919933445566",
    sinceYear: 2017,
    responseMins: 25,
  },
];

export const DEALER_HUB_BRANDS = [
  { name: "Maruti", logo: "/partners/cars/maruti.svg" },
  { name: "Hyundai", logo: "/partners/cars/hyundai.svg" },
  { name: "Tata", logo: "/partners/cars/tata.svg" },
  { name: "Mahindra", logo: "/partners/cars/mahindra.svg" },
  { name: "Honda", logo: "/partners/cars/honda.svg" },
  { name: "Toyota", logo: "/partners/cars/toyota.svg" },
  { name: "Kia", logo: "/partners/cars/kia.svg" },
  { name: "BMW", logo: "/partners/cars/bmw.svg" },
] as const;

export const HOW_DEALER_WORKS = [
  { step: 1, title: "Apply & KYC", desc: "Upload documents — verified in 24–48 hrs" },
  { step: 2, title: "List inventory", desc: "Bulk Excel, API or CRM sync" },
  { step: 3, title: "Get AI leads", desc: "Scored buyers on WhatsApp & dashboard" },
] as const;

export function dealersBrowsePath(params?: {
  q?: string;
  city?: string;
  vertical?: DealerVertical;
  verified?: boolean;
}): string {
  const s = new URLSearchParams();
  if (params?.q) s.set("q", params.q);
  if (params?.city && params.city !== "All cities") s.set("city", params.city);
  if (params?.vertical) s.set("vertical", params.vertical);
  if (params?.verified) s.set("verified", "1");
  const qs = s.toString();
  return qs ? `/dealers/browse?${qs}` : "/dealers/browse";
}

export function dealerProfilePath(slug: string): string {
  return `/dealers/${slug}`;
}
