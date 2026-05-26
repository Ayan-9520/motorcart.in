import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { EligibilityChecker } from "../components/EligibilityChecker";
import { createFinanceLead } from "../services/finance.service";
import type { EligibilityInput } from "../types";
import { EmiCalculatorWidget } from "../components/EmiCalculatorWidget";
import { CibilEstimatorPanel } from "../components/CibilEstimatorPanel";

export function FinanceToolsPage() {
  useEffect(() => {
    setPageMeta({
      title: "EMI & Eligibility — Motorcart Finance",
      description: "Check loan eligibility and calculate EMI instantly. Soft check, no bureau hit.",
    });
  }, []);

  return (
    <div className="fin-tools-page min-h-screen">
      <section className="fin-tools-hero">
        <div className="container">
          <p className="fin-tools-hero__eyebrow">Smart finance tools</p>
          <h1 className="fin-tools-hero__title">Know your EMI before you apply</h1>
          <p className="fin-tools-hero__sub">
            CRED-style clarity · Bajaj-grade calculators · zero impact eligibility preview
          </p>
          <Button className="mt-4 rounded-full" asChild>
            <Link to="/finance/apply">
              Start application <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="container pb-16 grid gap-8 lg:grid-cols-2">
        <EmiCalculatorWidget />
        <EligibilityChecker
          onResult={(input: EligibilityInput) => {
            void createFinanceLead({
              loanAmount: input.loanAmount,
              monthlyIncome: input.monthlyIncome,
              cibilScore: input.cibilScore,
              source: "eligibility_checker",
            });
          }}
        />
        <div className="lg:col-span-2">
          <div className="fin-tools-ai-banner">
            <Sparkles className="h-5 w-5" />
            <p>AI matches you to 14+ lenders after eligibility check</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/finance/offers">View offers</Link>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <CibilEstimatorPanel />
        </div>
      </div>
    </div>
  );
}
