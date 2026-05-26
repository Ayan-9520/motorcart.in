import type { CibilBucket } from "../lib/dsa-desk-utils";

interface DsaCibilPanelProps {
  average: number;
  buckets: CibilBucket[];
  lowScoreCount: number;
}

export function DsaCibilPanel({ average, buckets, lowScoreCount }: DsaCibilPanelProps) {
  const max = Math.max(1, ...buckets.map((b) => b.count));

  return (
    <div className="fin-dsa-cibil">
      <div className="fin-dsa-cibil__hero">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Portfolio avg CIBIL</p>
        <p className="fin-dsa-cibil__score">{average || "—"}</p>
        {lowScoreCount > 0 && (
          <p className="text-xs text-amber-600 mt-1">{lowScoreCount} cases below 650 — escalate to NBFC partners</p>
        )}
      </div>
      <ul className="fin-dsa-cibil__bars space-y-2">
        {buckets.map((b) => (
          <li key={b.band}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">{b.band}</span>
              <span className="text-muted-foreground">{b.count} apps</span>
            </div>
            <div className="fin-dsa-cibil__track">
              <div
                className="fin-dsa-cibil__fill"
                style={{ width: `${(b.count / max) * 100}%`, backgroundColor: b.color }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
