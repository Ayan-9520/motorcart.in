import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setPageMeta } from "@/utils/seo";
import { useFinanceMarketplace } from "../hooks/useFinanceMarketplace";
import { LoanApplicationForm } from "../components/LoanApplicationForm";
import { AiRecommendationPanel } from "../components/AiRecommendationPanel";
import { FinanceSubpageShell } from "../components/FinanceSubpageShell";
import { FinanceSubpageQuickLinks } from "../components/FinanceSubpageQuickLinks";
import { financeCategoryLabel, parseFinanceType } from "../lib/finance-hub-routes";

export function LoanApplyPage() {
  const [params] = useSearchParams();
  const loanType = parseFinanceType(params.get("type"));
  const { lenders, recommendations, loading } = useFinanceMarketplace();

  useEffect(() => {
    const label = loanType ? financeCategoryLabel(loanType) : "Auto Loan";
    setPageMeta({ title: `Apply for ${label} — Motorcart.in` });
  }, [loanType]);

  return (
    <FinanceSubpageShell
      title="Apply online"
      subtitle="DSA auto-assigned after submit. Upload KYC & income proof from your dashboard — FinanceBot ranks lenders for your profile."
      loanType={loanType}
    >
      <FinanceSubpageQuickLinks active="apply" loanType={loanType} />

      {loading ? (
        <Skeleton className="h-[28rem] w-full rounded-2xl" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <LoanApplicationForm lenders={lenders} />
          </div>
          <aside className="space-y-4 lg:col-span-2">
            <div className="finance-ai-banner flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">FinanceBot recommendations</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Based on loan amount, income & CIBIL — updated as you edit the form.
                </p>
              </div>
            </div>
            <AiRecommendationPanel recommendations={recommendations} />
            <Button variant="outline" className="w-full rounded-xl" asChild>
              <Link to={loanType ? `/finance/compare?type=${loanType}` : "/finance/compare"}>
                Compare all lenders <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </aside>
        </div>
      )}
    </FinanceSubpageShell>
  );
}
