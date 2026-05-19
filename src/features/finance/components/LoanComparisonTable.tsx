import { formatCurrency } from "@/lib/utils";
import type { LoanOffer } from "../types";
import { cn } from "@/lib/utils";

interface LoanComparisonTableProps {
  offers: LoanOffer[];
  selectedSlugs?: string[];
  onToggle?: (slug: string) => void;
}

export function LoanComparisonTable({ offers, selectedSlugs = [], onToggle }: LoanComparisonTableProps) {
  if (offers.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Adjust loan parameters to see offers.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            {onToggle && <th className="p-3 w-10" />}
            <th className="p-3">Rank</th>
            <th className="p-3">Lender</th>
            <th className="p-3">Rate</th>
            <th className="p-3">EMI</th>
            <th className="p-3">Total interest</th>
            <th className="p-3">Approval %</th>
            <th className="p-3">Max loan</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.slug} className={cn("border-b last:border-0", o.rank === 1 && "bg-primary/5")}>
              {onToggle && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedSlugs.includes(o.slug)}
                    onChange={() => onToggle(o.slug)}
                  />
                </td>
              )}
              <td className="p-3 font-medium">#{o.rank}</td>
              <td className="p-3 font-medium">{o.name}</td>
              <td className="p-3">{o.effectiveRate.toFixed(2)}%</td>
              <td className="p-3">{formatCurrency(o.emi)}</td>
              <td className="p-3">{formatCurrency(o.totalInterest)}</td>
              <td className="p-3 text-primary font-semibold">{o.approvalProbability}%</td>
              <td className="p-3">{formatCurrency(o.maxLoanAmount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
