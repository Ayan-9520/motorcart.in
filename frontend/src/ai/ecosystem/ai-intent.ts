import type { AIIntent } from "./types";

const RULES: { keys: string[]; intent: Omit<AIIntent, "confidence"> }[] = [
  { keys: ["emi", "loan", "finance", "cibil", "bank"], intent: { label: "Finance & EMI", module: "finance", href: "/finance/tools" } },
  { keys: ["auction", "bid", "repo", "hammer"], intent: { label: "Live auctions", module: "auctions", href: "/auctions" } },
  { keys: ["part", "spare", "brake", "tyre", "battery", "oil"], intent: { label: "Parts marketplace", module: "parts", href: "/parts/browse" } },
  { keys: ["service", "wash", "repair", "ppf", "ceramic", "booking"], intent: { label: "Book service", module: "services", href: "/services" } },
  { keys: ["dealer", "showroom", "seller"], intent: { label: "Dealer network", module: "dealers", href: "/dealers" } },
  { keys: ["ev", "electric", "tesla", "nexon ev"], intent: { label: "EV hub", module: "vehicles", href: "/ev" } },
  { keys: ["bike", "scooter", "motorcycle"], intent: { label: "Bikes", module: "vehicles", href: "/bikes" } },
  { keys: ["truck", "pickup", "commercial"], intent: { label: "Trucks", module: "vehicles", href: "/trucks" } },
];

export function parseAIIntent(query: string): AIIntent | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  let best: AIIntent | null = null;
  for (const rule of RULES) {
    const hits = rule.keys.filter((k) => q.includes(k)).length;
    if (!hits) continue;
    const confidence = Math.min(0.95, 0.5 + hits * 0.15);
    if (!best || confidence > best.confidence) {
      best = { ...rule.intent, confidence };
    }
  }

  if (!best && q.length >= 2) {
    return {
      label: "Search vehicles",
      module: "vehicles",
      href: `/search?q=${encodeURIComponent(query.trim())}`,
      confidence: 0.4,
    };
  }

  return best;
}
