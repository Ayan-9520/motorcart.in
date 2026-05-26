import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { setPageMeta } from "@/utils/seo";
import { useFinanceDesk } from "../hooks/useFinanceDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { ApprovalPipelineBoard } from "../components/ApprovalPipelineBoard";
import { ApplicationStatusTracker } from "../components/ApplicationStatusTracker";
import { VerificationTracker } from "../components/VerificationTracker";
import {
  fetchApplicationById,
  fetchVerifications,
  updateApplicationStatus,
  updateVerification,
} from "../services/finance.service";
import { formatCurrency } from "@/lib/utils";
import type { FinanceStatus } from "@/types/database";
import type { LoanApplication, FinanceVerification } from "../types";
import { useState } from "react";
import toast from "react-hot-toast";

export function FinanceManagerApplicationsPage() {
  const { id } = useParams<{ id: string }>();
  const { applications, loading, refetch } = useFinanceDesk("manager");
  const [detail, setDetail] = useState<LoanApplication | null>(null);
  const [verifications, setVerifications] = useState<FinanceVerification[]>([]);

  useEffect(() => {
    setPageMeta({ title: id ? "Application review" : "Finance applications" });
    if (id) {
      void fetchApplicationById(id).then(async (app) => {
        setDetail(app);
        if (app) setVerifications(await fetchVerifications(app.id));
      });
    } else {
      setDetail(null);
    }
  }, [id]);

  const advance = async (appId: string, status: FinanceStatus) => {
    const { error } = await updateApplicationStatus(appId, status);
    if (error) toast.error(error.message ?? "Failed");
    else {
      toast.success(`Status: ${status}`);
      refetch();
      if (id) {
        const app = await fetchApplicationById(id);
        setDetail(app);
        if (app) setVerifications(await fetchVerifications(app.id));
      }
    }
  };

  const verify = async (vid: string, status: "approved" | "rejected") => {
    await updateVerification(vid, status);
    if (detail) setVerifications(await fetchVerifications(detail.id));
    toast.success(`Verification ${status}`);
  };

  if (id && detail) {
    return (
      <FinanceDashboardShell variant="manager" title={detail.bankName ?? "Application"} subtitle={detail.id.slice(0, 8)}>
        <p className="text-lg font-semibold">{formatCurrency(detail.loanAmount)} · {detail.tenureMonths} months</p>
        <ApplicationStatusTracker status={detail.status} approvalProbability={detail.approvalProbability} />
        <VerificationTracker verifications={verifications} editable onUpdate={verify} />
        <Link to="/dashboard/finance-manager/applications" className="text-sm text-primary">
          ← Back to pipeline
        </Link>
      </FinanceDashboardShell>
    );
  }

  return (
    <FinanceDashboardShell variant="manager" title="All applications" subtitle="Full approval pipeline">
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <ApprovalPipelineBoard
          applications={applications}
          detailBasePath="/dashboard/finance-manager/applications"
          canAdvance
          onAdvance={advance}
        />
      )}
    </FinanceDashboardShell>
  );
}
