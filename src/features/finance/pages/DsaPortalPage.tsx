import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { useDsaDesk } from "../hooks/useDsaDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { FinanceStatCards } from "../components/FinanceStatCards";
import { FinanceAnalyticsCharts } from "../components/FinanceAnalyticsCharts";
import { ApprovalPipelineBoard } from "../components/ApprovalPipelineBoard";
import { CommissionLedger } from "../components/CommissionLedger";
import { DsaWorkspaceNav } from "../components/DsaWorkspaceNav";
import { DsaPendingDocsPanel } from "../components/DsaPendingDocsPanel";
import { DsaCibilPanel } from "../components/DsaCibilPanel";
import { DsaBankApprovalsGrid } from "../components/DsaBankApprovalsGrid";
import { DsaTeamPanel } from "../components/DsaTeamPanel";
import { FeaturedPartnerBanksStrip } from "../components/FeaturedPartnerBanksStrip";
import {
  getStatusChartData,
  getVolumeChartData,
  updateApplicationStatus,
} from "../services/finance.service";
import {
  getBankApprovalStats,
  getCibilOverview,
  getPendingDocRows,
} from "../lib/dsa-desk-utils";
import type { FinanceStatus } from "@/types/database";
import toast from "react-hot-toast";

export function DsaPortalPage() {
  const { applications, commissions, team, analytics, loading, refetch } = useDsaDesk();
  const pendingDocs = getPendingDocRows(applications);
  const cibil = getCibilOverview(applications);
  const bankStats = getBankApprovalStats(applications);

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
      title="DSA fintech workspace"
      subtitle="Lead pipeline · pending docs · CIBIL · bank approvals · commissions · team"
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/dsa/applications">All applications</Link>
        </Button>
      }
    >
      <DsaWorkspaceNav />

      <FinanceStatCards analytics={analytics} showPipeline />
      <FinanceAnalyticsCharts
        statusData={getStatusChartData(applications)}
        volumeData={getVolumeChartData(applications)}
      />

      <section id="pipeline" className="fin-section scroll-mt-24">
        <h2 className="fin-section__title">Lead pipeline</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <ApprovalPipelineBoard
            applications={applications}
            detailBasePath="/dashboard/dsa/applications"
            canAdvance
            onAdvance={advance}
          />
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section id="pending-docs" className="fin-section scroll-mt-24">
          <h2 className="fin-section__title">Pending documents</h2>
          <DsaPendingDocsPanel rows={pendingDocs} />
        </section>
        <section id="cibil" className="fin-section scroll-mt-24">
          <h2 className="fin-section__title">CIBIL status</h2>
          <DsaCibilPanel {...cibil} />
        </section>
      </div>

      <section id="bank-approvals" className="fin-section scroll-mt-24">
        <h2 className="fin-section__title">Bank approvals — partner lenders</h2>
        <DsaBankApprovalsGrid stats={bankStats} />
      </section>

      <section id="commissions" className="fin-section scroll-mt-24">
        <h2 className="fin-section__title">Commission tracking</h2>
        <CommissionLedger commissions={commissions} />
      </section>

      <section id="team" className="fin-section scroll-mt-24">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="fin-section__title mb-0">Team management</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/dsa/team">Manage team</Link>
          </Button>
        </div>
        <DsaTeamPanel members={team.slice(0, 3)} />
      </section>

      <FeaturedPartnerBanksStrip compact />
    </FinanceDashboardShell>
  );
}
