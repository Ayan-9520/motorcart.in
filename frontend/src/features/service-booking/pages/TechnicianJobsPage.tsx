import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatSlotLabel } from "../lib/slots";
import { useTechnicianBookings } from "../hooks/useTechnicianBookings";

export function TechnicianJobsPage() {
  const { bookings, loading } = useTechnicianBookings();

  if (loading) return <Skeleton className="h-48 w-full" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Technician panel</h1>
      <p className="text-sm text-muted-foreground">Jobs assigned to your user ID as mechanic.</p>
      {bookings.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No assignments yet. A workshop owner can paste your user UUID under Booking management → Mechanic.
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b) => (
            <li key={b.id}>
              <Link to={`/dashboard/technician/booking/${b.id}`}>
                <Card className="transition-colors hover:border-primary/40">
                  <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">{b.serviceName}</p>
                      <p className="text-sm text-muted-foreground">{formatSlotLabel(b.scheduledAt)}</p>
                    </div>
                    <Badge variant="outline">{b.trackingStep}</Badge>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
