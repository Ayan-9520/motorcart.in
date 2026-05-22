import { useEffect, useState } from "react";

export function NcdAnimatedStat({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t) / 700);
      setN(Math.round(value * (1 - (1 - p) ** 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <span className="tabular-nums">{n}</span>;
}
