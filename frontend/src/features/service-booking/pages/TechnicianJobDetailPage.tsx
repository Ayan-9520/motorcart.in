import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatSlotLabel } from "../lib/slots";
import { fetchBookingByIdStaff, updateBookingRecord } from "../services/service-booking.service";
import type { BookingTrackingStep, ServiceBooking } from "../types";

const FLOW: BookingTrackingStep[] = ["mechanic_assigned", "en_route", "arrived", "in_service", "completed"];

function nextTrackingStep(current: BookingTrackingStep): BookingTrackingStep | null {
  if (current === "scheduled" || current === "confirmed") return "en_route";
  const i = FLOW.indexOf(current);
  if (i >= 0 && i < FLOW.length - 1) return FLOW[i + 1];
  return null;
}

export function TechnicianJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<ServiceBooking | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      setBooking(await fetchBookingByIdStaff(id));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const advance = async () => {
    if (!booking) return;
    const n = nextTrackingStep(booking.trackingStep);
    if (!n) return;
    await updateBookingRecord(booking.id, {
      trackingStep: n,
      status: n === "completed" ? "completed" : "in_progress",
    });
    await load();
  };

  if (loading) return <Skeleton className="h-40 w-full" />;
  if (!booking) return <p className="text-muted-foreground">Job not found or not assigned to you.</p>;

  const canAdvance = nextTrackingStep(booking.trackingStep) !== null && booking.trackingStep !== "completed" && booking.trackingStep !== "cancelled";

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/dashboard/technician">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Jobs
        </Link>
      </Button>
      <Card>
        <CardContent className="space-y-3 p-6">
          <Badge>{booking.trackingStep}</Badge>
          <h1 className="text-xl font-bold">{booking.serviceName}</h1>
          <p className="text-sm text-muted-foreground">{formatSlotLabel(booking.scheduledAt)}</p>
          {booking.pickupAddress && (
            <p className="text-sm">
              <span className="font-medium">Pickup:</span> {booking.pickupAddress}
            </p>
          )}
          {booking.dropAddress && (
            <p className="text-sm">
              <span className="font-medium">Drop:</span> {booking.dropAddress}
            </p>
          )}
          <Button className="w-full" disabled={!canAdvance} onClick={() => advance()}>
            {booking.trackingStep === "completed" ? "Completed" : "Advance status"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
