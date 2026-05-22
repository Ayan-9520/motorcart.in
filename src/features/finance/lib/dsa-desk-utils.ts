import { lenderLogoPath } from "@/data/partner-logos";
import { PRIMARY_PARTNER_BANKS } from "../data/primary-partner-banks";
import type { LoanApplication } from "../types";

export const REQUIRED_LOAN_DOCUMENTS = [
  "PAN",
  "Aadhaar",
  "Salary slips",
  "Bank statement",
  "RC / Invoice",
] as const;

export interface PendingDocRow {
  applicationId: string;
  applicantLabel: string;
  bankName: string;
  missingDocs: string[];
  uploadedCount: number;
  totalRequired: number;
}

export interface CibilBucket {
  band: string;
  label: string;
  count: number;
  min: number;
  max: number;
  color: string;
}

export interface BankApprovalStat {
  bankId: string;
  bankName: string;
  logoUrl: string;
  submitted: number;
  processing: number;
  approved: number;
  rejected: number;
  disbursed: number;
}

export function applicantLabel(app: LoanApplication): string {
  if (app.notes?.startsWith("Applicant:")) {
    return app.notes.replace("Applicant:", "").trim();
  }
  return app.bankName ?? `Application ${app.id.slice(0, 8)}`;
}

export function getPendingDocRows(apps: LoanApplication[]): PendingDocRow[] {
  return apps
    .filter((a) => !["rejected", "disbursed"].includes(a.status))
    .map((app) => {
      const uploaded = new Set(app.documents.map((d) => d.name));
      const missingDocs = REQUIRED_LOAN_DOCUMENTS.filter((d) => !uploaded.has(d));
      return {
        applicationId: app.id,
        applicantLabel: applicantLabel(app),
        bankName: app.bankName ?? "—",
        missingDocs: [...missingDocs],
        uploadedCount: REQUIRED_LOAN_DOCUMENTS.length - missingDocs.length,
        totalRequired: REQUIRED_LOAN_DOCUMENTS.length,
      };
    })
    .filter((r) => r.missingDocs.length > 0)
    .sort((a, b) => b.missingDocs.length - a.missingDocs.length);
}

export function getCibilOverview(apps: LoanApplication[]): {
  average: number;
  buckets: CibilBucket[];
  lowScoreCount: number;
} {
  const scores = apps.filter((a) => a.cibilScore != null).map((a) => a.cibilScore!);
  const average = scores.length ? Math.round(scores.reduce((s, n) => s + n, 0) / scores.length) : 0;

  const buckets: CibilBucket[] = [
    { band: "750+", label: "Excellent", count: 0, min: 750, max: 900, color: "#22c55e" },
    { band: "700–749", label: "Good", count: 0, min: 700, max: 749, color: "#6366f1" },
    { band: "650–699", label: "Fair", count: 0, min: 650, max: 699, color: "#f59e0b" },
    { band: "<650", label: "Needs work", count: 0, min: 300, max: 649, color: "#ef4444" },
  ];

  for (const score of scores) {
    if (score >= 750) buckets[0].count++;
    else if (score >= 700) buckets[1].count++;
    else if (score >= 650) buckets[2].count++;
    else buckets[3].count++;
  }

  return {
    average,
    buckets,
    lowScoreCount: scores.filter((s) => s < 650).length,
  };
}

export function getBankApprovalStats(apps: LoanApplication[]): BankApprovalStat[] {
  const map = new Map<string, BankApprovalStat>();

  for (const bank of PRIMARY_PARTNER_BANKS) {
    map.set(bank.id, {
      bankId: bank.id,
      bankName: bank.name,
      logoUrl: bank.logoUrl,
      submitted: 0,
      processing: 0,
      approved: 0,
      rejected: 0,
      disbursed: 0,
    });
  }

  for (const app of apps) {
    const key = app.bankId === "vastu" ? "tata-capital" : app.bankId;
    if (!key || !map.has(key)) continue;
    const row = map.get(key)!;
    if (app.status === "submitted") row.submitted++;
    else if (app.status === "processing") row.processing++;
    else if (app.status === "approved") row.approved++;
    else if (app.status === "rejected") row.rejected++;
    else if (app.status === "disbursed") row.disbursed++;
  }

  return Array.from(map.values());
}

export function normalizeBankId(bankId: string | null): string | null {
  if (!bankId) return null;
  if (bankId === "vastu") return "tata-capital";
  return bankId;
}

export function bankLogoForId(bankId: string): string {
  return lenderLogoPath(normalizeBankId(bankId) ?? bankId);
}
