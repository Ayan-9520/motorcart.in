import type { OwnershipTimelineEvent } from "../types";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<OwnershipTimelineEvent["type"], string> = {
  purchase: "cos-timeline__dot--purchase",
  insurance: "cos-timeline__dot--insurance",
  service: "cos-timeline__dot--service",
  document: "cos-timeline__dot--document",
  finance: "cos-timeline__dot--finance",
  milestone: "cos-timeline__dot--milestone",
};

type CustomerOwnershipTimelineProps = {
  events: OwnershipTimelineEvent[];
  maxItems?: number;
};

export function CustomerOwnershipTimeline({ events, maxItems = 6 }: CustomerOwnershipTimelineProps) {
  const sorted = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxItems);

  if (!sorted.length) return null;

  return (
    <div className="cos-timeline">
      {sorted.map((ev, i) => (
        <div key={ev.id} className="cos-timeline__item">
          <div className={cn("cos-timeline__dot", TYPE_STYLES[ev.type])} />
          {i < sorted.length - 1 ? <div className="cos-timeline__line" aria-hidden /> : null}
          <div className="cos-timeline__content">
            <time className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {new Date(ev.date).toLocaleDateString("en-IN", { month: "short", year: "numeric", day: "numeric" })}
            </time>
            <p className="font-medium">{ev.title}</p>
            {ev.description ? <p className="text-xs text-muted-foreground">{ev.description}</p> : null}
            {ev.vehicleLabel ? (
              <p className="text-[10px] font-medium text-primary">{ev.vehicleLabel}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
