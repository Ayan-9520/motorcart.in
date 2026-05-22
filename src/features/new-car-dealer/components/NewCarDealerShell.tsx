import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type NcdCrumb = { label: string; href?: string };

type NewCarDealerShellProps = {
  title: string;
  description?: string;
  crumbs?: NcdCrumb[];
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function NewCarDealerShell({ title, description, crumbs = [], actions, children, className }: NewCarDealerShellProps) {
  return (
    <div className={cn("ncd-page space-y-6", className)}>
      {crumbs.length > 0 && (
        <nav className="ncd-crumbs">
          <Link to="/dashboard/new-car">New Car OS</Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              {c.href ? <Link to={c.href}>{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="ncd-page-header">
        <div>
          <h1 className="ncd-page-title">{title}</h1>
          {description ? <p className="ncd-page-desc">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}
