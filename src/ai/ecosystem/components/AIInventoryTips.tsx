import { useEffect, useState } from "react";
import { runAgent } from "@/ai/agents";
import type { VehicleListing } from "@/types/vehicle";
import { AIPanel } from "./AIPanel";
import { AIInsightList } from "./AIInsightList";
import type { AIInsight } from "../types";

interface AIInventoryTipsProps {
  vehicles: VehicleListing[];
}

export function AIInventoryTips({ vehicles }: AIInventoryTipsProps) {
  const [items, setItems] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void runAgent("inventorybot", "optimize", { payload: { vehicles } }).then((res) => {
      if (res.ok && res.data) {
        const suggestions = (res.data as { suggestions: { title: string; issue: string; priority: string }[] })
          .suggestions;
        setItems(
          suggestions.slice(0, 5).map((s, i) => ({
            id: String(i),
            title: s.title,
            detail: s.issue,
            tone: s.priority === "high" ? "warning" : "neutral",
          }))
        );
      }
      setLoading(false);
    });
  }, [vehicles]);

  return (
    <AIPanel title="Inventory AI" subtitle="Stock health & listing fixes" compact>
      {loading ? (
        <p className="text-xs text-muted-foreground animate-pulse">Analyzing catalogue…</p>
      ) : items.length ? (
        <AIInsightList items={items} />
      ) : (
        <p className="text-xs text-muted-foreground">Catalogue looks healthy.</p>
      )}
    </AIPanel>
  );
}
