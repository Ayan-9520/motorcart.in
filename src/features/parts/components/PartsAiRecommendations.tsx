import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="border-primary/25 border border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((p) => (
            <li key={p.id}>
              <Link
                to={partDetailPath(p)}
                className="flex gap-3 rounded-xl border bg-card p-3 transition-shadow hover:shadow-md"
              >
                <img src={p.images[0]} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium">{p.name}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{formatCurrency(p.price)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
