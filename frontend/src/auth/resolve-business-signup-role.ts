import type { BusinessCategory } from "@/auth/business-signup-types";
import type { AppRole } from "@/types/database";

/** Align stored role with business category when signup dropdown is generic. */
export function resolveBusinessSignupRole(role: AppRole, businessCategory: BusinessCategory): AppRole {
  if (businessCategory === "new_car_showroom") return "new_car_dealer";
  if (businessCategory === "preowned_lot" && role === "dealer") return "used_car_dealer";
  return role;
}
