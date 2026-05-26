import type { CibilEstimate } from "../types";

export function estimateCibil(params: {
  paymentHistory: "excellent" | "good" | "average" | "poor";
  creditUtilization: number;
  creditAgeYears: number;
  recentEnquiries: number;
  existingLoans: number;
}): CibilEstimate {
  let score = 750;

  const phMap = { excellent: 30, good: 15, average: -10, poor: -40 };
  score += phMap[params.paymentHistory];

  if (params.creditUtilization > 70) score -= 35;
  else if (params.creditUtilization > 40) score -= 15;
  else score += 10;

  score += Math.min(25, params.creditAgeYears * 3);
  score -= params.recentEnquiries * 8;
  score -= params.existingLoans > 3 ? 15 : 0;

  score = Math.max(300, Math.min(900, score));

  const band: CibilEstimate["band"] =
    score >= 750 ? "excellent" : score >= 700 ? "good" : score >= 650 ? "fair" : "poor";

  const factors: CibilEstimate["factors"] = [
    { label: "Payment history", impact: params.paymentHistory === "excellent" ? "positive" : params.paymentHistory === "poor" ? "negative" : "neutral" },
    { label: `Credit utilization (${params.creditUtilization}%)`, impact: params.creditUtilization > 50 ? "negative" : "positive" },
    { label: `${params.recentEnquiries} recent enquiries`, impact: params.recentEnquiries > 2 ? "negative" : "neutral" },
    { label: `${params.creditAgeYears}y credit age`, impact: params.creditAgeYears >= 3 ? "positive" : "neutral" },
  ];

  return { score, band, factors };
}
