import type { LucideIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export type SuperAdminStat = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  format?: "currency" | "number";
};

export function SuperAdminStatGrid({ stats }: { stats: SuperAdminStat[] }) {
  return (
    <div className="sa-stats">
      {stats.map((s) => {
        const Icon = s.icon;
        const display =
          s.format === "currency" && typeof s.value === "number"
            ? formatCurrency(s.value)
            : s.value;
        return (
          <div key={s.label} className="sa-stat">
            <div className="sa-stat__top">
              <span className="sa-stat__label">{s.label}</span>
              {Icon ? <Icon className="h-4 w-4 text-primary/80" aria-hidden /> : null}
            </div>
            <p className="sa-stat__value">{display}</p>
            {s.hint ? <p className="sa-stat__hint">{s.hint}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
