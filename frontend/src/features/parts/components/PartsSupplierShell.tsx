import type { ReactNode } from "react";

interface PartsSupplierShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PartsSupplierShell({ title, subtitle, actions, children }: PartsSupplierShellProps) {
  return (
    <div className="parts-supplier-dash">
      <header className="parts-supplier-dash__header">
        <div>
          <p className="parts-supplier-dash__eyebrow">IndiaMART-style supplier desk</p>
          <h1 className="parts-supplier-dash__title">{title}</h1>
          {subtitle && <p className="parts-supplier-dash__sub">{subtitle}</p>}
        </div>
        {actions}
      </header>
      {children}
    </div>
  );
}
