import { Link } from "react-router-dom";
import { Percent, Trophy, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { LoanOffer } from "../types";
import { cn } from "@/lib/utils";

interface BankOfferCardProps {
  offer: LoanOffer;
  onApply?: (offer: LoanOffer) => void;
}

export function BankOfferCard({ offer, onApply }: BankOfferCardProps) {
  return (
    <Card className={cn("relative h-full hover:shadow-card-hover transition-shadow", offer.rank === 1 && "ring-2 ring-primary/30")}>
      {offer.rank <= 3 && (
        <Badge className="absolute -top-2 left-4 gap-1 border-0 bg-primary text-primary-foreground text-white">
          <Trophy className="h-3 w-3" /> #{offer.rank} ranked
        </Badge>
      )}
      <CardContent className="space-y-4 p-5 pt-6">
        <div className="flex items-center gap-3">
          {offer.logoUrl ? (
            <img src={offer.logoUrl} alt="" className="h-12 w-12 rounded-xl object-cover" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#075E54] text-sm font-bold text-foreground">
              {offer.shortCode}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-semibold truncate">{offer.name}</h4>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <Percent className="h-3.5 w-3.5 shrink-0" />
              {offer.interestRateMin}% – {offer.interestRateMax}%
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-muted/60 p-2">
            <p className="text-xs text-muted-foreground">EMI</p>
            <p className="font-semibold">{formatCurrency(offer.emi)}/mo</p>
          </div>
          <div className="rounded-lg bg-muted/60 p-2">
            <p className="text-xs text-muted-foreground">Approval</p>
            <p className="font-semibold text-primary">{offer.approvalProbability}%</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          Score {offer.rankingScore} · {offer.lenderType.toUpperCase()}
        </div>
        <Button variant="default" className="w-full" onClick={() => onApply?.(offer)} asChild={!onApply}>
          {onApply ? (
            <span>Apply now</span>
          ) : (
            <Link to={`/finance/apply?bank=${offer.slug}`}>Apply online</Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
