import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchAllApplications,
  fetchFinanceLeads,
  fetchCommissions,
  fetchDsaAgentByUserId,
  fetchDsaApplications,
  fetchLenderApplications,
  fetchUserApplications,
  getFinanceAnalytics,
} from "../services/finance.service";
import { subscribeFinanceDesk, unsubscribeFinanceChannel } from "../lib/finance-realtime";
import type { LoanApplication, FinanceLead, FinanceCommission } from "../types";

export type FinanceDeskMode = "customer" | "dsa" | "lender" | "manager";

export function useFinanceDesk(mode: FinanceDeskMode) {
  const { user } = useAuth();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [leads, setLeads] = useState<FinanceLead[]>([]);
  const [commissions, setCommissions] = useState<FinanceCommission[]>([]);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<ReturnType<typeof subscribeFinanceDesk> | null>(null);

  const load = useCallback(async () => {
    if (!user && mode !== "manager") {
      setLoading(false);
      return;
    }
    setLoading(true);

    if (mode === "customer" && user) {
      setApplications(await fetchUserApplications(user.id));
      setLeads([]);
      setCommissions([]);
    } else if (mode === "dsa" && user) {
      const agent = await fetchDsaAgentByUserId(user.id);
      if (agent) {
        setApplications(await fetchDsaApplications(agent.id));
        setCommissions(await fetchCommissions(agent.id));
      } else {
        setApplications([]);
        setCommissions([]);
      }
      setLeads([]);
    } else if (mode === "lender") {
      setApplications(await fetchLenderApplications());
      setLeads([]);
      setCommissions([]);
    } else if (mode === "manager") {
      setApplications(await fetchAllApplications());
      setLeads(await fetchFinanceLeads());
      setCommissions(await fetchCommissions());
    }

    setLoading(false);
  }, [user, mode]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!user?.id) return;
    const channel = subscribeFinanceDesk(user.id, {
      onApplicationChange: () => void load(),
      onLeadChange: () => void load(),
      onCommissionChange: () => void load(),
    });
    channelRef.current = channel;
    return () => unsubscribeFinanceChannel(channel);
  }, [user?.id, load]);

  const analytics = getFinanceAnalytics(applications);

  return {
    applications,
    leads,
    commissions,
    analytics,
    loading,
    refetch: load,
  };
}
