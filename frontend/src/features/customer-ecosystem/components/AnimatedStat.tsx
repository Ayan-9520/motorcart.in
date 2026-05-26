import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedStatProps = {
  value: number | string;
  className?: string;
  duration?: number;
};

export function AnimatedStat({ value, className, duration = 600 }: AnimatedStatProps) {
  const numeric = typeof value === "number";
  const [display, setDisplay] = useState(numeric ? 0 : value);

  useEffect(() => {
    if (!numeric) {
      setDisplay(value);
      return;
    }
    const target = value;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, numeric, duration]);

  return <span className={cn("tabular-nums", className)}>{display}</span>;
}
