import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PickupDropCard } from "@/features/service-booking/components/PickupDropCard";
import { ServiceTrackingTimeline } from "@/features/service-booking/components/ServiceTrackingTimeline";
import {
  assignMechanicRpc,
  generateServiceInvoiceRpc,
  updateBookingTrackingRpc,
} from "@/features/service-booking/services/service-booking.service";
import { formatSlotLabel } from "@/features/service-booking/lib/slots";
import type { BookingTrackingStep, ServiceBooking } from "@/features/service-booking/types";
import { ServicePartnerShell } from "../components/ServicePartnerShell";
import { useServicePartnerOS } from "../hooks/useServicePartnerOS";
import { useWorkshopDesk } from "@/features/service-booking/hooks/useWorkshopDesk";
import { useAuth } from "@/hooks/useAuth";
import { setPageMeta } from "@/utils/seo";
import toast from "react-hot-toast";
import type { ShBookingFilter } from "../types";

function filterBookings(list: ServiceBooking[], filter: ShBookingFilter): ServiceBooking[] {
  if (filter === "all") return list;
  if (filter === "new") return list.filter((b) => b.status === "pending");
  if (filter === "upcoming") {
    const now = Date.now();
    return list.filter((b) => new Date(b.scheduledAt).getTime() > now && b.status !== "cancelled");
  }
  if (filter === "in_progress") return list.filter((b) => b.status === "in_progress" || b.trackingStep === "in_service");
  if (filter === "pickup") return list.filter((b) => !!b.pickupAddress);
  if (filter === "emergency") return list.filter((b) => /emergency|urgent/i.test(b.notes ?? ""));
  if (filter === "completed") return list.filter((b) => b.status === "completed");
  if (filter === "cancelled") return list.filter((b) => b.status === "cancelled");
  return list;
}

function pathToFilter(path: string): ShBookingFilter {
  if (path.includes("/new")) return "new";
  if (path.includes("/upcoming")) return "upcoming";
  if (path.includes("/in-progress")) return "in_progress";
  if (path.includes("/pickup")) return "pickup";
  if (path.includes("/emergency")) return "emergency";
  if (path.includes("/completed")) return "completed";
  if (path.includes("/cancelled")) return "cancelled";
  return "all";
}

const TITLES: Record<ShBookingFilter, string> = {
  all: "All bookings",
  new: "New bookings",
  upcoming: "Upcoming services",
  in_progress: "In progress",
  pickup: "Pickup requests",
  emergency: "Emergency bookings",
  completed: "Completed jobs",
  cancelled: "Cancelled jobs",
};

export function ShBookingsPage() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const filter = pathToFilter(pathname);
  const { data, loading, refresh } = useServicePartnerOS();
  const desk = useWorkshopDesk(user?.id, user?.role === "admin" || user?.role === "super_admin");
  const bookings = desk.centerId ? desk.bookings : data?.bookings ?? [];
  const mechanics = desk.mechanics;
  const filtered = useMemo(() => filterBookings(bookings, filter), [bookings, filter]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => setPageMeta({ title: TITLES[filter] }), [filter]);

  const assign = async (bookingId: string, mechanicId: string) => {
    const r = await assignMechanicRpc(bookingId, mechanicId);
    if (r.ok) {
      toast.success("Technician assigned");
      void desk.reload();
      void refresh();
    } else toast.error(r.error ?? "Failed");
  };

  const advance = async (bookingId: string, step: BookingTrackingStep) => {
    await updateBookingTrackingRpc(bookingId, step);
    if (step === "completed") await generateServiceInvoiceRpc(bookingId);
    toast.success(`Updated: ${step}`);
    void desk.reload();
    void refresh();
  };

  const hasCenter = !!desk.centerId || !!data?.centerId;

  return (
    <ServicePartnerShell
      title={TITLES[filter]}
      description="Assign technicians · tracking · invoices · pickup & drop"
      actions={
        <Button variant="outline" size="sm" className="rounded-xl" asChild>
          <Link to="/dashboard/service/calendar">Calendar</Link>
        </Button>
      }
    >
      {!hasCenter && !loading ? (
        <p className="text-muted-foreground max-w-lg">
          Link a workshop in <code className="rounded bg-muted px-1 text-sm">service_centers</code> to manage live
          bookings. Demo data shown until connected.
        </p>
      ) : null}
      {loading ? <p className="text-muted-foreground">Loading bookings…</p> : null}
      <ul className="space-y-4">
        {filtered.map((b) => (
          <li key={b.id} className="sh-booking-card">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-semibold">{b.serviceName ?? "Service"}</p>
                <p className="text-sm text-muted-foreground">{formatSlotLabel(b.scheduledAt)}</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {b.trackingStep.replace(/_/g, " ")}
                </Badge>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setExpanded(expanded === b.id ? null : b.id)}>
                {expanded === b.id ? "Hide" : "Manage"}
              </Button>
            </div>
            <PickupDropCard booking={b} />
            {expanded === b.id && (
              <div className="mt-4 space-y-4 border-t border-border pt-4">
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
        {!filtered.length && !loading ? (
          <li className="sh-glass-card py-8 text-center text-muted-foreground">No bookings in this view.</li>
        ) : null}
      </ul>
    </ServicePartnerShell>
  );
}
