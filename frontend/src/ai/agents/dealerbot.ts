import { fillWhatsAppTemplate, whatsAppUrl } from "../utils/whatsapp-templates";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function dealerbotOnboarding(ctx: AgentRunContext): Promise<AgentRunResult> {
  const phone = String(ctx.payload?.phone ?? "919876543210");
  const link = String(ctx.payload?.kycLink ?? "https://motorcart.in/profile/kyc");
  const msg = fillWhatsAppTemplate("dealer_kyc", { link });
  return {
    ok: true,
    agentId: "dealerbot",
    action: "onboarding",
    data: {
      steps: ["Complete profile", "Upload GST & address proof", "Add first 5 listings", "Enable WhatsApp leads"],
      whatsappUrl: whatsAppUrl(phone, msg),
    },
    usedOpenAI: false,
  };
}

export async function dealerbotPricingTip(ctx: AgentRunContext): Promise<AgentRunResult> {
  const price = Number(ctx.payload?.price ?? 0);
  const marketAvg = Number(ctx.payload?.marketAvg ?? price);
  const diff = ((price - marketAvg) / Math.max(marketAvg, 1)) * 100;
  let tip = "Price is aligned with market.";
  if (diff > 8) tip = `Consider reducing by ${Math.round(diff / 2)}% to improve enquiries.`;
  if (diff < -5) tip = "Competitive pricing — highlight premium features in description.";

  return {
    ok: true,
    agentId: "dealerbot",
    action: "pricing_tip",
    data: { tip, diffPercent: Math.round(diff) },
    usedOpenAI: false,
  };
}
