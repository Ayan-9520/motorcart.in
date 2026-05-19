import { useCallback, useEffect, useState } from "react";
import { searchVehicles } from "@/services/vehicle.service";
import type { VehicleListing } from "@/types/vehicle";

export function useVehicles(options?: { city?: string; limit?: number; featured?: boolean }) {
  const [vehicles, setVehicles] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const result = await searchVehicles({
        filters: options?.city ? { city: options.city } : {},
        sort: "newest",
        page: 1,
        pageSize: options?.limit ?? 24,
      });
      let list = result.vehicles;
      if (options?.featured) list = list.filter((v) => v.isFeatured);
      setVehicles(list);
      setError(null);
    } catch {
      setError("Failed to load vehicles");
    }
    setLoading(false);
  }, [options?.city, options?.limit, options?.featured]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, loading, error, refetch: fetchVehicles };
}
