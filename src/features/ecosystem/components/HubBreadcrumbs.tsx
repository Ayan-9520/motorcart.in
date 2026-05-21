import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

type HubBreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function HubBreadcrumbs({ items, className }: HubBreadcrumbsProps) {
  return (
    <nav
      className={cn("hub-breadcrumbs", className)}
      aria-label="Breadcrumb"
    >
      <ol className="hub-breadcrumbs-list">
        <li>
          <Link to="/" className="hub-breadcrumbs-link hub-breadcrumbs-home">
            <Home className="h-3.5 w-3.5" aria-hidden />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="hub-breadcrumbs-item">
              <ChevronRight className="hub-breadcrumbs-sep h-3.5 w-3.5" aria-hidden />
              {isLast || !item.href ? (
                <span className="hub-breadcrumbs-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hub-breadcrumbs-link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
