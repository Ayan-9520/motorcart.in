import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarPlus,
  CreditCard,
  MessageCircle,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { setPageMeta } from "@/utils/seo";
import { formatSlotLabel } from "../lib/slots";
import { googleCalendarUrl } from "../lib/calendar";
import { serviceSupportWhatsAppUrl } from "../lib/whatsapp";
import {
  fetchBookingById,
  fetchServiceById,
  fetchServiceCenterBySlug,
  fetchServiceInvoice,
  generateServiceInvoiceRpc,
  submitCenterReview,
  updateBookingRecord,
} from "../services/service-booking.service";
import { ServiceTrackingTimeline } from "../components/ServiceTrackingTimeline";
import { PickupDropCard } from "../components/PickupDropCard";
import { ServiceInvoiceCard } from "../components/ServiceInvoiceCard";
import { useBookingTracking } from "../hooks/useWorkshopDesk";
import type { ServiceBooking, ServiceCenter, ServiceInvoice } from "../types";

export function ServiceBookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const [booking, setBooking] = useState<ServiceBooking | null>(null);
  const [center, setCenter] = useState<ServiceCenter | null>(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({ rating: 5, title: "", content: "" });
  const [payBusy, setPayBusy] = useState(false);
  const [invoice, setInvoice] = useState<ServiceInvoice | null>(null);
  const [invoiceBusy, setInvoiceBusy] = useState(false);
  const { events } = useBookingTracking(id);

  const load = useCallback(async () => {
    if (!id || !user?.id) {
      setBooking(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const b = await fetchBookingById(id, user.id);
      setBooking(b);
      if (b) {
        const svc = await fetchServiceById(b.serviceId);
        if (svc?.centerSlug) setCenter(await fetchServiceCenterBySlug(svc.centerSlug));
        setInvoice(await fetchServiceInvoice(b.id));
      }
    } finally {
      setLoading(false);
    }
  }, [id, user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (booking?.serviceName) {
      setPageMeta({ title: `${booking.serviceName} — Booking`, description: "Track service, OTP, payment & reviews." });
    }
  }, [booking?.serviceName]);

  if (!user) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-20 text-center text-white">
        <Button asChild className="bg-primary text-primary-foreground">
          <Link to="/login" state={{ from: { pathname: `/services/bookings/${id}` } }}>
            Sign in to view booking
          </Link>
        </Button>
      </div>
    );
  }

  const start = booking ? new Date(booking.scheduledAt) : null;
  const end = booking ? new Date(new Date(booking.scheduledAt).getTime() + 60 * 60000) : null;
  const calHref =
    booking && center && start && end
      ? googleCalendarUrl({
          title: `${booking.serviceName ?? "Service"} @ ${center.name}`,
          start,
          end,
          details: `Booking ${booking.id}`,
          location: center.address ? `${center.address}, ${center.city}` : center.city,
        })
      : null;

  const waHref =
    center?.phone &&
    booking &&
    serviceSupportWhatsAppUrl({
      phoneDigits: center.phone.replace(/\D/g, "") || "919876543210",
      lines: [center.name, `Booking ${booking.id}`, booking.serviceName ?? ""],
    });

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="container mx-auto max-w-2xl space-y-6">
        <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
          <Link to="/services/my-bookings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            My bookings
          </Link>
        </Button>

        {loading ? (
          <Skeleton className="h-48 rounded-xl bg-muted" />
        ) : !booking ? (
          <p className="text-muted-foreground">Booking not found.</p>
        ) : (
          <>
            <Card className="border-border bg-card">
              <CardContent className="space-y-4 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{booking.status}</Badge>
                  {booking.otpVerified && <Badge className="bg-primary/15 text-primary">OTP verified</Badge>}
                  {booking.mechanicId && (
                    <Badge variant="outline" className="gap-1 border-border">
                      <UserCog className="h-3.5 w-3.5" />
                      Technician assigned
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-foreground">{booking.serviceName ?? "Service"}</h1>
                <p className="text-sm text-muted-foreground">{booking.centerName}</p>
                <p className="text-sm text-muted-foreground">{formatSlotLabel(booking.scheduledAt)}</p>
                <ServiceTrackingTimeline currentStep={booking.trackingStep} events={events} />
                <PickupDropCard booking={booking} />
                {booking.otpCode && (
                  <p className="text-sm text-muted-foreground">
                    Handover OTP: <span className="font-mono text-white">{booking.otpCode}</span>
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {calHref && (
                    <Button variant="outline" size="sm" className="border-border" asChild>
                      <a href={calHref} target="_blank" rel="noreferrer">
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Calendar
                      </a>
                    </Button>
                  )}
                  {waHref && (
                    <Button variant="outline" size="sm" className="border-primary/50 text-primary" asChild>
                      <a href={waHref} target="_blank" rel="noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary"
                    disabled={payBusy || booking.paymentStatus === "paid"}
                    onClick={async () => {
                      setPayBusy(true);
                      await updateBookingRecord(booking.id, { paymentStatus: "paid" });
                      setBooking((b) => (b ? { ...b, paymentStatus: "paid", paymentAmount: b.totalAmount ?? b.paymentAmount } : b));
                      setPayBusy(false);
                    }}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {booking.paymentStatus === "paid" ? "Paid" : "Pay now (demo)"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="space-y-3 p-6">
                <h2 className="font-semibold text-foreground">Service invoice</h2>
                <ServiceInvoiceCard
                  invoice={invoice}
                  generating={invoiceBusy}
                  onGenerate={
                    booking.status === "completed" || booking.trackingStep === "completed"
                      ? async () => {
                          setInvoiceBusy(true);
                          const r = await generateServiceInvoiceRpc(booking.id);
                          if (r.ok) setInvoice(await fetchServiceInvoice(booking.id));
                          setInvoiceBusy(false);
                        }
                      : undefined
                  }
                />
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="space-y-3 p-6">
                <h2 className="font-semibold text-foreground">Rate this center</h2>
                <div className="grid gap-2 sm:grid-cols-3">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={review.rating}
                    onChange={(e) => setReview((r) => ({ ...r, rating: Number(e.target.value) }))}
                    className="rounded-md border border-border bg-background px-2 py-2 text-sm"
                  />
                  <input
                    className="sm:col-span-2 rounded-md border border-border bg-background px-2 py-2 text-sm"
                    placeholder="Title"
                    value={review.title}
                    onChange={(e) => setReview((r) => ({ ...r, title: e.target.value }))}
                  />
                </div>
                <textarea
                  className="min-h-[80px] w-full rounded-md border border-border bg-background p-2 text-sm"
                  placeholder="Share your experience"
                  value={review.content}
                  onChange={(e) => setReview((r) => ({ ...r, content: e.target.value }))}
                />
                <Button
                  variant="secondary"
                  disabled={!booking.serviceCenterId}
                  onClick={async () => {
                    const ok = await submitCenterReview({
                      userId: user.id,
                      centerId: booking.serviceCenterId,
                      rating: review.rating,
                      title: review.title,
                      content: review.content,
                    });
                    if (ok) setReview({ rating: 5, title: "", content: "" });
                  }}
                >
                  Submit review
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
