import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { formatCurrency } from "@/lib/utils";
import { insuranceApplyPath } from "../lib/insurance-routes";
import { planTypeLabel } from "../lib/insurance-premium";
import type { InsuranceQuoteOffer } from "../types";

interface InsurancePlanCardProps {
  offer: InsuranceQuoteOffer;
  rank?: number;
  featured?: boolean;
}

export function InsurancePlanCard({ offer, rank, featured }: InsurancePlanCardProps) {
  return (
    <article className={featured ? "ins-plan-card ins-plan-card--featured" : "ins-plan-card"}>
      {rank === 1 && (
        <Badge className="ins-plan-card__badge">
          <Sparkles className="h-3 w-3 mr-1" /> Best value
        </Badge>
      )}
      <div className="ins-plan-card__head">
        <span className="partner-logo-slot">
          <BrandLogo src={offer.logoUrl ?? ""} alt={offer.partnerName} size="md" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{offer.partnerName}</p>
          <p className="text-xs text-muted-foreground">{planTypeLabel(offer.planType)}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-primary tabular-nums">{formatCurrency(offer.annualPremium)}</p>
          <p className="text-[10px] text-muted-foreground">/ year · {formatCurrency(offer.monthlyPremium)}/mo</p>
        </div>
      </div>
      <ul className="ins-plan-card__meta">
        <li>
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          {offer.claimSettlementRatio}% claim settlement
        </li>
        <li>IDV {formatCurrency(offer.idvAmount)}</li>
        <li>{offer.approvalProbability}% instant issue score</li>
      </ul>
      <ul className="flex flex-wrap gap-1">
        {offer.highlights.map((h) => (
          <li key={h}>
            <Badge variant="secondary" className="text-[10px]">
              {h}
            </Badge>
          </li>
        ))}
      </ul>
      <Button className="w-full rounded-xl shadow-[var(--shadow-primary)]" asChild>
        <Link to={insuranceApplyPath(offer.id, offer.vehicleType)}>
          Buy now <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}
