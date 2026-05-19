import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { calculateEmi, totalInterestPayable } from "../lib/emi-utils";

interface EmiCalculatorWidgetProps {
  defaultAmount?: number;
  defaultRate?: number;
  defaultTenure?: number;
}

export function EmiCalculatorWidget({
  defaultAmount = 1200000,
  defaultRate = 9.5,
  defaultTenure = 60,
}: EmiCalculatorWidgetProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);

  const emi = useMemo(() => calculateEmi(amount, rate, tenure), [amount, rate, tenure]);
  const interest = useMemo(() => totalInterestPayable(emi, tenure, amount), [emi, tenure, amount]);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-primary" />
          EMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label className="text-xs">Loan amount (₹)</Label>
            <Input type="number" className="mt-1" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Rate (% p.a.)</Label>
            <Input type="number" step="0.1" className="mt-1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Tenure (months)</Label>
            <Input type="number" className="mt-1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
          </div>
        </div>
        <div className="rounded-xl bg-accent/50 p-5 text-center dark:bg-[#005c4b]/20">
          <p className="text-sm text-muted-foreground">Monthly EMI</p>
          <p className="text-4xl font-bold text-primary">{formatCurrency(emi)}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <p><span className="text-muted-foreground">Total interest:</span> {formatCurrency(interest)}</p>
          <p><span className="text-muted-foreground">Total payable:</span> {formatCurrency(emi * tenure)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
