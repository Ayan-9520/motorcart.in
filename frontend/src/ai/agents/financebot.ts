import { getAiRecommendations, buildLoanOffers, computeApprovalProbability } from "@/features/finance/lib/ai-engine";
import type { EligibilityInput } from "@/features/finance/types";
import type { Lender } from "@/features/finance/types";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function financebotMatchBanks(ctx: AgentRunContext): Promise<AgentRunResult> {
  const lenders = (ctx.payload?.lenders ?? []) as Lender[];
  const input = ctx.payload?.input as EligibilityInput | undefined;
  if (!input || !lenders.length) {
    return { ok: false, agentId: "financebot", action: "match_banks", error: "Missing lenders or input", usedOpenAI: false };
  }

  const offers = buildLoanOffers(lenders, input.loanAmount, input.tenureMonths, input);
  const recommendations = getAiRecommendations(lenders, input.loanAmount, input.tenureMonths, input, 5);

  return {
    ok: true,
    agentId: "financebot",
    action: "match_banks",
    data: { offers, recommendations, topApproval: offers[0]?.approvalProbability ?? 0 },
    usedOpenAI: false,
  };
}

export async function financebotPredictApproval(ctx: AgentRunContext): Promise<AgentRunResult> {
  const lender = ctx.payload?.lender as Lender | undefined;
  const input = ctx.payload?.input as EligibilityInput | undefined;
  if (!lender || !input) {
    return { ok: false, agentId: "financebot", action: "predict_approval", error: "Missing data", usedOpenAI: false };
  }
  const probability = computeApprovalProbability(lender, input);
  return {
    ok: true,
    agentId: "financebot",
    action: "predict_approval",
    data: { probability, lender: lender.name },
    usedOpenAI: false,
  };
}
