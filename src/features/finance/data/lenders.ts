import type { Lender } from "../types";
import { lenderLogoPath } from "@/data/partner-logos";

const logo = (id: string) => lenderLogoPath(id);

export const MOCK_LENDERS: Lender[] = [
  { id: "sbi", name: "State Bank of India", slug: "sbi", shortCode: "SBI", logoUrl: logo("sbi"), lenderType: "bank", interestRateMin: 8.5, interestRateMax: 12, maxTenureMonths: 84, maxLoanAmount: 5000000, processingFee: "0.25%", features: ["Largest PSU bank", "Lowest rates"], isFeatured: true, rankingScore: 95, minCibil: 700 },
  { id: "bob", name: "Bank of Baroda", slug: "bob", shortCode: "BOB", logoUrl: logo("bob"), lenderType: "bank", interestRateMin: 8.65, interestRateMax: 12.25, maxTenureMonths: 84, maxLoanAmount: 4500000, processingFee: "0.35%", features: ["Flexible tenure"], isFeatured: true, rankingScore: 88, minCibil: 680 },
  { id: "boi", name: "Bank of India", slug: "boi", shortCode: "BOI", logoUrl: logo("boi"), lenderType: "bank", interestRateMin: 8.7, interestRateMax: 12.4, maxTenureMonths: 84, maxLoanAmount: 4000000, processingFee: "0.40%", features: ["Pre-owned car loans"], isFeatured: false, rankingScore: 82, minCibil: 670 },
  { id: "pnb", name: "Punjab National Bank", slug: "pnb", shortCode: "PNB", logoUrl: logo("pnb"), lenderType: "bank", interestRateMin: 8.55, interestRateMax: 12.15, maxTenureMonths: 84, maxLoanAmount: 4200000, processingFee: "0.30%", features: ["EV loan specials"], isFeatured: true, rankingScore: 86, minCibil: 680 },
  { id: "uco", name: "UCO Bank", slug: "uco", shortCode: "UCO", logoUrl: logo("uco"), lenderType: "bank", interestRateMin: 8.8, interestRateMax: 12.5, maxTenureMonths: 72, maxLoanAmount: 3500000, processingFee: "0.45%", features: ["Affordable EMIs"], isFeatured: false, rankingScore: 75, minCibil: 650 },
  { id: "iob", name: "Indian Overseas Bank", slug: "iob", shortCode: "IOB", logoUrl: logo("iob"), lenderType: "bank", interestRateMin: 8.75, interestRateMax: 12.45, maxTenureMonths: 72, maxLoanAmount: 3800000, processingFee: "0.42%", features: ["Rural schemes"], isFeatured: false, rankingScore: 74, minCibil: 650 },
  { id: "hdfc", name: "HDFC Bank", slug: "hdfc-bank", shortCode: "HDFC", logoUrl: logo("hdfc"), lenderType: "bank", interestRateMin: 8.75, interestRateMax: 12.5, maxTenureMonths: 84, maxLoanAmount: 7500000, processingFee: "0.5%", features: ["Instant approval", "Zero foreclosure"], isFeatured: true, rankingScore: 98, minCibil: 720 },
  { id: "icici", name: "ICICI Bank", slug: "icici-bank", shortCode: "ICICI", logoUrl: logo("icici"), lenderType: "bank", interestRateMin: 8.99, interestRateMax: 13, maxTenureMonths: 84, maxLoanAmount: 7500000, processingFee: "₹2,999", features: ["Pre-approved offers"], isFeatured: true, rankingScore: 96, minCibil: 710 },
  { id: "axis", name: "Axis Bank", slug: "axis-bank", shortCode: "AXIS", logoUrl: logo("axis"), lenderType: "bank", interestRateMin: 9.25, interestRateMax: 13.5, maxTenureMonths: 72, maxLoanAmount: 5000000, processingFee: "1%", features: ["Quick disbursal"], isFeatured: true, rankingScore: 90, minCibil: 700 },
  { id: "kotak", name: "Kotak Mahindra Bank", slug: "kotak", shortCode: "KOTAK", logoUrl: logo("kotak"), lenderType: "bank", interestRateMin: 9, interestRateMax: 12.75, maxTenureMonths: 60, maxLoanAmount: 5000000, processingFee: "₹3,500", features: ["Digital KYC"], isFeatured: true, rankingScore: 92, minCibil: 705 },
  { id: "au", name: "AU Small Finance Bank", slug: "au-bank", shortCode: "AU", logoUrl: logo("au"), lenderType: "bank", interestRateMin: 9.5, interestRateMax: 14, maxTenureMonths: 60, maxLoanAmount: 3000000, processingFee: "1.2%", features: ["MSME focus"], isFeatured: false, rankingScore: 78, minCibil: 640 },
  { id: "chola", name: "Cholamandalam Investment", slug: "cholamandalam", shortCode: "CHOLA", logoUrl: logo("chola"), lenderType: "nbfc", interestRateMin: 9.75, interestRateMax: 15, maxTenureMonths: 60, maxLoanAmount: 4000000, processingFee: "1.5%", features: ["Pre-owned car specialist"], isFeatured: true, rankingScore: 85, minCibil: 620 },
  { id: "mahindra", name: "Mahindra Finance", slug: "mahindra-finance", shortCode: "M&M", logoUrl: logo("mahindra-finance"), lenderType: "nbfc", interestRateMin: 9.25, interestRateMax: 14.5, maxTenureMonths: 72, maxLoanAmount: 4500000, processingFee: "1%", features: ["Tractor & CV loans"], isFeatured: true, rankingScore: 87, minCibil: 630 },
  {
    id: "tata-capital",
    name: "Tata Capital",
    slug: "tata-capital",
    shortCode: "TATA",
    logoUrl: logo("tata-capital"),
    lenderType: "nbfc",
    interestRateMin: 9.49,
    interestRateMax: 14.75,
    maxTenureMonths: 72,
    maxLoanAmount: 5000000,
    processingFee: "1.2%",
    features: ["Pre-owned & new car loans", "Quick disbursal"],
    isFeatured: true,
    rankingScore: 89,
    minCibil: 650,
  },
];
