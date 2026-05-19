import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useLoanApplications } from "../hooks/useLoanApplications";
import { ApplicationStatusTracker } from "../components/ApplicationStatusTracker";

export function CustomerLoansPage() {
  const { applications, loading } = useLoanApplications("customer");

  useEffect(() => {
    setPageMeta({ title: "My Loans — Motorcart.in" });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Finance dashboard</h1>
          <p className="text-muted-foreground">Track applications, documents & approval status</p>
        </div>
        <Button variant="default" asChild>
          <Link to="/finance/apply"><Plus className="h-4 w-4 mr-1" /> New application</Link>
        </Button>
      </div>

      {loading && <p className="text-muted-foreground">Loading...</p>}

      {!loading && applications.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">No loan applications yet</p>
            <Button className="mt-4" variant="default" asChild>
              <Link to="/finance/apply">Apply for a loan</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id}>
            <CardContent className="p-5 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{app.bankName ?? "Multi-lender"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(app.loanAmount)} · {app.tenureMonths} months
                  </p>
                </div>
                <Badge>{app.status}</Badge>
              </div>
              <ApplicationStatusTracker status={app.status} approvalProbability={app.approvalProbability} />
              <Button variant="outline" size="sm" asChild>
                <Link to={`/dashboard/customer/loans/${app.id}`}>View details & upload docs</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
