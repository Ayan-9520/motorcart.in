import { useEffect } from "react";
import { setPageMeta } from "@/utils/seo";
import { useFinanceDesk } from "../hooks/useFinanceDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { CommissionLedger } from "../components/CommissionLedger";

export function FinanceManagerCommissionsPage() {
  const { commissions } = useFinanceDesk("manager");

  useEffect(() => {
    setPageMeta({ title: "Commission ledger" });
  }, []);

  return (
    <FinanceDashboardShell variant="manager" title="Commission tracking" subtitle="DSA payouts on disbursement">
      <CommissionLedger commissions={commissions} />
    </FinanceDashboardShell>
  );
}
