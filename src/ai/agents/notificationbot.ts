import { supabase } from "@/integrations/supabase/client";
import { fillWhatsAppTemplate, whatsAppUrl } from "../utils/whatsapp-templates";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function notificationbotSend(ctx: AgentRunContext): Promise<AgentRunResult> {
  const userId = ctx.payload?.userId as string | undefined;
  const title = String(ctx.payload?.title ?? "Motorcart update");
  const message = String(ctx.payload?.message ?? "");
  const type = String(ctx.payload?.type ?? "info");
  const link = ctx.payload?.link as string | undefined;

  if (userId) {
    await supabase.from("notifications").insert({
      user_id: userId,
      title,
      message,
      type,
      link: link ?? null,
    });
  }

  let waLink: string | undefined;
  const templateId = ctx.payload?.templateId as string | undefined;
  if (templateId && ctx.payload?.phone) {
    const body = fillWhatsAppTemplate(templateId, (ctx.payload?.vars ?? {}) as Record<string, string>);
    waLink = whatsAppUrl(String(ctx.payload.phone), body);
  }

  return {
    ok: true,
    agentId: "notificationbot",
    action: "send",
    data: { sent: Boolean(userId), whatsappUrl: waLink },
    usedOpenAI: false,
  };
}
