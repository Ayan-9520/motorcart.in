import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import {
  Bike,
  Bus,
  Car,
  CarTaxiFront,
  Tractor,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { HubCategoryItem } from "../types";
import { buyListingPath } from "../lib/route-utils";

const ICONS: Record<string, LucideIcon> = {
  Car,
  Bike,
  Truck,
  Bus,
  CarTaxiFront,
  Tractor,
  Zap,
};

export function HubCategoryCard({
  item,
  compact = false,
}: {
  item: HubCategoryItem;
  compact?: boolean;
}) {
  const Icon = ICONS[item.icon] ?? Car;

  return (
    <article className={cn("buy-hub-card group h-full", compact && "buy-hub-card-compact")}>
      <div className="buy-hub-card-glow" aria-hidden />
      <div className={cn("buy-hub-card-inner", compact && "p-3.5")}>
        <div className={cn("buy-hub-card-head", compact && "gap-3")}>
          <span className={cn("buy-hub-card-icon", compact && "h-11 w-11")}>
            <Icon className={cn(compact ? "h-5 w-5" : "h-7 w-7")} strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className={cn("font-bold tracking-tight text-foreground", compact ? "text-sm" : "text-lg")}>
              {item.label}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>

        <div className={cn("buy-hub-card-divider", compact && "my-2.5")} />

        <div className="grid grid-cols-2 gap-2">
          <ConditionTile
            to={buyListingPath(item.id, "new")}
            label="New"
            stat={item.stats.new}
            variant="new"
            compact={compact}
          />
          <ConditionTile
            to={buyListingPath(item.id, "used")}
            label="Pre-Owned"
            stat={item.stats.used}
            variant="used"
            compact={compact}
          />
        </div>
      </div>
    </article>
  );
}

function ConditionTile({
  to,
  label,
  stat,
  variant,
  compact,
}: {
  to: string;
  label: string;
  stat: string;
  variant: "new" | "used";
  compact?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "buy-hub-pill group/pill",
        variant === "new" ? "buy-hub-pill-new" : "buy-hub-pill-used",
        compact && "p-2.5"
      )}
    >
      <span className="flex items-center justify-between gap-1">
        <span className={cn("flex items-center gap-1 font-semibold", compact ? "text-xs" : "text-sm")}>
          {variant === "new" ? (
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          ) : (
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          )}
          {label}
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-30 transition-all group-hover/pill:translate-x-0.5 group-hover/pill:opacity-100" />
      </span>
      <span className="mt-1 block text-[10px] font-medium text-muted-foreground">{stat}</span>
    </Link>
  );
}
