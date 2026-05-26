import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useInsuranceApplications } from "../hooks/useInsuranceApplications";
import { planTypeLabel } from "../lib/insurance-premium";
import { FinanceDashboardShell } from "@/features/finance/components/FinanceDashboardShell";

export function CustomerInsurancePage() {
  const { applications, loading } = useInsuranceApplications();

  useEffect(() => {
    setPageMeta({ title: "My insurance — Motorcart" });
  }, []);

  return (
    <FinanceDashboardShell
      variant="customer"
      title="My insurance"
      subtitle="Track policy applications, renewals & claim support"
      actions={
        <Button className="rounded-full" asChild>
          <Link to="/insurance">
            <Plus className="h-4 w-4 mr-1" /> New policy
          </Link>
        </Button>
      }
    >
      {loading && <p className="text-muted-foreground">Loading policies…</p>}

      {!loading && applications.length === 0 && (
        <div className="ins-empty-policy rounded-2xl border border-dashed p-12 text-center">
          <Shield className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">No insurance policies yet</p>
          <Button className="mt-4 rounded-full" asChild>
            <Link to="/insurance">Get car or bike insurance</Link>
          </Button>
        </div>
      )}

      <ul className="space-y-4">
        {applications.map((app) => (
          <li key={app.id} className="ins-policy-card">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-semibold">{app.partnerName ?? "Insurer"}</p>
                <p className="text-sm text-muted-foreground">
                  {app.vehicleMake} {app.vehicleModel} · {planTypeLabel(app.planType)}
                </p>
              </div>
              <Badge variant="outline" className="capitalize">
                {app.status.replace(/_/g, " ")}
              </Badge>
            </div>
            <p className="mt-2 text-lg font-bold text-primary">{formatCurrency(app.annualPremium)} / yr</p>
            {app.policyNumber && (
              <p className="text-xs text-muted-foreground">Policy #{app.policyNumber}</p>
            )}
          </li>
        ))}
      </ul>
    </FinanceDashboardShell>
  );
}
