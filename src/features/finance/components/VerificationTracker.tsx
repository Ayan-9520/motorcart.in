import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FinanceVerification } from "../types";

interface VerificationTrackerProps {
  verifications: FinanceVerification[];
  onUpdate?: (id: string, status: "approved" | "rejected") => void;
  editable?: boolean;
}

const LABELS: Record<string, string> = {
  identity: "Identity (Aadhaar/PAN)",
  income: "Income proof",
  cibil: "CIBIL / bureau",
  bank_statement: "Bank statements",
  address: "Address proof",
  vehicle_rc: "Vehicle RC",
  other: "Other",
};

export function VerificationTracker({ verifications, onUpdate, editable }: VerificationTrackerProps) {
  if (!verifications.length) {
    return (
      <p className="text-sm text-muted-foreground rounded-xl border border-dashed p-6 text-center">
        Verification checks start when application moves to processing.
      </p>
    );
  }

  const done = verifications.filter((v) => v.status === "approved").length;
  const pct = Math.round((done / verifications.length) * 100);

  return (
    <div className="fin-verify">
      <div className="fin-verify__progress">
        <span>KYC progress</span>
        <strong>{pct}%</strong>
        <div className="fin-verify__track">
          <div className="fin-verify__fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <ul className="fin-verify__list">
        {verifications.map((v) => (
          <li key={v.id} className={cn("fin-verify__item", `fin-verify__item--${v.status}`)}>
            {v.status === "approved" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : v.status === "rejected" ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : (
              <Clock className="h-5 w-5 text-amber-500" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{LABELS[v.checkType] ?? v.checkType}</p>
              {v.notes && <p className="text-xs text-muted-foreground">{v.notes}</p>}
            </div>
            {editable && onUpdate && v.status === "pending" && (
              <div className="flex gap-1">
                <button type="button" className="fin-verify__btn fin-verify__btn--ok" onClick={() => onUpdate(v.id, "approved")}>
                  Pass
                </button>
                <button type="button" className="fin-verify__btn" onClick={() => onUpdate(v.id, "rejected")}>
                  Fail
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
