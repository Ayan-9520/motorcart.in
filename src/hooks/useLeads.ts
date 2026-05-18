import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DbLead } from "@/types/database";
import type { LeadStatus } from "@/types/database";

export function useLeads(dealerId?: string) {
  const [leads, setLeads] = useState<DbLead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    if (!dealerId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("dealer_id", dealerId)
      .order("created_at", { ascending: false });

    if (!error) setLeads((data ?? []) as DbLead[]);
    setLoading(false);
  }, [dealerId]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLeadStatus = useCallback(async (leadId: string, status: LeadStatus) => {
    return supabase.from("leads").update({ status }).eq("id", leadId);
  }, []);

  const createLead = useCallback(
    async (payload: Omit<DbLead, "id" | "created_at" | "updated_at" | "metadata" | "ai_score" | "assigned_to" | "customer_id">) => {
      return supabase.from("leads").insert(payload).select().single();
    },
    []
  );

  return { leads, loading, refetch: fetchLeads, updateLeadStatus, createLead };
}
