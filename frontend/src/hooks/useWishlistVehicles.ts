import { useEffect, useMemo, useState } from "react";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";
import { getVehiclePool } from "@/services/vehicle.service";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import type { VehicleListing } from "@/types/vehicle";

export function useWishlistVehicles() {
  const ids = useVehicleMarketStore((s) => s.wishlist);
  const [pool, setPool] = useState<VehicleListing[]>(MOCK_VEHICLES);

  useEffect(() => {
    void getVehiclePool().then(setPool);
  }, []);

  const vehicles = useMemo(
    () => ids.map((id) => pool.find((v) => v.id === id)).filter((v): v is VehicleListing => Boolean(v)),
    [ids, pool]
  );

  return { vehicles, count: ids.length, ids };
}
