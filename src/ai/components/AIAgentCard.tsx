import type { ComponentType } from "react";
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
  Bot,
  Activity,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AIAgentMeta, AIAgentId } from "../types";
import { AI_AGENT_ACCENTS } from "../data/ai-hub-data";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
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

interface AIAgentCardProps {
  agent: AIAgentMeta;
  actionsToday: number;
  running: boolean;
  onTest: (id: AIAgentId) => void;
  index?: number;
}

export function AIAgentCard({ agent, actionsToday, running, onTest, index = 0 }: AIAgentCardProps) {
  const Icon = ICON_MAP[agent.icon] ?? Bot;
  const accent = AI_AGENT_ACCENTS[agent.id];

  return (
    <article
      className={cn("ai-agent-card group", `bg-gradient-to-br ${accent.gradient}`)}
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <div className="ai-agent-card-inner">
        <div className="flex items-start justify-between gap-2">
          <span className={cn("ai-agent-icon", accent.ring)}>
            <Icon className="h-5 w-5 text-primary" />
          </span>
          <Badge variant="outline" className="border-border/60 bg-card/80 text-[10px] font-medium">
            {actionsToday} today
          </Badge>
        </div>
        <h3 className="mt-3 font-bold text-foreground group-hover:text-primary">{agent.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{agent.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {agent.capabilities.slice(0, 4).map((c) => (
            <span key={c} className="ai-agent-cap">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-end border-t border-border/50 pt-3">
          <Button
            size="sm"
            variant={running ? "secondary" : "default"}
            className="h-8 rounded-lg text-xs font-semibold shadow-[var(--shadow-primary)]"
            disabled={running}
            onClick={() => onTest(agent.id)}
          >
            {running ? (
              <Activity className="h-3.5 w-3.5 animate-pulse" />
            ) : (
              <>
                <Play className="mr-1 h-3.5 w-3.5" />
                Test agent
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
