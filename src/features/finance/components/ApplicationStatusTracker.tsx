import { CheckCircle2, Circle, Clock, XCircle } from "lucide-react";
import type { FinanceStatus } from "@/types/database";
import { cn } from "@/lib/utils";

const STEPS: { status: FinanceStatus; label: string }[] = [
  { status: "submitted", label: "Submitted" },
  { status: "processing", label: "Processing" },
  { status: "approved", label: "Approved" },
  { status: "disbursed", label: "Disbursed" },
];

interface ApplicationStatusTrackerProps {
  status: FinanceStatus;
  approvalProbability?: number | null;
}

export function ApplicationStatusTracker({ status, approvalProbability }: ApplicationStatusTrackerProps) {
  if (status === "rejected") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-700 dark:text-red-400">
        <XCircle className="h-5 w-5" />
        Application rejected — contact your DSA for details.
      </div>
    );
  }

  const idx = STEPS.findIndex((s) => s.status === status);
  const activeIdx = idx >= 0 ? idx : status === "draft" ? -1 : 0;

  return (
    <div className="space-y-4">
      {approvalProbability != null && (
        <p className="text-sm">
          AI approval probability: <strong className="text-primary">{approvalProbability}%</strong>
        </p>
      )}
      <ol className="flex flex-wrap gap-2 sm:gap-0 sm:justify-between">
        {STEPS.map((step, i) => {
          const done = i <= activeIdx;
          const current = i === activeIdx;
          return (
            <li key={step.status} className="flex items-center gap-2 text-sm">
              {done ? (
                <CheckCircle2 className={cn("h-5 w-5", current ? "text-primary" : "text-primary/60")} />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground/40" />
              )}
              <span className={cn(current && "font-semibold text-primary")}>{step.label}</span>
              {i < STEPS.length - 1 && <span className="hidden sm:inline text-muted-foreground mx-2">→</span>}
            </li>
          );
        })}
      </ol>
      {status === "draft" && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> Complete your application to submit
        </p>
      )}
    </div>
  );
}
