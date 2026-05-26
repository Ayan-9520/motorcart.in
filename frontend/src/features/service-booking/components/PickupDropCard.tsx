import { MapPin, Truck } from "lucide-react";
import type { ServiceBooking } from "../types";

interface PickupDropCardProps {
  booking: Pick<ServiceBooking, "pickupAddress" | "dropAddress">;
}

export function PickupDropCard({ booking }: PickupDropCardProps) {
  if (!booking.pickupAddress && !booking.dropAddress) return null;

  return (
    <div className="svc-pickup-card">
      <div className="svc-pickup-card__head">
        <Truck className="h-5 w-5 text-primary" />
        <span>Pickup & drop</span>
      </div>
      {booking.pickupAddress && (
        <p className="svc-pickup-card__row">
          <MapPin className="h-4 w-4 shrink-0" />
          <span><strong>Pickup:</strong> {booking.pickupAddress}</span>
        </p>
      )}
      {booking.dropAddress && (
        <p className="svc-pickup-card__row">
          <MapPin className="h-4 w-4 shrink-0" />
          <span><strong>Drop:</strong> {booking.dropAddress}</span>
        </p>
      )}
    </div>
  );
}
