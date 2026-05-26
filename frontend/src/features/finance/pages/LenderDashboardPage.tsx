import { useEffect, useState } from "react";
import { setPageMeta } from "@/utils/seo";
import { useFinanceDesk } from "../hooks/useFinanceDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { FinanceStatCards } from "../components/FinanceStatCards";
import { FinanceAnalyticsCharts } from "../components/FinanceAnalyticsCharts";
import { ApprovalPipelineBoard } from "../components/ApprovalPipelineBoard";
import { BankIntegrationPanel } from "../components/BankIntegrationPanel";
import {
  getStatusChartData,
  getVolumeChartData,
  updateApplicationStatus,
  fetchBankIntegrations,
} from "../services/finance.service";
import type { FinanceStatus } from "@/types/database";
import type { BankIntegrationConfig } from "../types";
import toast from "react-hot-toast";

export function LenderDashboardPage() {
  const { applications, analytics, loading, refetch } = useFinanceDesk("lender");
  const [integrations, setIntegrations] = useState<BankIntegrationConfig[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Lender console — Motorcart" });
    void fetchBankIntegrations().then(setIntegrations);
  }, []);

  const advance = async (id: string, status: FinanceStatus) => {
    const { error } = await updateApplicationStatus(id, status);
    if (error) toast.error(error.message ?? "Update failed");
    else {
      toast.success(`Application ${status}`);
      refetch();
    }
  };

  return (
    <FinanceDashboardShell
      variant="lender"
      title="Lender console"
      subtitle="Bank / NBFC approval queue · integration-ready APIs"
    >
      <FinanceStatCards analytics={analytics} />
      <FinanceAnalyticsCharts
        statusData={getStatusChartData(applications)}
        volumeData={getVolumeChartData(applications)}
      />

      <section className="fin-section">
        <h2 className="fin-section__title">Approval queue</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <ApprovalPipelineBoard
            applications={applications}
            detailBasePath="/dashboard/finance/applications"
            canAdvance
            onAdvance={advance}
          />
        )}
      </section>

      <section className="fin-section">
        <h2 className="fin-section__title">Partner integration</h2>
        <BankIntegrationPanel configs={integrations} />
      </section>
    </FinanceDashboardShell>
  );
}
