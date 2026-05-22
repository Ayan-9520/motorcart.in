import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
};

export function ServicePartnerShell({ title, description, crumbs, actions, children }: Props) {
  return (
    <div className="sh-page">
      {crumbs?.length ? (
        <nav className="sh-crumbs" aria-label="Breadcrumb">
          <Link to="/dashboard/service">Service Hub</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 opacity-50" />
              {c.href ? <Link to={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
      ) : null}
      <header className="sh-page-header">
        <div>
          <h1 className="sh-page-title">{title}</h1>
          {description ? <p className="sh-page-desc">{description}</p> : null}
        </div>
        {actions}
      </header>
      {children}
    </div>
  );
}
