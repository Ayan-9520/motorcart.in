import { BrandLogo } from "@/components/ui/BrandLogo";
import type { BankApprovalStat } from "../lib/dsa-desk-utils";

interface DsaBankApprovalsGridProps {
  stats: BankApprovalStat[];
}

export function DsaBankApprovalsGrid({ stats }: DsaBankApprovalsGridProps) {
  return (
    <div className="fin-dsa-banks">
      {stats.map((bank) => {
        const total = bank.submitted + bank.processing + bank.approved + bank.rejected + bank.disbursed;
        return (
          <article key={bank.bankId} className="fin-dsa-banks__card">
            <div className="flex items-center gap-2 mb-3">
              <span className="partner-logo-slot shrink-0">
                <BrandLogo src={bank.logoUrl} alt={bank.bankName} size="sm" />
              </span>
              <p className="text-sm font-semibold truncate">{bank.bankName}</p>
            </div>
            {total === 0 ? (
              <p className="text-xs text-muted-foreground">No active files</p>
            ) : (
              <ul className="fin-dsa-banks__stats text-xs">
                {bank.processing > 0 && (
                  <li>
                    <span className="text-violet-600">Processing</span> {bank.processing}
                  </li>
                )}
                {bank.approved > 0 && (
                  <li>
                    <span className="text-emerald-600">Approved</span> {bank.approved}
                  </li>
                )}
                {bank.disbursed > 0 && (
                  <li>
                    <span className="text-sky-600">Disbursed</span> {bank.disbursed}
                  </li>
                )}
                {bank.submitted > 0 && (
                  <li>
                    <span className="text-muted-foreground">Submitted</span> {bank.submitted}
                  </li>
                )}
                {bank.rejected > 0 && (
                  <li>
                    <span className="text-red-600">Rejected</span> {bank.rejected}
                  </li>
                )}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}
