import type { AuctionBid } from "../types";

export interface FraudCheckInput {
  auctionId: string;
  userId: string;
  amount: number;
  currentBid: number | null;
  startingBid: number;
  userBids: AuctionBid[];
  recentGlobalBids: number;
}

export interface FraudCheckResult {
  allowed: boolean;
  riskScore: number;
  flags: string[];
  message?: string;
}

export function detectBidFraud(input: FraudCheckInput): FraudCheckResult {
  const flags: string[] = [];
  let riskScore = 0;

  const base = input.currentBid ?? input.startingBid;

  if (input.amount > base * 2) {
    flags.push("bid_jump_2x");
    riskScore += 35;
  }

  const lastUserBid = input.userBids[0];
  if (lastUserBid && input.amount > lastUserBid.amount * 1.5) {
    flags.push("rapid_escalation");
    riskScore += 25;
  }

  if (input.recentGlobalBids >= 6) {
    flags.push("high_frequency");
    riskScore += 20;
  }

  if (input.amount < base) {
    return { allowed: false, riskScore: 100, flags: ["below_minimum"], message: "Bid below minimum" };
  }

  if (riskScore >= 50) {
    return {
      allowed: false,
      riskScore,
      flags,
      message: "Bid flagged for security review",
    };
  }

  return { allowed: true, riskScore, flags };
}
