import { formatCurrency } from "@/lib/utils";
import type { VehicleListing } from "@/types/vehicle";
import type { AIInsight } from "./types";

export function buildCompareAIInsights(vehicles: VehicleListing[]): AIInsight[] {
  if (vehicles.length < 2) return [];

  const insights: AIInsight[] = [];
  const prices = vehicles.map((v) => v.price);
  const min = vehicles.reduce((a, b) => (a.price <= b.price ? a : b));
  const max = vehicles.reduce((a, b) => (a.price >= b.price ? a : b));
  const spread = max.price - min.price;

  insights.push({
    id: "value",
    title: "Best value pick",
    detail: `${min.title} is ₹${spread.toLocaleString("en-IN")} below ${max.brand} ${max.model} in this set.`,
    tone: "positive",
  });

  const lowestKm = vehicles.reduce((a, b) => (a.kmsDriven <= b.kmsDriven ? a : b));
  insights.push({
    id: "km",
    title: "Lowest mileage",
    detail: `${lowestKm.title} — ${lowestKm.kmsDriven.toLocaleString("en-IN")} km driven.`,
    tone: "neutral",
  });

  const newest = vehicles.reduce((a, b) => (a.year >= b.year ? a : b));
  if (newest.year > min.year) {
    insights.push({
      id: "year",
      title: "Newest model year",
      detail: `${newest.year} ${newest.brand} ${newest.model} — latest generation in compare set.`,
      tone: "positive",
    });
  }

  const avg = prices.reduce((s, p) => s + p, 0) / prices.length;
  insights.push({
    id: "emi",
    title: "EMI ballpark",
    detail: `Average price ${formatCurrency(Math.round(avg))} — expect ~${formatCurrency(Math.round(avg / 60))}/mo at 9.5% for 60 months.`,
    tone: "neutral",
  });

  const evCount = vehicles.filter((v) => v.fuelType.toLowerCase().includes("electric")).length;
  if (evCount > 0 && evCount < vehicles.length) {
    insights.push({
      id: "fuel",
      title: "Fuel mix",
      detail: `${evCount} EV vs ${vehicles.length - evCount} ICE — compare running cost & charging access.`,
      tone: "neutral",
    });
  }

  return insights.slice(0, 4);
}
