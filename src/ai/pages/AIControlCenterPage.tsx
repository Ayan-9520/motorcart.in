import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  Activity,
  Zap,
  CheckCircle2,
  AlertCircle,
  Play,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import {
  Users,
  IndianRupee,
  Gavel,
  Store,
  Headphones,
  Share2,
  Package,
  BarChart3,
  Sparkles,
  Bell,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAIControlCenter } from "../hooks/useAIControlCenter";
import { AI_WORKFLOWS } from "../workflows/engine";
import { runWorkflow } from "../workflows/engine";
import { setPageMeta } from "@/utils/seo";
import type { AIAgentId } from "../types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  IndianRupee,
  Gavel,
  Store,
  Headphones,
  Share2,
  Package,
  BarChart3,
  Sparkles,
  Bell,
  Briefcase,
  MessageCircle,
};

function AgentIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Bot;
  return <Icon className="h-5 w-5" />;
}

export function AIControlCenterPage() {
  const { agents, logs, workflowRuns, stats, running, openAIEnabled, refresh, testAgent } = useAIControlCenter();

  useEffect(() => {
    setPageMeta({
      title: "AI Control Center",
      description: "Motorcart AI agents, automations, and system health",
    });
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Motorcart AI</p>
          <h1 className="text-3xl font-bold tracking-tight">AI Control Center</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            12 autonomous agents powering leads, finance, auctions, CRM, and community — with workflow automation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={openAIEnabled ? "default" : "outline"} className="gap-1">
            {openAIEnabled ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
            OpenAI {openAIEnabled ? "connected" : "rules mode"}
          </Badge>
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Actions today</p>
            <p className="text-3xl font-bold">{stats.actionsToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Success rate</p>
            <p className="text-3xl font-bold">{stats.successRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Active agents</p>
            <p className="text-3xl font-bold">{agents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Workflows</p>
            <p className="text-3xl font-bold">{AI_WORKFLOWS.length}</p>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" /> AI Agents
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id} className="premium-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <AgentIcon name={agent.icon} />
                  </span>
                  {agent.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{agent.description}</p>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 3).map((c) => (
                    <Badge key={c} variant="outline" className="text-[10px]">
                      {c}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">
                    Today: {stats.byAgent[agent.id] ?? 0}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={running === agent.id}
                    onClick={() => testAgent(agent.id as AIAgentId)}
                  >
                    {running === agent.id ? (
                      <Activity className="h-3 w-3 animate-pulse" />
                    ) : (
                      <Play className="h-3 w-3 mr-1" />
                    )}
                    Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-primary" /> Automation workflows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {AI_WORKFLOWS.map((w) => (
              <article
                key={w.id}
                className="flex items-center justify-between rounded-xl border border-border p-4"
              >
                <div>
                  <p className="font-medium">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.description}</p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    runWorkflow(w.id, {
                      payload: { lead: { name: "Demo", phone: "919999999999", source: "website" } },
                    })
                  }
                >
                  Run
                </Button>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent AI logs</CardTitle>
          </CardHeader>
          <CardContent className="max-h-80 space-y-2 overflow-y-auto">
            {logs.length === 0 && (
              <p className="text-sm text-muted-foreground">No AI actions yet. Run a test on any agent.</p>
            )}
            {logs.slice(0, 15).map((log) => (
              <div key={log.id} className="flex items-start justify-between gap-2 rounded-lg border border-border p-2 text-xs">
                <div>
                  <span className="font-semibold capitalize">{log.agent_id}</span>
                  <span className="text-muted-foreground"> · {log.action}</span>
                  {log.output_summary && (
                    <p className="mt-1 text-muted-foreground line-clamp-1">{log.output_summary}</p>
                  )}
                </div>
                <Badge variant={log.status === "success" ? "default" : "destructive"} className="shrink-0">
                  {log.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {workflowRuns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Workflow runs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {workflowRuns.slice(0, 8).map((run) => (
              <div key={run.id} className="flex justify-between rounded-lg border border-border p-3 text-sm">
                <span className="font-medium">{run.workflow_id}</span>
                <Badge variant="outline">{run.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Set <code className="rounded bg-muted px-1">VITE_OPENAI_API_KEY</code> in .env.local for GPT-powered responses.{" "}
        <Link to="/" className="text-primary inline-flex items-center gap-1">
          Back to site <ExternalLink className="h-3 w-3" />
        </Link>
      </p>
    </div>
  );
}
