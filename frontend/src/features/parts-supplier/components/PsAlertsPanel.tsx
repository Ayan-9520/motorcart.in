import { Link } from "react-router-dom";
import { AlertTriangle, Bell, Info } from "lucide-react";
import type { PsSmartAlert } from "../types";
import { cn } from "@/lib/utils";

const iconMap = {
  critical: AlertTriangle,
  warning: Bell,
  info: Info,
};

export function PsAlertsPanel({ alerts }: { alerts: PsSmartAlert[] }) {
  return (
    <div className="psp-alerts">
      {alerts.map((a) => {
        const Icon = iconMap[a.severity];
        const inner = (
          <div
            className={cn(
              "psp-alert-card",
              a.severity === "critical" && "psp-alert-card--critical",
              a.severity === "warning" && "psp-alert-card--warning"
            )}
          >
            <Icon className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.body}</p>
            </div>
          </div>
        );
        return a.href ? (
          <Link key={a.id} to={a.href}>
            {inner}
          </Link>
        ) : (
          <div key={a.id}>{inner}</div>
        );
      })}
    </div>
  );
}
