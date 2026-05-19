import { useEffect } from "react";
import { motion } from "framer-motion";
import { Radio, Calendar, Archive } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";
import { useAuctionList } from "../hooks/useAuctionList";
import { AuctionCard } from "../components/AuctionCard";
import { AuctionHeroBanner } from "../components/AuctionHeroBanner";
import { CategoryTabs } from "../components/CategoryTabs";

const STATUS_TABS = [
  { id: "live", label: "Live now", icon: Radio },
  { id: "upcoming", label: "Upcoming", icon: Calendar },
  { id: "ended", label: "Closed", icon: Archive },
] as const;

export function AuctionListingPage() {
  const { featured, live, upcoming, ended, loading, status, type, setStatus, setType } = useAuctionList();

  const heroAuction = featured[0] ?? live[0];
  const activeList =
    status === "upcoming" ? upcoming : status === "ended" ? ended : live;

  useEffect(() => {
    setPageMeta({
      title: "Live Auctions — Motorcart.in",
      description: "Bid in real time on bank repo, dealer & government vehicle auctions across India.",
    });
  }, []);

  return (
    <motion.div className="wa-pattern min-h-screen">
      <div className="container mx-auto space-y-10 px-4 py-8">
        <header>
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Premium live bidding</p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">Live Auctions</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Bank repo, dealer & government auctions with real-time bids, auto-bid, and transparent reserve pricing.
          </p>
        </header>

        {heroAuction && status === "live" && (
          <AuctionHeroBanner auction={heroAuction} viewerCount={heroAuction.viewerCount} />
        )}

        <nav className="flex flex-wrap gap-2">
          {STATUS_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setStatus(id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                status === id ? "bg-primary text-primary-foreground text-white shadow-wa" : "border bg-card hover:border-primary/40"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <CategoryTabs activeType={type} onTypeChange={setType} />

        {featured.length > 0 && status === "live" && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Featured auctions</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.slice(0, 3).map((a, i) => (
                <AuctionCard key={a.id} auction={a} index={i} />
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            {status === "live" ? "All live auctions" : status === "upcoming" ? "Starting soon" : "Auction history"}
          </h2>

          {loading ? (
            <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[16/10] w-full rounded-xl" />
              ))}
            </motion.div>
          ) : activeList.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">No auctions in this category right now.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeList.map((a, i) => (
                <AuctionCard key={a.id} auction={a} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
}
