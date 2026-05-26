import { formatCurrency } from "@/lib/utils";
import type { FinanceCommission } from "../types";
import { cn } from "@/lib/utils";

interface CommissionLedgerProps {
  commissions: FinanceCommission[];
}

export function CommissionLedger({ commissions }: CommissionLedgerProps) {
  const total = commissions.reduce((s, c) => s + c.commissionAmount, 0);
  const pending = commissions.filter((c) => c.status === "pending").reduce((s, c) => s + c.commissionAmount, 0);

  return (
    <div className="fin-commission">
      <div className="fin-commission__summary">
        <div>
          <p className="text-xs text-muted-foreground">Total earned</p>
          <p className="text-2xl font-bold">{formatCurrency(total)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Pending payout</p>
          <p className="text-2xl font-bold text-amber-600">{formatCurrency(pending)}</p>
        </div>
      </div>
      <ul className="fin-commission__list">
        {commissions.length === 0 && (
          <li className="py-8 text-center text-sm text-muted-foreground">Commissions appear on disbursement</li>
        )}
        {commissions.map((c) => (
          <li key={c.id} className="fin-commission__row">
            <div>
              <p className="font-medium">{formatCurrency(c.commissionAmount)}</p>
              <p className="text-xs text-muted-foreground">
                {c.commissionRate}% of {formatCurrency(c.loanAmount)}
              </p>
            </div>
            <span className={cn("fin-commission__pill", `fin-commission__pill--${c.status}`)}>{c.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
