import type { LucideIcon } from "lucide-react";
import {
  Bike,
  Bot,
  BusFront,
  Calculator,
  Car,
  CarTaxiFront,
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

/** Legacy vehicle slug — used by other home sections */
export type HeroVehicleType = "cars" | "bikes" | "trucks" | "buses" | "ev";

/** Hero search tray modes */
export type HeroSearchMode =
  | "cars"
  | "bikes"
  | "trucks"
  | "auto"
  | "buses"
  | "auctions"
  | "finance";

const BUY_HUB_HASH: Record<"cars" | "bikes" | "trucks" | "auto" | "buses", string> = {
  cars: "/buy#category-cars",
  bikes: "/buy#category-bikes",
  trucks: "/buy#category-trucks",
  auto: "/buy#category-auto",
  buses: "/buy#category-buses",
};

export function heroBuyHubHref(mode: HeroSearchMode): string {
  if (mode === "auctions") return "/auctions";
  if (mode === "finance") return "/finance";
  return BUY_HUB_HASH[mode];
}

export const HERO_SEARCH_TABS = [
  { id: "cars" as const, label: "Cars", icon: Car, hubHref: BUY_HUB_HASH.cars },
  { id: "bikes" as const, label: "Bikes", icon: Bike, hubHref: BUY_HUB_HASH.bikes },
  { id: "trucks" as const, label: "Trucks", icon: Truck, hubHref: BUY_HUB_HASH.trucks },
  { id: "auto" as const, label: "Auto", icon: CarTaxiFront, hubHref: BUY_HUB_HASH.auto },
  { id: "buses" as const, label: "Bus", icon: BusFront, hubHref: BUY_HUB_HASH.buses },
  { id: "auctions" as const, label: "Auctions", icon: Gavel, hubHref: "/auctions" },
  { id: "finance" as const, label: "Finance", icon: Landmark, hubHref: "/finance" },
] as const;

export const HERO_VEHICLE_CATEGORY_LINKS = [
  { id: "cars" as const, tab: "Cars", label: "Cars", icon: Car, vehicleType: "cars" as const, hubHref: "/buy" },
  { id: "bikes" as const, tab: "Bikes", label: "Bikes", icon: Bike, vehicleType: "bikes" as const, hubHref: "/buy/bikes/used" },
  { id: "trucks" as const, tab: "Trucks", label: "Trucks", icon: Truck, vehicleType: "trucks" as const, hubHref: "/buy/trucks/used" },
  { id: "buses" as const, tab: "Buses", label: "Buses", icon: BusFront, vehicleType: "buses" as const, hubHref: "/buy/buses/used" },
  { id: "ev" as const, tab: "EV", label: "EV", icon: Zap, vehicleType: "ev" as const, hubHref: "/buy/ev/new" },
] as const;

export type HeroVehicleCategoryId = (typeof HERO_VEHICLE_CATEGORY_LINKS)[number]["id"];
export const HERO_CATEGORY_LINKS = HERO_VEHICLE_CATEGORY_LINKS;
export type HeroCategoryId = HeroVehicleCategoryId;
export type HeroSearchTab = (typeof HERO_VEHICLE_CATEGORY_LINKS)[number]["tab"];
export const HERO_VEHICLE_CATEGORIES = HERO_VEHICLE_CATEGORY_LINKS;

export function isHeroVehicleCategory(
  item: (typeof HERO_VEHICLE_CATEGORY_LINKS)[number]
): item is (typeof HERO_VEHICLE_CATEGORY_LINKS)[number] & { vehicleType: HeroVehicleType } {
  return true;
}

export interface HeroSearchFilters {
  q?: string;
  brand?: string;
  budget?: string;
  fuel?: string;
  city?: string;
}

const BUDGET_PRESETS: Record<string, { priceMin?: number; priceMax?: number }> = {
  "Under ₹5L": { priceMax: 500_000 },
  "₹5L – ₹10L": { priceMin: 500_000, priceMax: 1_000_000 },
  "₹10L – ₹20L": { priceMin: 1_000_000, priceMax: 2_000_000 },
  "₹20L+": { priceMin: 2_000_000 },
};

export function parseHeroBudget(budget: string): { priceMin?: number; priceMax?: number } {
  const raw = budget.trim();
  if (!raw || /^any\s*budget$/i.test(raw)) return {};

  if (BUDGET_PRESETS[raw]) return BUDGET_PRESETS[raw];

  const lakh = raw.match(/(\d+(?:\.\d+)?)\s*(?:l|lakh|lac)\b/i);
  if (lakh) {
    const amount = Math.round(parseFloat(lakh[1]!) * 100_000);
    if (/under|below|upto|max|<\s*/i.test(raw)) return { priceMax: amount };
    if (/above|over|min|>\s*/i.test(raw)) return { priceMin: amount };
    return { priceMin: Math.round(amount * 0.85), priceMax: Math.round(amount * 1.15) };
  }

  const digits = raw.replace(/[^\d]/g, "");
  if (digits.length >= 5) {
    const amount = Number(digits);
    if (/under|below|upto|max/i.test(raw)) return { priceMax: amount };
    if (/above|over|min/i.test(raw)) return { priceMin: amount };
    return { priceMax: amount };
  }

  return {};
}

function appendVehicleFilters(params: URLSearchParams, filters: HeroSearchFilters, query: string) {
  const text = (query || filters.q || "").trim();
  if (text) params.set("q", text);

  const brand = filters.brand?.trim();
  if (brand && !/^all\s*brands?$/i.test(brand)) params.set("brand", brand);

  const fuel = filters.fuel?.trim();
  if (fuel && !/^all\s*fuel$/i.test(fuel)) params.set("fuel", fuel);

  const city = filters.city?.trim();
  if (city && !/^all\s*india$/i.test(city)) params.set("city", city);

  const { priceMin, priceMax } = parseHeroBudget(filters.budget ?? "");
  if (priceMin != null) params.set("priceMin", String(priceMin));
  if (priceMax != null) params.set("priceMax", String(priceMax));

  const budget = filters.budget?.trim();
  if (budget && !parseHeroBudget(budget).priceMin && !parseHeroBudget(budget).priceMax && !/^any\s*budget$/i.test(budget)) {
    params.set("budget", budget);
  }
}

/** Buy hub / category links — not used-only listing pages */
export function buildHeroBuyPath(
  mode: HeroSearchMode,
  query: string,
  filters: HeroSearchFilters = {}
): string {
  if (mode === "auctions") {
    return buildHeroSearchPath("auctions", query, filters);
  }
  if (mode === "finance") {
    return buildHeroSearchPath("finance", query, filters);
  }

  const params = new URLSearchParams();
  appendVehicleFilters(params, filters, query);
  const qs = params.toString();
  const hash = `category-${mode}`;
  return qs ? `/buy?${qs}#${hash}` : `/buy#${hash}`;
}

export function buildHeroSearchPath(
  mode: HeroSearchMode,
  query: string,
  filters: HeroSearchFilters = {}
): string {
  const params = new URLSearchParams();

  if (
    mode === "cars" ||
    mode === "bikes" ||
    mode === "trucks" ||
    mode === "auto" ||
    mode === "buses"
  ) {
    params.set("hub", mode);
    appendVehicleFilters(params, filters, query);
    const qs = params.toString();
    return `/search?${qs}`;
  }

  if (mode === "auctions") {
    appendVehicleFilters(params, filters, query);
    const city = filters.city?.trim();
    if (city && !/^all\s*india$/i.test(city)) params.set("state", city);
    const qs = params.toString();
    return qs ? `/auctions?${qs}` : "/auctions";
  }

  appendVehicleFilters(params, filters, query);
  const { priceMax } = parseHeroBudget(filters.budget ?? "");
  if (priceMax) params.set("amount", String(priceMax));
  const qs = params.toString();
  return qs ? `/finance/compare?${qs}` : "/finance";
}

/** @deprecated Use buildHeroSearchPath */
export function getHeroBrowsePath(
  vehicleType: HeroVehicleType,
  _condition: "new" | "preowned",
  query: string,
  filters: HeroSearchFilters = {}
): string {
  const modeMap: Partial<Record<HeroVehicleType, HeroSearchMode>> = {
    cars: "cars",
    bikes: "bikes",
    trucks: "trucks",
    buses: "buses",
  };
  return buildHeroSearchPath(modeMap[vehicleType] ?? "cars", query, filters);
}

export const HERO_STATS = [
  { label: "Vehicles", value: "2.4L+", href: "/vehicles" },
  { label: "Dealers", value: "8.5K+", href: "/dealers" },
  { label: "Loans", value: "₹1200Cr+", href: "/finance" },
  { label: "Live Auctions", value: "142", href: "/auctions" },
  { label: "Customers", value: "50K+", href: "/community" },
] as const;

export const HOME_TRUST_PILLS = [
  { id: "buyers", label: "50K+ buyers", icon: "users" as const },
  { id: "lenders", label: "RBI lenders", icon: "landmark" as const },
  { id: "dealers", label: "Verified dealers", icon: "shield" as const },
  { id: "inventory", label: "Certified inventory", icon: "check" as const },
  { id: "secure", label: "Secure transactions", icon: "lock" as const },
  { id: "ai", label: "AI marketplace", icon: "sparkles" as const },
] as const;

export const HOME_AI_RECOMMENDATIONS = [
  {
    id: "suv",
    title: "Best SUVs under ₹20L",
    subtitle: "Family-ready picks with strong resale & mileage",
    href: "/vehicles?type=suv&budget=under-20l",
    badge: "AI Pick",
  },
  {
    id: "hatch",
    title: "Low EMI hatchbacks",
    subtitle: "EMI from ₹9,999/mo · instant eligibility",
    href: "/vehicles?body=hatchback&sort=emi",
    badge: "Low EMI",
  },
  {
    id: "ev",
    title: "EV recommendations",
    subtitle: "Subsidy-ready electric with charging partners",
    href: "/buy/ev/new",
    badge: "EV",
  },
  {
    id: "repo",
    title: "Repo auctions ending today",
    subtitle: "Bank inventory · live bids · fair AI reserve",
    href: "/auctions?filter=repo",
    badge: "Ending soon",
  },
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

export interface PartnerLogoItem {
  id: string;
  name: string;
  /** Local path under /public — always preferred */
  logo: string;
  href: string;
}

/** Banks & NBFCs — row 1 marquee (left → right) */
export const PARTNER_BANK_LOGOS: PartnerLogoItem[] = [
  { id: "sbi", name: "SBI", logo: "/partners/banks/sbi.svg", href: "/finance" },
  { id: "hdfc", name: "HDFC Bank", logo: "/partners/banks/hdfcbank.svg", href: "/finance" },
  { id: "icici", name: "ICICI Bank", logo: "/partners/banks/icicibank.svg", href: "/finance" },
  { id: "axis", name: "Axis Bank", logo: "/partners/banks/axisbank.svg", href: "/finance" },
  { id: "kotak", name: "Kotak Mahindra", logo: "/partners/banks/kotak.svg", href: "/finance" },
  { id: "bob", name: "Bank of Baroda", logo: "/partners/banks/bob.svg", href: "/finance" },
  { id: "pnb", name: "PNB", logo: "/partners/banks/pnb.svg", href: "/finance" },
  { id: "bajaj", name: "Bajaj Finance", logo: "/partners/banks/bajaj.svg", href: "/finance" },
  { id: "idfc", name: "IDFC First", logo: "/partners/banks/idfc.svg", href: "/finance" },
  { id: "yes", name: "YES Bank", logo: "/partners/banks/yes.svg", href: "/finance" },
  { id: "indusind", name: "IndusInd Bank", logo: "/partners/banks/indusind.svg", href: "/finance" },
  { id: "union", name: "Union Bank", logo: "/partners/banks/union.svg", href: "/finance" },
  { id: "canara", name: "Canara Bank", logo: "/partners/banks/canara.svg", href: "/finance" },
  { id: "federal", name: "Federal Bank", logo: "/partners/banks/federal.svg", href: "/finance" },
  { id: "boi", name: "Bank of India", logo: "/partners/banks/boi.svg", href: "/finance" },
  { id: "iob", name: "IOB", logo: "/partners/banks/iob.svg", href: "/finance" },
  { id: "uco", name: "UCO Bank", logo: "/partners/banks/uco.svg", href: "/finance" },
  { id: "au", name: "AU Bank", logo: "/partners/banks/au.svg", href: "/finance" },
  { id: "tata-capital", name: "Tata Capital", logo: "/partners/banks/tata-capital.svg", href: "/finance" },
  { id: "chola", name: "Chola Finance", logo: "/partners/banks/chola.svg", href: "/finance" },
  { id: "lic", name: "LIC", logo: "/partners/banks/lic.svg", href: "/finance" },
];

/** OEM brands — row 2 marquee (right → left) */
export const PARTNER_CAR_LOGOS: PartnerLogoItem[] = [
  { id: "hyundai", name: "Hyundai", logo: "/partners/cars/hyundai.svg", href: "/vehicles?brand=hyundai" },
  { id: "maruti", name: "Maruti Suzuki", logo: "/partners/cars/maruti.svg", href: "/vehicles?brand=maruti" },
  { id: "tata", name: "Tata Motors", logo: "/partners/cars/tata.svg", href: "/vehicles?brand=tata" },
  { id: "mahindra", name: "Mahindra", logo: "/partners/cars/mahindra.svg", href: "/vehicles?brand=mahindra" },
  { id: "honda", name: "Honda", logo: "/partners/cars/honda.svg", href: "/vehicles?brand=honda" },
  { id: "toyota", name: "Toyota", logo: "/partners/cars/toyota.svg", href: "/vehicles?brand=toyota" },
  { id: "kia", name: "Kia", logo: "/partners/cars/kia.svg", href: "/vehicles?brand=kia" },
  { id: "bmw", name: "BMW", logo: "/partners/cars/bmw.svg", href: "/vehicles?brand=bmw" },
  { id: "mercedes", name: "Mercedes-Benz", logo: "/partners/cars/mercedes.svg", href: "/vehicles?brand=mercedes" },
  { id: "skoda", name: "Škoda", logo: "/partners/cars/skoda.svg", href: "/vehicles?brand=skoda" },
  { id: "nissan", name: "Nissan", logo: "/partners/cars/nissan.svg", href: "/vehicles?brand=nissan" },
  { id: "ford", name: "Ford", logo: "/partners/cars/ford.svg", href: "/vehicles?brand=ford" },
  { id: "volkswagen", name: "Volkswagen", logo: "/partners/cars/volkswagen.svg", href: "/vehicles?brand=volkswagen" },
  { id: "mg", name: "MG", logo: "/partners/cars/mg.svg", href: "/vehicles?brand=mg" },
  { id: "jeep", name: "Jeep", logo: "/partners/cars/jeep.svg", href: "/vehicles?brand=jeep" },
  { id: "renault", name: "Renault", logo: "/partners/cars/renault.svg", href: "/vehicles?brand=renault" },
  { id: "audi", name: "Audi", logo: "/partners/cars/audi.svg", href: "/vehicles?brand=audi" },
  { id: "citroen", name: "Citroën", logo: "/partners/cars/citroen.svg", href: "/vehicles?brand=citroen" },
  { id: "jaguar", name: "Jaguar", logo: "/partners/cars/jaguar.svg", href: "/vehicles?brand=jaguar" },
  { id: "landrover", name: "Land Rover", logo: "/partners/cars/landrover.svg", href: "/vehicles?brand=landrover" },
  { id: "porsche", name: "Porsche", logo: "/partners/cars/porsche.svg", href: "/vehicles?brand=porsche" },
  { id: "lexus", name: "Lexus", logo: "/partners/cars/lexus.svg", href: "/vehicles?brand=lexus" },
  { id: "isuzu", name: "Isuzu", logo: "/partners/cars/isuzu.svg", href: "/vehicles?brand=isuzu" },
  { id: "volvo", name: "Volvo", logo: "/partners/cars/volvo.svg", href: "/vehicles?brand=volvo" },
];

export const SEARCH_BRAND_SUGGESTIONS = [
  "Hyundai",
  "Maruti",
  "Tata",
  "Honda",
  "Mahindra",
  "Toyota",
  "Kia",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Renault",
  "MG",
  "Skoda",
  "Nissan",
  "Ford",
  "Audi",
  "Hero",
  "Bajaj",
  "TVS",
  "Royal Enfield",
  "Yamaha",
  "Suzuki",
  "Ashok Leyland",
  "Eicher",
  "Tata Motors",
];
export const SEARCH_BUDGET_SUGGESTIONS = ["Under ₹5L", "₹5L – ₹10L", "₹10L – ₹20L", "₹20L+", "15 lakh", "8 lakh SUV"];
export const SEARCH_FUEL_SUGGESTIONS = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
export const SEARCH_CITY_SUGGESTIONS = ["Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];

/** @deprecated Use SEARCH_BRAND_SUGGESTIONS */
export const SEARCH_BRANDS = ["All Brands", ...SEARCH_BRAND_SUGGESTIONS.slice(0, 8)];
export const SEARCH_BUDGETS = ["Any Budget", ...SEARCH_BUDGET_SUGGESTIONS];
export const SEARCH_FUEL = ["All Fuel", ...SEARCH_FUEL_SUGGESTIONS];
export const SEARCH_CITIES = ["All India", ...SEARCH_CITY_SUGGESTIONS];

export interface HeroInsightPick {
  id: string;
  title: string;
  subtitle: string;
  query: string;
  mode: HeroSearchMode;
  badge?: string;
}

export const HERO_AI_PICKS: HeroInsightPick[] = [
  {
    id: "suv-mumbai",
    title: "Best SUV under ₹15L",
    subtitle: "AI matched · Mumbai & NCR",
    query: "SUV under 15L Mumbai",
    mode: "cars",
    badge: "Hot",
  },
  {
    id: "emi-hatch",
    title: "Low EMI hatchbacks",
    subtitle: "High resale · verified dealers",
    query: "hatchback low EMI",
    mode: "cars",
    badge: "EMI",
  },
  {
    id: "repo-auction",
    title: "Bank repo ending today",
    subtitle: "Live auctions · up to 30% off",
    query: "bank repo",
    mode: "auctions",
    badge: "Live",
  },
];

export const HERO_TRENDING_PICKS: HeroInsightPick[] = [
  { id: "creta", title: "Creta 2023", subtitle: "12K+ listed", query: "Creta 2023", mode: "cars" },
  { id: "nexon-ev", title: "Nexon EV", subtitle: "Electric SUVs", query: "Nexon EV", mode: "cars" },
  { id: "swift", title: "Swift VDI", subtitle: "Best value", query: "Swift VDI", mode: "cars" },
  { id: "fortuner", title: "Fortuner 4x4", subtitle: "Premium diesel", query: "Fortuner 4x4", mode: "cars" },
  { id: "activa", title: "Activa 6G", subtitle: "Top scooter", query: "Activa 6G", mode: "bikes" },
];

/** @deprecated Use HERO_AI_PICKS */
export const AI_SUGGESTIONS = HERO_AI_PICKS.map((p) => p.query);

/** @deprecated Use HERO_TRENDING_PICKS */
export const TRENDING_SEARCHES = HERO_TRENDING_PICKS.map((p) => p.title);
export const RECENT_SEARCHES = ["Hyundai Creta SX", "Tata Punch AMT", "Honda City"];

export interface QuickAccessItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export const QUICK_ACCESS: QuickAccessItem[] = [
  { label: "New Cars", href: "/new-cars", icon: Car, description: "45K+ models" },
  { label: "Pre-Owned Cars", href: "/used-cars", icon: CarFront, description: "2.1L+ certified" },
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
  { code: "SBI", name: "State Bank of India", rate: "8.5%", emi: "₹18,420", approval: "24 hrs", logo: "/partners/banks/sbi.svg" },
  { code: "HDFC", name: "HDFC Bank", rate: "8.9%", emi: "₹18,650", approval: "4 hrs", logo: "/partners/banks/hdfcbank.svg" },
  { code: "ICICI", name: "ICICI Bank", rate: "9.1%", emi: "₹18,780", approval: "6 hrs", logo: "/partners/banks/icicibank.svg" },
  { code: "AXIS", name: "Axis Bank", rate: "9.2%", emi: "₹18,890", approval: "12 hrs", logo: "/partners/banks/axisbank.svg" },
  { code: "AU", name: "AU Small Finance Bank", rate: "9.5%", emi: "₹19,020", approval: "8 hrs", logo: "/partners/banks/au.svg" },
  { code: "CHOLA", name: "Cholamandalam Finance", rate: "10.2%", emi: "₹19,280", approval: "6 hrs", logo: "/partners/banks/chola.svg" },
  { code: "BOB", name: "Bank of Baroda", rate: "8.7%", emi: "₹18,520", approval: "48 hrs", logo: "/partners/banks/bob.svg" },
  { code: "KOTAK", name: "Kotak Mahindra", rate: "9.0%", emi: "₹18,720", approval: "6 hrs", logo: "/partners/banks/kotak.svg" },
  { code: "PNB", name: "Punjab National Bank", rate: "8.8%", emi: "₹18,580", approval: "36 hrs", logo: "/partners/banks/pnb.svg" },
  { code: "BAJAJ", name: "Bajaj Finance", rate: "10.5%", emi: "₹19,450", approval: "8 hrs", logo: "/partners/banks/bajaj.svg" },
  { code: "IDFC", name: "IDFC First Bank", rate: "9.3%", emi: "₹18,920", approval: "12 hrs", logo: "/partners/banks/idfc.svg" },
  { code: "YES", name: "YES Bank", rate: "9.4%", emi: "₹18,980", approval: "10 hrs", logo: "/partners/banks/yes.svg" },
  { code: "INDUS", name: "IndusInd Bank", rate: "9.2%", emi: "₹18,860", approval: "8 hrs", logo: "/partners/banks/indusind.svg" },
  { code: "UNION", name: "Union Bank", rate: "8.6%", emi: "₹18,480", approval: "48 hrs", logo: "/partners/banks/union.svg" },
  { code: "CANARA", name: "Canara Bank", rate: "8.65%", emi: "₹18,510", approval: "36 hrs", logo: "/partners/banks/canara.svg" },
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
  { title: "Best time to buy a pre-owned SUV in 2026?", author: "Rahul M.", replies: 48, tag: "Discussion" },
  { title: "HDFC vs ICICI — which offered you better rates?", author: "Priya K.", replies: 32, tag: "Finance" },
  { title: "Dealer CRM tips that doubled our conversions", author: "AutoMax", replies: 91, tag: "Dealers" },
];

/** @deprecated Navbar uses direct /buy, /sell, /finance links — mega menu removed */
export const MEGA_MENU = [] as const;

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
