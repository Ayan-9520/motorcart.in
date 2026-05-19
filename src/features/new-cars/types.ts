import type { VehicleListing } from "@/types/vehicle";

export type NewCarBodySegment = "suv" | "hatchback" | "sedan" | "ev" | "luxury" | "budget";

export interface NewCarBrand {
  name: string;
  slug: string;
  count: string;
  href: string;
}

export interface NewCarCollection {
  id: string;
  title: string;
  description: string;
  href: string;
  segment?: NewCarBodySegment;
}

export type NewCarListing = VehicleListing & {
  category: "new-cars";
  condition: "new";
};
