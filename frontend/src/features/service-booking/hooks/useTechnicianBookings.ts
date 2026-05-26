import { useCallback, useEffect, useState } from "react";
import { fetchTechnicianBookings } from "../services/service-booking.service";
import type { ServiceBooking } from "../types";

export function useTechnicianBookings() {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setBookings(await fetchTechnicianBookings());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { bookings, loading, reload: load };
}
