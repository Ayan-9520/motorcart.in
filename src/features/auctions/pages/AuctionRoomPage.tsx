import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Shield, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useAuctionRoom } from "../hooks/useAuctionRoom";
import { CountdownTimer } from "../components/CountdownTimer";
import { BidPanel } from "../components/BidPanel";
import { BidHistoryFeed } from "../components/BidHistoryFeed";
import { AuctionChat } from "../components/AuctionChat";
import { ViewerCount } from "../components/ViewerCount";
import { AUCTION_TYPE_LABELS } from "../types";
import { isReserveMet } from "../lib/auction-utils";
import { cn } from "@/lib/utils";

export function AuctionRoomPage() {
  const { slug } = useParams<{ status?: string; slug: string }>();
  const { user, isAuthenticated } = useAuth();
  const {
    auction,
    bids,
    messages,
    loading,
    placing,
    viewerCount,
    minBid,
    placeBid,
    setAutoBid,
    postMessage,
  } = useAuctionRoom(slug);

  useEffect(() => {
    if (auction) {
      setPageMeta({
        title: `${auction.title} — Live Auction`,
        description: `Bid live on ${auction.title}. Current bid ${formatCurrency(auction.currentBid ?? auction.startingBid)}.`,
      });
    }
  }, [auction]);

  if (loading) {
    return (
      <div className="container mx-auto space-y-6 px-4 py-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Auction not found</h1>
        <Button variant="link" asChild className="mt-4">
          <Link to="/auctions">← Back to auctions</Link>
        </Button>
      </div>
    );
  }

  const reserveOk = isReserveMet(auction);
  const isWinner = auction.winnerId && user?.id === auction.winnerId;

  return (
    <motion.div className="wa-pattern min-h-screen">
      <motion.div className="container mx-auto space-y-6 px-4 py-6 md:py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link to="/auctions">
              <ArrowLeft className="h-4 w-4" /> All auctions
            </Link>
          </Button>
          <ViewerCount count={viewerCount} />
        </header>

        {auction.status === "ended" && (
          <aside
            className={cn(
              "rounded-xl border p-4 flex items-center gap-3",
              isWinner ? "border-primary bg-primary/10" : "bg-muted/50"
            )}
          >
            <Trophy className={cn("h-8 w-8", isWinner ? "text-primary" : "text-muted-foreground")} />
            <div>
              <p className="font-semibold">
                {isWinner ? "Congratulations — you won this auction!" : "Auction ended"}
              </p>
              <p className="text-sm text-muted-foreground">
                Winning bid: {formatCurrency(auction.currentBid ?? auction.startingBid)}
              </p>
            </div>
          </aside>
        )}

        <section className="grid gap-6 lg:grid-cols-5">
          <article className="lg:col-span-3 space-y-4">
            <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-muted">
              <img
                src={auction.images[0]}
                alt={auction.title}
                className="h-full w-full object-cover"
              />
              {auction.status === "live" && (
                <Badge className="absolute left-4 top-4 gap-1 border-0 bg-red-600 text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  LIVE
                </Badge>
              )}
              <Badge className="absolute right-4 top-4 border-white/30 bg-black/50 text-white">
                {AUCTION_TYPE_LABELS[auction.auctionType]}
              </Badge>
            </figure>

            {auction.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {auction.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-16 w-24 shrink-0 rounded-lg border object-cover"
                  />
                ))}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{auction.title}</h1>
              <p className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {auction.location}
                </span>
                <span>{auction.bidCount} bids</span>
                {auction.reservePrice != null && (
                  <span
                    className={cn(
                      "flex items-center gap-1",
                      reserveOk ? "text-primary" : "text-amber-600"
                    )}
                  >
                    <Shield className="h-4 w-4" />
                    Reserve {reserveOk ? "met" : "not met"}
                  </span>
                )}
              </p>
            </div>
          </article>

          <aside className="lg:col-span-2 space-y-4">
            {auction.status === "live" && (
              <div className="rounded-xl border bg-card p-4 text-center shadow-card">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Time remaining
                </p>
                <CountdownTimer endsAt={auction.endsAt} size="lg" />
              </div>
            )}

            <BidPanel
              auction={auction}
              minBid={minBid}
              placing={placing}
              onPlaceBid={placeBid}
              onSetAutoBid={setAutoBid}
              isAuthenticated={isAuthenticated}
            />
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <BidHistoryFeed bids={bids} currentUserId={user?.id} />
          <AuctionChat
            messages={messages}
            onSend={postMessage}
            disabled={!isAuthenticated || auction.status === "ended"}
          />
        </section>
      </motion.div>
    </motion.div>
  );
}
