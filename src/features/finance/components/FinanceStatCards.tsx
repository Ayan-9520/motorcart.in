import { FileText, IndianRupee, Percent, TrendingUp, Users, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { FinanceAnalytics } from "../types";

interface FinanceStatCardsProps {
  analytics: FinanceAnalytics;
  showPipeline?: boolean;
}

export function FinanceStatCards({ analytics, showPipeline = true }: FinanceStatCardsProps) {
  const cards = [
    { label: "Applications", value: String(analytics.totalApplications), icon: FileText },
    { label: "In pipeline", value: String(analytics.submitted + analytics.processing), icon: Users },
    { label: "Approved", value: String(analytics.approved), icon: Zap },
    { label: "Disbursed", value: formatCurrency(analytics.totalDisbursed), icon: IndianRupee },
    { label: "Avg approval %", value: `${analytics.avgApprovalProbability}%`, icon: Percent },
    { label: "Conversion", value: `${analytics.conversionRate}%`, icon: TrendingUp },
  ];

  if (showPipeline) {
    cards.splice(2, 0, {
      label: "Pipeline value",
      value: formatCurrency(analytics.totalPipelineValue),
      icon: TrendingUp,
    });
  }

  return (
    <div className="fin-stat-grid">
      {cards.slice(0, 6).map(({ label, value, icon: Icon }) => (
        <article key={label} className="fin-stat-card">
          <span className="fin-stat-card__icon">
            <Icon className="h-5 w-5" />
          </span>
          <p className="fin-stat-card__label">{label}</p>
          <p className="fin-stat-card__value">{value}</p>
        </article>
      ))}
    </div>
  );
}
