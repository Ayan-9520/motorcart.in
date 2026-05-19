import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bot, Activity, TrendingUp, Workflow, ExternalLink } from "lucide-react";
import { setPageMeta } from "@/utils/seo";
import { useAIControlCenter } from "../hooks/useAIControlCenter";
import { AI_WORKFLOWS } from "../workflows/engine";
import { AIHubHero } from "../components/AIHubHero";
import { AIFeatureStrip } from "../components/AIFeatureStrip";
import { AIHubStatCard } from "../components/AIHubStatCard";
import { AIAgentCard } from "../components/AIAgentCard";
import { AIWorkflowPanel } from "../components/AIWorkflowPanel";
import { AILogFeed } from "../components/AILogFeed";
import { AI_HUB_TRUST } from "../data/ai-hub-data";
import type { AIAgentId } from "../types";

export function AIControlCenterPage() {
  const { agents, logs, workflowRuns, stats, running, openAIEnabled, refresh, testAgent } = useAIControlCenter();

  useEffect(() => {
    setPageMeta({
      title: "AI Control Center — Motorcart",
      description: "Motorcart AI agents, automations, workflows, and live system telemetry",
    });
  }, []);

  return (
    <div className="ai-hub-page min-h-screen">
      <AIHubHero
        openAIEnabled={openAIEnabled}
        agentCount={agents.length}
        workflowCount={AI_WORKFLOWS.length}
        actionsToday={stats.actionsToday}
        onRefresh={refresh}
      />

      <div className="container -mt-2 mb-6 flex flex-wrap justify-center gap-3">
        {AI_HUB_TRUST.map(({ label, sub }) => (
          <span key={sub} className="ai-hub-stat-pill">
            <strong>{label}</strong> {sub}
          </span>
        ))}
      </div>

      <section className="container pb-8">
        <div className="ai-hub-stats-grid">
          <AIHubStatCard label="Actions today" value={stats.actionsToday} icon={Activity} highlight />
          <AIHubStatCard label="Success rate" value={`${stats.successRate}%`} icon={TrendingUp} />
          <AIHubStatCard label="Active agents" value={agents.length} icon={Bot} />
          <AIHubStatCard label="Workflows" value={AI_WORKFLOWS.length} icon={Workflow} />
        </div>
      </section>

      <AIFeatureStrip />

      <section id="ai-agents" className="container pb-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="ai-hub-section-title flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              AI agents
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Domain specialists · test any agent to log live telemetry
            </p>
          </div>
        </div>
        <div className="ai-agents-grid">
          {agents.map((agent, i) => (
            <AIAgentCard
              key={agent.id}
              agent={agent}
              actionsToday={stats.byAgent[agent.id] ?? 0}
              running={running === agent.id}
              onTest={(id) => void testAgent(id as AIAgentId)}
              index={i}
            />
          ))}
        </div>
      </section>

      <section className="container border-t border-border/80 pb-14 pt-8">
        <div className="ai-hub-panels-grid">
          <AIWorkflowPanel runs={workflowRuns} onRunComplete={refresh} />
          <AILogFeed logs={logs} />
        </div>
      </section>

      <section className="container pb-14">
        <div className="ai-hub-footer-cta text-center">
          <p className="text-sm text-muted-foreground">
            Customer-facing AI chat runs site-wide via the floating assistant.{" "}
            <Link to="/" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
              Back to marketplace <ExternalLink className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
