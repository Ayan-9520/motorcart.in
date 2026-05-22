import { Link } from "react-router-dom";
import { ChevronRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InsuranceVehicleType } from "../types";
import { vehicleTypeLabel } from "../lib/insurance-routes";

interface InsuranceSubpageShellProps {
  title: string;
  subtitle: string;
  vehicleType?: InsuranceVehicleType;
  children: React.ReactNode;
  className?: string;
}

export function InsuranceSubpageShell({
  title,
  subtitle,
  vehicleType,
  children,
  className,
}: InsuranceSubpageShellProps) {
  return (
    <div className={cn("ins-page min-h-screen pb-16", className)}>
      <section className="ins-hero">
        <div className="container py-8 md:py-12">
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <Link to="/finance" className="hover:text-primary">
              Finance
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/insurance" className="hover:text-primary">
              Insurance
            </Link>
            {vehicleType ? (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-foreground">{vehicleTypeLabel(vehicleType)}</span>
              </>
            ) : null}
          </nav>
          <div className="flex items-start gap-3">
            <span className="ins-hero__icon">
              <Shield className="h-6 w-6" />
            </span>
            <div>
              <p className="ins-hero__eyebrow">Motorcart Insurance</p>
              <h1 className="ins-hero__title">{title}</h1>
              <p className="ins-hero__sub">{subtitle}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container pt-6 md:pt-8">{children}</div>
    </div>
  );
}
