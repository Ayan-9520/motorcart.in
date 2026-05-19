import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { PartCategory } from "../types";
import { PARTS_CATEGORY_ICONS, partsCategoryHref } from "../data/parts-hub-data";

export function PartsHubCategoryCard({ category }: { category: PartCategory }) {
  const Icon = PARTS_CATEGORY_ICONS[category.slug];

  return (
    <Link to={partsCategoryHref(category.slug)} className="parts-hub-category-card group">
      <span className="parts-hub-category-glow" aria-hidden />
      <span className="parts-hub-category-icon">
        <Icon className="h-7 w-7 text-primary" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-foreground group-hover:text-primary">{category.label}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{category.description}</span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-40 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
    </Link>
  );
}
