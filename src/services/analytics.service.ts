import { supabase } from "@/integrations/supabase/client";

export type AnalyticsEventType =
  | "page_view"
  | "search"
  | "lead_created"
  | "booking_created"
  | "auction_view"
  | "bid_placed"
  | "finance_application"
  | "vehicle_view";

export interface TrackEventInput {
  eventType: AnalyticsEventType;
  entityType?: string;
  entityId?: string;
  dealerId?: string;
  payload?: Record<string, unknown>;
  sessionId?: string;
}

export async function trackEvent(input: TrackEventInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("analytics").insert({
    user_id: user?.id ?? null,
    dealer_id: input.dealerId ?? null,
    event_type: input.eventType,
    entity_type: input.entityType ?? null,
    entity_id: input.entityId ?? null,
    payload: input.payload ?? {},
    session_id: input.sessionId ?? null,
  });

  if (error) {
    console.warn("[analytics]", error.message);
  }
}

export async function fetchDealerAnalytics(dealerId: string, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from("analytics")
    .select("event_type, created_at, payload")
    .eq("dealer_id", dealerId)
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
