import { useCallback, useEffect, useState } from "react";
import { fetchMyBookings } from "../services/service-booking.service";
import type { ServiceBooking } from "../types";

export function useMyServiceBookings(userId: string | undefined) {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) {
      setBookings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setBookings(await fetchMyBookings(userId));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { bookings, loading, reload: load };
}
