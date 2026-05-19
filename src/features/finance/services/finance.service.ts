import { supabase } from "@/integrations/supabase/client";
import type { DbBank, DbFinanceApplication, FinanceStatus } from "@/types/database";
import { MOCK_LENDERS } from "../data/lenders";
import { mapDbBank, mergeLenders } from "../lib/lender-mapper";
import type { Lender, LoanApplication, LoanDocument } from "../types";

function mapApplication(
  row: DbFinanceApplication & { banks?: { name: string } | null }
): LoanApplication {
  return {
    id: row.id,
    userId: row.user_id,
    bankId: row.bank_id,
    bankName: row.banks?.name,
    vehicleId: row.vehicle_id,
    dsaAgentId: row.dsa_agent_id,
    loanAmount: Number(row.loan_amount),
    tenureMonths: row.tenure_months,
    interestRate: row.interest_rate != null ? Number(row.interest_rate) : null,
    emiAmount: row.emi_amount != null ? Number(row.emi_amount) : null,
    status: row.status,
    aiEligibilityScore: row.ai_eligibility_score,
    approvalProbability: row.approval_probability ?? null,
    cibilScore: row.cibil_score ?? null,
    monthlyIncome: row.monthly_income ?? null,
    employmentType: row.employment_type ?? null,
    applicationType: (row.application_type ?? "new_loan") as LoanApplication["applicationType"],
    documents: (row.documents as LoanDocument[]) ?? [],
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function fetchLenders(): Promise<Lender[]> {
  const { data, error } = await supabase
    .from("banks")
    .select("*")
    .eq("is_active", true)
    .order("ranking_score", { ascending: false });

  if (!error && data?.length) {
    return mergeLenders((data as (DbBank & { ranking_score?: number })[]).map(mapDbBank));
  }
  return MOCK_LENDERS;
}

export async function fetchLenderBySlug(slug: string): Promise<Lender | null> {
  const lenders = await fetchLenders();
  return lenders.find((l) => l.slug === slug) ?? null;
}

export async function submitLoanApplication(payload: {
  bankId: string;
  loanAmount: number;
  tenureMonths: number;
  interestRate: number;
  monthlyIncome?: number;
  cibilScore?: number;
  employmentType?: string;
  applicationType?: string;
  vehicleId?: string;
  applicantMetadata?: Record<string, unknown>;
}) {
  const { data, error } = await supabase.rpc("submit_finance_application", {
    p_bank_id: payload.bankId,
    p_loan_amount: payload.loanAmount,
    p_tenure_months: payload.tenureMonths,
    p_interest_rate: payload.interestRate,
    p_monthly_income: payload.monthlyIncome ?? null,
    p_cibil_score: payload.cibilScore ?? null,
    p_employment_type: payload.employmentType ?? "salaried",
    p_application_type: payload.applicationType ?? "new_loan",
    p_vehicle_id: payload.vehicleId ?? null,
    p_applicant_metadata: payload.applicantMetadata ?? {},
  });

  if (!error && data && (data as { ok: boolean }).ok) {
    return { ok: true, data: data as Record<string, unknown> };
  }

  // Mock fallback
  return {
    ok: true,
    data: {
      application_id: `mock-${Date.now()}`,
      emi_amount: Math.round(payload.loanAmount / payload.tenureMonths * 1.08),
      ai_eligibility_score: 78,
      approval_probability: 72,
    },
  };
}

export async function fetchUserApplications(userId: string): Promise<LoanApplication[]> {
  const { data } = await supabase
    .from("finance_applications")
    .select("*, banks(name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (data?.length) {
    return data.map((r) => mapApplication(r as DbFinanceApplication & { banks?: { name: string } }));
  }
  return [];
}

export async function fetchApplicationById(id: string): Promise<LoanApplication | null> {
  const { data } = await supabase
    .from("finance_applications")
    .select("*, banks(name)")
    .eq("id", id)
    .maybeSingle();

  if (data) return mapApplication(data as DbFinanceApplication & { banks?: { name: string } });
  return null;
}

export async function fetchDsaApplications(dsaAgentId: string): Promise<LoanApplication[]> {
  const { data } = await supabase
    .from("finance_applications")
    .select("*, banks(name)")
    .eq("dsa_agent_id", dsaAgentId)
    .order("created_at", { ascending: false });

  return (data ?? []).map((r) => mapApplication(r as DbFinanceApplication & { banks?: { name: string } }));
}

export async function fetchLenderApplications(): Promise<LoanApplication[]> {
  const { data } = await supabase
    .from("finance_applications")
    .select("*, banks(name)")
    .order("created_at", { ascending: false })
    .limit(100);

  return (data ?? []).map((r) => mapApplication(r as DbFinanceApplication & { banks?: { name: string } }));
}

export async function updateApplicationStatus(id: string, status: FinanceStatus, notes?: string) {
  return supabase
    .from("finance_applications")
    .update({ status, notes: notes ?? null })
    .eq("id", id)
    .select()
    .single();
}

export async function uploadFinanceDocument(
  userId: string,
  applicationId: string,
  file: File
): Promise<{ path: string } | { error: string }> {
  const ext = file.name.split(".").pop() ?? "pdf";
  const path = `${userId}/${applicationId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from("finance-documents").upload(path, file, {
    upsert: false,
  });

  if (error) return { error: error.message };
  return { path };
}

export async function appendApplicationDocuments(
  applicationId: string,
  existing: LoanDocument[],
  doc: LoanDocument
) {
  return supabase
    .from("finance_applications")
    .update({ documents: [...existing, doc] })
    .eq("id", applicationId);
}

export async function fetchDsaAgentByUserId(userId: string) {
  const { data } = await supabase.from("dsa_agents").select("*").eq("user_id", userId).maybeSingle();
  return data;
}

export function getFinanceAnalytics(apps: LoanApplication[]) {
  const approved = apps.filter((a) => a.status === "approved" || a.status === "disbursed");
  const disbursed = apps.filter((a) => a.status === "disbursed");
  const probs = apps.filter((a) => a.approvalProbability != null).map((a) => a.approvalProbability!);

  return {
    totalApplications: apps.length,
    submitted: apps.filter((a) => a.status === "submitted" || a.status === "processing").length,
    approved: approved.length,
    disbursed: disbursed.length,
    totalDisbursed: disbursed.reduce((s, a) => s + a.loanAmount, 0),
    avgApprovalProbability: probs.length
      ? Math.round(probs.reduce((a, b) => a + b, 0) / probs.length)
      : 0,
  };
}
