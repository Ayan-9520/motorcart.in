import type { AppRole } from "@/types/database";
import { getRoleDashboardPath } from "@/auth/get-role-dashboard-path";

/** Default landing route after successful email / OAuth / OTP sign-in. */
export function getPostLoginDashboardPath(role: AppRole): string {
  return getRoleDashboardPath(role);
}
