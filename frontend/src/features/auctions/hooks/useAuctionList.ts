import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAuctions } from "../services/auction.service";
import type { AuctionListing, AuctionType } from "../types";
import type { AuctionStatus } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";

export function useAuctionList() {
  const [params, setParams] = useSearchParams();
  const status = (params.get("status") as AuctionStatus) || "live";
  const type = params.get("type") as AuctionType | null;

  const [auctions, setAuctions] = useState<AuctionListing[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await fetchAuctions({
      status,
      type: type ?? undefined,
    });
    setAuctions(list);
    setLoading(false);
  }, [status, type]);

  useEffect(() => {
    load();

    const channel = supabase
      .channel("auctions-list")
      .on("postgres_changes", { event: "*", schema: "public", table: "auctions" }, () => load())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const setStatus = (s: string) => {
    const next = new URLSearchParams(params);
    if (s === "live") next.delete("status");
    else next.set("status", s);
    setParams(next);
  };

  const setType = (t: string | null) => {
    const next = new URLSearchParams(params);
    if (t) next.set("type", t);
    else next.delete("type");
    setParams(next);
  };

  const featured = auctions.filter((a) => a.isFeatured);
  const live = auctions.filter((a) => a.status === "live");
  const upcoming = auctions.filter((a) => a.status === "upcoming");
  const ended = auctions.filter((a) => a.status === "ended");

  return { auctions, featured, live, upcoming, ended, loading, status, type, setStatus, setType, refetch: load };
}
