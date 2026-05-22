import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerFastagPage() {
  const { data } = useCustomerEcosystem();
  const primary = data?.vehicles.find((v) => v.isPrimary) ?? data?.vehicles[0];

  useEffect(() => {
    setPageMeta({ title: "FASTag" });
  }, []);

  return (
    <CustomerEcosystemPage title="FASTag" description="NHAI wallet balance & recharge — Park+ style.">
      <div className="cos-fastag-card max-w-lg">
        <p className="text-sm text-muted-foreground">{primary?.brand} {primary?.model}</p>
        <p className="mt-2 text-4xl font-bold tabular-nums">₹{primary?.fastagBalance?.toLocaleString("en-IN") ?? 0}</p>
        <p className="text-xs text-muted-foreground">Linked tag · {primary?.registrationNumber}</p>
        <div className="mt-6 flex gap-2">
          <Button className="rounded-xl">Recharge ₹500</Button>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/dashboard/customer/garage">Manage vehicles</Link>
          </Button>
        </div>
      </div>
    </CustomerEcosystemPage>
  );
}
