import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { NcdInventoryItem } from "../types";

const STATUS_LABELS = {
  available: "Available",
  booked: "Booked",
  transit: "In transit",
  upcoming: "Upcoming",
  delivered: "Delivered",
};

const HEALTH_VARIANT = {
  fast_moving: "success",
  slow_moving: "secondary",
  dead_stock: "destructive",
} as const;

export function NcdInventoryGrid({ items }: { items: NcdInventoryItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((v) => (
        <article key={v.id} className="ncd-inventory-card">
          <div className="ncd-inventory-card__media">
            <img src={v.imageUrl} alt={`${v.brand} ${v.model}`} className="h-full w-full object-cover" loading="lazy" />
            <Badge className="absolute left-2 top-2 text-[10px]" variant={HEALTH_VARIANT[v.stockHealth]}>
              {v.stockHealth.replace("_", " ")}
            </Badge>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">
              {v.brand} {v.model}
            </h3>
            <p className="text-xs text-muted-foreground">{v.variant}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline" className="text-[10px]">
                {STATUS_LABELS[v.stockStatus]}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {v.fuelType}
              </Badge>
            </div>
            <p className="mt-2 text-lg font-bold text-primary">{formatCurrency(v.onRoadPrice)}</p>
            <p className="text-xs text-muted-foreground">
              Ex-showroom {formatCurrency(v.exShowroomPrice)}
              {v.discountAmount > 0 ? ` · Save ${formatCurrency(v.discountAmount)}` : ""}
            </p>
            {v.expectedDeliveryDays != null ? (
              <p className="mt-1 text-[10px] text-muted-foreground">Delivery ~{v.expectedDeliveryDays} days</p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
