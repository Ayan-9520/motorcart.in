import type { InsuranceAddon } from "../types";

export const INSURANCE_ADDONS: InsuranceAddon[] = [
  {
    id: "zero_dep",
    label: "Zero depreciation",
    description: "Full claim without depreciation deduction",
    annualCost: 2800,
    vehicleTypes: ["car", "bike"],
  },
  {
    id: "engine_protect",
    label: "Engine protect",
    description: "Hydrostatic lock & engine damage",
    annualCost: 1200,
    vehicleTypes: ["car"],
  },
  {
    id: "rsa",
    label: "Roadside assistance",
    description: "24×7 tow, battery jump, flat tyre",
    annualCost: 599,
    vehicleTypes: ["car", "bike"],
  },
  {
    id: "pa_cover",
    label: "PA cover ₹15L",
    description: "Personal accident for owner-driver",
    annualCost: 750,
    vehicleTypes: ["car", "bike"],
  },
  {
    id: "ncb_protect",
    label: "NCB protect",
    description: "Retain NCB after one claim",
    annualCost: 900,
    vehicleTypes: ["car"],
  },
  {
    id: "consumables",
    label: "Consumables",
    description: "Oil, nuts, bolts in claim",
    annualCost: 650,
    vehicleTypes: ["car"],
  },
];
