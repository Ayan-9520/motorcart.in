import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, FileText, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useLoanApplications } from "../hooks/useLoanApplications";
import { getFinanceAnalytics } from "../services/finance.service";
import { updateApplicationStatus } from "../services/finance.service";
import type { FinanceStatus } from "@/types/database";
import toast from "react-hot-toast";

export function DsaPortalPage() {
  const { applications, loading, refetch } = useLoanApplications("dsa");
  const analytics = getFinanceAnalytics(applications);

  useEffect(() => {
    setPageMeta({ title: "DSA Portal — Motorcart.in" });
  }, []);

  const setStatus = async (id: string, status: FinanceStatus) => {
    const { error } = await updateApplicationStatus(id, status);
    if (error) toast.error(error.message);
    else {
      toast.success(`Updated to ${status}`);
      refetch();
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">DSA portal</h1>
        <p className="text-muted-foreground">Assigned applications & approval workflows</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Assigned</p>
              <p className="text-2xl font-bold">{analytics.totalApplications}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">In processing</p>
              <p className="text-2xl font-bold">{analytics.submitted}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <IndianRupee className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Disbursed</p>
              <p className="text-2xl font-bold">{formatCurrency(analytics.totalDisbursed)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your pipeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading && <p className="text-muted-foreground">Loading...</p>}
          {applications.map((app) => (
            <article key={app.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
              <div>
                <p className="font-medium">{app.bankName ?? "Application"}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(app.loanAmount)} · {app.approvalProbability ?? "—"}% approval
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{app.status}</Badge>
                {app.status === "submitted" && (
                  <Button size="sm" variant="outline" onClick={() => setStatus(app.id, "processing")}>
                    Start processing
                  </Button>
                )}
                {app.status === "processing" && (
                  <>
                    <Button size="sm" variant="default" onClick={() => setStatus(app.id, "approved")}>Approve</Button>
                    <Button size="sm" variant="outline" onClick={() => setStatus(app.id, "rejected")}>Reject</Button>
                  </>
                )}
                {app.status === "approved" && (
                  <Button size="sm" variant="default" onClick={() => setStatus(app.id, "disbursed")}>Mark disbursed</Button>
                )}
              </div>
            </article>
          ))}
          {!loading && applications.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No assigned applications yet.</p>
          )}
        </CardContent>
      </Card>

      <Button variant="outline" asChild>
        <Link to="/dashboard/dsa/applications">View all applications</Link>
      </Button>
    </div>
  );
}
