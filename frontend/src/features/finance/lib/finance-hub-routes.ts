import {
  FINANCE_HUB_CATEGORIES,
  type FinanceHubCategoryId,
} from "../data/finance-hub-categories";

const VALID_IDS = new Set(FINANCE_HUB_CATEGORIES.map((c) => c.id));

export function parseFinanceType(param: string | null): FinanceHubCategoryId | undefined {
  return param && VALID_IDS.has(param as FinanceHubCategoryId)
    ? (param as FinanceHubCategoryId)
    : undefined;
}

export function financeCategoryLabel(id: FinanceHubCategoryId): string {
  return FINANCE_HUB_CATEGORIES.find((c) => c.id === id)?.label ?? "Auto Loan";
}

export function financeComparePath(category?: FinanceHubCategoryId): string {
  if (category === "insurance") return "/insurance";
  return category ? `/finance/compare?type=${category}` : "/finance/compare";
}

export function financeApplyPath(category?: FinanceHubCategoryId): string {
  if (category === "insurance") return "/insurance";
  return category ? `/finance/apply?type=${category}` : "/finance/apply";
}

export function financeOffersPath(category?: FinanceHubCategoryId): string {
  const base = "/finance/offers";
  return category ? `${base}?type=${category}` : base;
}
