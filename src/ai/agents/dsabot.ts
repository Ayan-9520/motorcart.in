import { fillWhatsAppTemplate, whatsAppUrl } from "../utils/whatsapp-templates";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function dsabotAssignLead(ctx: AgentRunContext): Promise<AgentRunResult> {
  const dsaId = ctx.payload?.dsaId as string | undefined;
  const applicationId = ctx.payload?.applicationId as string | undefined;
  return {
    ok: true,
    agentId: "dsabot",
    action: "assign_lead",
    data: { dsaId, applicationId, assigned: Boolean(dsaId && applicationId) },
    usedOpenAI: false,
  };
}

export async function dsabotNotify(ctx: AgentRunContext): Promise<AgentRunResult> {
  const phone = String(ctx.payload?.phone ?? "");
  const msg = fillWhatsAppTemplate("dsa_new_app", {
    amount: String(ctx.payload?.amount ?? 0),
    tenure: String(ctx.payload?.tenure ?? 60),
    name: String(ctx.payload?.name ?? "Customer"),
    link: String(ctx.payload?.link ?? "https://motorcart.in/dashboard/dsa"),
  });
  return {
    ok: true,
    agentId: "dsabot",
    action: "notify",
    data: { whatsappUrl: phone ? whatsAppUrl(phone, msg) : undefined },
    usedOpenAI: false,
  };
}
