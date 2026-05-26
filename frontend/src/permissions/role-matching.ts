import type { AppRole } from "@/types/database";

/** Super admin may access any role-gated surface (platform owner). */
export function userHasAnyRole(userRole: AppRole, allowed: AppRole[]): boolean {
  if (userRole === "super_admin") return true;
  return allowed.includes(userRole);
}

export const DEALER_ROLES: AppRole[] = [
  "dealer",
  "used_car_dealer",
  "new_car_dealer",
  "bike_dealer",
  "truck_dealer",
];

export function isDealerRole(role: AppRole): boolean {
  return DEALER_ROLES.includes(role);
}
