import { useCallback, useEffect, useRef, useState } from "react";
import { useServiceHubData } from "./useServiceHubData";
import {
  fetchWorkshopMechanics,
  fetchTrackingEvents,
} from "../services/service-booking.service";
import { subscribeWorkshopBookings, unsubscribeWorkshop } from "../lib/workshop-realtime";
import type { WorkshopMechanic, BookingTrackingEvent } from "../types";

export function useWorkshopDesk(userId: string | undefined, isAdmin?: boolean) {
  const hub = useServiceHubData(userId, isAdmin);
  const [mechanics, setMechanics] = useState<WorkshopMechanic[]>([]);
  const channelRef = useRef<ReturnType<typeof subscribeWorkshopBookings> | null>(null);

  const loadMechanics = useCallback(async () => {
    if (!hub.centerId) {
      setMechanics([]);
      return;
    }
    setMechanics(await fetchWorkshopMechanics(hub.centerId));
  }, [hub.centerId]);

  useEffect(() => {
    void loadMechanics();
  }, [loadMechanics]);

  useEffect(() => {
    if (!hub.centerId) return;
    const ch = subscribeWorkshopBookings(hub.centerId, () => {
      void hub.reload();
    });
    channelRef.current = ch;
    return () => unsubscribeWorkshop(ch);
  }, [hub.centerId, hub.reload]);

  return { ...hub, mechanics, reloadMechanics: loadMechanics };
}

export function useBookingTracking(bookingId: string | undefined) {
  const [events, setEvents] = useState<BookingTrackingEvent[]>([]);

  useEffect(() => {
    if (!bookingId) return;
    void fetchTrackingEvents(bookingId).then(setEvents);
  }, [bookingId]);

  return { events, refresh: () => bookingId && fetchTrackingEvents(bookingId).then(setEvents) };
}
