export type AIAgentId =
  | "leadbot"
  | "financebot"
  | "auctionbot"
  | "dealerbot"
  | "supportbot"
  | "socialbot"
  | "inventorybot"
  | "analyticsbot"
  | "recommendationbot"
  | "notificationbot"
  | "dsabot"
  | "communitybot";

export type AIAgentStatus = "idle" | "running" | "success" | "error";

export interface AIAgentMeta {
  id: AIAgentId;
  name: string;
  description: string;
  icon: string;
  capabilities: string[];
}

export interface AIActionLog {
  id: string;
  agent_id: AIAgentId;
  action: string;
  status: "success" | "error" | "skipped";
  input_summary?: string;
  output_summary?: string;
  duration_ms?: number;
  created_at: string;
  metadata?: Record<string, unknown>;
}

export type AIWorkflowId =
  | "new_lead"
  | "loan_application"
  | "auction_ending"
  | "dealer_signup"
  | "vehicle_upload"
  | "service_booking"
  | "community_post";

export interface AIWorkflowStep {
  agentId: AIAgentId;
  action: string;
}

export interface AIWorkflowDefinition {
  id: AIWorkflowId;
  name: string;
  description: string;
  steps: AIWorkflowStep[];
}

export interface AIWorkflowRun {
  id: string;
  workflow_id: AIWorkflowId;
  status: "pending" | "running" | "completed" | "failed";
  steps_completed: number;
  error?: string;
  created_at: string;
  completed_at?: string;
  payload?: Record<string, unknown>;
}

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

export interface AICompletionRequest {
  system: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AICompletionResult {
  text: string;
  source: "openai" | "rules";
  tokensUsed?: number;
}

export interface LeadScoreResult {
  score: number;
  tier: "hot" | "warm" | "cold";
  conversionProbability: number;
  factors: { label: string; impact: number }[];
  summary: string;
  suggestedActions: string[];
}

export interface AgentRunContext {
  userId?: string;
  dealerId?: string;
  payload?: Record<string, unknown>;
}

export interface AgentRunResult<T = unknown> {
  ok: boolean;
  agentId: AIAgentId;
  action: string;
  data?: T;
  error?: string;
  usedOpenAI: boolean;
}
