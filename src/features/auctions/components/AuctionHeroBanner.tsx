import { Link } from "react-router-dom";
import { Gavel, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { formatCurrency } from "@/lib/utils";
import type { AuctionListing } from "../types";
import { AUCTION_TYPE_LABELS } from "../types";
import { auctionDetailPath } from "../lib/auction-utils";

interface AuctionHeroBannerProps {
  auction: AuctionListing;
  viewerCount: number;
}

export function AuctionHeroBanner({ auction, viewerCount }: AuctionHeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border hero-panel text-white">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      <div className="relative grid gap-6 p-6 md:grid-cols-2 md:p-10">
        <article>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground/90">
            <Radio className="h-4 w-4 animate-pulse" />
            {AUCTION_TYPE_LABELS[auction.auctionType]} · {viewerCount} watching live
          </p>
          <h1 className="mt-2 text-2xl font-bold md:text-4xl leading-tight">{auction.title}</h1>
          <p className="mt-3 text-3xl font-bold">{formatCurrency(auction.currentBid ?? auction.startingBid)}</p>
          <p className="text-sm text-white/80">{auction.bidCount} bids · {auction.location}</p>
          <Button size="lg" className="mt-6 gap-2" asChild>
            <Link to={auctionDetailPath(auction)}>
              <Gavel className="h-5 w-5" /> Enter live room
            </Link>
          </Button>
        </article>
        <aside className="flex flex-col items-center justify-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/80">Ends in</p>
          <CountdownTimer endsAt={auction.endsAt} size="lg" />
        </aside>
      </div>
    </section>
  );
}
