import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { groupApplicationsByStage } from "../lib/finance-realtime";
import { FINANCE_PIPELINE_STAGES } from "../lib/finance-pipeline";
import type { LoanApplication } from "../types";
import type { FinanceStatus } from "@/types/database";
interface ApprovalPipelineBoardProps {
  applications: LoanApplication[];
  detailBasePath?: string;
  onAdvance?: (id: string, status: FinanceStatus) => void;
  canAdvance?: boolean;
}

const NEXT: Partial<Record<FinanceStatus, FinanceStatus>> = {
  submitted: "processing",
  processing: "approved",
  approved: "disbursed",
};

export function ApprovalPipelineBoard({
  applications,
  detailBasePath = "/dashboard/customer/loans",
  onAdvance,
  canAdvance,
}: ApprovalPipelineBoardProps) {
  const buckets = groupApplicationsByStage(applications);
  const columns = [...FINANCE_PIPELINE_STAGES, { status: "rejected" as const, label: "Rejected", description: "" }];

  return (
    <div className="fin-pipeline">
      {columns.map((col) => {
        const key = col.status === "rejected" ? "rejected" : col.status;
        const items = buckets[key] ?? [];
        return (
          <section key={key} className="fin-pipeline__col">
            <header className="fin-pipeline__col-head">
              <h3>{col.label}</h3>
              <span className="fin-pipeline__count">{items.length}</span>
            </header>
            <ul className="fin-pipeline__list">
              {items.map((app) => (
                <li key={app.id} className="fin-pipeline__card">
                  <Link to={`${detailBasePath}/${app.id}`} className="fin-pipeline__card-title">
                    {app.bankName ?? "Loan"} · {formatCurrency(app.loanAmount)}
                  </Link>
                  <p className="fin-pipeline__meta">
                    {app.approvalProbability ?? "—"}% · {app.tenureMonths} mo
                  </p>
                  {canAdvance && onAdvance && NEXT[app.status] && app.status !== "rejected" && (
                    <button
                      type="button"
                      className="fin-pipeline__advance"
                      onClick={() => onAdvance(app.id, NEXT[app.status]!)}
                    >
                      → {NEXT[app.status]}
                    </button>
                  )}
                </li>
              ))}
              {!items.length && <li className="fin-pipeline__empty">No cases</li>}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
