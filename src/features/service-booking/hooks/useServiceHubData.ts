import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  computeBookingAnalytics,
  fetchCenterBookings,
  resolveOwnedCenterId,
} from "../services/service-booking.service";
import type { BookingAnalytics, ServiceBooking } from "../types";

export function useServiceHubData(userId: string | undefined, isAdmin?: boolean) {
  const [centerId, setCenterId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [analytics, setAnalytics] = useState<BookingAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) {
      setCenterId(null);
      setBookings([]);
      setAnalytics(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      let cid = await resolveOwnedCenterId(userId);
      if (!cid && isAdmin) {
        const { data } = await supabase.from("service_centers").select("id").limit(1).maybeSingle();
        cid = (data as { id: string } | null)?.id ?? null;
      }
      setCenterId(cid);
      if (cid) {
        const list = await fetchCenterBookings(cid);
        setBookings(list);
        setAnalytics(computeBookingAnalytics(list));
      } else {
        setBookings([]);
        setAnalytics(null);
      }
    } finally {
      setLoading(false);
    }
  }, [userId, isAdmin]);

  useEffect(() => {
    void load();
  }, [load]);

  return { centerId, bookings, analytics, loading, reload: load };
}
