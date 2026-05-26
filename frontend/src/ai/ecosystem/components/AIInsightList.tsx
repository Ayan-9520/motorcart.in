import type { AIInsight } from "../types";
import { cn } from "@/lib/utils";

interface AIInsightListProps {
  items: AIInsight[];
}

export function AIInsightList({ items }: AIInsightListProps) {
  if (!items.length) return null;

  return (
    <ul className="ai-eco-insights">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            "ai-eco-insight",
            item.tone === "positive" && "ai-eco-insight--pos",
            item.tone === "warning" && "ai-eco-insight--warn"
          )}
        >
          <span className="ai-eco-insight__dot" />
          <div>
            <p className="ai-eco-insight__title">{item.title}</p>
            <p className="ai-eco-insight__detail">{item.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
