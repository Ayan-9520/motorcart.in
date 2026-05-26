import { useEffect, useState } from "react";
import { Sparkles, Flame, Snowflake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { runAgent } from "../agents";
import type { LeadScoreResult } from "../types";

interface LeadScorePanelProps {
  lead: Record<string, unknown>;
}

export function LeadScorePanel({ lead }: LeadScorePanelProps) {
  const [result, setResult] = useState<LeadScoreResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await runAgent("leadbot", "score_lead", { payload: { lead } });
      if (!cancelled && res.ok && res.data) {
        setResult(res.data as LeadScoreResult);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [lead]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4 text-sm text-muted-foreground">LeadBot scoring…</CardContent>
      </Card>
    );
  }

  if (!result) return null;

  const TierIcon = result.tier === "hot" ? Flame : result.tier === "cold" ? Snowflake : Sparkles;

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          LeadBot AI Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <TierIcon className={`h-8 w-8 ${result.tier === "hot" ? "text-orange-500" : "text-primary"}`} />
          <div>
            <p className="text-2xl font-bold">{result.score}/100</p>
            <Badge className="capitalize">{result.tier} · {result.conversionProbability}% conversion</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{result.summary}</p>
        <ul className="text-xs space-y-1 text-muted-foreground">
          {result.suggestedActions.map((a) => (
            <li key={a}>→ {a}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
