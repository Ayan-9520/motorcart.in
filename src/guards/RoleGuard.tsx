import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import type { UserRole } from "@/lib/constants";
import type { AppRole } from "@/types/database";
import { userHasAnyRole } from "@/permissions/role-matching";

type RoleGuardProps = {
  /** Allowed roles (super_admin always passes). */
  allow: UserRole | UserRole[];
  children: React.ReactNode;
  /** When false, render nothing instead of redirecting (use inside mixed pages). */
  redirect?: boolean;
};

/**
 * Lightweight role check for conditional UI. Prefer {@link ProtectedRoute} on routes.
 */
export function RoleGuard({ allow, children, redirect = true }: RoleGuardProps) {
  const user = useAuthStore((s) => s.user);
  const list = (Array.isArray(allow) ? allow : [allow]) as AppRole[];

  if (!user) {
    return redirect ? <Navigate to="/login" replace /> : null;
  }

  if (user.accountStatus === "suspended" || user.accountStatus === "closed") {
    return redirect ? <Navigate to="/account-suspended" replace /> : null;
  }

  if (!userHasAnyRole(user.role as AppRole, list)) {
    return redirect ? <Navigate to="/unauthorized" replace /> : null;
  }

  return <>{children}</>;
}
