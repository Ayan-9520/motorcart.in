import { useEffect, useState } from "react";
import { runAgent } from "@/ai/agents";
import { AIPanel } from "./AIPanel";

interface AIPricingInsightProps {
  price: number;
  marketAvg?: number;
}

export function AIPricingInsight({ price, marketAvg }: AIPricingInsightProps) {
  const [tip, setTip] = useState<string | null>(null);

  useEffect(() => {
    if (!price) return;
    void runAgent("dealerbot", "pricing_tip", {
      payload: { price, marketAvg: marketAvg ?? price * 0.97 },
    }).then((res) => {
      if (res.ok && res.data) setTip(String((res.data as { tip: string }).tip));
    });
  }, [price, marketAvg]);

  if (!tip || !price) return null;

  return (
    <AIPanel title="AI pricing" compact>
      <p className="text-sm text-foreground/90">{tip}</p>
    </AIPanel>
  );
}
