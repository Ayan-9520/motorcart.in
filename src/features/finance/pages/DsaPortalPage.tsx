import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { useFinanceDesk } from "../hooks/useFinanceDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { FinanceStatCards } from "../components/FinanceStatCards";
import { FinanceAnalyticsCharts } from "../components/FinanceAnalyticsCharts";
import { ApprovalPipelineBoard } from "../components/ApprovalPipelineBoard";
import { CommissionLedger } from "../components/CommissionLedger";
import {
  getStatusChartData,
  getVolumeChartData,
  updateApplicationStatus,
} from "../services/finance.service";
import type { FinanceStatus } from "@/types/database";
import toast from "react-hot-toast";

export function DsaPortalPage() {
  const { applications, commissions, analytics, loading, refetch } = useFinanceDesk("dsa");

  useEffect(() => {
    setPageMeta({ title: "DSA Portal — Motorcart Finance" });
  }, []);

  const advance = async (id: string, status: FinanceStatus) => {
    const { error } = await updateApplicationStatus(id, status);
    if (error) toast.error(error.message ?? "Update failed");
    else {
      toast.success(`Updated to ${status}`);
      refetch();
    }
  };

  return (
    <FinanceDashboardShell
      variant="dsa"
      title="DSA workspace"
      subtitle="Assigned leads · approval workflow · commission ledger"
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/dsa/applications">Application list</Link>
        </Button>
      }
    >
      <FinanceStatCards analytics={analytics} showPipeline={false} />
      <FinanceAnalyticsCharts
        statusData={getStatusChartData(applications)}
        volumeData={getVolumeChartData(applications)}
      />

      <section className="fin-section">
        <h2 className="fin-section__title">Your pipeline</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <ApprovalPipelineBoard
            applications={applications}
            detailBasePath="/dashboard/customer/loans"
            canAdvance
            onAdvance={advance}
          />
        )}
      </section>

      <section className="fin-section">
        <h2 className="fin-section__title">Commissions</h2>
        <CommissionLedger commissions={commissions} />
      </section>
    </FinanceDashboardShell>
  );
}
