import { supabase } from "@/integrations/supabase/client";
import { AI_LOG_STORAGE_KEY } from "../constants";
import type { AIActionLog, AIAgentId } from "../types";

function loadLocal(): AIActionLog[] {
  try {
    const raw = localStorage.getItem(AI_LOG_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AIActionLog[]) : [];
  } catch {
    return [];
  }
}

function saveLocal(logs: AIActionLog[]) {
  localStorage.setItem(AI_LOG_STORAGE_KEY, JSON.stringify(logs.slice(0, 500)));
}

export async function logAIAction(input: {
  agentId: AIAgentId;
  action: string;
  status: AIActionLog["status"];
  inputSummary?: string;
  outputSummary?: string;
  durationMs?: number;
  metadata?: Record<string, unknown>;
  userId?: string;
}) {
  const entry: AIActionLog = {
    id: crypto.randomUUID(),
    agent_id: input.agentId,
    action: input.action,
    status: input.status,
    input_summary: input.inputSummary,
    output_summary: input.outputSummary,
    duration_ms: input.durationMs,
    created_at: new Date().toISOString(),
    metadata: input.metadata,
  };

  const logs = [entry, ...loadLocal()];
  saveLocal(logs);

  try {
    await supabase.from("analytics").insert({
      event_type: "ai_action",
      user_id: input.userId ?? null,
      entity_type: "ai_agent",
      entity_id: null,
      payload: {
        agent_id: input.agentId,
        action: input.action,
        status: input.status,
        output_summary: input.outputSummary,
        ...input.metadata,
      },
    });
  } catch {
    /* analytics optional */
  }

  return entry;
}

export function getAIActionLogs(limit = 100): AIActionLog[] {
  return loadLocal().slice(0, limit);
}

export function getAIStatsToday(): {
  actionsToday: number;
  successRate: number;
  byAgent: Record<string, number>;
} {
  const today = new Date().toISOString().slice(0, 10);
  const logs = loadLocal().filter((l) => l.created_at.startsWith(today));
  const success = logs.filter((l) => l.status === "success").length;
  const byAgent: Record<string, number> = {};
  logs.forEach((l) => {
    byAgent[l.agent_id] = (byAgent[l.agent_id] ?? 0) + 1;
  });
  return {
    actionsToday: logs.length,
    successRate: logs.length ? Math.round((success / logs.length) * 100) : 100,
    byAgent,
  };
}
