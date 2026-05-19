import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  Car,
  CreditCard,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Truck,
  Wrench,
  Zap,
  FileText,
  Star,
} from "lucide-react";
import { SERVICE_CATEGORIES, type ServiceCategorySlug } from "../types";

export interface ServicesHubFeature {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const SERVICES_HUB_FEATURES: ServicesHubFeature[] = [
  { id: "slots", label: "Live slots", description: "Real-time bay calendar", icon: CalendarClock, href: "/services/browse" },
  { id: "pickup", label: "Pickup & drop", description: "Doorstep handover", icon: Truck, href: "/services/browse?pickup=1" },
  { id: "otp", label: "OTP at bay", description: "Secure vehicle handover", icon: ShieldCheck, href: "/services/browse" },
  { id: "track", label: "Live tracking", description: "Mechanic en route", icon: MapPin, href: "/services/my-bookings" },
  { id: "pay", label: "Pay online / COD", description: "UPI · cards · cash", icon: CreditCard, href: "/services/browse" },
  { id: "whatsapp", label: "WhatsApp updates", description: "Status on chat", icon: MessageCircle, href: "/services/browse" },
  { id: "verified", label: "Verified centers", description: "KYC workshops", icon: Star, href: "/services/browse" },
  { id: "insurance", label: "Insurance & RC", description: "Renewal desk", icon: FileText, href: "/services/browse?category=insurance-renewal" },
  { id: "ev", label: "EV specialists", description: "Battery & diagnostics", icon: Zap, href: "/services/browse?category=battery-replacement" },
];

export const SERVICES_TRUST_STATS = [
  { label: "1,200+", sub: "Verified centers" },
  { label: "4.8★", sub: "Avg rating" },
  { label: "30 min", sub: "Slot intervals" },
  { label: "Live", sub: "Job tracking" },
];

export const SERVICE_CATEGORY_IMAGES: Partial<Record<ServiceCategorySlug, string>> = {
  "car-servicing": "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
  "denting-painting": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
  "car-wash": "https://images.unsplash.com/photo-1607860108855-645f04393433?w=600&q=80",
  "ppf-coating": "https://images.unsplash.com/photo-1619642751034-765df43d58c9?w=600&q=80",
  "ceramic-coating": "https://images.unsplash.com/photo-1601362840469-51e4d8d229a0?w=600&q=80",
  "ac-repair": "https://images.unsplash.com/photo-1625047509168-1e3c2c7e0b8a?w=600&q=80",
  "battery-replacement": "https://images.unsplash.com/photo-1593941707879-2c2b2cd97e2a?w=600&q=80",
  "tyre-replacement": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  "insurance-renewal": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  "rc-transfer": "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&q=80",
};

export const HOW_IT_WORKS = [
  { step: "1", title: "Pick service & center", desc: "Compare prices, ratings & pickup options" },
  { step: "2", title: "Lock a slot", desc: "Choose date/time — instant confirmation" },
  { step: "3", title: "Track & pay", desc: "OTP handover, live status, secure checkout" },
];

export function servicesBrowsePath(params?: {
  city?: string;
  category?: ServiceCategorySlug | string;
  pickup?: boolean;
}): string {
  const s = new URLSearchParams();
  if (params?.city) s.set("city", params.city);
  if (params?.category) s.set("category", params.category);
  if (params?.pickup) s.set("pickup", "1");
  const qs = s.toString();
  return qs ? `/services/browse?${qs}` : "/services/browse";
}

export function servicesCategoryPath(slug: ServiceCategorySlug): string {
  return `/services/browse?category=${slug}`;
}

export { SERVICE_CATEGORIES };
