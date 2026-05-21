import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gavel, TrendingUp, Radio, BarChart3, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";
import {
  fetchAuctions,
  getAuctionAnalytics,
  updateAuctionAdmin,
  finalizeAuctionRpc,
} from "../services/auction.service";
import type { AuctionListing } from "../types";
import { AUCTION_TYPE_LABELS } from "../types";
import { auctionDetailPath } from "../lib/auction-utils";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { AuctionStatus } from "@/types/database";

export function AuctionAdminPage() {
  const [auctions, setAuctions] = useState<AuctionListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await fetchAuctions();
    setAuctions(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    setPageMeta({ title: "Auction Admin — Motorcart.in", description: "Manage live auctions" });
    load();
  }, [load]);

  const analytics = getAuctionAnalytics(auctions);

  const setStatus = async (id: string, status: AuctionStatus) => {
    setUpdating(id);
    const { error } = await updateAuctionAdmin(id, { status });
    if (error) toast.error(error.message);
    else {
      toast.success(`Auction marked ${status}`);
      await load();
    }
    setUpdating(null);
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    setUpdating(id);
    const { error } = await updateAuctionAdmin(id, { is_featured: !current });
    if (error) toast.error(error.message);
    else await load();
    setUpdating(null);
  };

  const finalize = async (id: string) => {
    setUpdating(id);
    const r = await finalizeAuctionRpc(id);
    if (!r.ok) toast.error(r.error ?? "Finalize failed");
    else {
      toast.success(
        r.winner_id ? "Winner declared" : "Closed — reserve not met or no bids"
      );
      await load();
    }
    setUpdating(null);
  };

  const statCards = [
    { label: "Total auctions", value: analytics.totalAuctions, icon: Gavel },
    { label: "Live now", value: analytics.liveCount, icon: Radio },
    { label: "Total bids", value: analytics.totalBids, icon: TrendingUp },
    { label: "Revenue (closed)", value: formatCurrency(analytics.totalRevenue), icon: BarChart3 },
    { label: "Reserve met rate", value: `${analytics.reserveMetRate}%`, icon: ShieldCheck },
    { label: "Avg bids / auction", value: analytics.avgBidsPerAuction, icon: BarChart3 },
  ];

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header>
        <h1 className="text-2xl font-bold">Auction control center</h1>
        <p className="text-muted-foreground">Manage live rooms, featured listings & analytics</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All auctions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Type</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Current bid</th>
                    <th className="pb-3 pr-4">Bids</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {auctions.map((a) => (
                    <tr key={a.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 max-w-[200px]">
                        <Link to={auctionDetailPath(a)} className="font-medium hover:text-primary line-clamp-1">
                          {a.title}
                        </Link>
                        {a.isFeatured && (
                          <Badge variant="secondary" className="ml-2 text-[10px]">Featured</Badge>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">{AUCTION_TYPE_LABELS[a.auctionType]}</td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant={
                            a.status === "live" ? "default" : a.status === "upcoming" ? "secondary" : "outline"
                          }
                        >
                          {a.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 font-medium">{formatCurrency(a.currentBid ?? a.startingBid)}</td>
                      <td className="py-3 pr-4">{a.bidCount}</td>
                      <td className="py-3">
                        <motion.div className="flex flex-wrap gap-1" role="group">
                          {a.status !== "live" && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={updating === a.id}
                              onClick={() => setStatus(a.id, "live")}
                            >
                              Go live
                            </Button>
                          )}
                          {a.status === "live" && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={updating === a.id}
                              onClick={() => void finalize(a.id)}
                            >
                              Hammer down
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={updating === a.id}
                            onClick={() => toggleFeatured(a.id, a.isFeatured)}
                          >
                            {a.isFeatured ? "Unfeature" : "Feature"}
                          </Button>
                        </motion.div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
