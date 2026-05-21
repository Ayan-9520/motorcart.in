import { Link } from "react-router-dom";
import { Calendar, IndianRupee, Timer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency } from "@/lib/utils";
import { WorkshopShell } from "../components/WorkshopShell";
import { BookingCalendar } from "../components/BookingCalendar";
import { useWorkshopDesk } from "../hooks/useWorkshopDesk";

export function ServiceHubOverviewPage() {
  const user = useAuthStore((s) => s.user);
  const { centerId, bookings, analytics, loading } = useWorkshopDesk(user?.id, user?.role === "admin");

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    );
  }

  if (!centerId) {
    return (
      <WorkshopShell title="Workshop management" subtitle="Urban Company-grade operations desk">
        <p className="text-muted-foreground max-w-lg">
          No workshop linked to this account. When your user owns a row in{" "}
          <code className="rounded bg-muted px-1 text-sm">service_centers</code>, bookings, calendar & tracking appear here.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/services">Public marketplace</Link>
        </Button>
      </WorkshopShell>
    );
  }

  return (
    <WorkshopShell
      title="Workshop overview"
      subtitle="Bookings · pickup/drop · mechanic roster · invoices"
      actions={
        <>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/service/calendar">Calendar</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/dashboard/service/bookings">Manage bookings</Link>
          </Button>
        </>
      }
    >
      <div className="svc-stat-grid">
        <article className="svc-stat-card">
          <Calendar className="h-6 w-6 text-primary" />
          <p className="svc-stat-card__label">Total bookings</p>
          <p className="svc-stat-card__value">{analytics?.totalBookings ?? 0}</p>
        </article>
        <article className="svc-stat-card">
          <Timer className="h-6 w-6 text-amber-500" />
          <p className="svc-stat-card__label">Active / pending</p>
          <p className="svc-stat-card__value">{analytics?.pending ?? 0}</p>
        </article>
        <article className="svc-stat-card">
          <IndianRupee className="h-6 w-6 text-primary" />
          <p className="svc-stat-card__label">Revenue</p>
          <p className="svc-stat-card__value">{formatCurrency(analytics?.revenue ?? 0)}</p>
        </article>
        <article className="svc-stat-card">
          <Wrench className="h-6 w-6 text-primary" />
          <p className="svc-stat-card__label">Completed</p>
          <p className="svc-stat-card__value">{analytics?.completed ?? 0}</p>
        </article>
      </div>

      <section className="svc-section mt-8">
        <h2 className="svc-section__title">This week</h2>
        <BookingCalendar bookings={bookings} days={7} />
      </section>
    </WorkshopShell>
  );
}
