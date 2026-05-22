import type { AppRole } from "@/types/database";
import type { User } from "@/types";
import { getRoleDashboardPath } from "@/auth/get-role-dashboard-path";
import {
  isAccountPendingApproval,
  PENDING_APPROVAL_PATH,
} from "@/auth/ecosystem-roles";

/** Default landing route after successful email / OAuth / OTP sign-in. */
export function getPostLoginDashboardPath(
  role: AppRole,
  user?: Pick<User, "accountStatus" | "role"> | null
): string {
  if (user && isAccountPendingApproval(user)) {
    return PENDING_APPROVAL_PATH;
  }
  return getRoleDashboardPath(role);
}
