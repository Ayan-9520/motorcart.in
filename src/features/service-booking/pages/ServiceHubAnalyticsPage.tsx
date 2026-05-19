import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency } from "@/lib/utils";
import { useServiceHubData } from "../hooks/useServiceHubData";

export function ServiceHubAnalyticsPage() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "admin";
  const { centerId, analytics, loading } = useServiceHubData(user?.id, isAdmin);

  if (loading) return <Skeleton className="h-64 w-full" />;

  if (!centerId) {
    return <p className="text-muted-foreground">Connect a service center to see analytics.</p>;
  }

  const a = analytics ?? { totalBookings: 0, completed: 0, pending: 0, revenue: 0, avgRating: 0 };
  const completionRate = a.totalBookings ? Math.round((a.completed / a.totalBookings) * 100) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Service analytics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Completion rate</p>
            <p className="mt-2 text-4xl font-bold">{completionRate}%</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary transition-all" style={{ width: `${completionRate}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Mix</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Completed</span>
                <span className="font-medium">{a.completed}</span>
              </div>
              <div className="flex justify-between">
                <span>Pipeline</span>
                <span className="font-medium">{a.pending}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Revenue (demo)</span>
                <span className="font-medium">{formatCurrency(a.revenue)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
