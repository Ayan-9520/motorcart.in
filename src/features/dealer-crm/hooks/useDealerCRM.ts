import { useCallback, useEffect, useMemo, useState } from "react";
import { useDealer } from "./useDealer";
import { fetchDealerLeads, fetchDealerVehiclesByDealerId } from "../services/dealer.service";
import { MOCK_CALLS, mockListingPerformance } from "../services/crm-mock";
import { fetchLeadCalls, subscribeDealerLeads } from "../services/crm.service";
import type { CRMStats, LeadWithMeta } from "../types";
import type { DbLead } from "@/types/database";

function leadType(lead: DbLead): LeadWithMeta["type"] {
  const meta = lead.metadata as { type?: string };
  if (lead.source === "test_drive" || meta?.type === "test_drive") return "test_drive";
  if (meta?.type === "enquiry" || lead.source === "website") return "enquiry";
  return "lead";
}

export function useDealerCRM() {
  const { dealer, loading: dealerLoading } = useDealer();
  const [leads, setLeads] = useState<DbLead[]>([]);
  const [vehicles, setVehicles] = useState<{ id: string; title: string; status: string; price: number; is_featured?: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [calls, setCalls] = useState(MOCK_CALLS);

  const load = useCallback(async () => {
    if (!dealer) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const [leadRows, vehicleRows, callRows] = await Promise.all([
      fetchDealerLeads(dealer.id),
      fetchDealerVehiclesByDealerId(dealer.id),
      fetchLeadCalls(dealer.id),
    ]);
    setLeads(leadRows as DbLead[]);
    if (callRows.length) {
      const leadMap = new Map((leadRows as DbLead[]).map((l) => [l.id, l]));
      setCalls(
        callRows.map((c) => {
          const lead = leadMap.get(c.lead_id);
          return {
            id: c.id,
            leadName: lead?.name ?? "Lead",
            phone: lead?.phone ?? "",
            outcome: (c.outcome ?? "answered") as "answered" | "missed" | "voicemail",
            duration: c.duration_seconds ?? 0,
            createdAt: c.created_at,
          };
        })
      );
    } else {
      setCalls(MOCK_CALLS);
    }
    setVehicles(
      vehicleRows.map((v) => ({
        id: v.id,
        title: v.title,
        status: v.status,
        price: Number(v.price),
        is_featured: v.is_featured,
      }))
    );
    setLoading(false);
  }, [dealer]);

  useEffect(() => {
    load();
    if (!dealer?.id) return;
    const unsub = subscribeDealerLeads(dealer.id, () => {
      void load();
    });
    return () => {
      unsub();
    };
  }, [load, dealer?.id]);

  const leadsWithMeta: LeadWithMeta[] = useMemo(
    () =>
      leads.map((l) => ({
        id: l.id,
        name: l.name,
        phone: l.phone,
        email: l.email,
        source: l.source,
        status: l.status,
        aiScore: l.ai_score,
        vehicleInterest: l.vehicle_interest,
        notes: l.notes,
        createdAt: l.created_at,
        type: leadType(l),
      })),
    [leads]
  );

  const stats: CRMStats = useMemo(() => {
    const active = vehicles.filter((v) => v.status === "available").length;
    const sold = vehicles.filter((v) => v.status === "sold").length;
    const featured = vehicles.filter((v) => v.is_featured).length;
    const newLeads = leads.filter((l) => l.status === "new").length;
    const converted = leads.filter((l) => l.status === "converted").length;
    const testDrives = leadsWithMeta.filter((l) => l.type === "test_drive").length;
    const enquiries = leadsWithMeta.filter((l) => l.type === "enquiry").length;
    const revenueMtd = vehicles.filter((v) => v.status === "sold").reduce((s, v) => s + v.price, 0);

    return {
      totalListings: vehicles.length,
      activeListings: active,
      soldListings: sold,
      featuredListings: featured,
      totalLeads: leads.length,
      newLeads,
      convertedLeads: converted,
      testDriveRequests: testDrives,
      enquiries,
      revenueMtd: revenueMtd || 4850000,
      conversionRate: leads.length ? Math.round((converted / leads.length) * 100) : 12,
      whatsappChats: 47,
      callsTracked: calls.length,
      avgListingViews: 890,
    };
  }, [vehicles, leads, leadsWithMeta, calls.length]);

  const listingPerformance = useMemo(() => mockListingPerformance(vehicles), [vehicles]);

  return {
    dealer,
    dealerLoading,
    loading,
    stats,
    leads: leadsWithMeta,
    vehicles,
    listingPerformance,
    calls,
    refetch: load,
  };
}
