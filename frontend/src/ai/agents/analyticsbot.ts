import { getAIActionLogs, getAIStatsToday } from "../services/ai-log.service";
import type { AgentRunContext, AgentRunResult } from "../types";

export async function analyticsbotDailyReport(ctx: AgentRunContext): Promise<AgentRunResult> {
  const stats = getAIStatsToday();
  const logs = getAIActionLogs(20);
  const leadsHandled = logs.filter((l) => l.agent_id === "leadbot").length;
  const financeActions = logs.filter((l) => l.agent_id === "financebot").length;

  return {
    ok: true,
    agentId: "analyticsbot",
    action: "daily_report",
    data: {
      date: new Date().toISOString().slice(0, 10),
      aiActions: stats.actionsToday,
      successRate: stats.successRate,
      leadsHandled,
      financeActions,
      byAgent: stats.byAgent,
      summary: `Today: ${stats.actionsToday} AI actions, ${stats.successRate}% success. LeadBot handled ${leadsHandled} tasks.`,
    },
    usedOpenAI: false,
  };
}

export async function analyticsbotDealerInsights(ctx: AgentRunContext): Promise<AgentRunResult> {
  const leads = Number(ctx.payload?.totalLeads ?? 0);
  const converted = Number(ctx.payload?.converted ?? 0);
  const rate = leads ? Math.round((converted / leads) * 100) : 0;

  return {
    ok: true,
    agentId: "analyticsbot",
    action: "dealer_insights",
    data: {
      conversionRate: rate,
      forecast: `At current pace, expect ~${Math.round(converted * 1.15)} conversions next month.`,
      tip: rate < 15 ? "Focus on hot leads & faster WhatsApp response." : "Scale featured listings for momentum.",
    },
    usedOpenAI: false,
  };
}
