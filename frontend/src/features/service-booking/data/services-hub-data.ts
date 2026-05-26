import type { HubCategorySlug } from "@/features/marketplace/types";
import {
  CalendarClock,
  Car,
  CreditCard,
  FileText,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Star,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SERVICE_CATEGORY_IMAGES } from "@/lib/media/india-media-catalog";
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

export { SERVICE_CATEGORY_IMAGES };

export const HOW_IT_WORKS = [
  { step: "1", title: "Pick service & center", desc: "Compare prices, ratings & pickup options" },
  { step: "2", title: "Book a slot", desc: "Live calendar · OTP handover at bay" },
  { step: "3", title: "Track & pay", desc: "WhatsApp updates · UPI or COD" },
];

export function servicesBrowsePath(params?: {
  q?: string;
  category?: ServiceCategorySlug;
  hub?: HubCategorySlug | null;
  city?: string;
}): string {
  const s = new URLSearchParams();
  if (params?.q) s.set("q", params.q);
  if (params?.category) s.set("category", params.category);
  if (params?.hub) s.set("hub", params.hub);
  if (params?.city) s.set("city", params.city);
  const qs = s.toString();
  return qs ? `/services/browse?${qs}` : "/services/browse";
}

export function servicesCategoryPath(
  slug: ServiceCategorySlug,
  hub?: HubCategorySlug | null
): string {
  return servicesBrowsePath({ category: slug, hub: hub ?? undefined });
}

export { SERVICE_CATEGORIES };
