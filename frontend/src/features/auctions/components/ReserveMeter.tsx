import { Shield, ShieldAlert } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { isReserveMet } from "../lib/auction-utils";
import type { AuctionListing } from "../types";
import { cn } from "@/lib/utils";

interface ReserveMeterProps {
  auction: Pick<AuctionListing, "currentBid" | "startingBid" | "reservePrice">;
}

export function ReserveMeter({ auction }: ReserveMeterProps) {
  if (auction.reservePrice == null) return null;

  const met = isReserveMet(auction);
  const current = auction.currentBid ?? auction.startingBid;
  const pct = Math.min(100, Math.round((current / auction.reservePrice) * 100));

  return (
    <div className={cn("auc-reserve-meter", met && "auc-reserve-meter--met")}>
      <div className="auc-reserve-meter__head">
        {met ? (
          <Shield className="h-4 w-4 text-emerald-600" />
        ) : (
          <ShieldAlert className="h-4 w-4 text-amber-600" />
        )}
        <span className="auc-reserve-meter__label">
          Reserve {met ? "met" : "not met"}
        </span>
        <span className="auc-reserve-meter__value">{formatCurrency(auction.reservePrice)}</span>
      </div>
      <div className="auc-reserve-meter__track">
        <div className="auc-reserve-meter__fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="auc-reserve-meter__hint text-xs text-muted-foreground">
        {met
          ? "Lot qualifies for sale at close."
          : "Bid must reach reserve for winner declaration."}
      </p>
    </div>
  );
}
