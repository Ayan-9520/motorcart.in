import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchPartsSupplierSnapshot } from "../services/parts-supplier.service";
import type { PartsSupplierSnapshot } from "../types";

export function usePartsSupplierOS() {
  const { user } = useAuth();
  const [data, setData] = useState<PartsSupplierSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user?.id) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const snap = await fetchPartsSupplierSnapshot(user.id, user.fullName);
    setData(snap);
    setLoading(false);
  }, [user?.id, user?.fullName]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const userName = user?.fullName?.split(/\s+/)[0] ?? "Partner";

  return { data, loading, refresh, userName, user };
}
