import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DbVehicle } from "@/types/database";

export function useVehicles(filters?: { city?: string; status?: string; limit?: number }) {
  const [vehicles, setVehicles] = useState<DbVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    let q = supabase.from("vehicles").select("*").eq("status", filters?.status ?? "available");
    if (filters?.city) q = q.eq("city", filters.city);
    if (filters?.limit) q = q.limit(filters.limit);
    q = q.order("created_at", { ascending: false });

    const { data, error: err } = await q;
    if (err) setError(err.message);
    else setVehicles((data ?? []) as DbVehicle[]);
    setLoading(false);
  }, [filters?.city, filters?.status, filters?.limit]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, loading, error, refetch: fetchVehicles };
}
