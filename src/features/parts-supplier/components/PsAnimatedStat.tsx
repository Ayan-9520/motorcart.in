import { useEffect, useState } from "react";

export function PsAnimatedStat({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const steps = 24;
    const tick = () => {
      frame += 1;
      setDisplay(Math.round((value * frame) / steps));
      if (frame < steps) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span>{display.toLocaleString("en-IN")}</span>;
}
