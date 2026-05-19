import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setPageMeta } from "@/utils/seo";
import { useFinanceMarketplace } from "../hooks/useFinanceMarketplace";
import { EmiCalculatorWidget } from "../components/EmiCalculatorWidget";
import { EligibilityChecker } from "../components/EligibilityChecker";
import { BankOfferCard } from "../components/BankOfferCard";
import { AiRecommendationPanel } from "../components/AiRecommendationPanel";
import { CibilEstimatorPanel } from "../components/CibilEstimatorPanel";
import { RefinancePanel } from "../components/RefinancePanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

export function FinanceMarketplacePage() {
  const {
    offers,
    recommendations,
    loading,
    loanAmount,
    tenureMonths,
    setLoanAmount,
    setTenureMonths,
    setEligibility,
  } = useFinanceMarketplace();

  const [tab, setTab] = useState<"offers" | "tools">("offers");

  useEffect(() => {
    setPageMeta({
      title: "Auto Loan Marketplace — Motorcart.in",
      description: "Compare EMI, eligibility & offers from SBI, HDFC, ICICI, Axis, NBFCs and more.",
    });
  }, []);

  return (
    <div className="wa-pattern min-h-screen">
      <div className="container mx-auto space-y-10 px-4 py-8">
        <header className="relative overflow-hidden rounded-2xl border hero-panel p-8 text-white">
          <div className="relative z-10 max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground/90">
              <Building2 className="h-4 w-4" />
              14 banks & NBFCs · AI-powered matching
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">Finance & Loan Marketplace</h1>
            <p className="mt-3 text-white/85">
              EMI calculator, multi-bank comparison, eligibility check, CIBIL estimator & instant online apply.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/finance/apply">Apply online <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" className="border-border text-white hover:bg-card" asChild>
                <Link to="/finance/compare">Compare loans</Link>
              </Button>
            </div>
          </div>
        </header>

        <nav className="flex gap-2">
          {(["offers", "tools"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
                tab === t ? "bg-primary text-primary-foreground text-white shadow-wa" : "border bg-card"
              }`}
            >
              {t === "offers" ? "Multi-bank offers" : "Finance tools"}
            </button>
          ))}
        </nav>

        <section className="grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Loan amount</Label>
            <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(loanAmount)}</p>
          </div>
          <div>
            <Label className="text-xs">Tenure (months)</Label>
            <Input type="number" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))} />
          </div>
        </section>

        {tab === "tools" ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <EmiCalculatorWidget defaultAmount={loanAmount} defaultTenure={tenureMonths} />
            <EligibilityChecker onResult={setEligibility} />
            <CibilEstimatorPanel />
            <RefinancePanel />
          </div>
        ) : (
          <div className="space-y-8">
            <AiRecommendationPanel recommendations={recommendations} />
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Sparkles className="h-5 w-5 text-primary" />
                Ranked offers — interest & approval comparison
              </h2>
              {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-48 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {offers.map((o) => (
                    <BankOfferCard key={o.slug} offer={o} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
