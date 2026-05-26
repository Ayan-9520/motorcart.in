import type { DbBank } from "@/types/database";
import type { Lender } from "../types";
import { MOCK_LENDERS } from "../data/lenders";

export function mapDbBank(b: DbBank & { ranking_score?: number; min_cibil?: number; short_code?: string }): Lender {
  return {
    id: b.id,
    name: b.name,
    slug: b.slug,
    shortCode: b.short_code ?? b.name.slice(0, 4).toUpperCase(),
    logoUrl: b.logo_url,
    lenderType: (b.bank_type === "nbfc" ? "nbfc" : "bank") as Lender["lenderType"],
    interestRateMin: Number(b.interest_rate_min),
    interestRateMax: Number(b.interest_rate_max),
    maxTenureMonths: b.max_tenure_months,
    maxLoanAmount: Number(b.max_loan_amount),
    processingFee: b.processing_fee,
    features: b.features ?? [],
    isFeatured: b.is_featured,
    rankingScore: b.ranking_score ?? 50,
    minCibil: b.min_cibil ?? 650,
  };
}

export function mergeLenders(db: Lender[]): Lender[] {
  if (db.length >= 10) return db;
  const slugs = new Set(db.map((l) => l.slug));
  const extras = MOCK_LENDERS.filter((m) => !slugs.has(m.slug));
  return [...db, ...extras];
}
