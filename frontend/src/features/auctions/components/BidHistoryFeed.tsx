import { motion, AnimatePresence } from "framer-motion";
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
    <Card className="auc-bid-feed">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Bid history</CardTitle>
        <p className="text-xs text-muted-foreground">Real-time tape — highest bid first</p>
      </CardHeader>
      <CardContent>
        <ul className="auc-bid-feed__list max-h-80 space-y-2 overflow-y-auto">
          {bids.length === 0 && (
            <li className="py-8 text-center text-sm text-muted-foreground">No bids yet — be the first!</li>
          )}
          <AnimatePresence initial={false}>
            {bids.map((bid, i) => (
              <motion.li
                key={bid.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-all",
                  i === 0 && "border-primary/40 bg-primary/5 font-medium auc-bid-feed__lead",
                  bid.bidderId === currentUserId && "ring-1 ring-primary/30"
                )}
              >
                <span className="flex items-center gap-2 min-w-0">
                  {bid.isAutoBid && <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500" />}
                  <span className="truncate">{bid.bidderName ?? "Bidder"}</span>
                </span>
                <span className="shrink-0 font-semibold text-primary tabular-nums">
                  {formatCurrency(bid.amount)}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </CardContent>
    </Card>
  );
}
