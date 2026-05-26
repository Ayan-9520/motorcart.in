import { useEffect, useState } from "react";
import { runAgent } from "@/ai/agents";
import type { LeadScoreResult } from "@/ai/types";
import { AIPanel } from "./AIPanel";

interface AILeadScoreProps {
  lead: Record<string, unknown>;
}

export function AILeadScore({ lead }: AILeadScoreProps) {
  const [result, setResult] = useState<LeadScoreResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void runAgent("leadbot", "score_lead", { payload: { lead } }).then((res) => {
      if (!cancelled && res.ok && res.data) setResult(res.data as LeadScoreResult);
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [lead]);

  if (loading) {
    return (
      <AIPanel title="Lead score" compact>
        <p className="text-xs text-muted-foreground animate-pulse">Scoring intent…</p>
      </AIPanel>
    );
  }

  if (!result) return null;

  return (
    <AIPanel title="Lead score" subtitle={`${result.conversionProbability}% conversion est.`} compact>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tabular-nums text-primary">{result.score}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{result.tier}</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{result.summary}</p>
      <ul className="mt-3 space-y-1">
        {result.suggestedActions.slice(0, 3).map((a) => (
          <li key={a} className="text-xs text-foreground/90">
            → {a}
          </li>
        ))}
      </ul>
    </AIPanel>
  );
}
