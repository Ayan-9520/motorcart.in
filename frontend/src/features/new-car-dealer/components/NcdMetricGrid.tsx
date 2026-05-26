import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NcdAnimatedStat } from "./NcdAnimatedStat";
import type { NcdMetric } from "../types";

export function NcdMetricGrid({ metrics, loading }: { metrics: NcdMetric[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="ncd-metric-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="ncd-metric ncd-metric--skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className="ncd-metric-grid">
      {metrics.map((m) => {
        const inner = (
          <>
            <p className="ncd-metric__label">{m.label}</p>
            <p className="ncd-metric__value">
              {typeof m.value === "number" ? <NcdAnimatedStat value={m.value} /> : m.value}
            </p>
            {m.sublabel ? <p className="ncd-metric__sub">{m.sublabel}</p> : null}
            {m.trend != null ? (
              <span className={cn("ncd-metric__trend", m.trend >= 0 ? "ncd-metric__trend--up" : "ncd-metric__trend--down")}>
                {m.trend >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(m.trend)}% {m.trendLabel ?? ""}
              </span>
            ) : null}
          </>
        );
        const cls = cn(
          "ncd-metric",
          m.variant === "premium" && "ncd-metric--premium",
          m.variant === "success" && "ncd-metric--success",
          m.variant === "warning" && "ncd-metric--warning"
        );
        return m.href ? (
          <Link key={m.key} to={m.href} className={cls}>
            {inner}
          </Link>
        ) : (
          <div key={m.key} className={cls}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
