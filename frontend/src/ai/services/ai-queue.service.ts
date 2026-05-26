import type { AIAgentId } from "../types";
import { runAgent } from "../agents";
import type { AgentRunContext } from "../types";

interface QueueJob {
  id: string;
  agentId: AIAgentId;
  action: string;
  context: AgentRunContext;
}

const queue: QueueJob[] = [];
let processing = false;

export function enqueueAgentJob(
  agentId: AIAgentId,
  action: string,
  context: AgentRunContext = {}
) {
  queue.push({ id: crypto.randomUUID(), agentId, action, context });
  void drainQueue();
}

async function drainQueue() {
  if (processing) return;
  processing = true;
  while (queue.length) {
    const job = queue.shift()!;
    try {
      await runAgent(job.agentId, job.action, job.context);
    } catch (e) {
      console.warn("[AI queue]", job.agentId, job.action, e);
    }
    await new Promise((r) => setTimeout(r, 50));
  }
  processing = false;
}

export function getQueueLength(): number {
  return queue.length;
}
