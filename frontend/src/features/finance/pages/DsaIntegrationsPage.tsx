import { useEffect, useState } from "react";
import { setPageMeta } from "@/utils/seo";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { DsaWorkspaceNav } from "../components/DsaWorkspaceNav";
import { BankIntegrationPanel } from "../components/BankIntegrationPanel";
import { FeaturedPartnerBanksStrip } from "../components/FeaturedPartnerBanksStrip";
import { fetchBankIntegrations } from "../services/finance.service";
import type { BankIntegrationConfig } from "../types";

export function DsaIntegrationsPage() {
  const [configs, setConfigs] = useState<BankIntegrationConfig[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Bank integrations — DSA" });
    void fetchBankIntegrations().then(setConfigs);
  }, []);

  return (
    <FinanceDashboardShell
      variant="dsa"
      title="Bank integrations"
      subtitle="HDFC · ICICI · Axis · SBI · Chola · Tata Capital — API & webhook status"
    >
      <DsaWorkspaceNav />
      <BankIntegrationPanel configs={configs} />
      <FeaturedPartnerBanksStrip compact />
    </FinanceDashboardShell>
  );
}
