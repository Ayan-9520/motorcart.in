import type { LucideIcon } from "lucide-react";
import { Brain, Cpu, Shield, Zap, Workflow, MessageSquare, BarChart2 } from "lucide-react";
import type { AIAgentId } from "../types";

export const AI_HUB_FEATURES = [
  { id: "agents", label: "12 agents", description: "Domain specialists", icon: Brain },
  { id: "workflows", label: "7 workflows", description: "Event automation", icon: Workflow },
  { id: "openai", label: "GPT + rules", description: "Hybrid intelligence", icon: Cpu },
  { id: "realtime", label: "Live logs", description: "15s refresh", icon: BarChart2 },
  { id: "whatsapp", label: "WhatsApp", description: "Lead & support", icon: MessageSquare },
  { id: "secure", label: "Rate limited", description: "Safe at scale", icon: Shield },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}>;

export const AI_AGENT_ACCENTS: Record<
  AIAgentId,
  { gradient: string; ring: string }
> = {
  leadbot: { gradient: "from-emerald-500/20 to-teal-500/5", ring: "ring-emerald-500/30" },
  financebot: { gradient: "from-blue-500/20 to-cyan-500/5", ring: "ring-blue-500/30" },
  auctionbot: { gradient: "from-violet-500/20 to-purple-500/5", ring: "ring-violet-500/30" },
  dealerbot: { gradient: "from-amber-500/20 to-orange-500/5", ring: "ring-amber-500/30" },
  supportbot: { gradient: "from-sky-500/20 to-blue-500/5", ring: "ring-sky-500/30" },
  socialbot: { gradient: "from-pink-500/20 to-rose-500/5", ring: "ring-pink-500/30" },
  inventorybot: { gradient: "from-lime-500/20 to-green-500/5", ring: "ring-lime-500/30" },
  analyticsbot: { gradient: "from-indigo-500/20 to-violet-500/5", ring: "ring-indigo-500/30" },
  recommendationbot: { gradient: "from-primary/25 to-primary/5", ring: "ring-primary/40" },
  notificationbot: { gradient: "from-yellow-500/20 to-amber-500/5", ring: "ring-yellow-500/30" },
  dsabot: { gradient: "from-slate-500/20 to-zinc-500/5", ring: "ring-slate-500/30" },
  communitybot: { gradient: "from-teal-500/20 to-emerald-500/5", ring: "ring-teal-500/30" },
};

export const AI_HUB_TRUST = [
  { label: "Autonomous", sub: "Multi-agent mesh" },
  { label: "Hybrid AI", sub: "OpenAI + rules" },
  { label: "Realtime", sub: "Action logs" },
  { label: "Secure", sub: "Rate limited" },
];
