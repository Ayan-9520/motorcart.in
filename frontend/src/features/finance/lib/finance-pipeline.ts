import type { FinanceStatus } from "@/types/database";

export const FINANCE_PIPELINE_STAGES: {
  status: FinanceStatus;
  label: string;
  description: string;
}[] = [
  { status: "submitted", label: "Submitted", description: "Application received" },
  { status: "processing", label: "Under review", description: "KYC & credit checks" },
  { status: "approved", label: "Approved", description: "Sanction letter ready" },
  { status: "disbursed", label: "Disbursed", description: "Funds released" },
];

export const FINANCE_TERMINAL_STATUSES: FinanceStatus[] = ["rejected", "disbursed"];

export function pipelineColumnForStatus(status: FinanceStatus): FinanceStatus | "rejected" {
  if (status === "rejected") return "rejected";
  if (status === "draft") return "submitted";
  return FINANCE_PIPELINE_STAGES.some((s) => s.status === status) ? status : "submitted";
}
