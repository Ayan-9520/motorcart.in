import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ApplicationStatusTracker } from "./ApplicationStatusTracker";
import type { LoanApplication } from "../types";
import { applicantLabel } from "../lib/dsa-desk-utils";

interface FinanceApplicationsTableProps {
  applications: LoanApplication[];
  detailBasePath?: string;
  showTracker?: boolean;
}

export function FinanceApplicationsTable({
  applications,
  detailBasePath = "/dashboard/dsa/applications",
  showTracker = false,
}: FinanceApplicationsTableProps) {
  if (!applications.length) {
    return (
      <p className="fin-dsa-empty rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        No applications in this view yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <article key={app.id} className="fin-apps-table__card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link
                to={`${detailBasePath}?id=${app.id}`}
                className="text-base font-semibold hover:text-primary"
              >
                {applicantLabel(app)}
              </Link>
              <p className="text-sm text-muted-foreground">
                {app.bankName ?? "—"} · {formatCurrency(app.loanAmount)} · {app.tenureMonths} mo
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {app.cibilScore != null && (
                <Badge variant="secondary" className="tabular-nums">
                  CIBIL {app.cibilScore}
                </Badge>
              )}
              <Badge variant="outline" className="capitalize">
                {app.status}
              </Badge>
            </div>
          </div>
          {showTracker && (
            <ApplicationStatusTracker
              status={app.status}
              approvalProbability={app.approvalProbability}
            />
          )}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
            <span>Docs {app.documents.length}/5</span>
            {app.approvalProbability != null && (
              <span>Approval {app.approvalProbability}%</span>
            )}
            {app.emiAmount != null && <span>EMI {formatCurrency(app.emiAmount)}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}
