import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchUserApplications,
  fetchApplicationById,
  fetchDsaApplications,
  fetchLenderApplications,
  fetchDsaAgentByUserId,
  appendApplicationDocuments,
} from "../services/finance.service";
import type { LoanApplication, LoanDocument } from "../types";

export function useLoanApplications(mode: "customer" | "dsa" | "lender" = "customer") {
  const { user } = useAuth();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);

    if (mode === "customer") {
      setApplications(await fetchUserApplications(user.id));
    } else if (mode === "dsa") {
      const agent = await fetchDsaAgentByUserId(user.id);
      if (agent) setApplications(await fetchDsaApplications(agent.id));
      else setApplications([]);
    } else {
      setApplications(await fetchLenderApplications());
    }

    setLoading(false);
  }, [user, mode]);

  useEffect(() => {
    load();
  }, [load]);

  const uploadDoc = async (applicationId: string, existing: LoanDocument[], doc: LoanDocument) => {
    await appendApplicationDocuments(applicationId, existing, doc);
    await load();
  };

  return { applications, loading, refetch: load, uploadDoc };
}

export function useLoanApplicationDetail(id: string | undefined) {
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchApplicationById(id).then((a) => {
      setApplication(a);
      setLoading(false);
    });
  }, [id]);

  return { application, loading };
}
