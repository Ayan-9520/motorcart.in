import { VehicleCard } from "./VehicleCard";
import type { VehicleListing } from "@/types/vehicle";

export function SimilarVehicles({ vehicles }: { vehicles: VehicleListing[] }) {
  if (!vehicles.length) return null;
  return (
    <section className="premium-section-block space-y-4">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-foreground md:text-xl">Similar vehicles</h2>
        <p className="text-xs text-muted-foreground">You might also like</p>
      </div>
      <div className="vehicle-listing-grid vehicle-listing-grid-relaxed">
        {vehicles.slice(0, 3).map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} index={i} compact />
        ))}
      </div>
    </section>
  );
}
