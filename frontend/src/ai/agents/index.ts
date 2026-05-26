import type { AIAgentId, AgentRunContext, AgentRunResult } from "../types";
import { logAIAction } from "../services/ai-log.service";
import { checkRateLimit, rateLimitKey } from "../utils/rate-limit";
import { leadbotScoreLead, leadbotAssignDealer } from "./leadbot";
import { financebotMatchBanks, financebotPredictApproval } from "./financebot";
import { auctionbotFraudCheck, auctionbotEndingAlert } from "./auctionbot";
import { dealerbotOnboarding, dealerbotPricingTip } from "./dealerbot";
import { supportbotChat } from "./supportbot";
import { socialbotCaption } from "./socialbot";
import { inventorybotOptimize, inventorybotDescription } from "./inventorybot";
import { analyticsbotDailyReport, analyticsbotDealerInsights } from "./analyticsbot";
import { recommendationbotVehicles, recommendationbotLoans } from "./recommendationbot";
import { notificationbotSend } from "./notificationbot";
import { dsabotAssignLead, dsabotNotify } from "./dsabot";
import { communitybotModerate, communitybotTrending } from "./communitybot";

type Handler = (ctx: AgentRunContext) => Promise<AgentRunResult>;

const HANDLERS: Record<string, Handler> = {
  "leadbot:score_lead": leadbotScoreLead,
  "leadbot:assign_dealer": leadbotAssignDealer,
  "financebot:match_banks": financebotMatchBanks,
  "financebot:predict_approval": financebotPredictApproval,
  "auctionbot:fraud_check": auctionbotFraudCheck,
  "auctionbot:ending_alert": auctionbotEndingAlert,
  "dealerbot:onboarding": dealerbotOnboarding,
  "dealerbot:pricing_tip": dealerbotPricingTip,
  "supportbot:chat": supportbotChat,
  "socialbot:caption": socialbotCaption,
  "inventorybot:optimize": inventorybotOptimize,
  "inventorybot:description": inventorybotDescription,
  "analyticsbot:daily_report": analyticsbotDailyReport,
  "analyticsbot:dealer_insights": analyticsbotDealerInsights,
  "recommendationbot:vehicles": recommendationbotVehicles,
  "recommendationbot:loans": recommendationbotLoans,
  "notificationbot:send": notificationbotSend,
  "dsabot:assign_lead": dsabotAssignLead,
  "dsabot:notify": dsabotNotify,
  "communitybot:moderate": communitybotModerate,
  "communitybot:trending": communitybotTrending,
};

export async function runAgent(
  agentId: AIAgentId,
  action: string,
  context: AgentRunContext = {}
): Promise<AgentRunResult> {
  const key = rateLimitKey(agentId, context.userId);
  if (!checkRateLimit(key)) {
    return { ok: false, agentId, action, error: "Rate limit exceeded", usedOpenAI: false };
  }

  const handler = HANDLERS[`${agentId}:${action}`];
  if (!handler) {
    return { ok: false, agentId, action, error: `Unknown action: ${action}`, usedOpenAI: false };
  }

  const start = performance.now();
  try {
    const result = await handler(context);
    await logAIAction({
      agentId,
      action,
      status: result.ok ? "success" : "error",
      outputSummary: result.error ?? JSON.stringify(result.data)?.slice(0, 120),
      durationMs: Math.round(performance.now() - start),
      userId: context.userId,
      metadata: { usedOpenAI: result.usedOpenAI },
    });
    return result;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Agent failed";
    await logAIAction({
      agentId,
      action,
      status: "error",
      outputSummary: msg,
      durationMs: Math.round(performance.now() - start),
      userId: context.userId,
    });
    return { ok: false, agentId, action, error: msg, usedOpenAI: false };
  }
}

export function listAgentActions(agentId: AIAgentId): string[] {
  return Object.keys(HANDLERS)
    .filter((k) => k.startsWith(`${agentId}:`))
    .map((k) => k.split(":")[1]!);
}
