import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { runAgent } from "@/ai/agents";
import type { VehicleListing } from "@/types/vehicle";
import { vehicleDetailPath } from "@/lib/vehicle-utils";
import { formatCurrency } from "@/lib/utils";
import { AIPanel } from "./AIPanel";

interface AIRecommendationsStripProps {
  pool: VehicleListing[];
  recentIds?: string[];
  wishlistIds?: string[];
  limit?: number;
}

export function AIRecommendationsStrip({
  pool,
  recentIds = [],
  wishlistIds = [],
  limit = 4,
}: AIRecommendationsStripProps) {
  const [picks, setPicks] = useState<VehicleListing[]>([]);

  useEffect(() => {
    void runAgent("recommendationbot", "vehicles", {
      payload: { vehicles: pool, recentIds, wishlistIds, limit },
    }).then((res) => {
      if (res.ok && res.data) {
        setPicks((res.data as { vehicles: VehicleListing[] }).vehicles ?? []);
      }
    });
  }, [pool, recentIds, wishlistIds, limit]);

  if (!picks.length) return null;

  return (
    <AIPanel title="For you" subtitle="Based on browsing & wishlist" compact>
      <ul className="ai-eco-recs">
        {picks.map((v) => (
          <li key={v.id}>
            <Link to={vehicleDetailPath(v)} className="ai-eco-rec">
              <span className="line-clamp-1 font-medium">{v.title}</span>
              <span className="text-xs text-muted-foreground">{formatCurrency(v.price)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </AIPanel>
  );
}
