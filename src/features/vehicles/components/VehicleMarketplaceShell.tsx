import type { ReactNode } from "react";

type VehicleMarketplaceShellProps = {
  title: string;
  subtitle?: string;
  count?: number;
  children: ReactNode;
};

export function VehicleMarketplaceShell({
  title,
  subtitle,
  count,
  children,
}: VehicleMarketplaceShellProps) {
  return (
    <div className="vm-listing-page min-h-screen bg-background">
      <header className="vm-listing-hero border-b border-border/80 bg-card">
        <div className="container px-4 py-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Motorcart marketplace</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p>}
          {count != null && (
            <p className="mt-3 text-sm font-medium text-foreground">{count.toLocaleString("en-IN")} listings</p>
          )}
        </div>
      </header>
      <div className="container px-4 py-6 md:py-8">{children}</div>
    </div>
  );
}
