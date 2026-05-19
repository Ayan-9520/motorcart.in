import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { submitLoanApplication } from "../services/finance.service";
import type { Lender } from "../types";
import { calculateEmi } from "../lib/emi-utils";
import toast from "react-hot-toast";

interface LoanApplicationFormProps {
  lenders: Lender[];
  defaultBankSlug?: string;
}

export function LoanApplicationForm({ lenders, defaultBankSlug }: LoanApplicationFormProps) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const bankSlug = params.get("bank") ?? defaultBankSlug ?? lenders[0]?.slug;

  const lender = lenders.find((l) => l.slug === bankSlug) ?? lenders[0];
  const [loanAmount, setLoanAmount] = useState(1200000);
  const [tenure, setTenure] = useState(60);
  const [income, setIncome] = useState(75000);
  const [cibil, setCibil] = useState(720);
  const [employment, setEmployment] = useState("salaried");
  const [submitting, setSubmitting] = useState(false);

  const rate = lender ? (lender.interestRateMin + lender.interestRateMax) / 2 : 9.5;
  const emi = calculateEmi(loanAmount, rate, tenure);

  const submit = async () => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to apply");
      navigate("/login", { state: { from: "/finance/apply" } });
      return;
    }
    if (!lender) return;

    setSubmitting(true);
    const result = await submitLoanApplication({
      bankId: lender.id,
      loanAmount,
      tenureMonths: tenure,
      interestRate: rate,
      monthlyIncome: income,
      cibilScore: cibil,
      employmentType: employment,
      applicantMetadata: { fullName: user.fullName, phone: user.phone },
    });

    setSubmitting(false);
    if (result.ok) {
      const id = (result.data as { application_id: string }).application_id;
      toast.success("Application submitted! DSA assigned.");
      navigate(`/dashboard/customer/loans/${id}`);
    } else {
      toast.error("Submission failed");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Apply for auto loan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Lender</Label>
          <select
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            value={lender?.slug}
            onChange={(e) => navigate(`/finance/apply?bank=${e.target.value}`, { replace: true })}
          >
            {lenders.map((l) => (
              <option key={l.slug} value={l.slug}>{l.name}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Loan amount (₹)</Label>
            <Input type="number" className="mt-1" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Tenure (months)</Label>
            <Input type="number" className="mt-1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Monthly income (₹)</Label>
            <Input type="number" className="mt-1" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">CIBIL score</Label>
            <Input type="number" className="mt-1" value={cibil} onChange={(e) => setCibil(Number(e.target.value))} />
          </div>
        </div>
        <aside className="rounded-lg bg-accent/40 p-3 text-sm">
          Estimated EMI @ {rate.toFixed(2)}%: <strong>{formatCurrency(emi)}/month</strong>
        </aside>
        <Button variant="default" className="w-full h-12" disabled={submitting} onClick={submit}>
          {submitting ? "Submitting..." : "Submit application"}
        </Button>
      </CardContent>
    </Card>
  );
}
