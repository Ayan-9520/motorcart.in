export type AIInsightTone = "positive" | "neutral" | "warning";

export interface AIInsight {
  id: string;
  title: string;
  detail: string;
  tone?: AIInsightTone;
}

export interface AIIntent {
  label: string;
  module: string;
  href: string;
  confidence: number;
}
