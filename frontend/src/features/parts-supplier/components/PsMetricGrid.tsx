import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PsAnimatedStat } from "./PsAnimatedStat";
import { PsSparkline } from "./PsSparkline";
import type { PsMetric } from "../types";

export function PsMetricGrid({ metrics, loading }: { metrics: PsMetric[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="psp-metric-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="psp-metric psp-metric--skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className="psp-metric-grid">
      {metrics.map((m, i) => {
        const inner = (
          <>
            <div className="psp-metric__head">
              <p className="psp-metric__label">{m.label}</p>
              {m.sparkline ? (
                <PsSparkline points={m.sparkline} className="psp-metric__spark shrink-0" />
              ) : null}
            </div>
            <p className={cn("psp-metric__value", typeof m.value === "string" && "text-xl md:text-2xl")}>
              {typeof m.value === "number" ? <PsAnimatedStat value={m.value} /> : m.value}
            </p>
            {m.sublabel ? <p className="psp-metric__sub">{m.sublabel}</p> : null}
            {m.trend != null ? (
              <span
                className={cn(
                  "psp-metric__trend",
                  m.trend >= 0 ? "psp-metric__trend--up" : "psp-metric__trend--down"
                )}
              >
                {m.trend >= 0 ? <ArrowUpRight className="h-3 w-3 shrink-0" /> : <ArrowDownRight className="h-3 w-3 shrink-0" />}
                {Math.abs(m.trend)}% {m.trendLabel ?? ""}
              </span>
            ) : null}
          </>
        );
        const cls = cn(
          "psp-metric psp-metric--enter",
          m.variant === "premium" && "psp-metric--premium",
          m.variant === "success" && "psp-metric--success",
          m.variant === "warning" && "psp-metric--warning"
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
