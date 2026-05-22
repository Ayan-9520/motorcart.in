import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { InsuranceWalletEntry } from "../types";

type CustomerInsuranceWalletPanelProps = {
  policies: InsuranceWalletEntry[];
};

export function CustomerInsuranceWalletPanel({ policies }: CustomerInsuranceWalletPanelProps) {
  return (
    <div className="space-y-4">
      {policies.map((p) => (
        <article key={p.id} className="cos-insurance-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{p.vehicleLabel}</p>
              <h3 className="text-lg font-semibold">{p.insurerName}</h3>
              <p className="text-sm text-muted-foreground">{p.planType}</p>
            </div>
            <Badge variant={p.status === "expiring" ? "destructive" : "success"}>
              {p.daysLeft} days left
            </Badge>
          </div>
          <div className="cos-insurance-card__stats">
            <div>
              <p className="text-[10px] uppercase text-muted-foreground">IDV</p>
              <p className="font-semibold">₹{p.idvAmount.toLocaleString("en-IN")}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground">Premium</p>
              <p className="font-semibold">₹{p.annualPremium.toLocaleString("en-IN")}/yr</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground">NCB</p>
              <p className="font-semibold">{p.ncbPercent}%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground">Claims</p>
              <p className="font-semibold">{p.claimCount}</p>
            </div>
          </div>
          <div className="cos-insurance-card__countdown">
            <div className="cos-insurance-card__bar" style={{ width: `${Math.min(100, (p.daysLeft / 365) * 100)}%` }} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="rounded-lg" asChild>
              <Link to="/insurance/quote">
                <Shield className="mr-1 h-3.5 w-3.5" />
                Renew
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="rounded-lg" asChild>
              <Link to="/insurance/compare">Compare plans</Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
