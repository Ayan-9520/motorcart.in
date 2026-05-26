import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { HubFilterChip } from "../types";

type HubFilterChipsProps = {
  filters: HubFilterChip[];
  className?: string;
};

export function HubFilterChips({ filters, className }: HubFilterChipsProps) {
  const { pathname, search } = useLocation();
  const current = `${pathname}${search}`;

  return (
    <div className={cn("hub-filter-rail", className)} role="tablist" aria-label="Quick filters">
      {filters.map((chip) => {
        const active = current === chip.href || pathname === chip.href.split("?")[0];
        return (
          <Link
            key={chip.id}
            to={chip.href}
            role="tab"
            aria-selected={active}
            className={cn("hub-filter-chip", active && "hub-filter-chip-active")}
          >
            {chip.label}
          </Link>
        );
      })}
    </div>
  );
}
