import type { AppRole, LeadStatus } from "@/types/database";

export type DealerType =
  | "new_car_dealer"
  | "used_car_dealer"
  | "bike_dealer"
  | "truck_dealer"
  | "parts_seller"
  | "service_center";

export const DEALER_TYPE_LABELS: Record<DealerType, string> = {
  new_car_dealer: "New Car Dealer",
  used_car_dealer: "Used Car Dealer",
  bike_dealer: "Bike Dealer",
  truck_dealer: "Truck Dealer",
  parts_seller: "Parts Dealer",
  service_center: "Service Center",
};

export interface DealerProfile {
  id: string;
  name: string;
  slug: string;
  dealerType: AppRole;
  city: string;
  state: string;
  phone?: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

export interface CRMStats {
  totalListings: number;
  activeListings: number;
  soldListings: number;
  featuredListings: number;
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  testDriveRequests: number;
  enquiries: number;
  revenueMtd: number;
  conversionRate: number;
  whatsappChats: number;
  callsTracked: number;
  avgListingViews: number;
}

export interface ParsedInventoryRow {
  rowNumber: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  fuel: string;
  transmission: string;
  kmsDriven: number;
  ownership: number;
  price: number;
  color?: string;
  registrationState: string;
  description?: string;
  dealerPrice?: number;
  discount?: number;
  mainImageUrl?: string;
}

export interface RowValidationError {
  row: number;
  field?: string;
  message: string;
}

export interface UploadRowResult {
  row: number;
  success: boolean;
  vehicleId?: string;
  error?: string;
  data?: ParsedInventoryRow;
}

export interface BulkUploadState {
  status: "idle" | "parsing" | "uploading" | "done";
  progress: number;
  total: number;
  success: number;
  failed: number;
  errors: RowValidationError[];
  results: UploadRowResult[];
  uploadId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "owner" | "manager" | "sales" | "support";
  isActive: boolean;
}

export interface CallLogEntry {
  id: string;
  leadName: string;
  phone: string;
  duration: number;
  outcome: "answered" | "missed" | "voicemail";
  createdAt: string;
}

export interface ListingPerformance {
  vehicleId: string;
  title: string;
  views: number;
  enquiries: number;
  whatsappClicks: number;
  status: string;
}

export type LeadWithMeta = {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  source: string;
  status: LeadStatus;
  aiScore?: number | null;
  vehicleInterest?: string | null;
  notes?: string | null;
  createdAt: string;
  type: "lead" | "enquiry" | "test_drive";
};
