import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { formatCountdown, getTimeLeft } from "../lib/auction-utils";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  endsAt: string;
  size?: "sm" | "lg";
  className?: string;
}

export function CountdownTimer({ endsAt, size = "sm", className }: CountdownTimerProps) {
  const [left, setLeft] = useState(() => getTimeLeft(endsAt));

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const { hours, minutes, seconds, expired } = formatCountdown(left);
  const urgent = !expired && left < 3600000;

  if (size === "lg") {
    return (
      <section className={cn("flex gap-3 justify-center", className)}>
        {[
          { v: hours, l: "Hours" },
          { v: minutes, l: "Min" },
          { v: seconds, l: "Sec" },
        ].map(({ v, l }) => (
          <article
            key={l}
            className={cn(
              "flex flex-col items-center rounded-xl border bg-card px-4 py-3 min-w-[72px] shadow-card",
              urgent && "border-red-500/50 animate-pulse"
            )}
          >
            <span className="text-3xl font-bold tabular-nums">{String(v).padStart(2, "0")}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{l}</span>
          </article>
        ))}
      </section>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold tabular-nums",
        expired ? "bg-muted text-muted-foreground" : urgent ? "bg-red-600 text-white" : "bg-primary/15 text-primary",
        className
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      {expired ? "Ended" : `${hours}h ${minutes}m ${seconds}s`}
    </span>
  );
}
