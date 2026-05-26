import { INSURANCE_ADDONS } from "../data/insurance-addons";
import type {
  InsurancePlanType,
  InsuranceQuoteInput,
  InsuranceQuoteOffer,
  InsuranceVehicleType,
  PremiumBreakdownLine,
} from "../types";
import type { InsurancePartner } from "../types";

const TP_FIXED: Record<InsuranceVehicleType, number> = { car: 4899, bike: 1349 };

/** % of IDV per annum (own damage component) */
const OD_RATE: Record<InsuranceVehicleType, Record<InsurancePlanType, number>> = {
  car: {
    third_party: 0,
    own_damage: 2.65,
    comprehensive: 3.35,
    zero_dep: 4.15,
  },
  bike: {
    third_party: 0,
    own_damage: 1.95,
    comprehensive: 2.55,
    zero_dep: 3.25,
  },
};

const PLAN_LABELS: Record<InsurancePlanType, string> = {
  third_party: "Third Party",
  own_damage: "Own Damage",
  comprehensive: "Comprehensive",
  zero_dep: "Zero Depreciation",
};

/** Depreciation % off ex-showroom for IDV by vehicle age */
export function estimateIdv(exShowroom: number, vehicleYear: number): number {
  const age = Math.max(0, new Date().getFullYear() - vehicleYear);
  const factors = [1, 0.85, 0.7, 0.6, 0.5, 0.42, 0.36, 0.3];
  const factor = factors[Math.min(age, factors.length - 1)] ?? 0.25;
  return Math.round(exShowroom * factor);
}

export function defaultExShowroom(vehicleType: InsuranceVehicleType): number {
  return vehicleType === "car" ? 850000 : 95000;
}

function partnerMultiplier(slug: string, planType: InsurancePlanType): number {
  const base: Record<string, number> = {
    acko: 0.92,
    digit: 0.94,
    "hdfc-ergo": 1.02,
    "icici-lombard": 1.0,
    "bajaj-allianz": 0.98,
    "tata-aig": 1.04,
  };
  const planAdj = planType === "zero_dep" ? 1.03 : 1;
  return (base[slug] ?? 1) * planAdj;
}

function addonTotal(addonIds: string[], vehicleType: InsuranceVehicleType): number {
  return addonIds.reduce((sum, id) => {
    const a = INSURANCE_ADDONS.find((x) => x.id === id);
    if (!a || !a.vehicleTypes.includes(vehicleType)) return sum;
    return sum + a.annualCost;
  }, 0);
}

function buildBreakdown(
  input: InsuranceQuoteInput,
  idv: number,
  odPremium: number,
  tpPremium: number,
  ncbDiscount: number,
  addonPrem: number,
  gst: number
): PremiumBreakdownLine[] {
  const lines: PremiumBreakdownLine[] = [];
  if (tpPremium > 0) lines.push({ label: "Third party (TP)", amount: tpPremium });
  if (odPremium > 0) lines.push({ label: "Own damage (OD)", amount: odPremium });
  if (ncbDiscount > 0) lines.push({ label: `NCB ${input.ncbPercent}%`, amount: -ncbDiscount });
  if (addonPrem > 0) lines.push({ label: "Add-ons", amount: addonPrem });
  lines.push({ label: "GST (18%)", amount: gst });
  lines.push({ label: "IDV (insured value)", amount: idv });
  return lines;
}

export function calculatePartnerPremium(
  partner: InsurancePartner,
  input: InsuranceQuoteInput
): InsuranceQuoteOffer | null {
  if (!partner.planTypes.includes(input.planType)) return null;

  const exShowroom = input.vehicleValue ?? defaultExShowroom(input.vehicleType);
  const idv = input.vehicleValue ? estimateIdv(input.vehicleValue, input.vehicleYear) : estimateIdv(exShowroom, input.vehicleYear);

  const tp = input.planType === "own_damage" ? 0 : TP_FIXED[input.vehicleType];
  const odRate = OD_RATE[input.vehicleType][input.planType];
  let odPremium = Math.round((idv * odRate) / 100);
  odPremium = Math.round(odPremium * partnerMultiplier(partner.slug, input.planType));

  const subtotalBeforeNcb = tp + odPremium;
  const ncbDiscount = Math.round((odPremium * input.ncbPercent) / 100);
  const addonPrem = addonTotal(input.addons, input.vehicleType);
  const taxable = subtotalBeforeNcb - ncbDiscount + addonPrem;
  const gst = Math.round(taxable * 0.18);
  const annualPremium = taxable + gst;
  const monthlyPremium = Math.round(annualPremium / 12);

  const csr = partner.claimSettlementRatio;
  const rankScore = Math.round(100 - annualPremium / 500 + csr * 0.3);

  return {
    id: `quote-${partner.slug}-${input.planType}-${input.vehicleType}`,
    partnerId: partner.id,
    partnerName: partner.name,
    partnerSlug: partner.slug,
    logoUrl: partner.logoUrl,
    planType: input.planType,
    vehicleType: input.vehicleType,
    vehicleYear: input.vehicleYear,
    vehicleMake: input.vehicleMake,
    vehicleModel: input.vehicleModel,
    registrationCity: input.registrationCity,
    idvAmount: idv,
    annualPremium,
    monthlyPremium,
    ncbPercent: input.ncbPercent,
    claimSettlementRatio: csr,
    rankScore,
    approvalProbability: Math.min(98, Math.round(72 + csr * 0.2 + (input.ncbPercent > 0 ? 5 : 0))),
    breakdown: buildBreakdown(input, idv, odPremium, tp, ncbDiscount, addonPrem, gst),
    addons: input.addons,
    highlights: [
      `${csr}% claim settlement`,
      PLAN_LABELS[input.planType],
      input.ncbPercent > 0 ? `${input.ncbPercent}% NCB applied` : "No claim bonus eligible",
    ],
  };
}

export function rankInsuranceQuotes(offers: InsuranceQuoteOffer[]): InsuranceQuoteOffer[] {
  return [...offers].sort((a, b) => b.rankScore - a.rankScore || a.annualPremium - b.annualPremium);
}

export function planTypeLabel(plan: InsurancePlanType): string {
  return PLAN_LABELS[plan];
}

export const PLAN_OPTIONS: { id: InsurancePlanType; label: string; desc: string }[] = [
  { id: "comprehensive", label: "Comprehensive", desc: "TP + OD — full protection" },
  { id: "zero_dep", label: "Zero Dep", desc: "No depreciation on parts" },
  { id: "third_party", label: "Third Party", desc: "Legal minimum cover" },
  { id: "own_damage", label: "Own Damage", desc: "OD only — TP separate" },
];

export const POPULAR_CAR_MODELS = [
  { make: "Maruti", model: "Swift" },
  { make: "Hyundai", model: "Creta" },
  { make: "Tata", model: "Nexon" },
  { make: "Honda", model: "City" },
  { make: "Mahindra", model: "XUV700" },
];

export const POPULAR_BIKE_MODELS = [
  { make: "Hero", model: "Splendor" },
  { make: "Honda", model: "Activa" },
  { make: "Bajaj", model: "Pulsar" },
  { make: "TVS", model: "Apache" },
  { make: "Royal Enfield", model: "Classic 350" },
];
