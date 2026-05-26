import { ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AIActionLog } from "../types";

interface AILogFeedProps {
  logs: AIActionLog[];
}

export function AILogFeed({ logs }: AILogFeedProps) {
  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <span className="ai-panel-icon">
          <ScrollText className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h2 className="ai-panel-title">Live action logs</h2>
          <p className="text-xs text-muted-foreground">Last 15 agent executions</p>
        </div>
      </div>
      <div className="ai-log-scroll">
        {logs.length === 0 && (
          <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-6 text-center text-sm text-muted-foreground">
            No AI actions yet. Run a test on any agent to populate telemetry.
          </p>
        )}
        {logs.slice(0, 15).map((log) => (
          <article key={log.id} className="ai-log-row">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold capitalize text-foreground">{log.agent_id}</p>
              <p className="text-xs text-muted-foreground">
                {log.action}
                {log.duration_ms != null && ` · ${log.duration_ms}ms`}
              </p>
              {log.output_summary && (
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{log.output_summary}</p>
              )}
            </div>
            <Badge
              variant={log.status === "success" ? "default" : log.status === "error" ? "destructive" : "outline"}
              className="shrink-0 text-[10px]"
            >
              {log.status}
            </Badge>
          </article>
        ))}
      </div>
    </div>
  );
}
