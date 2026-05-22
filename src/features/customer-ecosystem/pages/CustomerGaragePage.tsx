import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { CustomerVehicleCard } from "../components/CustomerVehicleCard";
import { CustomerOwnershipTimeline } from "../components/CustomerOwnershipTimeline";
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
      description="Digital vehicle wallet — RC, insurance, PUC, loan & service in one place."
      actions={
        <Button className="rounded-xl" asChild>
          <Link to="/dashboard/customer/garage/add">
            <Plus className="mr-1 h-4 w-4" /> Add vehicle
          </Link>
        </Button>
      }
      wide
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          {loading ? (
            <div className="grid gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="cos-vehicle-card cos-vehicle-card--skeleton h-96" />
              ))}
            </div>
          ) : data?.vehicles.length ? (
            <div className="grid gap-4">
              {data.vehicles.map((v) => (
                <CustomerVehicleCard key={v.id} vehicle={v} detailed />
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
        </div>

        <aside className="cos-form-card h-fit lg:sticky lg:top-24">
          <h3 className="font-semibold">Ownership timeline</h3>
          <p className="mt-1 text-xs text-muted-foreground">Purchase, finance, insurance & service milestones</p>
          <div className="mt-4">
            <CustomerOwnershipTimeline events={data?.timeline ?? []} />
          </div>
        </aside>
      </div>
    </CustomerEcosystemPage>
  );
}
