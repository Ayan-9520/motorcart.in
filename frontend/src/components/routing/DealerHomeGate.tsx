import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { isNewCarDealerWorkspace } from "@/auth/workspace-role";
import { DealerOverviewPage } from "@/router/lazy-pages";

/** `/dashboard/dealer` — new-car dealers go to Showroom OS; others see Dealer OS home. */
export function DealerHomeGate() {
  const user = useAuthStore((s) => s.user);
  if (user && isNewCarDealerWorkspace(user)) {
    return <Navigate to="/dashboard/new-car" replace />;
  }
  return <DealerOverviewPage />;
}
