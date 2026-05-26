import type { VehicleListing } from "@/types/vehicle";

export interface OptimizerSuggestion {
  vehicleId: string;
  title: string;
  priority: "high" | "medium" | "low";
  issue: string;
  action: string;
  impact: string;
}

export function runInventoryOptimizer(vehicles: VehicleListing[]): OptimizerSuggestion[] {
  const suggestions: OptimizerSuggestion[] = [];

  vehicles.forEach((v) => {
    if (v.status !== "available") return;

    if (!v.images?.length) {
      suggestions.push({
        vehicleId: v.id,
        title: v.title,
        priority: "high",
        issue: "No photos",
        action: "Upload at least 5 high-quality images",
        impact: "+40% enquiry rate",
      });
    }

    if (v.kmsDriven > 80000 && !v.description) {
      suggestions.push({
        vehicleId: v.id,
        title: v.title,
        priority: "high",
        issue: "High KM without description",
        action: "Add service history & condition notes",
        impact: "+25% trust score",
      });
    }

    if (!v.metadata.discountPercent && v.condition === "used" && v.kmsDriven > 30000) {
      suggestions.push({
        vehicleId: v.id,
        title: v.title,
        priority: "medium",
        issue: "No promotional discount",
        action: "Add 3–5% limited-time discount",
        impact: "+18% faster sale",
      });
    }

    if ((v.aiPriceScore ?? 100) < 80) {
      suggestions.push({
        vehicleId: v.id,
        title: v.title,
        priority: "medium",
        issue: "Price above market average",
        action: "Reduce price by 2–4% or highlight premium features",
        impact: "Better AI price score",
      });
    }

    if (!v.isFeatured && v.isCertified) {
      suggestions.push({
        vehicleId: v.id,
        title: v.title,
        priority: "low",
        issue: "Certified but not featured",
        action: "Mark as featured listing",
        impact: "+2x visibility",
      });
    }
  });

  return suggestions.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });
}
