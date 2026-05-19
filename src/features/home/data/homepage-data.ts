import type { LucideIcon } from "lucide-react";
import {
  Bike,
  Bot,
  BusFront,
  Calculator,
  Car,
  CarFront,
  FileText,
  Gavel,
  GitCompare,
  Headphones,
  Landmark,
  Package,
  Shield,
  Sparkles,
  Store,
  Truck,
  Wrench,
  Zap,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";

/** Vehicle types that show New + Pre-Owned inside the hero search card */
export type HeroVehicleType = "cars" | "bikes" | "trucks" | "buses" | "ev";

export type HeroCondition = "new" | "preowned";

export const HERO_CONDITION_OPTIONS = [
  {
    id: "new" as const,
    label: "New",
    description: "Showroom · on-road price · test drive",
    icon: Sparkles,
  },
  {
    id: "preowned" as const,
    label: "Pre-Owned",
    description: "Certified · inspected · warranty",
    icon: Shield,
  },
] as const;

export const HERO_CATEGORY_LINKS = [
  {
    id: "cars" as const,
    tab: "Cars",
    label: "Cars",
    icon: Car,
    vehicleType: "cars" as const,
    hubHref: "/new-cars",
  },
  {
    id: "bikes" as const,
    tab: "Bikes",
    label: "Bikes",
    icon: Bike,
    vehicleType: "bikes" as const,
    hubHref: "/vehicles/bikes",
  },
  {
    id: "trucks" as const,
    tab: "Trucks",
    label: "Trucks",
    icon: Truck,
    vehicleType: "trucks" as const,
    hubHref: "/vehicles/trucks",
  },
  {
    id: "buses" as const,
    tab: "Buses",
    label: "Buses",
    icon: BusFront,
    vehicleType: "buses" as const,
    hubHref: "/vehicles/buses",
  },
  {
    id: "ev" as const,
    tab: "EV",
    label: "EV",
    icon: Zap,
    vehicleType: "ev" as const,
    hubHref: "/vehicles/ev",
  },
  {
    id: "auctions" as const,
    tab: "Auctions",
    label: "Auctions",
    icon: Gavel,
    href: "/auctions",
  },
  {
    id: "loans" as const,
    tab: "Loans",
    label: "Loans",
    icon: Landmark,
    href: "/finance",
  },
  {
    id: "services" as const,
    tab: "Services",
    label: "Services",
    icon: Wrench,
    href: "/services",
  },
  {
    id: "parts" as const,
    tab: "Parts",
    label: "Parts",
    icon: Package,
    href: "/parts",
  },
] as const;

export type HeroCategoryId = (typeof HERO_CATEGORY_LINKS)[number]["id"];
export type HeroSearchTab = (typeof HERO_CATEGORY_LINKS)[number]["tab"];

export const HERO_VEHICLE_CATEGORIES = HERO_CATEGORY_LINKS.filter(
  (c): c is (typeof HERO_CATEGORY_LINKS)[number] & { vehicleType: HeroVehicleType } =>
    "vehicleType" in c
);

export function isHeroVehicleCategory(
  item: (typeof HERO_CATEGORY_LINKS)[number]
): item is (typeof HERO_CATEGORY_LINKS)[number] & { vehicleType: HeroVehicleType } {
  return "vehicleType" in item;
}

export function getHeroBrowsePath(
  vehicleType: HeroVehicleType,
  condition: HeroCondition,
  query: string
): string {
  const q = query ? `?q=${encodeURIComponent(query)}` : "";
  const qPrefix = query ? `&q=${encodeURIComponent(query)}` : "";

  if (vehicleType === "cars") {
    return condition === "new" ? `/new-cars/browse${q}` : `/used-cars/browse${q}`;
  }

  const base = `/vehicles/${vehicleType}`;
  return condition === "new" ? `${base}?condition=new${qPrefix}` : `${base}${q}`;
}

export function getHeroHubPath(
  vehicleType: HeroVehicleType,
  condition: HeroCondition
): string {
  if (vehicleType === "cars") {
    return condition === "new" ? "/new-cars" : "/used-cars";
  }
  return `/vehicles/${vehicleType}`;
}

export const HERO_STATS = [
  { label: "Vehicles", value: "2.4L+", href: "/vehicles" },
  { label: "Dealers", value: "8.5K+", href: "/dealers" },
  { label: "Loans", value: "₹1200Cr+", href: "/finance" },
  { label: "Live Auctions", value: "142", href: "/auctions" },
  { label: "Customers", value: "50K+", href: "/community" },
] as const;

export const TRUSTED_PARTNERS = ["SBI", "HDFC", "ICICI", "AXIS", "BOB", "AU Finance", "Chola"] as const;

export const POPULAR_BRANDS = [
  { name: "Hyundai", slug: "hyundai" },
  { name: "Maruti", slug: "maruti" },
  { name: "Tata", slug: "tata" },
  { name: "Mahindra", slug: "mahindra" },
  { name: "Honda", slug: "honda" },
  { name: "Toyota", slug: "toyota" },
  { name: "Kia", slug: "kia" },
  { name: "BMW", slug: "bmw" },
] as const;

export const SEARCH_BRANDS = ["All Brands", "Hyundai", "Maruti", "Tata", "Honda", "Mahindra", "Kia"];
export const SEARCH_BUDGETS = ["Any Budget", "Under ₹5L", "₹5L – ₹10L", "₹10L – ₹20L", "₹20L+"];
export const SEARCH_FUEL = ["All Fuel", "Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
export const SEARCH_CITIES = ["All India", "Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Pune"];

export const AI_SUGGESTIONS = [
  "Best SUV under ₹15L in Mumbai",
  "Low EMI hatchbacks with high resale",
  "Bank repo cars ending today",
];

export const TRENDING_SEARCHES = ["Creta 2023", "Nexon EV", "Swift VDI", "Fortuner 4x4", "Activa 6G"];
export const RECENT_SEARCHES = ["Hyundai Creta SX", "Tata Punch AMT", "Honda City"];

export interface QuickAccessItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export const QUICK_ACCESS: QuickAccessItem[] = [
  { label: "New Cars", href: "/new-cars", icon: Car, description: "45K+ models" },
  { label: "Used Cars", href: "/used-cars", icon: CarFront, description: "2.1L+ certified" },
  { label: "Sell Cars", href: "/sell", icon: Store, description: "List in 5 min" },
  { label: "Live Auctions", href: "/auctions", icon: Gavel, description: "142 live now" },
  { label: "Car Loans", href: "/finance", icon: Landmark, description: "14 lenders" },
  { label: "EMI Calculator", href: "/finance/compare", icon: Calculator },
  { label: "Compare Cars", href: "/vehicles/compare", icon: GitCompare },
  { label: "Service Booking", href: "/services", icon: Wrench },
  { label: "Spare Parts", href: "/parts", icon: Package },
  { label: "Dealer Registration", href: "/dashboard/dealer", icon: Store },
  { label: "AI Assistant", href: "/ai", icon: Bot },
  { label: "Insurance", href: "/insurance", icon: Shield },
  { label: "RC Transfer", href: "/services", icon: FileText },
];

export const BANK_OFFERS = [
  { code: "SBI", name: "State Bank of India", rate: "8.5%", emi: "₹18,420", approval: "24 hrs" },
  { code: "HDFC", name: "HDFC Bank", rate: "8.9%", emi: "₹18,650", approval: "4 hrs" },
  { code: "ICICI", name: "ICICI Bank", rate: "9.1%", emi: "₹18,780", approval: "6 hrs" },
  { code: "AXIS", name: "Axis Bank", rate: "9.2%", emi: "₹18,890", approval: "12 hrs" },
  { code: "BOB", name: "Bank of Baroda", rate: "8.7%", emi: "₹18,520", approval: "48 hrs" },
  { code: "AU", name: "AU Small Finance", rate: "10.2%", emi: "₹19,200", approval: "2 hrs" },
  { code: "CHOLA", name: "Cholamandalam", rate: "10.5%", emi: "₹19,450", approval: "8 hrs" },
];

export const SERVICE_TILES = [
  { label: "Car Service", href: "/services", icon: Wrench },
  { label: "PPF & Coating", href: "/services", icon: Shield },
  { label: "Insurance", href: "/insurance", icon: Shield },
  { label: "RC Transfer", href: "/services", icon: FileText },
  { label: "Detailing", href: "/services", icon: Sparkles },
  { label: "Car Wash", href: "/services", icon: Car },
];

export const AI_SHOWCASE = [
  { name: "AI LeadBot", desc: "Qualify & score leads 24/7", stat: "94% accuracy", live: true },
  { name: "AI FinanceBot", desc: "Loan eligibility & routing", stat: "3x faster", live: true },
  { name: "AI AuctionBot", desc: "Live bidding intelligence", stat: "142 auctions", live: true },
  { name: "AI DealerBot", desc: "Inventory & CRM automation", stat: "8.5K dealers", live: true },
  { name: "AI SupportBot", desc: "Instant customer support", stat: "< 30s response", live: true },
];

export const COMMUNITY_POSTS = [
  { title: "Best time to buy a used SUV in 2026?", author: "Rahul M.", replies: 48, tag: "Discussion" },
  { title: "HDFC vs ICICI — which offered you better rates?", author: "Priya K.", replies: 32, tag: "Finance" },
  { title: "Dealer CRM tips that doubled our conversions", author: "AutoMax", replies: 91, tag: "Dealers" },
];

export const MEGA_MENU = [
  {
    label: "Buy",
    href: "/vehicles",
    sections: [
      {
        title: "Vehicles",
        links: [
          { label: "Certified Used", href: "/used-cars" },
          { label: "New Cars", href: "/new-cars" },
          { label: "Bikes", href: "/vehicles?type=bikes" },
          { label: "Trucks & CV", href: "/vehicles?type=trucks" },
          { label: "Electric Vehicles", href: "/vehicles?type=ev" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Compare Vehicles", href: "/vehicles/compare" },
          { label: "EMI Calculator", href: "/finance/compare" },
          { label: "AI Recommendations", href: "/ai" },
        ],
      },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    sections: [
      {
        title: "For Owners",
        links: [
          { label: "Sell Your Car", href: "/sell" },
          { label: "Instant Valuation", href: "/sell" },
          { label: "RC Transfer Help", href: "/services" },
        ],
      },
      {
        title: "For Dealers",
        links: [
          { label: "Dealer Dashboard", href: "/dashboard/dealer" },
          { label: "Bulk Upload", href: "/dashboard/dealer/inventory" },
          { label: "CRM & Leads", href: "/dashboard/dealer/leads" },
        ],
      },
    ],
  },
  {
    label: "Finance",
    href: "/finance",
    sections: [
      {
        title: "Loans",
        links: [
          { label: "Car Loans", href: "/finance" },
          { label: "Compare Lenders", href: "/finance/compare" },
          { label: "Apply Now", href: "/finance/apply" },
        ],
      },
      {
        title: "Partners",
        links: BANK_OFFERS.slice(0, 4).map((b) => ({ label: b.name, href: "/finance" })),
      },
    ],
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Buy Vehicles", href: "/vehicles" },
      { label: "Sell Vehicle", href: "/sell" },
      { label: "Live Auctions", href: "/auctions" },
      { label: "Spare Parts", href: "/parts" },
    ],
  },
  {
    title: "Finance",
    links: [
      { label: "Car Loans", href: "/finance" },
      { label: "Compare Banks", href: "/finance/compare" },
      { label: "Insurance", href: "/insurance" },
      { label: "DSA Portal", href: "/dashboard/dsa" },
    ],
  },
  {
    title: "Auctions",
    links: [
      { label: "Live Auctions", href: "/auctions" },
      { label: "Bank Repo", href: "/auctions?type=repo" },
      { label: "Upcoming", href: "/auctions" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Book Service", href: "/services" },
      { label: "PPF & Detailing", href: "/services" },
      { label: "RC Transfer", href: "/services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Community", href: "/community", icon: MessageCircle },
  { label: "Support", href: "/contact", icon: Headphones },
] as const;

export const HERO_HEADLINE_WORDS = ["Buy.", "Sell.", "Finance.", "Auction.", "Grow."];
