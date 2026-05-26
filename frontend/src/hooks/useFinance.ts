import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DbBank, DbFinanceApplication } from "@/types/database";

export function useFinance(userId?: string) {
  const [banks, setBanks] = useState<DbBank[]>([]);
  const [applications, setApplications] = useState<DbFinanceApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanks = useCallback(async () => {
    const { data } = await supabase.from("banks").select("*").eq("is_active", true).order("is_featured", { ascending: false });
    setBanks((data ?? []) as DbBank[]);
  }, []);

  const fetchApplications = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("finance_applications")
      .select("*, banks(name, logo_url)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setApplications((data ?? []) as DbFinanceApplication[]);
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBanks(), fetchApplications()]).finally(() => setLoading(false));
  }, [fetchBanks, fetchApplications]);

  const createApplication = useCallback(
    async (payload: {
      user_id: string;
      vehicle_id?: string;
      bank_id?: string;
      loan_amount: number;
      tenure_months: number;
    }) => {
      return supabase.from("finance_applications").insert({ ...payload, status: "submitted" }).select().single();
    },
    []
  );

  return { banks, applications, loading, createApplication, refetch: fetchApplications };
}
