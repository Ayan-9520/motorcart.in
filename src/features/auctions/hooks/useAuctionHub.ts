import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MOCK_AUCTION_EVENTS } from "../data/auction-hub-data";
import { fetchAuctions } from "../services/auction.service";
import type { AuctionEvent } from "../data/auction-hub-data";
import type { AuctionListing } from "../types";

export function useAuctionHub() {
  const [params] = useSearchParams();
  const [auctions, setAuctions] = useState<AuctionListing[]>([]);
  const [loading, setLoading] = useState(true);

  const stateFilter = params.get("state") ?? "All States";
  const query = params.get("q") ?? "";

  const load = useCallback(async () => {
    setLoading(true);
    const [live, upcoming] = await Promise.all([
      fetchAuctions({ status: "live" }),
      fetchAuctions({ status: "upcoming" }),
    ]);
    setAuctions([...live, ...upcoming]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const events = useMemo(() => {
    let list: AuctionEvent[] = [...MOCK_AUCTION_EVENTS];
    if (stateFilter !== "All States") {
      list = list.filter((e) => e.state === stateFilter || e.city.includes(stateFilter.split(" ")[0]!));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (e) =>
          e.city.toLowerCase().includes(q) ||
          e.venueName.toLowerCase().includes(q) ||
          e.state.toLowerCase().includes(q)
      );
    }
    return list;
  }, [stateFilter, query]);

  const liveEvents = events.filter((e) => e.status === "live");
  const upcomingEvents = events.filter((e) => e.status === "upcoming");

  const liveAuctions = auctions.filter((a) => a.status === "live");
  const upcomingAuctions = auctions.filter((a) => a.status === "upcoming");

  const stats = {
    liveLots: liveAuctions.length + liveEvents.reduce((s, e) => s + e.vehicleCount, 0),
    cities: new Set(MOCK_AUCTION_EVENTS.map((e) => e.city)).size,
    eventsToday: liveEvents.length + upcomingEvents.filter((e) => {
      const d = new Date(e.startsAt);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length,
  };

  return {
    events,
    liveEvents,
    upcomingEvents,
    liveAuctions,
    upcomingAuctions,
    loading,
    stats,
    refetch: load,
  };
}
