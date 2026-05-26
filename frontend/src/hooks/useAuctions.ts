import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DbAuction } from "@/types/database";

export function useAuctions(status: "live" | "upcoming" | "ended" = "live") {
  const [auctions, setAuctions] = useState<DbAuction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuctions = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("auctions")
      .select("*")
      .eq("status", status)
      .order("ends_at", { ascending: true });

    if (!error) setAuctions((data ?? []) as DbAuction[]);
    setLoading(false);
  }, [status]);

  useEffect(() => {
    fetchAuctions();

    const channel = supabase
      .channel(`auctions-${status}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "auctions" }, () => {
        fetchAuctions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAuctions, status]);

  const placeBid = useCallback(async (auctionId: string, amount: number) => {
    const { data, error } = await supabase.rpc("place_auction_bid", {
      p_auction_id: auctionId,
      p_amount: amount,
      p_is_auto_bid: false,
    });
    return { data, error };
  }, []);

  return { auctions, loading, refetch: fetchAuctions, placeBid };
}
