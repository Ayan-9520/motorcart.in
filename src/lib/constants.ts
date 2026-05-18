export const SITE_NAME = "Motorcart.in";
export const SITE_TAGLINE = "India's AI-Powered Automobile Ecosystem";
export const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://motorcart.in";

export const BRAND = {
  green: "#25D366",
  teal: "#128C7E",
  navy: "#075E54",
  light: "#ECE5DD",
  bubble: "#DCF8C6",
  darkBg: "#0b141a",
  darkAccent: "#00a884",
} as const;

export const USER_ROLES = [
  "customer",
  "dealer",
  "used_car_dealer",
  "new_car_dealer",
  "bike_dealer",
  "truck_dealer",
  "dsa_agent",
  "bank_nbfc",
  "service_center",
  "parts_seller",
  "admin",
  "auction_partner",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const DASHBOARD_ROUTES: Partial<Record<UserRole, string>> = {
  customer: "/dashboard/customer",
  dealer: "/dashboard/dealer",
  used_car_dealer: "/dashboard/dealer",
  new_car_dealer: "/dashboard/dealer",
  bike_dealer: "/dashboard/dealer",
  truck_dealer: "/dashboard/dealer",
  dsa_agent: "/dashboard/dsa",
  bank_nbfc: "/dashboard/finance",
  service_center: "/dashboard/service",
  parts_seller: "/dashboard/parts",
  admin: "/dashboard/admin",
  auction_partner: "/dashboard/auction",
};

export const NAV_LINKS = [
  { label: "Buy", href: "/vehicles" },
  { label: "Sell", href: "/sell" },
  { label: "Auctions", href: "/auctions" },
  { label: "Finance", href: "/finance" },
  { label: "Parts", href: "/parts" },
  { label: "Services", href: "/services" },
  { label: "Dealers", href: "/dealers" },
] as const;

export const VEHICLE_CATEGORIES = [
  { id: "new-cars", label: "New Cars", icon: "Car", count: "45K+", href: "/vehicles?type=new-cars" },
  { id: "used-cars", label: "Used Cars", icon: "CarFront", count: "2.1L+", href: "/vehicles?type=used-cars" },
  { id: "bikes", label: "Bikes", icon: "Bike", count: "85K+", href: "/vehicles?type=bikes" },
  { id: "trucks", label: "Trucks", icon: "Truck", count: "12K+", href: "/vehicles?type=trucks" },
  { id: "buses", label: "Buses", icon: "Bus", count: "3K+", href: "/vehicles?type=buses" },
  { id: "ev", label: "EV", icon: "Zap", count: "28K+", href: "/vehicles?type=ev" },
] as const;

export const SEARCH_TABS = ["All", "Cars", "Bikes", "Auctions", "Parts", "Finance"] as const;
