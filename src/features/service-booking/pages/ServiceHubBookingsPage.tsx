import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { formatSlotLabel } from "../lib/slots";
import { useServiceHubData } from "../hooks/useServiceHubData";
import { updateBookingRecord } from "../services/service-booking.service";
import type { BookingStatus } from "@/types/database";
import type { BookingTrackingStep, ServiceBooking } from "../types";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "in_progress", "completed", "cancelled"];

export function ServiceHubBookingsPage() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "admin";
  const { centerId, bookings, loading, reload } = useServiceHubData(user?.id, isAdmin);
  const [mechanicDraft, setMechanicDraft] = useState<Record<string, string>>({});

  const assignMechanic = async (b: ServiceBooking) => {
    const raw = mechanicDraft[b.id]?.trim();
    await updateBookingRecord(b.id, {
      mechanicId: raw || null,
      trackingStep: raw ? "mechanic_assigned" : b.trackingStep,
    });
    void reload();
  };

  if (loading) return <Skeleton className="h-64 w-full" />;

  if (!centerId) {
    return <p className="text-muted-foreground">Link a service center to your account to manage bookings.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Booking management</h1>
      <p className="text-sm text-muted-foreground">Assign technicians (user UUID), update status, coordinate pickup & drop.</p>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left">
              <tr>
                <th className="p-3">Service</th>
                <th className="p-3">Slot</th>
                <th className="p-3">Status</th>
                <th className="p-3">Tracking</th>
                <th className="p-3 min-w-[200px]">Mechanic (user id)</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b last:border-0">
                  <td className="p-3">
                    <p className="font-medium">{b.serviceName}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {b.id.slice(0, 8)}…
                    </Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">{formatSlotLabel(b.scheduledAt)}</td>
                  <td className="p-3">
                    <select
                      className="h-9 w-full max-w-[140px] rounded-md border border-input bg-background px-2"
                      value={b.status}
                      onChange={async (e) => {
                        await updateBookingRecord(b.id, { status: e.target.value as BookingStatus });
                        void reload();
                      }}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <select
                      className="h-9 w-full max-w-[160px] rounded-md border border-input bg-background px-2"
                      value={b.trackingStep}
                      onChange={async (e) => {
                        await updateBookingRecord(b.id, {
                          trackingStep: e.target.value as BookingTrackingStep,
                        });
                        void reload();
                      }}
                    >
                      {["scheduled", "confirmed", "mechanic_assigned", "en_route", "arrived", "in_service", "completed", "cancelled"].map(
                        (s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Input
                        placeholder="Technician UUID"
                        value={mechanicDraft[b.id] ?? b.mechanicId ?? ""}
                        onChange={(e) => setMechanicDraft((d) => ({ ...d, [b.id]: e.target.value }))}
                        className="h-9"
                      />
                      <Button size="sm" variant="secondary" type="button" onClick={() => assignMechanic(b)}>
                        Save
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && <p className="p-6 text-muted-foreground">No bookings for this center.</p>}
        </CardContent>
      </Card>
      <Button variant="outline" asChild>
        <Link to="/services">View marketplace</Link>
      </Button>
    </div>
  );
}
