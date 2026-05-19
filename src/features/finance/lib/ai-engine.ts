import type { Lender, AiRecommendation, EligibilityInput, LoanOffer } from "../types";
import { calculateEmi, totalInterestPayable } from "./emi-utils";
import { checkEligibility } from "./eligibility";

/** Bank ranking: combines DB ranking_score with rate fit for applicant */
export function rankLenders(
  lenders: Lender[],
  loanAmount: number,
  tenureMonths: number,
  cibilScore: number
): Lender[] {
  return [...lenders]
    .filter((l) => loanAmount <= l.maxLoanAmount && tenureMonths <= l.maxTenureMonths && cibilScore >= l.minCibil - 30)
    .sort((a, b) => {
      const rateA = (a.interestRateMin + a.interestRateMax) / 2;
      const rateB = (b.interestRateMin + b.interestRateMax) / 2;
      const scoreA = a.rankingScore - rateA * 2 + (cibilScore >= a.minCibil ? 10 : 0);
      const scoreB = b.rankingScore - rateB * 2 + (cibilScore >= b.minCibil ? 10 : 0);
      return scoreB - scoreA;
    });
}

export function computeApprovalProbability(
  lender: Lender,
  input: Pick<EligibilityInput, "monthlyIncome" | "cibilScore" | "loanAmount" | "employmentType">
): number {
  const elig = checkEligibility({
    ...input,
    existingEmi: 0,
    tenureMonths: 60,
  });

  let prob = 40;
  if (input.cibilScore >= lender.minCibil) prob += 25;
  else if (input.cibilScore >= lender.minCibil - 50) prob += 10;

  if (input.monthlyIncome >= 100000) prob += 15;
  else if (input.monthlyIncome >= 50000) prob += 8;

  if (input.loanAmount <= lender.maxLoanAmount * 0.7) prob += 10;
  if (elig.eligible) prob += 12;
  if (input.employmentType === "salaried") prob += 5;

  return Math.min(98, Math.max(12, Math.round(prob)));
}

export function buildLoanOffers(
  lenders: Lender[],
  loanAmount: number,
  tenureMonths: number,
  input: EligibilityInput
): LoanOffer[] {
  const ranked = rankLenders(lenders, loanAmount, tenureMonths, input.cibilScore);

  return ranked.slice(0, 10).map((lender, i) => {
    const effectiveRate = (lender.interestRateMin + lender.interestRateMax) / 2;
    const emi = calculateEmi(loanAmount, effectiveRate, tenureMonths);
    const approvalProbability = computeApprovalProbability(lender, input);

    return {
      ...lender,
      effectiveRate,
      emi,
      totalInterest: totalInterestPayable(emi, tenureMonths, loanAmount),
      approvalProbability,
      rank: i + 1,
    };
  });
}

export function getAiRecommendations(
  lenders: Lender[],
  loanAmount: number,
  tenureMonths: number,
  input: EligibilityInput,
  limit = 3
): AiRecommendation[] {
  const offers = buildLoanOffers(lenders, loanAmount, tenureMonths, input);

  return offers.slice(0, limit).map((offer) => {
    const reasons: string[] = [];
    if (offer.rank === 1) reasons.push("Top ranked lender on Motorcart");
    if (offer.approvalProbability >= 75) reasons.push("High approval probability for your profile");
    if (offer.effectiveRate <= 9.5) reasons.push("Competitive interest rate");
    if (input.cibilScore >= offer.minCibil) reasons.push("CIBIL meets lender criteria");
    if (offer.isFeatured) reasons.push("Featured partner with fast disbursal");

    const score = Math.round(
      offer.approvalProbability * 0.4 +
        offer.rankingScore * 0.35 +
        (100 - offer.effectiveRate * 5) * 0.25
    );

    return {
      lender: offer,
      score,
      reasons: reasons.slice(0, 4),
      approvalProbability: offer.approvalProbability,
      estimatedEmi: offer.emi,
    };
  });
}

export function getRefinanceSavings(
  outstanding: number,
  currentRate: number,
  remainingMonths: number,
  newRate: number,
  newTenure: number
): { currentEmi: number; newEmi: number; monthlySavings: number; totalSavings: number } {
  const currentEmi = calculateEmi(outstanding, currentRate, remainingMonths);
  const newEmi = calculateEmi(outstanding, newRate, newTenure);
  const monthlySavings = Math.max(0, currentEmi - newEmi);
  const totalSavings = monthlySavings * Math.min(remainingMonths, newTenure);
  return { currentEmi, newEmi, monthlySavings, totalSavings };
}
