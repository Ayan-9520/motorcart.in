import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { CustomerVehicleCard } from "../components/CustomerVehicleCard";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerGaragePage() {
  const { data, loading } = useCustomerEcosystem();

  useEffect(() => {
    setPageMeta({ title: "My Garage", description: "Your vehicles, documents & ownership timeline." });
  }, []);

  return (
    <CustomerEcosystemPage
      title="My Garage"
      description="Every vehicle you own — health, insurance, service & resale in one place."
      actions={
        <Button className="rounded-xl" asChild>
          <Link to="/dashboard/customer/garage/add">
            <Plus className="mr-1 h-4 w-4" /> Add vehicle
          </Link>
        </Button>
      }
    >
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="cos-vehicle-card cos-vehicle-card--skeleton h-80" />
          ))}
        </div>
      ) : data?.vehicles.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {data.vehicles.map((v) => (
            <CustomerVehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      ) : (
        <div className="cos-empty">
          <p>No vehicles yet. Add your RC to unlock the ownership wallet.</p>
          <Button asChild>
            <Link to="/dashboard/customer/garage/add">Add first vehicle</Link>
          </Button>
        </div>
      )}
    </CustomerEcosystemPage>
  );
}
