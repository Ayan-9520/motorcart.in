import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { formatSlotLabel } from "../lib/slots";
import { WorkshopShell } from "../components/WorkshopShell";
import { ServiceTrackingTimeline } from "../components/ServiceTrackingTimeline";
import { PickupDropCard } from "../components/PickupDropCard";
import { useWorkshopDesk } from "../hooks/useWorkshopDesk";
import {
  assignMechanicRpc,
  generateServiceInvoiceRpc,
  updateBookingTrackingRpc,
} from "../services/service-booking.service";
import type { BookingTrackingStep } from "../types";
import toast from "react-hot-toast";

export function ServiceHubBookingsPage() {
  const user = useAuthStore((s) => s.user);
  const { centerId, bookings, mechanics, loading, reload } = useWorkshopDesk(user?.id, user?.role === "admin");
  const [expanded, setExpanded] = useState<string | null>(null);

  const assign = async (bookingId: string, mechanicId: string) => {
    const r = await assignMechanicRpc(bookingId, mechanicId);
    if (r.ok) {
      toast.success("Mechanic assigned");
      void reload();
    } else toast.error(r.error ?? "Failed");
  };

  const advance = async (bookingId: string, step: BookingTrackingStep) => {
    await updateBookingTrackingRpc(bookingId, step);
    if (step === "completed") await generateServiceInvoiceRpc(bookingId);
    toast.success(`Step: ${step}`);
    void reload();
  };

  if (loading) return <Skeleton className="h-64 w-full" />;
  if (!centerId) return <p className="text-muted-foreground">Link a service center to manage bookings.</p>;

  return (
    <WorkshopShell
      title="Order management"
      subtitle="Assign mechanics · update tracking · issue invoices · pickup & drop"
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/service/calendar">Calendar view</Link>
        </Button>
      }
    >
      <ul className="space-y-4">
        {bookings.map((b) => (
          <li key={b.id} className="svc-booking-card">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-semibold">{b.serviceName}</p>
                <p className="text-sm text-muted-foreground">{formatSlotLabel(b.scheduledAt)}</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {b.status}
                </Badge>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setExpanded(expanded === b.id ? null : b.id)}>
                {expanded === b.id ? "Hide" : "Manage"}
              </Button>
            </div>
            <PickupDropCard booking={b} />
            {expanded === b.id && (
              <div className="mt-4 space-y-4 border-t pt-4">
                <ServiceTrackingTimeline
                  currentStep={b.trackingStep}
                  editable
                  onAdvance={(step) => void advance(b.id, step)}
                />
                <div className="flex flex-wrap gap-2">
                  {mechanics.map((m) => (
                    <Button key={m.id} size="sm" variant="outline" onClick={() => void assign(b.id, m.id)}>
                      Assign {m.displayName}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
        {!bookings.length && (
          <p className="text-center py-12 text-muted-foreground">No bookings yet</p>
        )}
      </ul>
    </WorkshopShell>
  );
}
