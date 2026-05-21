import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useFinanceDesk } from "../hooks/useFinanceDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { ApplicationStatusTracker } from "../components/ApplicationStatusTracker";

export function CustomerLoansPage() {
  const { applications, loading } = useFinanceDesk("customer");

  useEffect(() => {
    setPageMeta({ title: "My Loans — Motorcart Finance" });
  }, []);

  return (
    <FinanceDashboardShell
      variant="customer"
      title="My loans"
      subtitle="Track applications, documents & approval stages"
      actions={
        <Button className="rounded-full" asChild>
          <Link to="/finance/apply">
            <Plus className="h-4 w-4 mr-1" /> New application
          </Link>
        </Button>
      }
    >
      {loading && <p className="text-muted-foreground">Loading…</p>}

      {!loading && applications.length === 0 && (
        <div className="fin-detail__card py-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No loan applications yet</p>
          <Button className="mt-4 rounded-full" asChild>
            <Link to="/finance/apply">Apply for a loan</Link>
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <article key={app.id} className="fin-detail__card space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <Link to={`/dashboard/customer/loans/${app.id}`} className="text-lg font-semibold hover:text-primary">
                  {app.bankName ?? "Loan application"}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(app.loanAmount)} · {app.tenureMonths} months
                </p>
              </div>
              <Badge variant="outline" className="capitalize">
                {app.status}
              </Badge>
            </div>
            <ApplicationStatusTracker status={app.status} approvalProbability={app.approvalProbability} />
          </article>
        ))}
      </div>
    </FinanceDashboardShell>
  );
}
