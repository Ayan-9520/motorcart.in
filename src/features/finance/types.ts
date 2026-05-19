import type { FinanceStatus } from "@/types/database";

export type LenderType = "bank" | "nbfc";
export type ApplicationType = "new_loan" | "refinance" | "top_up";

export interface Lender {
  id: string;
  name: string;
  slug: string;
  shortCode: string;
  logoUrl: string | null;
  lenderType: LenderType;
  interestRateMin: number;
  interestRateMax: number;
  maxTenureMonths: number;
  maxLoanAmount: number;
  processingFee: string | null;
  features: string[];
  isFeatured: boolean;
  rankingScore: number;
  minCibil: number;
}

export interface LoanOffer extends Lender {
  effectiveRate: number;
  emi: number;
  totalInterest: number;
  approvalProbability: number;
  rank: number;
}

export interface EligibilityInput {
  monthlyIncome: number;
  existingEmi: number;
  loanAmount: number;
  tenureMonths: number;
  cibilScore: number;
  employmentType: "salaried" | "self_employed" | "business";
}

export interface EligibilityResult {
  eligible: boolean;
  maxLoan: number;
  maxEmi: number;
  message: string;
  recommendedTenure: number;
}

export interface CibilEstimate {
  score: number;
  band: "excellent" | "good" | "fair" | "poor";
  factors: { label: string; impact: "positive" | "negative" | "neutral" }[];
}

export interface AiRecommendation {
  lender: Lender;
  score: number;
  reasons: string[];
  approvalProbability: number;
  estimatedEmi: number;
}

export interface LoanApplication {
  id: string;
  userId: string;
  bankId: string | null;
  bankName?: string;
  vehicleId: string | null;
  dsaAgentId: string | null;
  loanAmount: number;
  tenureMonths: number;
  interestRate: number | null;
  emiAmount: number | null;
  status: FinanceStatus;
  aiEligibilityScore: number | null;
  approvalProbability: number | null;
  cibilScore: number | null;
  monthlyIncome: number | null;
  employmentType: string | null;
  applicationType: ApplicationType;
  documents: LoanDocument[];
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoanDocument {
  name: string;
  path: string;
  type: string;
  uploadedAt: string;
}

export interface FinanceAnalytics {
  totalApplications: number;
  submitted: number;
  approved: number;
  disbursed: number;
  totalDisbursed: number;
  avgApprovalProbability: number;
}
