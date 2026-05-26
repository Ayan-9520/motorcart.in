import { CheckCircle2, Circle, Package, Truck } from "lucide-react";
import type { PartOrderStatus } from "../types";
import { cn } from "@/lib/utils";

const STEPS: { status: PartOrderStatus; label: string }[] = [
  { status: "pending", label: "Order placed" },
  { status: "confirmed", label: "Confirmed" },
  { status: "packed", label: "Packed" },
  { status: "shipped", label: "Shipped" },
  { status: "delivered", label: "Delivered" },
];

interface OrderTrackingTimelineProps {
  status: PartOrderStatus;
  trackingNumber?: string | null;
  carrier?: string | null;
}

export function OrderTrackingTimeline({ status, trackingNumber, carrier }: OrderTrackingTimelineProps) {
  if (status === "cancelled") {
    return <p className="text-sm text-red-600">Order cancelled</p>;
  }

  const idx = STEPS.findIndex((s) => s.status === status);
  const active = idx >= 0 ? idx : 0;

  return (
    <div className="parts-tracking">
      <ol className="parts-tracking__steps">
        {STEPS.map((s, i) => (
          <li key={s.status} className={cn("parts-tracking__step", i <= active && "parts-tracking__step--done")}>
            {i <= active ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground/30" />}
            <span>{s.label}</span>
          </li>
        ))}
      </ol>
      {trackingNumber && (
        <p className="parts-tracking__awb">
          <Truck className="h-4 w-4" />
          {carrier ?? "Courier"} · <strong>{trackingNumber}</strong>
        </p>
      )}
      {status === "packed" && !trackingNumber && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Package className="h-3.5 w-3.5" /> Awaiting dispatch
        </p>
      )}
    </div>
  );
}
