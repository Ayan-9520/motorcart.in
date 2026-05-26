import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { useFinanceDesk } from "../hooks/useFinanceDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { FinanceStatCards } from "../components/FinanceStatCards";
import { FinanceAnalyticsCharts } from "../components/FinanceAnalyticsCharts";
import { ApprovalPipelineBoard } from "../components/ApprovalPipelineBoard";
import { LeadInbox } from "../components/LeadInbox";
import { BankIntegrationPanel } from "../components/BankIntegrationPanel";
import {
  getStatusChartData,
  getVolumeChartData,
  distributeFinanceLead,
  updateApplicationStatus,
  fetchBankIntegrations,
} from "../services/finance.service";
import type { FinanceStatus } from "@/types/database";
import type { BankIntegrationConfig } from "../types";
import toast from "react-hot-toast";

export function FinanceManagerDashboardPage() {
  const { applications, leads, analytics, loading, refetch } = useFinanceDesk("manager");
  const [integrations, setIntegrations] = useState<BankIntegrationConfig[]>([]);
  const [distributing, setDistributing] = useState<string | null>(null);

  useEffect(() => {
    setPageMeta({ title: "Finance command center — Motorcart" });
    void fetchBankIntegrations().then(setIntegrations);
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
      title="Finance command center"
      subtitle="Lead distribution · approval pipeline · bank integrations · commissions"
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/finance-manager/applications">All applications</Link>
        </Button>
      }
    >
      <FinanceStatCards analytics={analytics} />
      <FinanceAnalyticsCharts
        statusData={getStatusChartData(applications)}
        volumeData={getVolumeChartData(applications)}
      />

      <section className="fin-section">
        <h2 className="fin-section__title">Approval pipeline</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading pipeline…</p>
        ) : (
          <ApprovalPipelineBoard
            applications={applications.slice(0, 40)}
            detailBasePath="/dashboard/finance-manager/applications"
            canAdvance
            onAdvance={advance}
          />
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="fin-section">
          <h2 className="fin-section__title">Lead distribution</h2>
          <LeadInbox leads={leads} onDistribute={distribute} distributing={distributing} />
        </section>
        <section className="fin-section">
          <h2 className="fin-section__title">Bank integrations</h2>
          <BankIntegrationPanel configs={integrations} />
        </section>
      </div>
    </FinanceDashboardShell>
  );
}
