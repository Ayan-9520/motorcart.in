import { Badge } from "@/components/ui/badge";
import type { InsuranceClaim } from "../types";

type CustomerInsuranceClaimsPanelProps = {
  claims: InsuranceClaim[];
};

export function CustomerInsuranceClaimsPanel({ claims }: CustomerInsuranceClaimsPanelProps) {
  if (!claims.length) {
    return (
      <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
        No claims filed yet — drive safe!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {claims.map((c) => (
        <li key={c.id} className="cos-claim-row">
          <div>
            <p className="font-medium">{c.vehicleLabel}</p>
            <p className="text-xs text-muted-foreground">
              {c.insurerName} · {c.claimId}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Filed {new Date(c.filedAt).toLocaleDateString("en-IN")}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold tabular-nums">₹{c.amount.toLocaleString("en-IN")}</p>
            <Badge
              variant={c.status === "settled" ? "success" : c.status === "processing" ? "secondary" : "destructive"}
              className="mt-1 text-[10px]"
            >
              {c.status}
            </Badge>
          </div>
        </li>
      ))}
    </ul>
  );
}
