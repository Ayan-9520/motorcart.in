import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { WorkshopShell } from "../components/WorkshopShell";
import { BookingCalendar } from "../components/BookingCalendar";
import { useWorkshopDesk } from "../hooks/useWorkshopDesk";
import {
  assignMechanicRpc,
  updateBookingTrackingRpc,
} from "../services/service-booking.service";
import type { BookingTrackingStep } from "../types";
import toast from "react-hot-toast";

export function ServiceWorkshopPage() {
  const user = useAuthStore((s) => s.user);
  const { centerId, bookings, mechanics, loading, reload } = useWorkshopDesk(user?.id, user?.role === "admin");

  const assign = async (bookingId: string, mechanicId: string) => {
    const r = await assignMechanicRpc(bookingId, mechanicId);
    if (r.ok) {
      toast.success("Mechanic assigned");
      void reload();
    } else toast.error(r.error ?? "Assign failed");
  };

  const advance = async (bookingId: string, step: BookingTrackingStep) => {
    await updateBookingTrackingRpc(bookingId, step);
    toast.success(`Updated: ${step}`);
    void reload();
  };

  if (!centerId) {
    return (
      <WorkshopShell title="Workshop calendar" subtitle="Link a service center to your account">
        <p className="text-muted-foreground">No workshop linked.</p>
      </WorkshopShell>
    );
  }

  return (
    <WorkshopShell
      title="Booking calendar"
      subtitle="Urban Company-style bay scheduling · mechanic assignment · live sync"
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/service/bookings">Table view</Link>
        </Button>
      }
    >
      {loading ? (
        <p className="text-muted-foreground">Loading calendar…</p>
      ) : (
        <>
          <BookingCalendar bookings={bookings} />
          <section className="svc-section mt-8">
            <h2 className="svc-section__title">Quick assignments</h2>
            <ul className="space-y-2">
              {bookings
                .filter((b) => b.trackingStep === "confirmed" || b.trackingStep === "scheduled")
                .slice(0, 8)
                .map((b) => (
                  <li key={b.id} className="svc-quick-row">
                    <span>
                      {b.serviceName} · {new Date(b.scheduledAt).toLocaleString("en-IN")}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {mechanics.map((m) => (
                        <Button key={m.id} size="sm" variant="outline" onClick={() => void assign(b.id, m.id)}>
                          {m.displayName}
                        </Button>
                      ))}
                      <Button size="sm" onClick={() => void advance(b.id, "in_service")}>
                        Start job
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        </>
      )}
    </WorkshopShell>
  );
}
