import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIHubStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  highlight?: boolean;
  className?: string;
}

export function AIHubStatCard({ label, value, icon: Icon, highlight, className }: AIHubStatCardProps) {
  return (
    <div
      className={cn(
        "ai-hub-stat-card",
        highlight && "ai-hub-stat-card-highlight",
        className
      )}
    >
      <span className="ai-hub-stat-icon">
        <Icon className="h-4 w-4 text-primary" />
      </span>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{value}</p>
    </div>
  );
}
