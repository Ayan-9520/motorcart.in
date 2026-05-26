import { Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AI_WORKFLOWS } from "../workflows/engine";
import { runWorkflow } from "../workflows/engine";
import type { AIWorkflowRun } from "../types";

interface AIWorkflowPanelProps {
  runs: AIWorkflowRun[];
  onRunComplete?: () => void;
}

export function AIWorkflowPanel({ runs, onRunComplete }: AIWorkflowPanelProps) {
  const handleRun = async (workflowId: (typeof AI_WORKFLOWS)[number]["id"]) => {
    await runWorkflow(workflowId, {
      payload: { lead: { name: "Demo", phone: "919999999999", source: "website" } },
    });
    onRunComplete?.();
  };

  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <span className="ai-panel-icon">
          <Zap className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h2 className="ai-panel-title">Automation workflows</h2>
          <p className="text-xs text-muted-foreground">Event chains across agents</p>
        </div>
      </div>
      <ul className="ai-workflow-list">
        {AI_WORKFLOWS.map((w, i) => (
          <li key={w.id} className="ai-workflow-row" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{w.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{w.description}</p>
              <p className="mt-1 text-[10px] font-medium text-muted-foreground">
                {w.steps.length} step{w.steps.length === 1 ? "" : "s"}
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="shrink-0 rounded-lg font-semibold"
              onClick={() => void handleRun(w.id)}
            >
              <Play className="mr-1 h-3.5 w-3.5" />
              Run
            </Button>
          </li>
        ))}
      </ul>
      {runs.length > 0 && (
        <div className="mt-4 border-t border-border/60 pt-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Recent runs</p>
          <ul className="space-y-2">
            {runs.slice(0, 5).map((run) => (
              <li key={run.id} className="ai-workflow-run-pill">
                <span className="truncate font-medium capitalize">{run.workflow_id.replace(/_/g, " ")}</span>
                <span className={run.status === "completed" ? "text-primary" : "text-muted-foreground"}>
                  {run.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
