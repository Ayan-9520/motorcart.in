import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AdminErpShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Enterprise admin page shell — Razorpay / Stripe SaaS layout */
export function AdminErpShell({ title, description, actions, children, className }: AdminErpShellProps) {
  return (
    <div className={cn("erp-console sa-console", className)}>
      <header className="erp-console__header sa-console__header">
        <div className="min-w-0">
          <p className="erp-console__eyebrow sa-console__eyebrow">Motorcart Admin ERP</p>
          <h1 className="erp-console__title sa-console__title">{title}</h1>
          {description ? <p className="erp-console__desc sa-console__desc">{description}</p> : null}
        </div>
        {actions ? <div className="erp-console__actions sa-console__actions">{actions}</div> : null}
      </header>
      {children}
    </div>
  );
}
