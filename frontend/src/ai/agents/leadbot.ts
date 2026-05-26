import { scoreLead } from "../utils/lead-scoring";
import { fillWhatsAppTemplate, whatsAppUrl } from "../utils/whatsapp-templates";
import { completeWithRetry } from "../services/openai.service";
import { AGENT_SYSTEM_PROMPTS } from "../prompts";
import { buildLeadSummaryPrompt } from "../prompts";
import type { AgentRunContext, AgentRunResult, LeadScoreResult } from "../types";

export async function leadbotScoreLead(
  ctx: AgentRunContext
): Promise<AgentRunResult<LeadScoreResult & { whatsappUrl?: string; aiSummary?: string }>> {
  const lead = ctx.payload?.lead as Record<string, unknown> | undefined;
  if (!lead) return { ok: false, agentId: "leadbot", action: "score_lead", error: "No lead data", usedOpenAI: false };

  const result = scoreLead({
    name: String(lead.name ?? ""),
    phone: String(lead.phone ?? ""),
    source: String(lead.source ?? "website"),
    vehicleInterest: lead.vehicle_interest as string | null,
    vehiclePrice: lead.vehicle_price as number | null,
    aiScore: lead.ai_score as number | null,
    metadata: (lead.metadata as Record<string, unknown>) ?? {},
    repeatVisits: (lead.metadata as Record<string, unknown>)?.visitCount as number,
    emiInteractions: (lead.metadata as Record<string, unknown>)?.emiClicks as number,
    auctionParticipation: Boolean((lead.metadata as Record<string, unknown>)?.auctionView),
  });

  let aiSummary: string | undefined;
  const completion = await completeWithRetry({
    system: AGENT_SYSTEM_PROMPTS.leadbot,
    user: buildLeadSummaryPrompt(lead),
    maxTokens: 200,
  });
  if (completion.text) aiSummary = completion.text;

  const waMsg = fillWhatsAppTemplate("lead_ack_customer", {
    name: String(lead.name ?? "there"),
    vehicle: String(lead.vehicle_interest ?? "your selected vehicle"),
  });

  return {
    ok: true,
    agentId: "leadbot",
    action: "score_lead",
    data: {
      ...result,
      aiSummary,
      whatsappUrl: whatsAppUrl(String(lead.phone ?? "919876543210"), waMsg),
    },
    usedOpenAI: completion.source === "openai",
  };
}

export async function leadbotAssignDealer(ctx: AgentRunContext): Promise<AgentRunResult> {
  const dealerId = ctx.payload?.dealerId as string | undefined;
  const leadId = ctx.payload?.leadId as string | undefined;
  if (!dealerId || !leadId) {
    return { ok: false, agentId: "leadbot", action: "assign_dealer", error: "Missing ids", usedOpenAI: false };
  }
  return {
    ok: true,
    agentId: "leadbot",
    action: "assign_dealer",
    data: { leadId, dealerId, assigned: true },
    usedOpenAI: false,
  };
}
