import { VehicleCard } from "./VehicleCard";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";
import type { VehicleListing } from "@/types/vehicle";

export function RecentlyViewed({ pool = MOCK_VEHICLES }: { pool?: VehicleListing[] }) {
  const { recentlyViewed } = useVehicleMarketStore();
  const items = recentlyViewed
    .map((id) => pool.find((v) => v.id === id))
    .filter(Boolean) as VehicleListing[];

  if (items.length < 2) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Recently Viewed</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} index={i} />
        ))}
      </div>
    </section>
  );
}
