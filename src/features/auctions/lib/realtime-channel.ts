import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { AuctionBid, AuctionListing, AuctionMessage } from "../types";
import type { AuctionNotification } from "../types";

export type AuctionRealtimeHandlers = {
  onAuctionUpdate?: (patch: Partial<AuctionListing>) => void;
  onBidInsert?: (bid: AuctionBid) => void;
  onMessageInsert?: (msg: AuctionMessage) => void;
  onNotificationInsert?: (n: AuctionNotification) => void;
  onPresenceCount?: (count: number) => void;
};

function mapBidRow(row: Record<string, unknown>): AuctionBid {
  return {
    id: String(row.id),
    auctionId: String(row.auction_id),
    bidderId: String(row.bidder_id),
    bidderName: row.bidder_name ? String(row.bidder_name) : undefined,
    amount: Number(row.amount),
    isAutoBid: Boolean(row.is_auto_bid),
    createdAt: String(row.created_at),
  };
}

function mapMessageRow(row: Record<string, unknown>): AuctionMessage {
  return {
    id: String(row.id),
    auctionId: String(row.auction_id),
    userId: (row.user_id as string) ?? null,
    displayName: String(row.display_name ?? "User"),
    message: String(row.message),
    isSystem: Boolean(row.is_system),
    createdAt: String(row.created_at),
  };
}

function mapNotificationRow(row: Record<string, unknown>): AuctionNotification {
  return {
    id: String(row.id),
    auctionId: String(row.auction_id),
    userId: String(row.user_id),
    kind: row.kind as AuctionNotification["kind"],
    title: String(row.title),
    body: String(row.body),
    payload: (row.payload as Record<string, unknown>) ?? {},
    readAt: row.read_at ? String(row.read_at) : null,
    createdAt: String(row.created_at),
  };
}

/**
 * Single multiplexed channel per auction room — fewer websocket connections.
 */
export function subscribeAuctionRoom(
  auctionId: string,
  presenceKey: string,
  handlers: AuctionRealtimeHandlers
): RealtimeChannel {
  const channel = supabase.channel(`room:${auctionId}`, {
    config: {
      broadcast: { ack: false, self: false },
      presence: { key: presenceKey },
    },
  });

  channel
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "auctions", filter: `id=eq.${auctionId}` },
      (payload) => {
        const row = payload.new as Record<string, unknown>;
        handlers.onAuctionUpdate?.({
          currentBid: row.current_bid != null ? Number(row.current_bid) : undefined,
          bidCount: row.bid_count != null ? Number(row.bid_count) : undefined,
          status: row.status as AuctionListing["status"],
          winnerId: (row.winner_id as string) ?? null,
          endsAt: row.ends_at ? String(row.ends_at) : undefined,
          viewerCount: row.viewer_count != null ? Number(row.viewer_count) : undefined,
        });
      }
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "bids", filter: `auction_id=eq.${auctionId}` },
      (payload) => {
        handlers.onBidInsert?.(mapBidRow(payload.new as Record<string, unknown>));
      }
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "auction_messages", filter: `auction_id=eq.${auctionId}` },
      (payload) => {
        handlers.onMessageInsert?.(mapMessageRow(payload.new as Record<string, unknown>));
      }
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "auction_notifications", filter: `auction_id=eq.${auctionId}` },
      (payload) => {
        handlers.onNotificationInsert?.(mapNotificationRow(payload.new as Record<string, unknown>));
      }
    )
    .on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      handlers.onPresenceCount?.(Object.keys(state).length);
    });

  channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      await channel.track({ online_at: new Date().toISOString(), role: "viewer" });
    }
  });

  return channel;
}

export function unsubscribeChannel(channel: RealtimeChannel | null) {
  if (channel) void supabase.removeChannel(channel);
}

/** Optimistic merge: prepend bid, dedupe by id */
export function mergeBidFeed(prev: AuctionBid[], incoming: AuctionBid): AuctionBid[] {
  if (prev.some((b) => b.id === incoming.id)) return prev;
  return [incoming, ...prev].sort(
    (a, b) => b.amount - a.amount || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
