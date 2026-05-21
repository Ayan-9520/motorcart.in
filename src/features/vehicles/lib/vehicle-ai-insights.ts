import type { VehicleListing } from "@/types/vehicle";
import { formatCurrency } from "@/lib/utils";

export interface VehicleAIInsight {
  id: string;
  title: string;
  detail: string;
  tone: "positive" | "neutral" | "warning";
}

export function buildVehicleAIInsights(vehicle: VehicleListing): VehicleAIInsight[] {
  const insights: VehicleAIInsight[] = [];
  const age = new Date().getFullYear() - vehicle.year;
  const kmPerYear = age > 0 ? Math.round(vehicle.kmsDriven / age) : vehicle.kmsDriven;

  if (vehicle.isCertified) {
    insights.push({
      id: "cert",
      title: "Certified stock",
      detail: "200+ point inspection with warranty eligibility on Motorcart.",
      tone: "positive",
    });
  }

  if (kmPerYear < 12000 && vehicle.kmsDriven > 0) {
    insights.push({
      id: "km",
      title: "Low running",
      detail: `~${kmPerYear.toLocaleString("en-IN")} km/year — below national average for this segment.`,
      tone: "positive",
    });
  } else if (kmPerYear > 20000) {
    insights.push({
      id: "km-high",
      title: "High usage",
      detail: "Higher annual running — verify service history before purchase.",
      tone: "warning",
    });
  }

  if (vehicle.fuelType.toLowerCase().includes("electric")) {
    insights.push({
      id: "ev",
      title: "EV ownership",
      detail: "Check battery health report & home charging feasibility.",
      tone: "neutral",
    });
  }

  if (vehicle.metadata.discountPercent && vehicle.metadata.discountPercent >= 5) {
    insights.push({
      id: "deal",
      title: "Price advantage",
      detail: `${vehicle.metadata.discountPercent}% below market reference — strong value vs similar listings.`,
      tone: "positive",
    });
  }

  const fairLow = Math.round(vehicle.price * 0.94);
  const fairHigh = Math.round(vehicle.price * 1.06);
  insights.push({
    id: "fair",
    title: "AI fair price band",
    detail: `Estimated market range ${formatCurrency(fairLow)} – ${formatCurrency(fairHigh)} for ${vehicle.city}.`,
    tone: "neutral",
  });

  if (vehicle.owners === 1) {
    insights.push({
      id: "owner",
      title: "First owner",
      detail: "Single-owner history typically improves resale and finance approval odds.",
      tone: "positive",
    });
  }

  return insights.slice(0, 5);
}
