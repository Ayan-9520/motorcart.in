import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShMetric } from "../types";

function ShSparkline({ points }: { points: number[] }) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const w = 56;
  const h = 22;
  const step = w / Math.max(points.length - 1, 1);
  const coords = points
    .map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="sh-metric__spark shrink-0" aria-hidden>
      <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={coords} className="text-primary" />
    </svg>
  );
}

export function ShMetricGrid({ metrics, loading }: { metrics: ShMetric[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="sh-metric-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="sh-metric sh-metric--skeleton" />
        ))}
      </div>
    );
  }
  return (
    <div className="sh-metric-grid">
      {metrics.map((m, i) => {
        const inner = (
          <>
            <div className="sh-metric__head">
              <p className="sh-metric__label">{m.label}</p>
              {m.sparkline ? <ShSparkline points={m.sparkline} /> : null}
            </div>
            <p className={cn("sh-metric__value", typeof m.value === "string" && "text-xl md:text-2xl")}>{m.value}</p>
            {m.sublabel ? <p className="sh-metric__sub">{m.sublabel}</p> : null}
            {m.trend != null ? (
              <span className={cn("sh-metric__trend", m.trend >= 0 ? "sh-metric__trend--up" : "sh-metric__trend--down")}>
                {m.trend >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(m.trend)}%
              </span>
            ) : null}
          </>
        );
        const cls = cn(
          "sh-metric sh-metric--enter",
          m.variant === "premium" && "sh-metric--premium",
          m.variant === "success" && "sh-metric--success",
          m.variant === "warning" && "sh-metric--warning"
        );
        const style = { animationDelay: `${i * 40}ms` } as const;
        return m.href ? (
          <Link key={m.key} to={m.href} className={cls} style={style}>
            {inner}
          </Link>
        ) : (
          <div key={m.key} className={cls} style={style}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
