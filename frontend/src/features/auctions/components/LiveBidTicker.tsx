import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { AuctionBid } from "../types";

interface LiveBidTickerProps {
  bids: AuctionBid[];
}

export function LiveBidTicker({ bids }: LiveBidTickerProps) {
  const top = bids[0];
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!top) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 600);
    return () => clearTimeout(t);
  }, [top?.id, top?.amount]);

  if (!top) {
    return (
      <div className="auc-ticker auc-ticker--idle">
        <Activity className="h-4 w-4" />
        <span>Awaiting opening bid</span>
      </div>
    );
  }

  return (
    <div className={`auc-ticker ${flash ? "auc-ticker--flash" : ""}`}>
      <span className="auc-ticker__pulse" />
      <div className="auc-ticker__body">
        <span className="auc-ticker__label">Leading bid</span>
        <strong className="auc-ticker__amount">{formatCurrency(top.amount)}</strong>
        <span className="auc-ticker__bidder">{top.bidderName ?? "Verified bidder"}</span>
      </div>
    </div>
  );
}
