import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { getRefinanceSavings } from "../lib/ai-engine";

export function RefinancePanel() {
  const [outstanding, setOutstanding] = useState(800000);
  const [currentRate, setCurrentRate] = useState(11.5);
  const [remaining, setRemaining] = useState(48);
  const [newRate, setNewRate] = useState(9.25);
  const [newTenure, setNewTenure] = useState(48);

  const savings = useMemo(
    () => getRefinanceSavings(outstanding, currentRate, remaining, newRate, newTenure),
    [outstanding, currentRate, remaining, newRate, newTenure]
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <RefreshCw className="h-5 w-5 text-primary" />
          Refinance calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Outstanding (₹)</Label>
            <Input type="number" className="mt-1" value={outstanding} onChange={(e) => setOutstanding(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Current rate %</Label>
            <Input type="number" step="0.1" className="mt-1" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Months left</Label>
            <Input type="number" className="mt-1" value={remaining} onChange={(e) => setRemaining(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">New rate %</Label>
            <Input type="number" step="0.1" className="mt-1" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} />
          </div>
        </div>
        <aside className="rounded-xl border border-primary/30 bg-primary/5 p-4 grid gap-2 sm:grid-cols-2 text-sm">
          <p>Current EMI: <strong>{formatCurrency(savings.currentEmi)}</strong></p>
          <p>New EMI: <strong className="text-primary">{formatCurrency(savings.newEmi)}</strong></p>
          <p>Monthly savings: <strong>{formatCurrency(savings.monthlySavings)}</strong></p>
          <p>Total savings: <strong>{formatCurrency(savings.totalSavings)}</strong></p>
        </aside>
      </CardContent>
    </Card>
  );
}
