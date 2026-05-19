import { VehicleCard } from "./VehicleCard";
import type { VehicleListing } from "@/types/vehicle";

export function SimilarVehicles({ vehicles }: { vehicles: VehicleListing[] }) {
  if (!vehicles.length) return null;
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Similar Vehicles</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} index={i} />
        ))}
      </div>
    </section>
  );
}
