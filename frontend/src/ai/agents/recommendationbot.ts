import { getAIRecommendations } from "@/lib/vehicle-utils";
import { getAiRecommendations } from "@/features/finance/lib/ai-engine";
import type { VehicleListing } from "@/types/vehicle";
import type { Lender, EligibilityInput } from "@/features/finance/types";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function recommendationbotVehicles(ctx: AgentRunContext): Promise<AgentRunResult> {
  const recent = (ctx.payload?.recentIds ?? []) as string[];
  const wishlist = (ctx.payload?.wishlistIds ?? []) as string[];
  const pool = (ctx.payload?.vehicles ?? []) as VehicleListing[];
  const picks = getAIRecommendations(recent, wishlist, pool, Number(ctx.payload?.limit ?? 6));

  return {
    ok: true,
    agentId: "recommendationbot",
    action: "vehicles",
    data: { vehicles: picks },
    usedOpenAI: false,
  };
}

export async function recommendationbotLoans(ctx: AgentRunContext): Promise<AgentRunResult> {
  const lenders = (ctx.payload?.lenders ?? []) as Lender[];
  const input = ctx.payload?.input as EligibilityInput | undefined;
  if (!input) {
    return { ok: false, agentId: "recommendationbot", action: "loans", error: "No input", usedOpenAI: false };
  }
  const recs = getAiRecommendations(lenders, input.loanAmount, input.tenureMonths, input, 3);
  return {
    ok: true,
    agentId: "recommendationbot",
    action: "loans",
    data: { recommendations: recs },
    usedOpenAI: false,
  };
}
