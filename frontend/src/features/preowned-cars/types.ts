import type { FairPriceLabel, VehicleListing } from "@/types/vehicle";

export interface CertifiedProgram {
  id: string;
  name: string;
  brand: string;
  description: string;
  inventoryCount: string;
}

export type PreownedTrustBadge =
  | "certified"
  | "7-day-return"
  | "warranty"
  | "inspected"
  | "loan-approved"
  | "insurance-active";

export type PreownedCarListing = VehicleListing & {
  category: "used-cars";
  condition: "used";
};

export interface PreownedCarFilters {
  certifiedOnly?: boolean;
  warrantyIncluded?: boolean;
  fairPrice?: FairPriceLabel;
}
