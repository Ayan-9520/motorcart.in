import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function subscribeWorkshopBookings(
  centerId: string,
  onChange: () => void
): RealtimeChannel {
  const channel = supabase
    .channel(`workshop:${centerId}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "bookings", filter: `service_center_id=eq.${centerId}` },
      () => onChange()
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "booking_tracking_events" },
      () => onChange()
    )
    .subscribe();

  return channel;
}

export function unsubscribeWorkshop(channel: RealtimeChannel | null) {
  if (channel) void supabase.removeChannel(channel);
}
