import { useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { calculateEmi, getDiscountedPrice } from "@/lib/vehicle-utils";
import { formatCurrency } from "@/lib/utils";
import type { VehicleListing } from "@/types/vehicle";

export function EmiCalculator({ vehicle }: { vehicle: VehicleListing }) {
  const price = getDiscountedPrice(vehicle);
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.15));
  const [tenure, setTenure] = useState(60);
  const [rate, setRate] = useState(vehicle.metadata.emiRate ?? 9.5);

  const principal = Math.max(0, price - downPayment);
  const emi = calculateEmi(principal, rate, tenure);
  const total = emi * tenure;
  const interest = total - principal;

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-primary" />
          EMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Down payment (₹)</Label>
            <Input type="number" className="mt-1" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Tenure (months)</Label>
            <Input type="number" className="mt-1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Interest rate (% p.a.)</Label>
            <Input type="number" step="0.1" className="mt-1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
        </div>
        <div className="rounded-xl bg-accent/50 p-4 text-center dark:bg-[#005c4b]/20">
          <p className="text-sm text-muted-foreground">Estimated EMI</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(emi)}<span className="text-base font-normal">/mo</span></p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p><span className="text-muted-foreground">Principal:</span> {formatCurrency(principal)}</p>
          <p><span className="text-muted-foreground">Interest:</span> {formatCurrency(interest)}</p>
          <p className="col-span-2"><span className="text-muted-foreground">Total payable:</span> {formatCurrency(total)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
