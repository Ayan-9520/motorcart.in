import type { ReactNode } from "react";
import { DashboardPageShell } from "@/shared/layout/DashboardPageShell";
import { cn } from "@/lib/utils";

type CustomerEcosystemPageProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

/** Premium customer page chrome inside existing DashboardLayout */
export function CustomerEcosystemPage({
  title,
  description,
  actions,
  children,
  className,
  wide,
}: CustomerEcosystemPageProps) {
  return (
    <div className={cn("cos-page", wide && "cos-page--wide")}>
      <DashboardPageShell title={title} description={description} actions={actions} className={className}>
        {children}
      </DashboardPageShell>
    </div>
  );
}
