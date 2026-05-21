import type { AppRole } from "@/types/database";

/** Roles available on public signup — buyers/leads use inquiry forms, not accounts. */
export const SIGNUP_ROLE_OPTIONS: { value: AppRole; label: string }[] = [
  { value: "dealer", label: "Dealer" },
  { value: "used_car_dealer", label: "Pre-Owned Car Dealer" },
  { value: "new_car_dealer", label: "New Car Dealer" },
  { value: "dsa_agent", label: "DSA Agent" },
  { value: "parts_seller", label: "Parts seller" },
  { value: "service_center", label: "Service partner" },
];

export const SIGNUP_ROLE_VALUES = SIGNUP_ROLE_OPTIONS.map((o) => o.value);

export const DEFAULT_SIGNUP_ROLE: AppRole = "dealer";
