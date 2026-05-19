import { VehicleCard } from "./VehicleCard";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";
import type { VehicleListing } from "@/types/vehicle";

export function RecentlyViewed({ pool = MOCK_VEHICLES }: { pool?: VehicleListing[] }) {
  const { recentlyViewed } = useVehicleMarketStore();
  const items = recentlyViewed
    .map((id) => pool.find((v) => v.id === id))
    .filter(Boolean) as VehicleListing[];

  if (items.length < 1) return null;

  return (
    <section className="premium-section-block space-y-4 border-t border-border pt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground md:text-xl">Recently viewed</h2>
          <p className="text-xs text-muted-foreground">Pick up where you left off</p>
        </div>
      </div>
      <div className="vehicle-listing-grid vehicle-listing-grid-relaxed">
        {items.slice(0, 3).map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} index={i} compact />
        ))}
      </div>
    </section>
  );
}
