import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PART_CATEGORIES, type PartCategorySlug } from "../types";

interface PartCategoryNavProps {
  active?: PartCategorySlug | "all";
  basePath?: string;
}

export function PartCategoryNav({ active = "all", basePath = "/parts" }: PartCategoryNavProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      <Link
        to={basePath}
        className={cn(
          "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
          active === "all" ? "bg-primary text-primary-foreground text-white shadow-wa" : "border bg-card hover:border-primary/40"
        )}
      >
        All
      </Link>
      {PART_CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          to={`${basePath}/${c.slug}`}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap",
            active === c.slug ? "bg-primary text-primary-foreground text-white shadow-wa" : "border bg-card hover:border-primary/40"
          )}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}
