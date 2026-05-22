import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { setPageMeta } from "@/utils/seo";

export function CustomerAddVehiclePage() {
  useEffect(() => {
    setPageMeta({ title: "Add Vehicle" });
  }, []);

  return (
    <CustomerEcosystemPage
      title="Add vehicle"
      description="Register a car or bike to your digital garage. RC scan & OCR coming soon."
    >
      <form
        className="cos-form-card max-w-xl space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Brand</Label>
            <Input name="brand" placeholder="Hyundai" className="mt-1 rounded-xl" />
          </div>
          <div>
            <Label>Model</Label>
            <Input name="model" placeholder="Creta" className="mt-1 rounded-xl" />
          </div>
          <div>
            <Label>Year</Label>
            <Input name="year" type="number" placeholder="2022" className="mt-1 rounded-xl" />
          </div>
          <div>
            <Label>Registration</Label>
            <Input name="reg" placeholder="MH 12 AB 4521" className="mt-1 rounded-xl" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Saves to your garage when backend migration is applied. Demo data remains until then.
        </p>
        <div className="flex gap-2">
          <Button type="submit" className="rounded-xl">
            Save vehicle
          </Button>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/dashboard/customer/garage">Cancel</Link>
          </Button>
        </div>
      </form>
    </CustomerEcosystemPage>
  );
}
