import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface FinanceDashboardShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  variant?: "customer" | "dsa" | "lender" | "manager";
}

export function FinanceDashboardShell({
  title,
  subtitle,
  actions,
  children,
  variant = "customer",
}: FinanceDashboardShellProps) {
  return (
    <div className={`fin-console fin-console--${variant}`}>
      <motion.header
        className="fin-console__header"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="fin-console__eyebrow">Motorcart Finance</p>
          <h1 className="fin-console__title">{title}</h1>
          {subtitle && <p className="fin-console__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="fin-console__actions">{actions}</div>}
      </motion.header>
      {children}
    </div>
  );
}
