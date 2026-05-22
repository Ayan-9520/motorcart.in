import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { useFinanceDesk } from "../hooks/useFinanceDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { FinanceStatCards } from "../components/FinanceStatCards";
import { ApprovalPipelineBoard } from "../components/ApprovalPipelineBoard";
import { LeadInbox } from "../components/LeadInbox";
import { FinanceApplicationsTable } from "../components/FinanceApplicationsTable";
import {
  distributeFinanceLead,
  updateApplicationStatus,
} from "../services/finance.service";
import type { FinanceStatus } from "@/types/database";
import toast from "react-hot-toast";

export function FinanceLoanCrmPage() {
  const { applications, leads, analytics, loading, refetch } = useFinanceDesk("manager");
  const [distributing, setDistributing] = useState<string | null>(null);

  useEffect(() => {
    setPageMeta({ title: "Loan CRM — Finance command" });
  }, []);

  const advance = async (id: string, status: FinanceStatus) => {
    const { error } = await updateApplicationStatus(id, status);
    if (error) toast.error(error.message ?? "Update failed");
    else {
      toast.success(`Moved to ${status}`);
      refetch();
    }
  };

  const distribute = async (leadId: string) => {
    setDistributing(leadId);
    const r = await distributeFinanceLead(leadId);
    if (!r.ok) toast.error(r.error ?? "Distribution failed");
    else {
      toast.success("Lead assigned to DSA & bank");
      refetch();
    }
    setDistributing(null);
  };

  return (
    <FinanceDashboardShell
      variant="manager"
      title="Loan CRM"
      subtitle="Central lead desk · pipeline · application tracking across all DSAs"
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/finance-manager/applications">All applications</Link>
        </Button>
      }
    >
      <FinanceStatCards analytics={analytics} />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="fin-section">
          <h2 className="fin-section__title">Lead distribution</h2>
          <LeadInbox leads={leads} onDistribute={distribute} distributing={distributing} />
        </section>
        <section className="fin-section">
          <h2 className="fin-section__title">Pipeline snapshot</h2>
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <ApprovalPipelineBoard
              applications={applications.slice(0, 12)}
              detailBasePath="/dashboard/finance-manager/applications"
              canAdvance
              onAdvance={advance}
            />
          )}
        </section>
      </div>
      <section className="fin-section">
        <h2 className="fin-section__title">Recent applications</h2>
        <FinanceApplicationsTable
          applications={applications.slice(0, 8)}
          detailBasePath="/dashboard/finance-manager/applications"
        />
      </section>
    </FinanceDashboardShell>
  );
}
