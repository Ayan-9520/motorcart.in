import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Gavel, MapPin, Users } from "lucide-react";
import { liveAuctions } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";

function formatTimeLeft(endsAt: string): string {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
  return `${mins}m ${secs}s`;
}

export function AuctionsSection() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section-padding bg-muted/40">
      <motion.div className="container mx-auto space-y-10 px-4">
        <SectionHeader
          eyebrow="Live now"
          title="Live Auctions"
          description="Transparent bidding on certified vehicles with AI-powered fair market valuations."
          href="/auctions"
          linkLabel="All auctions"
        />
        <motion.div className="grid gap-6 md:grid-cols-2">
          {liveAuctions.map((auction, index) => (
            <motion.div
              key={auction.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-card-hover">
                <div className="relative aspect-[16/10] bg-muted">
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 gap-1 border-0 bg-red-600 text-white">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                    LIVE
                  </Badge>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg border border-white/20 bg-[#0f172a]/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Clock className="h-3 w-3 text-[#4ade80]" />
                    {formatTimeLeft(auction.endsAt)}
                  </div>
                </div>
                <CardContent className="space-y-4 p-5">
                  <h3 className="line-clamp-1 font-semibold">{auction.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {auction.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {auction.bidCount} bids
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Current bid</p>
                      <p className="text-xl font-bold text-[#16a34a]">
                        {formatCurrency(auction.currentBid)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Starting {formatCurrency(auction.startingBid)}
                      </p>
                    </div>
                    <Button variant="gradient" size="sm" asChild>
                      <Link to={`/auctions/${auction.id}`}>
                        <Gavel className="h-4 w-4" />
                        Place Bid
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
