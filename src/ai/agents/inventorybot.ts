import { runInventoryOptimizer } from "@/features/dealer-crm/lib/inventory-optimizer";
import { completeWithRetry } from "../services/openai.service";
import { AGENT_SYSTEM_PROMPTS } from "../prompts";
import { buildInventoryDescriptionPrompt } from "../prompts";
import type { VehicleListing } from "@/types/vehicle";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function inventorybotOptimize(ctx: AgentRunContext): Promise<AgentRunResult> {
  const vehicles = (ctx.payload?.vehicles ?? []) as VehicleListing[];
  const suggestions = runInventoryOptimizer(vehicles);
  const healthScore = vehicles.length
    ? Math.round(
        100 -
          (suggestions.filter((s) => s.priority === "high").length / Math.max(vehicles.length, 1)) * 40
      )
    : 100;

  return {
    ok: true,
    agentId: "inventorybot",
    action: "optimize",
    data: { suggestions, healthScore, duplicateCount: 0 },
    usedOpenAI: false,
  };
}

export async function inventorybotDescription(ctx: AgentRunContext): Promise<AgentRunResult> {
  const vehicle = ctx.payload?.vehicle as Record<string, unknown> | undefined;
  if (!vehicle) {
    return { ok: false, agentId: "inventorybot", action: "description", error: "No vehicle", usedOpenAI: false };
  }

  const completion = await completeWithRetry({
    system: AGENT_SYSTEM_PROMPTS.inventorybot,
    user: buildInventoryDescriptionPrompt(vehicle),
    maxTokens: 200,
  });

  const description =
    completion.text ||
    `Well-maintained ${vehicle.brand} ${vehicle.model} (${vehicle.year}). Contact dealer on Motorcart.in for inspection & best price.`;

  return {
    ok: true,
    agentId: "inventorybot",
    action: "description",
    data: { description },
    usedOpenAI: completion.source === "openai",
  };
}
