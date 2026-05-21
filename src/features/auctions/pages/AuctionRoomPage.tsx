import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Radio } from "lucide-react";
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
import { AuctionRoomShell } from "../components/AuctionRoomShell";
import { LiveBidTicker } from "../components/LiveBidTicker";
import { ReserveMeter } from "../components/ReserveMeter";
import { WinnerBanner } from "../components/WinnerBanner";
import { AuctionNotificationsPanel } from "../components/AuctionNotificationsPanel";
import { AUCTION_TYPE_LABELS } from "../types";
export function AuctionRoomPage() {
  const { slug } = useParams<{ status?: string; slug: string }>();
  const { user, isAuthenticated } = useAuth();
  const {
    auction,
    bids,
    messages,
    notifications,
    loading,
    placing,
    bidLocked,
    viewerCount,
    minBid,
    dealerRegistered,
    registeringDealer,
    placeBid,
    setAutoBid,
    postMessage,
    registerDealer,
  } = useAuctionRoom(slug);

  useEffect(() => {
    if (auction) {
      setPageMeta({
        title: `${auction.title} — Live Auction | Motorcart`,
        description: `Bid live on ${auction.title}. Current bid ${formatCurrency(auction.currentBid ?? auction.startingBid)}.`,
      });
    }
  }, [auction]);

  if (loading) {
    return (
      <div className="auc-room container mx-auto space-y-6 px-4 py-8">
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

  const isWinner = Boolean(auction.winnerId && user?.id === auction.winnerId);

  const header = (
    <header className="auc-room__header flex flex-wrap items-center justify-between gap-4">
      <Button variant="ghost" size="sm" asChild className="gap-1">
        <Link to="/auctions">
          <ArrowLeft className="h-4 w-4" /> Auction exchange
        </Link>
      </Button>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="gap-1 font-mono text-xs">
          {AUCTION_TYPE_LABELS[auction.auctionType]}
        </Badge>
        {auction.status === "live" && (
          <Badge className="gap-1 border-0 bg-red-600 text-white">
            <Radio className="h-3 w-3" />
            LIVE
          </Badge>
        )}
        <ViewerCount count={viewerCount} />
      </div>
    </header>
  );

  return (
    <AuctionRoomShell
      header={header}
      ticker={<LiveBidTicker bids={bids} />}
      main={
        <>
          <WinnerBanner auction={auction} isWinner={isWinner} />
          <AuctionNotificationsPanel notifications={notifications} />

          <figure className="auc-room__hero relative aspect-[16/9] overflow-hidden rounded-2xl border bg-muted">
            <img src={auction.images[0]} alt={auction.title} className="h-full w-full object-cover" />
            {auction.status === "live" && (
              <span className="auc-room__live-pill">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                Live exchange
              </span>
            )}
          </figure>

          {auction.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {auction.images.map((src, i) => (
                <img key={i} src={src} alt="" className="h-16 w-24 shrink-0 rounded-lg border object-cover" />
              ))}
            </div>
          )}

          <div className="mt-4 space-y-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{auction.title}</h1>
            <p className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {auction.location}
              </span>
              <span>{auction.bidCount} bids recorded</span>
              <span>Increment {formatCurrency(auction.bidIncrement)}</span>
            </p>
            <ReserveMeter auction={auction} />
          </div>

          {isAuthenticated && auction.auctionType === "dealer" && auction.status === "live" && (
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-dashed p-4">
              <Building2 className="h-5 w-5 text-primary" />
              <div className="flex-1 min-w-[200px]">
                <p className="text-sm font-medium">Dealer participation</p>
                <p className="text-xs text-muted-foreground">
                  Register your dealership to bid on B2B lots with settlement desk support.
                </p>
              </div>
              <Button
                size="sm"
                variant={dealerRegistered ? "secondary" : "default"}
                disabled={dealerRegistered || registeringDealer}
                onClick={() => void registerDealer()}
              >
                {dealerRegistered ? "Registered" : registeringDealer ? "Registering…" : "Register dealer"}
              </Button>
            </div>
          )}
        </>
      }
      sidebar={
        <>
          {auction.status === "live" && (
            <div className="auc-room__timer rounded-xl border bg-card p-4 text-center shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Time to hammer
              </p>
              <CountdownTimer endsAt={auction.endsAt} size="lg" />
            </div>
          )}

          <BidPanel
            auction={auction}
            minBid={minBid}
            placing={placing}
            bidLocked={bidLocked}
            onPlaceBid={placeBid}
            onSetAutoBid={setAutoBid}
            isAuthenticated={isAuthenticated}
          />
        </>
      }
      footer={
        <section className="grid gap-6 lg:grid-cols-2">
          <BidHistoryFeed bids={bids} currentUserId={user?.id} />
          <AuctionChat
            messages={messages}
            onSend={postMessage}
            disabled={!isAuthenticated || auction.status === "ended"}
          />
        </section>
      }
    />
  );
}
