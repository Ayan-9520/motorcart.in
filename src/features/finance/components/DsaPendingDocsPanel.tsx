import { Link } from "react-router-dom";
import { FileWarning } from "lucide-react";
import type { PendingDocRow } from "../lib/dsa-desk-utils";

interface DsaPendingDocsPanelProps {
  rows: PendingDocRow[];
}

export function DsaPendingDocsPanel({ rows }: DsaPendingDocsPanelProps) {
  if (!rows.length) {
    return (
      <p className="fin-dsa-empty rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
        All active applications have required documents uploaded.
      </p>
    );
  }

  return (
    <ul className="fin-dsa-docs">
      {rows.map((row) => (
        <li key={row.applicationId} className="fin-dsa-docs__row">
          <div className="fin-dsa-docs__icon">
            <FileWarning className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm">{row.applicantLabel}</p>
            <p className="text-xs text-muted-foreground">{row.bankName}</p>
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
              Missing: {row.missingDocs.join(", ")}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-bold tabular-nums">
              {row.uploadedCount}/{row.totalRequired}
            </p>
            <Link
              to={`/dashboard/dsa/applications?id=${row.applicationId}`}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Chase docs
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
