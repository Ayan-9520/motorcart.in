import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { BankIntegrationPanel } from "../components/BankIntegrationPanel";
import { FeaturedPartnerBanksStrip } from "../components/FeaturedPartnerBanksStrip";
import { fetchBankIntegrations } from "../services/finance.service";
import type { BankIntegrationConfig } from "../types";

export function FinanceManagerIntegrationsPage() {
  const [configs, setConfigs] = useState<BankIntegrationConfig[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Bank integrations — Finance OS" });
    void fetchBankIntegrations().then(setConfigs);
  }, []);

  return (
    <FinanceDashboardShell
      variant="manager"
      title="Bank integrations"
      subtitle="Partner API connectivity across HDFC, ICICI, Axis, SBI, Chola & Tata Capital"
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/finance-manager">Command center</Link>
        </Button>
      }
    >
      <BankIntegrationPanel configs={configs} />
      <FeaturedPartnerBanksStrip compact />
    </FinanceDashboardShell>
  );
}
