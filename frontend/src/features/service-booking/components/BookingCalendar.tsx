import { useMemo } from "react";
import { formatSlotLabel } from "../lib/slots";
import type { ServiceBooking } from "../types";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  bookings: ServiceBooking[];
  days?: number;
}

export function BookingCalendar({ bookings, days = 7 }: BookingCalendarProps) {
  const dayBuckets = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const buckets: { key: string; label: string; items: ServiceBooking[] }[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      buckets.push({
        key,
        label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
        items: [],
      });
    }
    for (const b of bookings) {
      if (b.status === "cancelled") continue;
      const key = b.scheduledAt.slice(0, 10);
      const bucket = buckets.find((x) => x.key === key);
      if (bucket) bucket.items.push(b);
    }
    for (const b of buckets) {
      b.items.sort((a, c) => new Date(a.scheduledAt).getTime() - new Date(c.scheduledAt).getTime());
    }
    return buckets;
  }, [bookings, days]);

  return (
    <div className="svc-calendar">
      {dayBuckets.map((day) => (
        <section key={day.key} className="svc-calendar__day">
          <header className="svc-calendar__day-head">
            <span>{day.label}</span>
            <span className="svc-calendar__count">{day.items.length}</span>
          </header>
          <ul className="svc-calendar__slots">
            {day.items.length === 0 && (
              <li className="svc-calendar__empty">No bookings</li>
            )}
            {day.items.map((b) => (
              <li
                key={b.id}
                className={cn(
                  "svc-calendar__slot",
                  b.pickupAddress && "svc-calendar__slot--pickup"
                )}
              >
                <span className="svc-calendar__time">{formatSlotLabel(b.scheduledAt)}</span>
                <span className="svc-calendar__svc">{b.serviceName ?? "Service"}</span>
                <span className="svc-calendar__status">{b.trackingStep.replace(/_/g, " ")}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
