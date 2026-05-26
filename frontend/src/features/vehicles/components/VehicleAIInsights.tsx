import { buildVehicleAIInsights } from "../lib/vehicle-ai-insights";
import type { VehicleListing } from "@/types/vehicle";
import { AIPanel, AIInsightList } from "@/ai/ecosystem";

export function VehicleAIInsights({ vehicle }: { vehicle: VehicleListing }) {
  const insights = buildVehicleAIInsights(vehicle).map((i) => ({
    id: i.id,
    title: i.title,
    detail: i.detail,
    tone: i.tone,
  }));

  return (
    <AIPanel title="AI insights" subtitle="Fair price & ownership signals">
      <AIInsightList items={insights} />
    </AIPanel>
  );
}
