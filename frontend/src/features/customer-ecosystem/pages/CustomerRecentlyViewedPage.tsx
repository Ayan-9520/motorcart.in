import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";
import type { VehicleListing } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { setPageMeta } from "@/utils/seo";

export function CustomerRecentlyViewedPage() {
  const recentlyViewed = useVehicleMarketStore((s) => s.recentlyViewed);
  const listings = recentlyViewed
    .map((id) => MOCK_VEHICLES.find((v) => v.id === id))
    .filter((v): v is VehicleListing => Boolean(v));

  useEffect(() => {
    setPageMeta({ title: "Recently Viewed" });
  }, []);

  return (
    <CustomerEcosystemPage title="Recently viewed" description="Pick up where you left off in the marketplace.">
      {listings.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
      ) : (
        <div className="cos-empty">
          <Eye className="h-10 w-10 text-muted-foreground/50" />
          <p>No recently viewed vehicles yet.</p>
          <Button className="rounded-xl" asChild>
            <Link to="/buy">Browse marketplace</Link>
          </Button>
        </div>
      )}
    </CustomerEcosystemPage>
  );
}
