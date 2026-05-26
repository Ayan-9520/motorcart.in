import { useState } from "react";
import { IndianRupee, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { estimateLoanEligibility } from "@/lib/vehicle-utils";
import { formatCurrency } from "@/lib/utils";

export function LoanEligibility() {
  const [income, setIncome] = useState(75000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof estimateLoanEligibility> | null>(null);

  const check = () => setResult(estimateLoanEligibility(income, existingEmi));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <IndianRupee className="h-5 w-5 text-primary" />
          Loan Eligibility
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-xs">Monthly income (₹)</Label>
          <Input type="number" className="mt-1" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
        </div>
        <div>
          <Label className="text-xs">Existing EMIs (₹)</Label>
          <Input type="number" className="mt-1" value={existingEmi} onChange={(e) => setExistingEmi(Number(e.target.value))} />
        </div>
        <Button type="button" variant="default" className="w-full" onClick={check}>
          Check Eligibility
        </Button>
        {result && (
          <div className={`rounded-xl border p-4 ${result.eligible ? "border-primary/30 bg-accent/30" : "border-destructive/30 bg-destructive/5"}`}>
            <div className="flex items-center gap-2 font-semibold">
              {result.eligible ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <XCircle className="h-5 w-5 text-destructive" />}
              {result.eligible ? "Likely Eligible" : "Needs Review"}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{result.message}</p>
            {result.eligible && (
              <p className="mt-2 text-sm">
                Max EMI: <strong>{formatCurrency(result.maxEmi)}</strong> · Max loan: <strong>{formatCurrency(result.maxLoan)}</strong>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
