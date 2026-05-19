import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setPageMeta } from "@/utils/seo";
import { useFinanceMarketplace } from "../hooks/useFinanceMarketplace";
import { LoanApplicationForm } from "../components/LoanApplicationForm";
import { AiRecommendationPanel } from "../components/AiRecommendationPanel";

export function LoanApplyPage() {
  const { lenders, recommendations, loading } = useFinanceMarketplace();

  useEffect(() => {
    setPageMeta({ title: "Apply for Auto Loan — Motorcart.in" });
  }, []);

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/finance"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
      </Button>
      <h1 className="text-3xl font-bold">Apply online</h1>
      <p className="text-muted-foreground">DSA will be auto-assigned. Upload documents after submission.</p>

      {loading ? (
        <Skeleton className="h-96 w-full rounded-xl" />
      ) : (
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <LoanApplicationForm lenders={lenders} />
          </div>
          <aside className="lg:col-span-2">
            <AiRecommendationPanel recommendations={recommendations} />
          </aside>
        </div>
      )}
    </div>
  );
}
