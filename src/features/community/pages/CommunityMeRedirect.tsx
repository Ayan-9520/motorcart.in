import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PageSpinner } from "@/shared/ui/loading/PageSpinner";

/** Redirect /community/me → logged-in user's social profile */
export function CommunityMeRedirect() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <PageSpinner label="Loading…" className="min-h-[40vh]" />;
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  return <Navigate to={`/community/u/${user.id}`} replace />;
}
