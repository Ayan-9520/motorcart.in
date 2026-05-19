import { Link } from "react-router-dom";
import { CalendarCheck, IndianRupee, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency } from "@/lib/utils";
import { useServiceHubData } from "../hooks/useServiceHubData";

export function ServiceHubOverviewPage() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "admin";
  const { centerId, bookings, analytics, loading } = useServiceHubData(user?.id, isAdmin);

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
      <div className="max-w-lg space-y-4">
        <h1 className="text-2xl font-bold">Service hub</h1>
        <p className="text-muted-foreground">
          No workshop linked to this account yet. When your Supabase user owns a row in{" "}
          <code className="rounded bg-muted px-1 text-sm">service_centers</code>, bookings and analytics appear here.
        </p>
        <Button asChild variant="outline">
          <Link to="/services">Public marketplace</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Workshop overview</h1>
          <p className="text-sm text-muted-foreground">Booking pipeline, revenue signals & SLA</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/service/bookings">Manage bookings</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <CalendarCheck className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total bookings</p>
              <p className="text-2xl font-bold">{analytics?.totalBookings ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Timer className="h-10 w-10 text-amber-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active / pending</p>
              <p className="text-2xl font-bold">{analytics?.pending ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <IndianRupee className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Recorded revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(analytics?.revenue ?? 0)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold">Upcoming</h2>
          <ul className="mt-4 space-y-2">
            {bookings
              .filter((b) => new Date(b.scheduledAt) >= new Date())
              .slice(0, 5)
              .map((b) => (
                <li key={b.id} className="flex justify-between text-sm">
                  <span>{b.serviceName}</span>
                  <span className="text-muted-foreground">{new Date(b.scheduledAt).toLocaleString()}</span>
                </li>
              ))}
            {bookings.filter((b) => new Date(b.scheduledAt) >= new Date()).length === 0 && (
              <p className="text-sm text-muted-foreground">No upcoming jobs.</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
