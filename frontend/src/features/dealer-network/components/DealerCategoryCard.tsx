import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { DealerCategory } from "../data/dealers-hub-data";

interface DealerCategoryCardProps {
  category: DealerCategory;
}

export function DealerCategoryCard({ category }: DealerCategoryCardProps) {
  const Icon = category.icon;
  return (
    <Link to={category.href} className="dealers-category-card group">
      <span className="dealers-category-glow" aria-hidden />
      <span className="dealers-category-icon">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-foreground group-hover:text-primary">{category.label}</p>
        <p className="text-xs text-muted-foreground">{category.description}</p>
      </div>
      <span className="dealers-category-count">{category.count}</span>
      <span className="dealers-category-cta">
        Explore <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}
