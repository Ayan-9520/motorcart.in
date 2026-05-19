import { useCallback, useEffect, useState } from "react";
import { AI_AGENTS } from "../constants";
import { getAIActionLogs, getAIStatsToday } from "../services/ai-log.service";
import { getWorkflowRuns } from "../workflows/engine";
import { runAgent, listAgentActions } from "../agents";
import { isOpenAIConfigured } from "../services/openai.service";
import type { AIActionLog, AIAgentId, AIWorkflowRun } from "../types";

export function useAIControlCenter() {
  const [logs, setLogs] = useState<AIActionLog[]>([]);
  const [workflowRuns, setWorkflowRuns] = useState<AIWorkflowRun[]>([]);
  const [stats, setStats] = useState(getAIStatsToday());
  const [running, setRunning] = useState<AIAgentId | null>(null);

  const refresh = useCallback(() => {
    setLogs(getAIActionLogs(80));
    setWorkflowRuns(getWorkflowRuns(30));
    setStats(getAIStatsToday());
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 15_000);
    return () => clearInterval(id);
  }, [refresh]);

  const testAgent = useCallback(
    async (agentId: AIAgentId) => {
      setRunning(agentId);
      const actions = listAgentActions(agentId);
      const action = actions[0] ?? "chat";
      const payload =
        agentId === "leadbot"
          ? { lead: { name: "Test User", phone: "919999999999", source: "website", vehicle_interest: "SUV" } }
          : agentId === "supportbot"
            ? { message: "How do I apply for a car loan?" }
            : agentId === "communitybot"
              ? { body: "Great car deal visit motorcart" }
              : {};

      await runAgent(agentId, action, { payload });
      refresh();
      setRunning(null);
    },
    [refresh]
  );

  return {
    agents: AI_AGENTS,
    logs,
    workflowRuns,
    stats,
    running,
    openAIEnabled: isOpenAIConfigured(),
    refresh,
    testAgent,
  };
}
