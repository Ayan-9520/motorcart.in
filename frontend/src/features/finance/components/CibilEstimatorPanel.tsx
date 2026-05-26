import { useState } from "react";
import { Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { estimateCibil } from "../lib/cibil";
import { cn } from "@/lib/utils";

export function CibilEstimatorPanel() {
  const [utilization, setUtilization] = useState(35);
  const [age, setAge] = useState(5);
  const [enquiries, setEnquiries] = useState(1);
  const [history, setHistory] = useState<"excellent" | "good" | "average" | "poor">("good");
  const [result, setResult] = useState<ReturnType<typeof estimateCibil> | null>(null);

  const run = () => {
    setResult(
      estimateCibil({
        paymentHistory: history,
        creditUtilization: utilization,
        creditAgeYears: age,
        recentEnquiries: enquiries,
        existingLoans: 1,
      })
    );
  };

  const bandColor = {
    excellent: "text-primary",
    good: "text-primary",
    fair: "text-[#f59e0b]",
    poor: "text-[#ef4444]",
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gauge className="h-5 w-5 text-primary" />
          CIBIL score estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Credit utilization %</Label>
            <input type="range" min={0} max={100} value={utilization} onChange={(e) => setUtilization(Number(e.target.value))} className="w-full mt-2" />
            <p className="text-xs text-muted-foreground">{utilization}%</p>
          </div>
          <div>
            <Label className="text-xs">Credit age (years)</Label>
            <input type="range" min={0} max={15} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full mt-2" />
          </div>
          <div>
            <Label className="text-xs">Payment history</Label>
            <select className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={history} onChange={(e) => setHistory(e.target.value as typeof history)}>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div>
            <Label className="text-xs">Recent enquiries</Label>
            <input type="number" className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={enquiries} onChange={(e) => setEnquiries(Number(e.target.value))} />
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={run}>Estimate score</Button>
        {result && (
          <aside className="rounded-xl border p-5 text-center">
            <p className={cn("text-5xl font-bold tabular-nums", bandColor[result.band])}>{result.score}</p>
            <p className="mt-1 capitalize text-sm text-muted-foreground">{result.band} credit profile</p>
            <ul className="mt-4 space-y-1 text-left text-xs">
              {result.factors.map((f) => (
                <li key={f.label} className={f.impact === "positive" ? "text-primary" : f.impact === "negative" ? "text-red-600" : "text-muted-foreground"}>
                  {f.label}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </CardContent>
    </Card>
  );
}
