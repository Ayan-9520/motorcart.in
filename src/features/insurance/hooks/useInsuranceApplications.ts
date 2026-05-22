import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchUserInsuranceApplications } from "../services/insurance.service";
import type { InsuranceApplication } from "../types";

export function useInsuranceApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<InsuranceApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user?.id) {
      setApplications([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setApplications(await fetchUserInsuranceApplications(user.id));
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  return { applications, loading, refetch: load };
}
