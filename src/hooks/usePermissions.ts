import { useMemo } from "react";
import { useAuthStore } from "@/store/authStore";
import type { AppRole } from "@/types/database";
import { ROLE_CAPABILITIES } from "@/permissions/matrix";
import { userHasAnyRole } from "@/permissions/role-matching";
import type { UserRole } from "@/lib/constants";

export function usePermissions() {
  const user = useAuthStore((s) => s.user);

  return useMemo(() => {
    const role = (user?.role ?? "customer") as AppRole;
    const caps = ROLE_CAPABILITIES[role] ?? ROLE_CAPABILITIES.customer;

    return {
      user,
      role,
      caps,
      /** True if the signed-in user has any of the given roles (super_admin always passes). */
      canRole: (allowed: UserRole | UserRole[]) => {
        if (!user) return false;
        const list = (Array.isArray(allowed) ? allowed : [allowed]) as AppRole[];
        return userHasAnyRole(user.role as AppRole, list);
      },
    };
  }, [user]);
}
