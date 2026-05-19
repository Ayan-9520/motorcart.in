import { Sparkles } from "lucide-react";
import { VehicleCard } from "./VehicleCard";
import { getAIRecommendations } from "@/lib/vehicle-utils";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";
import type { VehicleListing } from "@/types/vehicle";

export function AIRecommendations({ pool = MOCK_VEHICLES }: { pool?: VehicleListing[] }) {
  const { recentlyViewed, wishlist } = useVehicleMarketStore();
  const recommended = getAIRecommendations(recentlyViewed, wishlist, pool);

  if (!recommended.length) return null;

  return (
    <section className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">AI Picks For You</h2>
      </div>
      <p className="text-sm text-muted-foreground">Based on your browsing history and preferences</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} index={i} />
        ))}
      </div>
    </section>
  );
}
