import { completeWithRetry } from "../services/openai.service";
import { buildSupportPrompt } from "../prompts";
import type { AgentRunContext, AgentRunResult } from "../types";

const FAQ: Record<string, string> = {
  vehicle: "Browse /vehicles for new & pre-owned cars, bikes, trucks & EVs. Use filters for budget, city & fuel type.",
  loan: "Visit /finance for EMI calculator, bank comparison & instant apply. Typical approval: 24–72 hours.",
  auction: "Live auctions at /auctions — register, place bids in real time, and get winner notifications.",
  service: "Book servicing, detailing & more at /services with slot booking & WhatsApp updates.",
  parts: "OEM & aftermarket parts at /parts with cart checkout & invoice.",
  default:
    "Motorcart.in covers vehicles, finance, auctions, parts & services. Ask about buying, loans, or bookings!",
};

function rulesReply(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("loan") || m.includes("emi") || m.includes("finance")) return FAQ.loan;
  if (m.includes("auction") || m.includes("bid")) return FAQ.auction;
  if (m.includes("service") || m.includes("booking") || m.includes("repair")) return FAQ.service;
  if (m.includes("part")) return FAQ.parts;
  if (m.includes("car") || m.includes("vehicle") || m.includes("buy")) return FAQ.vehicle;
  return FAQ.default;
}

export async function supportbotChat(ctx: AgentRunContext): Promise<AgentRunResult<{ reply: string }>> {
  const message = String(ctx.payload?.message ?? "");
  const page = String(ctx.payload?.page ?? "home");

  const completion = await completeWithRetry({
    system: buildSupportPrompt({ page, recentSearches: ctx.payload?.recentSearches as string[] }),
    user: message,
    maxTokens: 350,
  });

  const reply = completion.text || rulesReply(message);

  return {
    ok: true,
    agentId: "supportbot",
    action: "chat",
    data: { reply },
    usedOpenAI: completion.source === "openai",
  };
}
