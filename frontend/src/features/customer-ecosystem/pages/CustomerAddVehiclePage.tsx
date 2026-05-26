import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/shared/notifications/app-toast";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerAddVehiclePage() {
  const navigate = useNavigate();
  const { addVehicle, saving } = useCustomerEcosystem();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPageMeta({ title: "Add Vehicle" });
  }, []);

  return (
    <CustomerEcosystemPage
      title="Add vehicle"
      description="Register a car or bike to your digital garage — synced to your ownership wallet."
    >
      <form
        className="cos-form-card max-w-xl space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const fd = new FormData(e.currentTarget);
          const brand = String(fd.get("brand") ?? "").trim();
          const model = String(fd.get("model") ?? "").trim();
          const year = Number(fd.get("year"));
          if (!brand || !model || !year) {
            setError("Brand, model and year are required.");
            return;
          }
          const result = await addVehicle({
            brand,
            model,
            year,
            registrationNumber: String(fd.get("reg") ?? "").trim() || undefined,
          });
          if (result.ok) {
            notify.success("Vehicle added to your garage");
            navigate("/dashboard/customer/garage");
          } else {
            setError(result.error ?? "Could not save vehicle");
          }
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Brand</Label>
            <Input name="brand" placeholder="Hyundai" required className="mt-1 rounded-xl" />
          </div>
          <div>
            <Label>Model</Label>
            <Input name="model" placeholder="Creta" required className="mt-1 rounded-xl" />
          </div>
          <div>
            <Label>Year</Label>
            <Input name="year" type="number" min={1990} max={2030} placeholder="2022" required className="mt-1 rounded-xl" />
          </div>
          <div>
            <Label>Registration</Label>
            <Input name="reg" placeholder="MH 12 AB 4521" className="mt-1 rounded-xl" />
          </div>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <div className="flex gap-2">
          <Button type="submit" disabled={saving} className="rounded-xl">
            {saving ? "Saving…" : "Save vehicle"}
          </Button>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/dashboard/customer/garage">Cancel</Link>
          </Button>
        </div>
      </form>
    </CustomerEcosystemPage>
  );
}
