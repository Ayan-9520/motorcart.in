import type { LeadScoreResult } from "../types";

export interface LeadScoreInput {
  name: string;
  phone: string;
  source?: string;
  vehicleInterest?: string | null;
  vehiclePrice?: number | null;
  aiScore?: number | null;
  metadata?: Record<string, unknown>;
  repeatVisits?: number;
  emiInteractions?: number;
  auctionParticipation?: boolean;
  responseTimeMinutes?: number | null;
}

export function scoreLead(input: LeadScoreInput): LeadScoreResult {
  const factors: { label: string; impact: number }[] = [];
  let score = input.aiScore ?? 50;

  if (input.vehiclePrice && input.vehiclePrice >= 500_000) {
    score += 12;
    factors.push({ label: "High budget vehicle interest", impact: 12 });
  } else if (input.vehiclePrice && input.vehiclePrice >= 200_000) {
    score += 6;
    factors.push({ label: "Mid-range budget", impact: 6 });
  }

  const visits = input.repeatVisits ?? (input.metadata?.visitCount as number) ?? 0;
  if (visits >= 3) {
    score += 15;
    factors.push({ label: "Repeat visits", impact: 15 });
  } else if (visits >= 1) {
    score += 5;
    factors.push({ label: "Return visitor", impact: 5 });
  }

  if ((input.emiInteractions ?? 0) > 0) {
    score += 10;
    factors.push({ label: "EMI calculator used", impact: 10 });
  }

  if (input.auctionParticipation) {
    score += 8;
    factors.push({ label: "Auction engagement", impact: 8 });
  }

  if (input.source === "test_drive" || input.source === "whatsapp") {
    score += 12;
    factors.push({ label: "High-intent source", impact: 12 });
  }

  if (input.responseTimeMinutes != null && input.responseTimeMinutes < 30) {
    score += 8;
    factors.push({ label: "Fast response", impact: 8 });
  }

  score = Math.min(100, Math.max(0, Math.round(score)));

  const tier: LeadScoreResult["tier"] = score >= 75 ? "hot" : score >= 50 ? "warm" : "cold";
  const conversionProbability = Math.min(95, Math.max(5, Math.round(score * 0.85)));

  const suggestedActions: string[] = [];
  if (tier === "hot") {
    suggestedActions.push("Call within 15 minutes", "Send WhatsApp with vehicle brochure", "Offer test drive slot");
  } else if (tier === "warm") {
    suggestedActions.push("Follow up via WhatsApp today", "Share similar vehicles", "Send EMI breakdown");
  } else {
    suggestedActions.push("Add to nurture sequence", "Send weekly inventory digest");
  }

  return {
    score,
    tier,
    conversionProbability,
    factors,
    summary: `${tier.toUpperCase()} lead — ${conversionProbability}% estimated conversion. ${input.vehicleInterest ?? "General inquiry"}.`,
    suggestedActions,
  };
}
