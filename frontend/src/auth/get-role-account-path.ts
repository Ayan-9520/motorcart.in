import type { AppRole } from "@/types/database";
import { isDealerRole } from "@/permissions/role-matching";
import { resolveEffectiveAppRole, resolveUserWorkspaceRole } from "@/auth/workspace-role";
import type { User } from "@/types";

type WorkspaceUser = Pick<User, "role" | "dealerType" | "businessCategory">;

/** Single account / profile URL per role — navbar & sidebar use this. */
export function getRoleAccountPath(roleOrUser: AppRole | WorkspaceUser): string {
  const role =
    typeof roleOrUser === "string"
      ? resolveEffectiveAppRole({ role: roleOrUser })
      : resolveUserWorkspaceRole(roleOrUser);

  switch (role) {
    case "customer":
      return "/dashboard/customer/profile";
    case "parts_seller":
      return "/dashboard/parts/profile";
    case "service_center":
      return "/dashboard/service/profile";
    case "new_car_dealer":
      return "/dashboard/new-car/settings";
    case "super_admin":
    case "admin":
      return "/dashboard/admin/settings";
    case "dsa_agent":
    case "bank_nbfc":
    case "finance_manager":
    case "auction_partner":
    case "service_technician":
      return "/profile";
    default:
      if (isDealerRole(role)) return "/dashboard/dealer/settings";
      return "/profile";
  }
}

/** Match account route including hash sections (e.g. #notifications). */
export function isAccountPath(pathname: string, hash: string, roleOrUser: AppRole | WorkspaceUser): boolean {
  const base = getRoleAccountPath(roleOrUser);
  if (pathname === base || pathname.startsWith(`${base}/`)) return true;
  if (hash && pathname === base.split("#")[0]) return true;
  return pathname === "/profile" && base === "/profile";
}
