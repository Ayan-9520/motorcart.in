import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type PartsSupplierShellProps = {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
};

export function PartsSupplierShell({
  title,
  description,
  crumbs,
  actions,
  children,
}: PartsSupplierShellProps) {
  return (
    <div className="psp-page">
      {crumbs && crumbs.length > 0 ? (
        <nav className="psp-crumbs" aria-label="Breadcrumb">
          <Link to="/dashboard/parts">Supplier OS</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 opacity-50" />
              {c.href ? <Link to={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
      ) : null}
      <header className="psp-page-header">
        <div>
          <h1 className="psp-page-title">{title}</h1>
          {description ? <p className="psp-page-desc">{description}</p> : null}
        </div>
        {actions}
      </header>
      {children}
    </div>
  );
}
