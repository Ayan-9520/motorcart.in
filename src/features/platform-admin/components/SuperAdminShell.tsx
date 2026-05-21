import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SuperAdminShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SuperAdminShell({ title, description, actions, children, className }: SuperAdminShellProps) {
  return (
    <div className={cn("sa-console", className)}>
      <header className="sa-console__header">
        <div className="min-w-0">
          <p className="sa-console__eyebrow">Platform control</p>
          <h1 className="sa-console__title">{title}</h1>
          {description ? <p className="sa-console__desc">{description}</p> : null}
        </div>
        {actions ? <div className="sa-console__actions">{actions}</div> : null}
      </header>
      {children}
    </div>
  );
}
