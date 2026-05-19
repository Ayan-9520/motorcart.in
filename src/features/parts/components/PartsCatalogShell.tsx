import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PartCategorySlug } from "../types";
import { PART_CATEGORIES } from "../types";

interface PartsCatalogShellProps {
  title: string;
  subtitle: string;
  category?: PartCategorySlug;
  children: React.ReactNode;
  className?: string;
}

export function PartsCatalogShell({
  title,
  subtitle,
  category,
  children,
  className,
}: PartsCatalogShellProps) {
  const catLabel = category
    ? PART_CATEGORIES.find((c) => c.slug === category)?.label
    : undefined;

  return (
    <div className={cn("parts-catalog-page min-h-screen pb-14", className)}>
      <div className="parts-catalog-hero border-b border-border/80">
        <div className="container py-6 md:py-8">
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <Link to="/parts" className="hover:text-primary">
              Parts
            </Link>
            {catLabel ? (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-foreground">{catLabel}</span>
              </>
            ) : null}
          </nav>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p>
        </div>
      </div>
      <div className="container pt-6 md:pt-8">{children}</div>
    </div>
  );
}
