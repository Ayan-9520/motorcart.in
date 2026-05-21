import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ConsoleCrumb = { label: string; href?: string };

type DealerConsoleShellProps = {
  title: string;
  description?: string;
  crumbs?: ConsoleCrumb[];
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DealerConsoleShell({
  title,
  description,
  crumbs = [],
  actions,
  children,
  className,
}: DealerConsoleShellProps) {
  return (
    <div className={cn("dealer-os space-y-6", className)}>
      {crumbs.length > 0 && (
        <nav className="dealer-os-crumbs" aria-label="Breadcrumb">
          <Link to="/dashboard/dealer" className="dealer-os-crumb-link">
            Dealer OS
          </Link>
          {crumbs.map((c, i) => (
            <span key={`${c.label}-${i}`} className="dealer-os-crumb-item">
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              {c.href ? (
                <Link to={c.href} className="dealer-os-crumb-link">
                  {c.label}
                </Link>
              ) : (
                <span className="dealer-os-crumb-current">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="dealer-os-header">
        <div className="min-w-0">
          <h1 className="dealer-os-title">{title}</h1>
          {description && <p className="dealer-os-desc">{description}</p>}
        </div>
        {actions && <div className="dealer-os-actions">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
