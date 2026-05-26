import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import type { PartProduct } from "../types";
import { partDetailPath } from "../lib/part-utils";

interface PartsAiRecommendationsProps {
  parts: PartProduct[];
  title?: string;
}

export function PartsAiRecommendations({ parts, title = "AI picks for you" }: PartsAiRecommendationsProps) {
  if (parts.length === 0) return null;

  return (
    <section className="parts-ai-panel">
      <header className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">Fitment-aware · updates with your filters</p>
        </div>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {parts.map((p) => (
          <li key={p.id}>
            <Link to={partDetailPath(p)} className="parts-ai-pick group flex gap-3 rounded-xl border border-border/80 bg-card p-3 transition-all hover:border-primary/35 hover:shadow-[var(--shadow-card)]">
              <img src={p.images[0]} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" loading="lazy" />
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold group-hover:text-primary">{p.name}</p>
                <p className="mt-1 text-sm font-bold text-primary">{formatCurrency(p.price)}</p>
                <p className="text-[10px] text-muted-foreground">{p.brand}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
