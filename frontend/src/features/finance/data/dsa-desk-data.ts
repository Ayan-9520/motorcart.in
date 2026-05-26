import type { FinanceCommission, FinanceLead, LoanApplication, LoanDocument } from "../types";
import { PRIMARY_PARTNER_BANK_IDS } from "./primary-partner-banks";

const DEMO_AGENT = "demo-dsa-agent";

const APPLICANTS = [
  "Rahul Sharma",
  "Priya Nair",
  "Amit Patel",
  "Sneha Reddy",
  "Vikram Singh",
  "Ananya Iyer",
  "Karan Mehta",
  "Divya Joshi",
  "Rohit Das",
  "Meera Krishnan",
  "Arjun Bose",
  "Pooja Gupta",
];

const STATUSES: LoanApplication["status"][] = [
  "submitted",
  "submitted",
  "processing",
  "processing",
  "processing",
  "approved",
  "approved",
  "approved",
  "disbursed",
  "disbursed",
  "rejected",
  "submitted",
];

const DOC_SETS: LoanDocument[][] = [
  [{ name: "PAN", path: "demo/pan.pdf", type: "id", uploadedAt: "2026-04-01" }],
  [],
  [
    { name: "PAN", path: "demo/pan.pdf", type: "id", uploadedAt: "2026-04-02" },
    { name: "Aadhaar", path: "demo/aadhaar.pdf", type: "id", uploadedAt: "2026-04-02" },
  ],
  [
    { name: "PAN", path: "demo/pan.pdf", type: "id", uploadedAt: "2026-03-28" },
    { name: "Salary slips", path: "demo/salary.pdf", type: "income", uploadedAt: "2026-03-29" },
  ],
  [
    { name: "PAN", path: "demo/pan.pdf", type: "id", uploadedAt: "2026-03-20" },
    { name: "Aadhaar", path: "demo/aadhaar.pdf", type: "id", uploadedAt: "2026-03-20" },
    { name: "Bank statement", path: "demo/bank.pdf", type: "income", uploadedAt: "2026-03-21" },
    { name: "RC / Invoice", path: "demo/rc.pdf", type: "vehicle", uploadedAt: "2026-03-22" },
  ],
];

function bankName(id: string): string {
  const names: Record<string, string> = {
    hdfc: "HDFC Bank",
    icici: "ICICI Bank",
    axis: "Axis Bank",
    sbi: "State Bank of India",
    chola: "Cholamandalam",
    "tata-capital": "Tata Capital",
  };
  return names[id] ?? id;
}

export function buildDsaDemoApplications(): LoanApplication[] {
  const base = Date.now();
  return APPLICANTS.map((name, i) => {
    const bankId = PRIMARY_PARTNER_BANK_IDS[i % PRIMARY_PARTNER_BANK_IDS.length];
    const loanAmount = 450000 + i * 85000;
    const tenure = 48 + (i % 3) * 12;
    const status = STATUSES[i];
    const docs = DOC_SETS[i % DOC_SETS.length];
    const cibil = 620 + (i % 8) * 25;
    return {
      id: `dsa-demo-app-${i + 1}`,
      userId: `demo-user-${i + 1}`,
      bankId,
      bankName: bankName(bankId),
      vehicleId: i % 2 === 0 ? `veh-${100 + i}` : null,
      dsaAgentId: DEMO_AGENT,
      loanAmount,
      tenureMonths: tenure,
      interestRate: 9 + (i % 4) * 0.25,
      emiAmount: Math.round((loanAmount / tenure) * 1.09),
      status,
      aiEligibilityScore: 65 + (i % 6) * 5,
      approvalProbability: status === "rejected" ? 22 : 58 + (i % 5) * 8,
      cibilScore: cibil,
      monthlyIncome: 45000 + i * 8000,
      employmentType: i % 3 === 0 ? "self_employed" : "salaried",
      applicationType: "new_loan",
      documents: docs,
      notes: `Applicant: ${name}`,
      createdAt: new Date(base - i * 86400000 * 2).toISOString(),
      updatedAt: new Date(base - i * 3600000).toISOString(),
    };
  });
}

export function buildDsaDemoCommissions(apps: LoanApplication[]): FinanceCommission[] {
  return apps
    .filter((a) => a.status === "approved" || a.status === "disbursed")
    .map((a, i) => ({
      id: `dsa-demo-comm-${i}`,
      applicationId: a.id,
      dsaAgentId: DEMO_AGENT,
      loanAmount: a.loanAmount,
      commissionRate: 1.25,
      commissionAmount: Math.round(a.loanAmount * 0.0125),
      status: a.status === "disbursed" ? ("paid" as const) : i % 2 === 0 ? ("pending" as const) : ("approved" as const),
      paidAt: a.status === "disbursed" ? a.updatedAt : null,
      createdAt: a.createdAt,
    }));
}

export function buildDsaDemoLeads(): FinanceLead[] {
  const base = Date.now();
  return [
    {
      id: "dsa-demo-lead-1",
      userId: null,
      source: "marketplace",
      productType: "car_loan",
      loanAmount: 1200000,
      monthlyIncome: 95000,
      cibilScore: 742,
      city: "Mumbai",
      phone: "+91 98XXX XXXXX",
      email: "lead1@example.com",
      assignedDsaId: DEMO_AGENT,
      assignedBankId: "hdfc",
      applicationId: null,
      status: "new",
      createdAt: new Date(base - 3600000).toISOString(),
    },
    {
      id: "dsa-demo-lead-2",
      userId: null,
      source: "eligibility_checker",
      productType: "bike_loan",
      loanAmount: 280000,
      monthlyIncome: 42000,
      cibilScore: 698,
      city: "Bengaluru",
      phone: "+91 97XXX XXXXX",
      email: null,
      assignedDsaId: DEMO_AGENT,
      assignedBankId: "icici",
      applicationId: "dsa-demo-app-3",
      status: "qualified",
      createdAt: new Date(base - 86400000).toISOString(),
    },
    {
      id: "dsa-demo-lead-3",
      userId: null,
      source: "dealer_referral",
      productType: "pre_owned",
      loanAmount: 650000,
      monthlyIncome: 72000,
      cibilScore: 715,
      city: "Delhi NCR",
      phone: "+91 96XXX XXXXX",
      email: "lead3@example.com",
      assignedDsaId: DEMO_AGENT,
      assignedBankId: "axis",
      applicationId: null,
      status: "contacted",
      createdAt: new Date(base - 172800000).toISOString(),
    },
  ];
}

export interface DsaTeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "lead" | "agent" | "trainee";
  activeLeads: number;
  conversions: number;
  status: "active" | "away";
}

export function buildDsaDemoTeam(): DsaTeamMember[] {
  return [
    {
      id: "team-1",
      name: "You (DSA lead)",
      email: "dsa.lead@motorcart.in",
      phone: "+91 90000 00001",
      role: "lead",
      activeLeads: 18,
      conversions: 42,
      status: "active",
    },
    {
      id: "team-2",
      name: "Neha Kapoor",
      email: "neha.k@motorcart.in",
      phone: "+91 90000 00002",
      role: "agent",
      activeLeads: 11,
      conversions: 28,
      status: "active",
    },
    {
      id: "team-3",
      name: "Suresh Menon",
      email: "suresh.m@motorcart.in",
      phone: "+91 90000 00003",
      role: "agent",
      activeLeads: 9,
      conversions: 19,
      status: "away",
    },
    {
      id: "team-4",
      name: "Isha Verma",
      email: "isha.v@motorcart.in",
      phone: "+91 90000 00004",
      role: "trainee",
      activeLeads: 4,
      conversions: 6,
      status: "active",
    },
  ];
}
