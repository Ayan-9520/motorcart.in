import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { FinanceSubpageShell } from "../components/FinanceSubpageShell";
import { BankIntegrationPanel } from "../components/BankIntegrationPanel";
import { FeaturedPartnerBanksStrip } from "../components/FeaturedPartnerBanksStrip";
import { fetchBankIntegrations } from "../services/finance.service";
import type { BankIntegrationConfig } from "../types";

export function FinanceIntegrationsPage() {
  const [configs, setConfigs] = useState<BankIntegrationConfig[]>([]);

  useEffect(() => {
    setPageMeta({
      title: "Bank integrations — Motorcart Finance",
      description: "Partner API connectivity for HDFC, ICICI, Axis, SBI, Chola & Tata Capital.",
    });
    void fetchBankIntegrations().then(setConfigs);
  }, []);

  return (
    <FinanceSubpageShell
      title="Bank integrations"
      subtitle="Live partner sync for loan origination, status webhooks & disbursement callbacks"
    >
      <div className="fin-integrations-hero mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-violet-500/10 to-primary/5 p-6">
        <Plug className="h-10 w-10 text-primary" />
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm text-muted-foreground">
            Motorcart connects to partner bank APIs for application push, document vault sync, and
            real-time approval updates.
          </p>
        </div>
        <Button className="rounded-full" asChild>
          <Link to="/finance/apply">
            Apply via partners <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <BankIntegrationPanel configs={configs} />
      <FeaturedPartnerBanksStrip />
    </FinanceSubpageShell>
  );
}
