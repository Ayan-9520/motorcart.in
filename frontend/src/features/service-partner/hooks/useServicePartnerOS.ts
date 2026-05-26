import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchServicePartnerSnapshot } from "../services/service-partner.service";
import type { ServicePartnerSnapshot } from "../types";

export function useServicePartnerOS() {
  const { user } = useAuth();
  const [data, setData] = useState<ServicePartnerSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user?.id) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const snap = await fetchServicePartnerSnapshot(
      user.id,
      user.fullName ?? "Partner",
      user.role === "admin" || user.role === "super_admin"
    );
    setData(snap);
    setLoading(false);
  }, [user?.id, user?.fullName, user?.role]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const userName = user?.fullName ?? "Partner";

  return { data, loading, refresh, userName, user };
}
