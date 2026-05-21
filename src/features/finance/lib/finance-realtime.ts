import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { LoanApplication } from "../types";

export type FinanceRealtimeHandlers = {
  onApplicationChange?: () => void;
  onLeadChange?: () => void;
  onCommissionChange?: () => void;
};

export function subscribeFinanceDesk(
  userId: string,
  handlers: FinanceRealtimeHandlers
): RealtimeChannel {
  const channel = supabase.channel(`finance-desk:${userId}`, {
    config: { broadcast: { self: false } },
  });

  channel
    .on("postgres_changes", { event: "*", schema: "public", table: "finance_applications" }, () => {
      handlers.onApplicationChange?.();
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "finance_leads" }, () => {
      handlers.onLeadChange?.();
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "finance_commissions" }, () => {
      handlers.onCommissionChange?.();
    })
    .subscribe();

  return channel;
}

export function unsubscribeFinanceChannel(channel: RealtimeChannel | null) {
  if (channel) void supabase.removeChannel(channel);
}

export function groupApplicationsByStage(apps: LoanApplication[]) {
  const buckets: Record<string, LoanApplication[]> = {
    submitted: [],
    processing: [],
    approved: [],
    disbursed: [],
    rejected: [],
  };
  for (const app of apps) {
    const key =
      app.status === "rejected"
        ? "rejected"
        : app.status === "draft"
          ? "submitted"
          : buckets[app.status]
            ? app.status
            : "submitted";
    buckets[key]!.push(app);
  }
  return buckets;
}
