import { Trophy, FileCheck, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { isReserveMet } from "../lib/auction-utils";
import type { AuctionListing } from "../types";
interface WinnerBannerProps {
  auction: AuctionListing;
  isWinner: boolean;
}

export function WinnerBanner({ auction, isWinner }: WinnerBannerProps) {
  const reserveOk = isReserveMet(auction);
  const amount = auction.currentBid ?? auction.startingBid;

  if (auction.status !== "ended") return null;

  if (isWinner) {
    return (
      <aside className="auc-winner auc-winner--success">
        <Trophy className="h-10 w-10 shrink-0" />
        <div>
          <p className="auc-winner__title">Hammer down — you are the winning bidder</p>
          <p className="auc-winner__sub">
            Winning bid {formatCurrency(amount)}. Settlement instructions will follow via dealer desk.
          </p>
        </div>
      </aside>
    );
  }

  if (!reserveOk && auction.reservePrice != null) {
    return (
      <aside className="auc-winner auc-winner--muted">
        <XCircle className="h-8 w-8 shrink-0 text-muted-foreground" />
        <div>
          <p className="font-semibold">Auction closed — reserve not met</p>
          <p className="text-sm text-muted-foreground">No sale declared. High bid {formatCurrency(amount)}.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="auc-winner auc-winner--muted">
      <FileCheck className="h-8 w-8 shrink-0 text-muted-foreground" />
      <div>
        <p className="font-semibold">Auction ended</p>
        <p className="text-sm text-muted-foreground">Winning bid {formatCurrency(amount)}</p>
      </div>
    </aside>
  );
}
