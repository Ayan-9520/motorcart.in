import { useMemo } from "react";
import type { VehicleListing } from "@/types/vehicle";
import { buildCompareAIInsights } from "../ai-compare-insights";
import { AIPanel } from "./AIPanel";
import { AIInsightList } from "./AIInsightList";

export function AICompareInsights({ vehicles }: { vehicles: VehicleListing[] }) {
  const insights = useMemo(() => buildCompareAIInsights(vehicles), [vehicles]);

  if (vehicles.length < 2) return null;

  return (
    <AIPanel title="Compare insights" subtitle="AI summary across your shortlist" compact>
      <AIInsightList items={insights} />
    </AIPanel>
  );
}
