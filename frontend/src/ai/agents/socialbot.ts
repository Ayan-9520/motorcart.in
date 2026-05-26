import { completeWithRetry } from "../services/openai.service";
import { AGENT_SYSTEM_PROMPTS } from "../prompts";
import { buildSocialCaptionPrompt } from "../prompts";
import { extractHashtags } from "@/features/community/lib/hashtags";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function socialbotCaption(ctx: AgentRunContext): Promise<AgentRunResult> {
  const vehicle = ctx.payload?.vehicle as { title: string; price: number; city?: string } | undefined;
  if (!vehicle) {
    return { ok: false, agentId: "socialbot", action: "caption", error: "No vehicle", usedOpenAI: false };
  }

  const completion = await completeWithRetry({
    system: AGENT_SYSTEM_PROMPTS.socialbot,
    user: buildSocialCaptionPrompt(vehicle),
    maxTokens: 300,
  });

  const baseTags = ["motorcart", "cars", "automotive", "india", vehicle.city?.toLowerCase().replace(/\s/g, "") ?? "carsforsale"].filter(Boolean);
  const hashtags = [...new Set([...extractHashtags(`${vehicle.title} automotive`), ...baseTags])].slice(0, 12);
  const caption =
    completion.text ||
    `🚗 ${vehicle.title} — now on Motorcart.in\n₹${vehicle.price.toLocaleString("en-IN")}${vehicle.city ? ` · ${vehicle.city}` : ""}\n\nDM for test drive!\n\n${hashtags.map((h) => `#${h}`).join(" ")}`;

  return {
    ok: true,
    agentId: "socialbot",
    action: "caption",
    data: { caption, hashtags },
    usedOpenAI: completion.source === "openai",
  };
}
