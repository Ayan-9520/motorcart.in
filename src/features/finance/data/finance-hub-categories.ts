export type FinanceHubCategoryId =
  | "new-car-loan"
  | "used-car-loan"
  | "bike-loan"
  | "commercial-loan"
  | "ev-loan"
  | "refinance"
  | "insurance"
  | "loan-against-car";

export interface FinanceHubCategoryItem {
  id: FinanceHubCategoryId;
  label: string;
  description: string;
  icon: string;
  stats: { compare: string; apply: string };
}

export const FINANCE_HUB_CATEGORIES: FinanceHubCategoryItem[] = [
  {
    id: "new-car-loan",
    label: "New Car Loan",
    description: "OEM dealers · on-road price · lowest rates",
    icon: "Car",
    stats: { compare: "14 lenders", apply: "4 hr approval" },
  },
  {
    id: "used-car-loan",
    label: "Pre-Owned Car Loan",
    description: "Certified pre-owned · RC verified",
    icon: "CarFront",
    stats: { compare: "12 lenders", apply: "Same day" },
  },
  {
    id: "bike-loan",
    label: "Bike & Scooter",
    description: "Two-wheeler · instant eligibility",
    icon: "Bike",
    stats: { compare: "10 lenders", apply: "2 hr approval" },
  },
  {
    id: "commercial-loan",
    label: "Commercial CV",
    description: "Trucks, buses & fleet finance",
    icon: "Truck",
    stats: { compare: "8 lenders", apply: "B2B rates" },
  },
  {
    id: "ev-loan",
    label: "EV Green Loan",
    description: "Subsidy-aware · battery warranty",
    icon: "Zap",
    stats: { compare: "9 lenders", apply: "Green premium" },
  },
  {
    id: "refinance",
    label: "Refinance",
    description: "Lower EMI on existing loan",
    icon: "RefreshCw",
    stats: { compare: "Save up to 18%", apply: "Zero foreclosure" },
  },
  {
    id: "insurance",
    label: "Insurance",
    description: "Comprehensive · zero dep · renewals",
    icon: "Shield",
    stats: { compare: "6 insurers", apply: "Instant quote" },
  },
  {
    id: "loan-against-car",
    label: "Loan Against Car",
    description: "Keep your car · unlock equity",
    icon: "Landmark",
    stats: { compare: "Up to 150%", apply: "24 hr disbursal" },
  },
];
