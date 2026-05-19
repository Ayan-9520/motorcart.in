import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPageMeta } from "@/utils/seo";
import { useFinanceMarketplace } from "../hooks/useFinanceMarketplace";
import { LoanComparisonTable } from "../components/LoanComparisonTable";
import { AiRecommendationPanel } from "../components/AiRecommendationPanel";

export function LoanComparePage() {
  const { offers, recommendations, loanAmount, tenureMonths, setLoanAmount, setTenureMonths } = useFinanceMarketplace();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Compare Auto Loans — Motorcart.in" });
  }, []);

  const toggle = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : prev.length < 4 ? [...prev, slug] : prev
    );
  };

  const compared = offers.filter((o) => selected.length === 0 || selected.includes(o.slug));

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/finance"><ArrowLeft className="h-4 w-4 mr-1" /> Finance home</Link>
      </Button>
      <h1 className="text-3xl font-bold">Loan comparison</h1>
      <p className="text-muted-foreground">Select up to 4 lenders to compare side-by-side.</p>

      <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
        <div>
          <Label>Loan amount (₹)</Label>
          <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
        </div>
        <div>
          <Label>Tenure (months)</Label>
          <Input type="number" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))} />
        </div>
      </div>

      <AiRecommendationPanel recommendations={recommendations} />
      <LoanComparisonTable offers={compared} selectedSlugs={selected} onToggle={toggle} />

      <Button variant="default" asChild>
        <Link to="/finance/apply">Apply with best offer</Link>
      </Button>
    </div>
  );
}
