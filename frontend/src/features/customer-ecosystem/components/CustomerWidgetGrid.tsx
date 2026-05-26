import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bot,
  CreditCard,
  Gauge,
  Shield,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedStat } from "./AnimatedStat";
import type { DashboardWidget } from "../types";

const WIDGET_ICONS: Record<string, LucideIcon> = {
  health: Gauge,
  insurance: Shield,
  emi: CreditCard,
  service: Wrench,
  fastag: Zap,
  rewards: Sparkles,
  valuation: TrendingUp,
  ai: Bot,
  garage: Sparkles,
};

type CustomerWidgetGridProps = {
  widgets: DashboardWidget[];
  loading?: boolean;
};

export function CustomerWidgetGrid({ widgets, loading }: CustomerWidgetGridProps) {
  if (loading) {
    return (
      <div className="cos-widget-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="cos-widget cos-widget--skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className="cos-widget-grid">
      {widgets.map((w) => {
        const Icon = WIDGET_ICONS[w.key] ?? Sparkles;
        const inner = (
          <>
            <div className="cos-widget__head">
              <span className="cos-widget__icon-wrap">
                <Icon className="h-4 w-4" />
              </span>
              <span className="cos-widget__label">{w.label}</span>
            </div>
            <p className="cos-widget__value">
              {typeof w.value === "number" ? <AnimatedStat value={w.value} /> : w.value}
            </p>
            {w.sublabel ? <p className="cos-widget__sub">{w.sublabel}</p> : null}
            {w.progress != null ? (
              <div className="cos-widget__bar">
                <div className="cos-widget__bar-fill" style={{ width: `${Math.min(100, w.progress)}%` }} />
              </div>
            ) : null}
            {w.trend === "up" ? (
              <span className="cos-widget__trend cos-widget__trend--up">
                <ArrowUpRight className="h-3 w-3" /> Trending up
              </span>
            ) : null}
          </>
        );
        const cls = cn(
          "cos-widget group",
          w.variant === "warning" && "cos-widget--warning",
          w.variant === "success" && "cos-widget--success",
          w.variant === "premium" && "cos-widget--premium"
        );
        return w.href ? (
          <Link key={w.key} to={w.href} className={cls}>
            {inner}
          </Link>
        ) : (
          <div key={w.key} className={cls}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
