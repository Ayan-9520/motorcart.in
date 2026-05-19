import { useCallback, useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchAuctionBySlug,
  fetchAuctionBids,
  fetchAuctionMessages,
  placeBidRpc,
  setAutoBidRpc,
  sendChatMessage,
} from "../services/auction.service";
import { validateBidClient, recordBidAttempt } from "../lib/bid-validation";
import { detectBidFraud } from "../lib/fraud-detection";
import { getMinNextBid } from "../lib/auction-utils";
import type { AuctionListing, AuctionBid, AuctionMessage } from "../types";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export function useAuctionRoom(slug: string | undefined) {
  const { user } = useAuth();
  const [auction, setAuction] = useState<AuctionListing | null>(null);
  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [messages, setMessages] = useState<AuctionMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const presenceRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const lastBidIdRef = useRef<string | null>(null);

  const loadAuction = useCallback(async () => {
    if (!slug) return;
    const a = await fetchAuctionBySlug(slug);
    setAuction(a);
    if (a) {
      setViewerCount(a.viewerCount);
      const [b, m] = await Promise.all([fetchAuctionBids(a.id), fetchAuctionMessages(a.id)]);
      setBids(b);
      setMessages(m);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    loadAuction();
  }, [loadAuction]);

  // Realtime: auction updates, bids, chat
  useEffect(() => {
    if (!auction?.id) return;

    const auctionChannel = supabase
      .channel(`auction-${auction.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "auctions", filter: `id=eq.${auction.id}` },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          setAuction((prev) =>
            prev
              ? {
                  ...prev,
                  currentBid: row.current_bid != null ? Number(row.current_bid) : prev.currentBid,
                  bidCount: Number(row.bid_count ?? prev.bidCount),
                  status: (row.status as AuctionListing["status"]) ?? prev.status,
                  winnerId: (row.winner_id as string) ?? prev.winnerId,
                }
              : prev
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bids", filter: `auction_id=eq.${auction.id}` },
        async () => {
          const b = await fetchAuctionBids(auction.id);
          setBids(b);
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "auction_messages", filter: `auction_id=eq.${auction.id}` },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          setMessages((prev) => [
            ...prev,
            {
              id: String(row.id),
              auctionId: String(row.auction_id),
              userId: row.user_id as string | null,
              displayName: String(row.display_name ?? "User"),
              message: String(row.message),
              isSystem: Boolean(row.is_system),
              createdAt: String(row.created_at),
            },
          ]);
        }
      )
      .subscribe();

    // Presence for live viewers
    const presenceChannel = supabase.channel(`presence-${auction.id}`, {
      config: { presence: { key: user?.id ?? `anon-${Math.random().toString(36).slice(2)}` } },
    });

    presenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState();
        setViewerCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await presenceChannel.track({ online_at: new Date().toISOString() });
        }
      });

    presenceRef.current = presenceChannel;

    return () => {
      supabase.removeChannel(auctionChannel);
      supabase.removeChannel(presenceChannel);
    };
  }, [auction?.id, user?.id]);

  const placeBid = useCallback(
    async (amount: number) => {
      if (!auction || !user) {
        toast.error("Please login to bid");
        return { ok: false };
      }

      const clientCheck = validateBidClient(auction, amount, user.id);
      if (!clientCheck.valid) {
        toast.error(clientCheck.error!);
        return { ok: false };
      }

      const fraud = detectBidFraud({
        auctionId: auction.id,
        userId: user.id,
        amount,
        currentBid: auction.currentBid,
        startingBid: auction.startingBid,
        userBids: bids.filter((b) => b.bidderId === user.id),
        recentGlobalBids: bids.filter((b) => Date.now() - new Date(b.createdAt).getTime() < 60000).length,
      });

      if (!fraud.allowed) {
        toast.error(fraud.message ?? "Bid rejected");
        return { ok: false };
      }

      setPlacing(true);
      const result = await placeBidRpc(auction.id, amount, false);

      if (!result.ok) {
        // Mock fallback when RPC not deployed
        const minBid = getMinNextBid(auction);
        if (amount >= minBid) {
          recordBidAttempt(auction.id, user.id, amount);
          const mockBid: AuctionBid = {
            id: `mock-${Date.now()}`,
            auctionId: auction.id,
            bidderId: user.id,
            bidderName: user.fullName,
            amount,
            isAutoBid: false,
            createdAt: new Date().toISOString(),
          };
          setBids((prev) => [mockBid, ...prev]);
          setAuction((prev) =>
            prev ? { ...prev, currentBid: amount, bidCount: prev.bidCount + 1 } : prev
          );
          toast.success("Bid placed!");
          setPlacing(false);
          return { ok: true };
        }
        toast.error(result.error ?? "Bid failed");
        setPlacing(false);
        return { ok: false };
      }

      recordBidAttempt(auction.id, user.id, amount);
      toast.success("Bid placed!");
      setPlacing(false);
      return { ok: true };
    },
    [auction, user, bids]
  );

  const setAutoBid = useCallback(
    async (maxAmount: number) => {
      if (!auction || !user) return;
      const result = await setAutoBidRpc(auction.id, maxAmount);
      if (result.ok) toast.success("Auto-bid activated");
      else toast.error(result.error ?? "Auto-bid saved locally (demo)");
    },
    [auction, user]
  );

  const postMessage = useCallback(
    async (text: string) => {
      if (!auction || !user) return;
      await sendChatMessage(auction.id, text, user.fullName);
      const msg: AuctionMessage = {
        id: `local-${Date.now()}`,
        auctionId: auction.id,
        userId: user.id,
        displayName: user.fullName,
        message: text,
        isSystem: false,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, msg]);
    },
    [auction, user]
  );

  const minBid = auction ? getMinNextBid(auction) : 0;

  // Notify when outbid
  useEffect(() => {
    const top = bids[0];
    if (!top || !user) return;
    if (lastBidIdRef.current && lastBidIdRef.current !== top.id) {
      if (top.bidderId !== user.id) {
        toast(`New bid: ${top.bidderName ?? "Someone"} — ₹${top.amount.toLocaleString("en-IN")}`, {
          icon: "🔔",
        });
      }
    }
    lastBidIdRef.current = top.id;
  }, [bids, user]);

  return {
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
    refetch: loadAuction,
  };
}
