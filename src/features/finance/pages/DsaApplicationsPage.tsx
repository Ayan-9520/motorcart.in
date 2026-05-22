import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { setPageMeta } from "@/utils/seo";
import { useDsaDesk } from "../hooks/useDsaDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { DsaWorkspaceNav } from "../components/DsaWorkspaceNav";
import { FinanceApplicationsTable } from "../components/FinanceApplicationsTable";
import { ApplicationStatusTracker } from "../components/ApplicationStatusTracker";
import { Input } from "@/components/ui/input";
import { applicantLabel } from "../lib/dsa-desk-utils";

export function DsaApplicationsPage() {
  const [params, setParams] = useSearchParams();
  const focusId = params.get("id");
  const q = (params.get("q") ?? "").toLowerCase();
  const { applications, loading } = useDsaDesk();

  const filtered = useMemo(() => {
    if (!q) return applications;
    return applications.filter(
      (a) =>
        applicantLabel(a).toLowerCase().includes(q) ||
        (a.bankName ?? "").toLowerCase().includes(q) ||
        a.status.includes(q)
    );
  }, [applications, q]);

  const focused = focusId ? applications.find((a) => a.id === focusId) : null;

  useEffect(() => {
    setPageMeta({ title: "DSA Applications — Motorcart Finance" });
  }, []);

  return (
    <FinanceDashboardShell
      variant="dsa"
      title="Application tracking"
      subtitle="Track every loan file — status, CIBIL, documents & bank stage"
    >
      <DsaWorkspaceNav />

      <div className="fin-apps-toolbar">
        <Input
          placeholder="Search applicant, bank or status…"
          value={params.get("q") ?? ""}
          onChange={(e) => {
            const next = new URLSearchParams(params);
            if (e.target.value) next.set("q", e.target.value);
            else next.delete("q");
            setParams(next, { replace: true });
          }}
          className="max-w-md"
        />
      </div>

      {focused && (
        <article className="fin-detail__card space-y-4 mb-6">
          <h3 className="text-lg font-semibold">{applicantLabel(focused)}</h3>
          <ApplicationStatusTracker
            status={focused.status}
            approvalProbability={focused.approvalProbability}
          />
        </article>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading applications…</p>
      ) : (
        <FinanceApplicationsTable applications={filtered} showTracker />
      )}
    </FinanceDashboardShell>
  );
}
