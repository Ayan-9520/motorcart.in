import type { CertifiedProgram, PreownedTrustBadge } from "../types";

export const PREOWNED_TAGLINE =
  "Certified pre-owned cars with inspection reports, fair AI pricing & dealer trust.";

export const CERTIFIED_PROGRAMS: CertifiedProgram[] = [
  { id: "true-value", name: "Maruti True Value", brand: "Maruti", description: "OEM inspected pre-owned", inventoryCount: "8.5K+" },
  { id: "h-promise", name: "Hyundai Promise", brand: "Hyundai", description: "Warranty-backed certified stock", inventoryCount: "4.2K+" },
  { id: "u-trust", name: "Toyota U Trust", brand: "Toyota", description: "Premium Toyota certified", inventoryCount: "2.1K+" },
  { id: "first-choice", name: "Mahindra First Choice", brand: "Mahindra", description: "Multi-brand certified hub", inventoryCount: "6.8K+" },
  { id: "weltauto", name: "Das WeltAuto", brand: "Volkswagen", description: "VW group certified", inventoryCount: "1.4K+" },
  { id: "tata-assured", name: "Tata Assured", brand: "Tata", description: "Tata certified pre-owned", inventoryCount: "3.6K+" },
  { id: "auto-terrace", name: "Honda Auto Terrace", brand: "Honda", description: "Honda certified inventory", inventoryCount: "2.8K+" },
  { id: "fusion", name: "Fusion Cars", brand: "Multi", description: "Luxury certified specialist", inventoryCount: "900+" },
  { id: "autobest", name: "AutoBest", brand: "Multi", description: "Pan-India certified network", inventoryCount: "5.5K+" },
  { id: "bbt", name: "Big Boy Toyz", brand: "Luxury", description: "Exotic & luxury pre-owned", inventoryCount: "650+" },
];

export const TRUST_BADGES: { id: PreownedTrustBadge; label: string }[] = [
  { id: "certified", label: "Certified" },
  { id: "7-day-return", label: "7-day return" },
  { id: "warranty", label: "Warranty included" },
  { id: "inspected", label: "Inspected" },
  { id: "loan-approved", label: "Loan approved" },
  { id: "insurance-active", label: "Insurance active" },
];

export const PREOWNED_STATS = [
  { label: "Certified stock", value: "2.1L+" },
  { label: "Inspection points", value: "200+" },
  { label: "Dealer rating", value: "4.7★" },
  { label: "Loan approval", value: "24 hrs" },
] as const;

export const INSPECTION_SECTIONS = [
  "Exterior",
  "Interior",
  "Engine",
  "Suspension",
  "Tyres",
  "Electricals",
  "Accident check",
  "Odometer check",
] as const;
