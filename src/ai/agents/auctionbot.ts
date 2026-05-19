import { detectBidFraud } from "@/features/auctions/lib/fraud-detection";
import { fillWhatsAppTemplate, whatsAppUrl } from "../utils/whatsapp-templates";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function auctionbotFraudCheck(ctx: AgentRunContext): Promise<AgentRunResult> {
  const result = detectBidFraud({
    auctionId: String(ctx.payload?.auctionId ?? ""),
    userId: String(ctx.payload?.bidderId ?? ""),
    amount: Number(ctx.payload?.amount ?? 0),
    currentBid: ctx.payload?.currentBid as number | null,
    startingBid: Number(ctx.payload?.startingBid ?? 0),
    userBids: (ctx.payload?.userBids ?? []) as import("@/features/auctions/types").AuctionBid[],
    recentGlobalBids: Number(ctx.payload?.recentGlobalBids ?? 0),
  });

  return {
    ok: true,
    agentId: "auctionbot",
    action: "fraud_check",
    data: { suspicious: !result.allowed || result.riskScore >= 40, ...result },
    usedOpenAI: false,
  };
}

export async function auctionbotEndingAlert(ctx: AgentRunContext): Promise<AgentRunResult> {
  const phone = String(ctx.payload?.phone ?? "919876543210");
  const msg = fillWhatsAppTemplate("auction_ending", {
    minutes: String(ctx.payload?.minutes ?? 15),
    title: String(ctx.payload?.title ?? "Vehicle auction"),
    bid: String(ctx.payload?.bid ?? "0"),
    link: String(ctx.payload?.link ?? "https://motorcart.in/auctions"),
  });
  return {
    ok: true,
    agentId: "auctionbot",
    action: "ending_alert",
    data: { whatsappUrl: whatsAppUrl(phone, msg) },
    usedOpenAI: false,
  };
}
