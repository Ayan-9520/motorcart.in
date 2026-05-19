import { useEffect, useMemo, useState } from "react";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";
import { fetchVehiclesFromDb } from "@/services/vehicle.service";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import type { VehicleListing } from "@/types/vehicle";

export function useWishlistVehicles() {
  const ids = useVehicleMarketStore((s) => s.wishlist);
  const [pool, setPool] = useState<VehicleListing[]>(MOCK_VEHICLES);

  useEffect(() => {
    void fetchVehiclesFromDb().then((db) => {
      if (!db.length) return;
      const slugs = new Set(db.map((v) => v.slug));
      setPool([...db, ...MOCK_VEHICLES.filter((v) => !slugs.has(v.slug))]);
    });
  }, []);

  const vehicles = useMemo(
    () => ids.map((id) => pool.find((v) => v.id === id)).filter((v): v is VehicleListing => Boolean(v)),
    [ids, pool]
  );

  return { vehicles, count: ids.length, ids };
}
