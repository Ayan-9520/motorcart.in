import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PiggyBank, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerInsuranceWalletPanel } from "../components/CustomerInsuranceWalletPanel";
import { CustomerInsuranceClaimsPanel } from "../components/CustomerInsuranceClaimsPanel";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerInsuranceWalletPage() {
  const { data } = useCustomerEcosystem();
  const savingsEstimate = 1200;

  useEffect(() => {
    setPageMeta({ title: "Insurance Wallet" });
  }, []);

  return (
    <CustomerEcosystemPage
      title="Insurance wallet"
      description="ACKO / Park+ style — policies, renewals, claims & savings."
      actions={
        <Button variant="outline" size="sm" className="rounded-xl" asChild>
          <Link to="/dashboard/customer/insurance">Application history</Link>
        </Button>
      }
      wide
    >
      <div className="cos-insurance-savings">
        <PiggyBank className="h-8 w-8 text-primary" />
        <div>
          <p className="font-semibold">Renew & save up to ₹{savingsEstimate.toLocaleString("en-IN")}</p>
          <p className="text-sm text-muted-foreground">35% NCB retained on Creta · compare ACKO, Digit & ICICI</p>
        </div>
        <Button className="rounded-xl shrink-0" asChild>
          <Link to="/insurance/compare">
            <Shield className="mr-1 h-4 w-4" /> Compare plans
          </Link>
        </Button>
      </div>

      <CustomerInsuranceWalletPanel policies={data?.insurance ?? []} />

      <section className="mt-8 space-y-3">
        <h3 className="font-semibold">Claim history</h3>
        <CustomerInsuranceClaimsPanel claims={data?.insuranceClaims ?? []} />
      </section>
    </CustomerEcosystemPage>
  );
}
