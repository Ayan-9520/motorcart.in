import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { getRoleDashboardPath } from "@/auth/get-role-dashboard-path";

/** Sends legacy `/dealer` URLs to the correct dealer workspace. */
export function DealerAliasRedirect() {
  const user = useAuthStore((s) => s.user);
  const to = user ? getRoleDashboardPath(user) : "/dashboard/dealer";
  return <Navigate to={to} replace />;
}
