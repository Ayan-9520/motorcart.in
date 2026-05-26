import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { AiRecommendation } from "../types";

interface AiRecommendationPanelProps {
  recommendations: AiRecommendation[];
}

export function AiRecommendationPanel({ recommendations }: AiRecommendationPanelProps) {
  if (recommendations.length === 0) return null;

  return (
    <Card className="ai-eco-finance-recs border-primary/30 border border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          FinanceBot AI recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, i) => (
          <article key={rec.lender.slug} className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <Badge variant={i === 0 ? "default" : "secondary"} className="mb-2">
                  {i === 0 ? "Best match" : `Option ${i + 1}`}
                </Badge>
                <h4 className="font-semibold">{rec.lender.name}</h4>
                <p className="text-sm text-muted-foreground">
                  EMI {formatCurrency(rec.estimatedEmi)}/mo · {rec.approvalProbability}% approval
                </p>
              </div>
              <span className="text-2xl font-bold text-primary">{rec.score}</span>
            </div>
            <ul className="mt-3 space-y-1">
              {rec.reasons.map((r) => (
                <li key={r} className="text-xs text-muted-foreground">✓ {r}</li>
              ))}
            </ul>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
