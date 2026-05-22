import { useEffect } from "react";
import { setPageMeta } from "@/utils/seo";
import { useDsaDesk } from "../hooks/useDsaDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { DsaWorkspaceNav } from "../components/DsaWorkspaceNav";
import { DsaTeamPanel } from "../components/DsaTeamPanel";

export function DsaTeamPage() {
  const { team, loading } = useDsaDesk();

  useEffect(() => {
    setPageMeta({ title: "DSA Team — Motorcart Finance" });
  }, []);

  return (
    <FinanceDashboardShell
      variant="dsa"
      title="Team management"
      subtitle="DSA agents, conversion metrics & availability"
    >
      <DsaWorkspaceNav />
      {loading ? (
        <p className="text-muted-foreground">Loading team…</p>
      ) : (
        <DsaTeamPanel members={team} />
      )}
    </FinanceDashboardShell>
  );
}
