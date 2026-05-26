import { useCallback, useEffect, useState } from "react";
import { fetchVehicleBySlug, searchVehicles } from "@/services/vehicle.service";
import type { VehicleListing } from "@/types/vehicle";
import { getSimilarVehicles } from "@/lib/vehicle-utils";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";

export function useVehicleDetail(slug: string | undefined) {
  const [vehicle, setVehicle] = useState<VehicleListing | null>(null);
  const [similar, setSimilar] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(true);
  const addRecentlyViewed = useVehicleMarketStore((s) => s.addRecentlyViewed);

  const load = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    const v = await fetchVehicleBySlug(slug);
    setVehicle(v);
    if (v) {
      addRecentlyViewed(v.id);
      const pool = (await searchVehicles({ filters: {}, sort: "newest", page: 1, pageSize: 100 })).vehicles;
      setSimilar(getSimilarVehicles(v, pool.length ? pool : MOCK_VEHICLES));
    }
    setLoading(false);
  }, [slug, addRecentlyViewed]);

  useEffect(() => {
    load();
  }, [load]);

  return { vehicle, similar, loading, refetch: load };
}
