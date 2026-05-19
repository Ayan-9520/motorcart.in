import { AI_WORKFLOW_STORAGE_KEY } from "../constants";
import { runAgent } from "../agents";
import type { AIWorkflowId, AIWorkflowRun, AgentRunContext } from "../types";
import { AI_WORKFLOWS } from "./definitions";

function loadRuns(): AIWorkflowRun[] {
  try {
    const raw = localStorage.getItem(AI_WORKFLOW_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AIWorkflowRun[]) : [];
  } catch {
    return [];
  }
}

function saveRuns(runs: AIWorkflowRun[]) {
  localStorage.setItem(AI_WORKFLOW_STORAGE_KEY, JSON.stringify(runs.slice(0, 200)));
}

export async function runWorkflow(
  workflowId: AIWorkflowId,
  context: AgentRunContext = {}
): Promise<AIWorkflowRun> {
  const def = AI_WORKFLOWS.find((w) => w.id === workflowId);
  const run: AIWorkflowRun = {
    id: crypto.randomUUID(),
    workflow_id: workflowId,
    status: "running",
    steps_completed: 0,
    created_at: new Date().toISOString(),
    payload: context.payload,
  };

  if (!def) {
    run.status = "failed";
    run.error = "Workflow not found";
    saveRuns([run, ...loadRuns()]);
    return run;
  }

  try {
    for (const step of def.steps) {
      const result = await runAgent(step.agentId, step.action, context);
      if (!result.ok) {
        run.status = "failed";
        run.error = result.error ?? "Step failed";
        break;
      }
      run.steps_completed += 1;
    }
    if (run.status === "running") {
      run.status = "completed";
      run.completed_at = new Date().toISOString();
    }
  } catch (e) {
    run.status = "failed";
    run.error = e instanceof Error ? e.message : "Workflow error";
  }

  saveRuns([run, ...loadRuns()]);
  return run;
}

export function getWorkflowRuns(limit = 50): AIWorkflowRun[] {
  return loadRuns().slice(0, limit);
}

export { AI_WORKFLOWS };
