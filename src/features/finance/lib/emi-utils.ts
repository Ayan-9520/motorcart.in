export function calculateEmi(principal: number, annualRate: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r === 0) return Math.round(principal / tenureMonths);
  const emi =
    (principal * r * Math.pow(1 + r, tenureMonths)) /
    (Math.pow(1 + r, tenureMonths) - 1);
  return Math.round(emi);
}

export function totalInterestPayable(emi: number, tenureMonths: number, principal: number): number {
  return Math.max(0, emi * tenureMonths - principal);
}

export function effectiveRateFromEmi(principal: number, emi: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  let low = 0;
  let high = 30;
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    const calc = calculateEmi(principal, mid, tenureMonths);
    if (calc > emi) high = mid;
    else low = mid;
  }
  return Math.round(low * 100) / 100;
}
