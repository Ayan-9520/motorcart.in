import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { AuctionBid } from "../types";
import { cn } from "@/lib/utils";

interface BidHistoryFeedProps {
  bids: AuctionBid[];
  currentUserId?: string;
}

export function BidHistoryFeed({ bids, currentUserId }: BidHistoryFeedProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Live bid feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="max-h-80 space-y-2 overflow-y-auto">
          {bids.length === 0 && (
            <li className="py-8 text-center text-sm text-muted-foreground">No bids yet — be the first!</li>
          )}
          {bids.map((bid, i) => (
            <li
              key={bid.id}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-all",
                i === 0 && "border-primary/40 bg-primary/5 font-medium",
                bid.bidderId === currentUserId && "ring-1 ring-primary/30"
              )}
            >
              <span className="flex items-center gap-2 min-w-0">
                {bid.isAutoBid && <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500" />}
                <span className="truncate">{bid.bidderName ?? "Bidder"}</span>
              </span>
              <span className="shrink-0 font-semibold text-primary">{formatCurrency(bid.amount)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
