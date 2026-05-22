import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CustomerInsuranceWalletPanel } from "../components/CustomerInsuranceWalletPanel";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerInsuranceWalletPage() {
  const { data } = useCustomerEcosystem();

  useEffect(() => {
    setPageMeta({ title: "Insurance Wallet" });
  }, []);

  return (
    <CustomerEcosystemPage
      title="Insurance wallet"
      description="ACKO / Park+ style policy hub — renewals, claims & savings."
      actions={
        <Button variant="outline" size="sm" className="rounded-xl" asChild>
          <Link to="/dashboard/customer/insurance">Application history</Link>
        </Button>
      }
    >
      <CustomerInsuranceWalletPanel policies={data?.insurance ?? []} />
    </CustomerEcosystemPage>
  );
}
