/**
 * Motorcart.in — Supabase database types (Phase 2)
 * Mirror of public schema — regenerate with `supabase gen types` when CLI linked
 */

export type AppRole =
  | "customer"
  | "dealer"
  | "used_car_dealer"
  | "new_car_dealer"
  | "bike_dealer"
  | "truck_dealer"
  | "dsa_agent"
  | "bank_nbfc"
  | "service_center"
  | "parts_seller"
  | "admin"
  | "auction_partner";

export type KycStatus = "pending" | "submitted" | "verified" | "rejected";
export type VehicleStatus = "draft" | "available" | "reserved" | "sold";
export type AuctionStatus = "upcoming" | "live" | "ended" | "cancelled";
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";
export type FinanceStatus = "draft" | "submitted" | "processing" | "approved" | "rejected" | "disbursed";
export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export interface DbUser {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string;
  avatar_url: string | null;
  role: AppRole;
  kyc_status: KycStatus;
  kyc_data: Record<string, unknown>;
  company_name: string | null;
  city: string | null;
  state: string | null;
  is_verified: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DbDealer {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  dealer_type: AppRole;
  rating: number;
  review_count: number;
  address: string | null;
  city: string;
  state: string;
  pincode: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  is_verified: boolean;
  specialties: string[];
  subscription_tier: string;
  created_at: string;
  updated_at: string;
}

export interface DbVehicle {
  id: string;
  dealer_id: string | null;
  seller_id: string | null;
  slug: string;
  title: string;
  brand: string;
  model: string;
  variant: string | null;
  year: number;
  price: number;
  original_price: number | null;
  fuel_type: string;
  transmission: string;
  body_type: string;
  category: string;
  kms_driven: number;
  owners: number;
  color: string | null;
  location: string | null;
  city: string;
  state: string;
  images: string[];
  features: string[];
  description: string | null;
  is_certified: boolean;
  is_featured: boolean;
  condition: string;
  status: VehicleStatus;
  ai_price_score: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DbAuction {
  id: string;
  vehicle_id: string;
  organizer_id: string;
  title: string;
  images: string[];
  starting_bid: number;
  current_bid: number | null;
  reserve_price: number | null;
  bid_increment: number;
  bid_count: number;
  auction_type: string;
  starts_at: string;
  ends_at: string;
  status: AuctionStatus;
  winner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbBid {
  id: string;
  auction_id: string;
  bidder_id: string;
  amount: number;
  is_auto_bid: boolean;
  created_at: string;
}

export interface DbBank {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  bank_type: string;
  interest_rate_min: number;
  interest_rate_max: number;
  max_tenure_months: number;
  processing_fee: string | null;
  max_loan_amount: number;
  features: string[];
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbFinanceApplication {
  id: string;
  user_id: string;
  vehicle_id: string | null;
  bank_id: string | null;
  dsa_agent_id: string | null;
  loan_amount: number;
  tenure_months: number;
  interest_rate: number | null;
  emi_amount: number | null;
  status: FinanceStatus;
  ai_eligibility_score: number | null;
  documents: unknown[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbPart {
  id: string;
  seller_id: string;
  name: string;
  slug: string;
  category: string;
  brand: string | null;
  price: number;
  original_price: number | null;
  stock: number;
  rating: number;
  review_count: number;
  images: string[];
  compatibility: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbService {
  id: string;
  service_center_id: string;
  name: string;
  slug: string;
  service_type: string;
  description: string | null;
  price_from: number;
  price_to: number | null;
  duration_minutes: number | null;
  is_doorstep: boolean;
  is_active: boolean;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface DbBooking {
  id: string;
  user_id: string;
  service_id: string;
  service_center_id: string;
  vehicle_details: Record<string, unknown>;
  scheduled_at: string;
  status: BookingStatus;
  total_amount: number | null;
  otp_verified: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbLead {
  id: string;
  dealer_id: string;
  assigned_to: string | null;
  customer_id: string | null;
  name: string;
  phone: string;
  email: string | null;
  source: string;
  vehicle_id: string | null;
  vehicle_interest: string | null;
  status: LeadStatus;
  ai_score: number | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DbConversation {
  id: string;
  lead_id: string | null;
  customer_id: string | null;
  dealer_id: string | null;
  channel: string;
  subject: string | null;
  messages: unknown[];
  is_resolved: boolean;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  link: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface DbReview {
  id: string;
  user_id: string;
  entity_type: string;
  entity_id: string;
  rating: number;
  title: string | null;
  content: string | null;
  pros: string[];
  cons: string[];
  is_verified_purchase: boolean;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: { Row: DbUser; Insert: Partial<DbUser> & { id: string }; Update: Partial<DbUser> };
      dealers: { Row: DbDealer; Insert: Partial<DbDealer>; Update: Partial<DbDealer> };
      vehicles: { Row: DbVehicle; Insert: Partial<DbVehicle>; Update: Partial<DbVehicle> };
      auctions: { Row: DbAuction; Insert: Partial<DbAuction>; Update: Partial<DbAuction> };
      bids: { Row: DbBid; Insert: Partial<DbBid>; Update: Partial<DbBid> };
      banks: { Row: DbBank; Insert: Partial<DbBank>; Update: Partial<DbBank> };
      finance_applications: { Row: DbFinanceApplication; Insert: Partial<DbFinanceApplication>; Update: Partial<DbFinanceApplication> };
      parts: { Row: DbPart; Insert: Partial<DbPart>; Update: Partial<DbPart> };
      services: { Row: DbService; Insert: Partial<DbService>; Update: Partial<DbService> };
      bookings: { Row: DbBooking; Insert: Partial<DbBooking>; Update: Partial<DbBooking> };
      leads: { Row: DbLead; Insert: Partial<DbLead>; Update: Partial<DbLead> };
      conversations: { Row: DbConversation; Insert: Partial<DbConversation>; Update: Partial<DbConversation> };
      notifications: { Row: DbNotification; Insert: Partial<DbNotification>; Update: Partial<DbNotification> };
      reviews: { Row: DbReview; Insert: Partial<DbReview>; Update: Partial<DbReview> };
    };
  };
}
