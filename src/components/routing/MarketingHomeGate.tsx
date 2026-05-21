import { Navigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { getRoleDashboardPath } from "@/auth/get-role-dashboard-path";
import type { AppRole } from "@/types/database";
import { PageSpinner } from "@/shared/ui/loading/PageSpinner";

type MarketingHomeGateProps = {
  children: React.ReactNode;
};

/**
 * Premium marketing home for guests only.
 * Logged-in users go to their role workspace unless `?site=1` (browse marketplace).
 */
export function MarketingHomeGate({ children }: MarketingHomeGateProps) {
  const [params] = useSearchParams();
  const { user, isLoading, profileHydrated, isAuthenticated } = useAuthStore();

  if (params.get("site") === "1") {
    return <>{children}</>;
  }

  if (isLoading || (isAuthenticated && !profileHydrated)) {
    return <PageSpinner label="Loading…" className="min-h-[50vh]" />;
  }

  if (user) {
    return <Navigate to={getRoleDashboardPath(user.role as AppRole)} replace />;
  }

  return <>{children}</>;
}
