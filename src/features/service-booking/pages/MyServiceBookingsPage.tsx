import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";
import { useMyServiceBookings } from "../hooks/useMyServiceBookings";
import { formatSlotLabel } from "../lib/slots";

export function MyServiceBookingsPage() {
  const user = useAuthStore((s) => s.user);
  const { bookings, loading } = useMyServiceBookings(user?.id);

  if (!user) {
    return (
      <div className="container mx-auto max-w-md py-20 text-center">
        <Button asChild className="bg-primary text-primary-foreground">
          <Link to="/login">Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="container mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">My service bookings</h1>
          <Button variant="outline" size="sm" className="border-border" asChild>
            <Link to="/services">Book another</Link>
          </Button>
        </div>
        {loading ? (
          <Skeleton className="h-32 rounded-xl bg-muted" />
        ) : bookings.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="p-8 text-center text-muted-foreground">
              <Calendar className="mx-auto mb-3 h-10 w-10 opacity-50" />
              <p>No bookings yet.</p>
              <Button className="mt-4 bg-primary text-primary-foreground" asChild>
                <Link to="/services">Explore services</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {bookings.map((b) => (
              <li key={b.id}>
                <Link to={`/services/bookings/${b.id}`}>
                  <Card className="border-border bg-card transition-colors hover:border-primary/40">
                    <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-foreground">{b.serviceName ?? "Service"}</p>
                        <p className="text-sm text-muted-foreground">{b.centerName}</p>
                        <p className="text-sm text-muted-foreground">{formatSlotLabel(b.scheduledAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-border">
                          {b.status}
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
