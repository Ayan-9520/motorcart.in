export type InsuranceVehicleType = "car" | "bike";
export type InsurancePlanType = "third_party" | "comprehensive" | "zero_dep" | "own_damage";
export type InsuranceAppStatus =
  | "draft"
  | "quoted"
  | "submitted"
  | "under_review"
  | "issued"
  | "rejected"
  | "expired";

export interface InsurancePartner {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  claimSettlementRatio: number;
  planTypes: InsurancePlanType[];
  isActive: boolean;
}

export interface InsuranceAddon {
  id: string;
  label: string;
  description: string;
  annualCost: number;
  vehicleTypes: InsuranceVehicleType[];
}

export interface PremiumBreakdownLine {
  label: string;
  amount: number;
}

export interface InsuranceQuoteInput {
  vehicleType: InsuranceVehicleType;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  registrationCity: string;
  fuelType?: string;
  vehicleValue?: number;
  ncbPercent: number;
  planType: InsurancePlanType;
  addons: string[];
}

export interface InsuranceQuoteOffer {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerSlug: string;
  logoUrl: string | null;
  planType: InsurancePlanType;
  vehicleType: InsuranceVehicleType;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  registrationCity: string;
  idvAmount: number;
  annualPremium: number;
  monthlyPremium: number;
  ncbPercent: number;
  claimSettlementRatio: number;
  rankScore: number;
  approvalProbability: number;
  breakdown: PremiumBreakdownLine[];
  addons: string[];
  highlights: string[];
}

export interface InsuranceApplication {
  id: string;
  userId: string;
  quoteId: string | null;
  partnerId: string | null;
  partnerName: string | null;
  vehicleType: InsuranceVehicleType;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  registrationNumber: string | null;
  registrationCity: string;
  planType: InsurancePlanType;
  idvAmount: number;
  annualPremium: number;
  ncbPercent: number;
  status: InsuranceAppStatus;
  policyNumber: string | null;
  policyStart: string | null;
  policyEnd: string | null;
  applicantName: string | null;
  applicantPhone: string | null;
  createdAt: string;
  updatedAt: string;
}
