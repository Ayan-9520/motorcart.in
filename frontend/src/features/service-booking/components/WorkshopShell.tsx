import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface WorkshopShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function WorkshopShell({ title, subtitle, actions, children }: WorkshopShellProps) {
  return (
    <div className="svc-workshop">
      <motion.header className="svc-workshop__header" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <p className="svc-workshop__eyebrow">Workshop OS</p>
          <h1 className="svc-workshop__title">{title}</h1>
          {subtitle && <p className="svc-workshop__sub">{subtitle}</p>}
        </div>
        {actions}
      </motion.header>
      {children}
    </div>
  );
}
