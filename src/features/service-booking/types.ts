import type { BookingStatus } from "@/types/database";

export type ServiceCategorySlug =
  | "car-servicing"
  | "denting-painting"
  | "car-wash"
  | "ppf-coating"
  | "ceramic-coating"
  | "ac-repair"
  | "battery-replacement"
  | "tyre-replacement"
  | "insurance-renewal"
  | "rc-transfer";

export interface ServiceCategory {
  slug: ServiceCategorySlug;
  label: string;
  description: string;
  icon: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { slug: "car-servicing", label: "Car servicing", description: "Periodic maintenance & inspection", icon: "Wrench" },
  { slug: "denting-painting", label: "Denting & painting", description: "Body repair & paint booth", icon: "Hammer" },
  { slug: "car-wash", label: "Car wash", description: "Interior & exterior detailing", icon: "Droplets" },
  { slug: "ppf-coating", label: "PPF coating", description: "Paint protection film", icon: "Shield" },
  { slug: "ceramic-coating", label: "Ceramic coating", description: "Hydrophobic ceramic layers", icon: "Sparkles" },
  { slug: "ac-repair", label: "AC repair", description: "Gas refill, compressor & cooling", icon: "Wind" },
  { slug: "battery-replacement", label: "Battery replacement", description: "OEM batteries with warranty", icon: "Battery" },
  { slug: "tyre-replacement", label: "Tyre replacement", description: "Mount, balance & alignment", icon: "CircleDot" },
  { slug: "insurance-renewal", label: "Insurance renewal", description: "Compare & renew motor policy", icon: "FileText" },
  { slug: "rc-transfer", label: "RC transfer", description: "RTO paperwork & hypothecation", icon: "FileBadge" },
];

export type BookingTrackingStep =
  | "scheduled"
  | "confirmed"
  | "mechanic_assigned"
  | "en_route"
  | "arrived"
  | "in_service"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export interface ServiceCenter {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string;
  state: string;
  pincode: string | null;
  phone: string | null;
  rating: number;
  reviewCount: number;
  servicesOffered: string[];
  isVerified: boolean;
  isActive: boolean;
  images: string[];
  pickupDropAvailable: boolean;
  slotIntervalMinutes: number;
  lat: number | null;
  lng: number | null;
  createdAt: string;
}

export interface ServiceCatalogItem {
  id: string;
  serviceCenterId: string;
  centerName?: string;
  centerSlug?: string;
  name: string;
  slug: string;
  serviceType: string;
  description: string | null;
  priceFrom: number;
  priceTo: number | null;
  durationMinutes: number | null;
  isDoorstep: boolean;
  isActive: boolean;
  images: string[];
  createdAt: string;
}

export interface ServiceBooking {
  id: string;
  userId: string;
  serviceId: string;
  serviceCenterId: string;
  serviceName?: string;
  centerName?: string;
  vehicleDetails: Record<string, unknown>;
  scheduledAt: string;
  status: BookingStatus;
  totalAmount: number | null;
  otpVerified: boolean;
  notes: string | null;
  mechanicId: string | null;
  pickupAddress: string | null;
  dropAddress: string | null;
  paymentStatus: PaymentStatus;
  paymentAmount: number | null;
  trackingStep: BookingTrackingStep;
  otpCode: string | null;
  otpExpiresAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface BookingAnalytics {
  totalBookings: number;
  completed: number;
  pending: number;
  revenue: number;
  avgRating: number;
}
