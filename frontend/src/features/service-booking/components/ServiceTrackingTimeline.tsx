import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingTrackingStep } from "../types";
import type { BookingTrackingEvent } from "../types";

const STEPS: { step: BookingTrackingStep; label: string }[] = [
  { step: "scheduled", label: "Scheduled" },
  { step: "confirmed", label: "Confirmed" },
  { step: "mechanic_assigned", label: "Mechanic assigned" },
  { step: "en_route", label: "En route" },
  { step: "arrived", label: "Arrived" },
  { step: "in_service", label: "In service" },
  { step: "completed", label: "Completed" },
];

interface ServiceTrackingTimelineProps {
  currentStep: BookingTrackingStep;
  events?: BookingTrackingEvent[];
  onAdvance?: (step: BookingTrackingStep) => void;
  editable?: boolean;
}

export function ServiceTrackingTimeline({
  currentStep,
  events = [],
  onAdvance,
  editable,
}: ServiceTrackingTimelineProps) {
  const idx = STEPS.findIndex((s) => s.step === currentStep);
  const activeIdx = idx >= 0 ? idx : 0;

  if (currentStep === "cancelled") {
    return (
      <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
        Booking cancelled
      </p>
    );
  }

  return (
    <div className="svc-tracking">
      <ol className="svc-tracking__steps">
        {STEPS.map((s, i) => {
          const done = i <= activeIdx;
          return (
            <li key={s.step} className={cn("svc-tracking__step", done && "svc-tracking__step--done")}>
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
              )}
              <span>{s.label}</span>
              {editable && onAdvance && i === activeIdx + 1 && (
                <button type="button" className="svc-tracking__advance" onClick={() => onAdvance(s.step)}>
                  Mark →
                </button>
              )}
            </li>
          );
        })}
      </ol>
      {events.length > 0 && (
        <ul className="svc-tracking__events">
          {events.slice(-5).map((e) => (
            <li key={e.id}>
              <span className="font-medium">{e.step.replace(/_/g, " ")}</span>
              {e.notes && <span className="text-muted-foreground"> — {e.notes}</span>}
              <time className="block text-xs text-muted-foreground">
                {new Date(e.createdAt).toLocaleString("en-IN")}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
