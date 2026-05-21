import { DASHBOARD_ROUTES } from "@/lib/constants";
import type { AppRole } from "@/types/database";
import { isDealerRole } from "@/permissions/role-matching";

/** Canonical workspace URL for each role (CRM / command center). */
export function getRoleDashboardPath(role: AppRole): string {
  if (isDealerRole(role)) return "/dashboard/dealer";
  return DASHBOARD_ROUTES[role] ?? "/dashboard/customer";
}

/** Roles that use a dedicated layout shell (not generic DashboardLayout). */
export function usesDedicatedWorkspace(role: AppRole): boolean {
  return (
    isDealerRole(role) ||
    role === "super_admin" ||
    role === "finance_manager" ||
    role === "service_center" ||
    role === "service_technician" ||
    role === "parts_seller" ||
    role === "dsa_agent" ||
    role === "bank_nbfc" ||
    role === "auction_partner"
  );
}
