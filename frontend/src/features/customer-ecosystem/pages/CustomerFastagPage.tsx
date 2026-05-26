import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { notify } from "@/shared/notifications/app-toast";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerFastagPage() {
  const { data, rechargeFastag, saving } = useCustomerEcosystem();
  const primary = data?.vehicles.find((v) => v.isPrimary) ?? data?.vehicles[0];

  useEffect(() => {
    setPageMeta({ title: "FASTag" });
  }, []);

  async function handleRecharge(amount: number) {
    if (!primary) {
      notify.error("Add a vehicle first");
      return;
    }
    const result = await rechargeFastag(primary.id, amount);
    if (result.ok) notify.success(`FASTag recharged by ₹${amount.toLocaleString("en-IN")}`);
    else notify.error(result.error ?? "Recharge failed");
  }

  return (
    <CustomerEcosystemPage title="FASTag" description="NHAI wallet balance & recharge — Park+ style.">
      <div className="cos-fastag-card max-w-lg">
        <p className="text-sm text-muted-foreground">
          {primary ? `${primary.brand} ${primary.model}` : "No vehicle linked"}
        </p>
        <p className="mt-2 text-4xl font-bold tabular-nums">
          ₹{primary?.fastagBalance?.toLocaleString("en-IN") ?? 0}
        </p>
        <p className="text-xs text-muted-foreground">
          Linked tag · {primary?.registrationNumber ?? "Add registration in garage"}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button className="rounded-xl" disabled={!primary || saving} onClick={() => void handleRecharge(500)}>
            Recharge ₹500
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            disabled={!primary || saving}
            onClick={() => void handleRecharge(1000)}
          >
            ₹1,000
          </Button>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/dashboard/customer/garage">Manage vehicles</Link>
          </Button>
        </div>
      </div>
    </CustomerEcosystemPage>
  );
}
