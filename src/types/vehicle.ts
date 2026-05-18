import type { VehicleStatus } from "@/types/database";

export type VehicleCategory =
  | "new-cars"
  | "used-cars"
  | "bikes"
  | "trucks"
  | "buses"
  | "ev";

export type VehicleSortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "kms-asc"
  | "ai-score";

export interface VehicleSpecs {
  engine?: string;
  power?: string;
  torque?: string;
  mileage?: string;
  seating?: string;
  bootSpace?: string;
  safety?: string[];
  comfort?: string[];
  [key: string]: string | string[] | undefined;
}

export interface VehicleMetadata {
  videos?: string[];
  viewer360?: string[];
  specifications?: VehicleSpecs;
  discountPercent?: number;
  emiRate?: number;
  registrationYear?: number;
  insuranceValid?: string;
  rto?: string;
}

export interface VehicleListing {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  originalPrice?: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  category: VehicleCategory;
  kmsDriven: number;
  owners: number;
  color?: string;
  city: string;
  state: string;
  location: string;
  images: string[];
  features: string[];
  description?: string;
  isCertified: boolean;
  isFeatured: boolean;
  condition: "new" | "used";
  status: VehicleStatus;
  aiPriceScore?: number;
  dealerId?: string;
  dealerName: string;
  dealerSlug?: string;
  dealerPhone?: string;
  dealerRating?: number;
  dealerVerified?: boolean;
  metadata: VehicleMetadata;
  createdAt: string;
}

export interface VehicleFilters {
  category?: VehicleCategory;
  brand?: string;
  model?: string;
  fuel?: string;
  transmission?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  kmsMax?: number;
  owners?: number;
  city?: string;
  color?: string;
  bodyType?: string;
  q?: string;
}

export interface VehicleSearchResult {
  vehicles: VehicleListing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface TestDriveBooking {
  vehicleId: string;
  name: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export interface VehicleEnquiry {
  vehicleId: string;
  dealerId: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
}
