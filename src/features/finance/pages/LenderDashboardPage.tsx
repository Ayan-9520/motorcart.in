import { useEffect } from "react";
import { Building2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useLoanApplications } from "../hooks/useLoanApplications";
import { getFinanceAnalytics, updateApplicationStatus } from "../services/finance.service";
import type { FinanceStatus } from "@/types/database";
import toast from "react-hot-toast";

export function LenderDashboardPage() {
  const { applications, loading, refetch } = useLoanApplications("lender");
  const analytics = getFinanceAnalytics(applications);

  useEffect(() => {
    setPageMeta({ title: "Lender Dashboard — Motorcart.in" });
  }, []);

  const setStatus = async (id: string, status: FinanceStatus) => {
    const { error } = await updateApplicationStatus(id, status);
    if (error) toast.error(error.message);
    else {
      toast.success(`Application ${status}`);
      refetch();
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Lender dashboard</h1>
          <p className="text-muted-foreground">Review applications, approval workflows & analytics</p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Applications</p>
            <p className="text-2xl font-bold">{analytics.totalApplications}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold text-primary">{analytics.approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Avg approval %</p>
            <p className="text-2xl font-bold">{analytics.avgApprovalProbability}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Disbursed volume</p>
            <p className="text-2xl font-bold">{formatCurrency(analytics.totalDisbursed)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading && <p className="text-muted-foreground">Loading...</p>}
          {applications.map((app) => (
            <article key={app.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
              <div>
                <p className="font-medium">{formatCurrency(app.loanAmount)}</p>
                <p className="text-sm text-muted-foreground">
                  {app.tenureMonths} mo · AI score {app.aiEligibilityScore ?? "—"} · {app.approvalProbability ?? "—"}% prob
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{app.status}</Badge>
                {app.status === "processing" && (
                  <>
                    <Button size="sm" className="gap-1" variant="default" onClick={() => setStatus(app.id, "approved")}>
                      <CheckCircle2 className="h-4 w-4" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => setStatus(app.id, "rejected")}>
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  </>
                )}
                {app.status === "submitted" && (
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => setStatus(app.id, "processing")}>
                    <Clock className="h-4 w-4" /> Review
                  </Button>
                )}
              </div>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
