import { useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadTable } from "../components/LeadTable";
import { LeadPipelineBoard } from "../components/LeadPipelineBoard";
import { LeadDetailPanel } from "../components/LeadDetailPanel";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { useDealer } from "../hooks/useDealer";
import { fetchDealerMembers } from "../services/dealer-enterprise.service";
import { updateLeadStatus } from "../services/crm.service";
import type { LeadWithMeta, TeamMember } from "../types";
import type { LeadStatus } from "@/types/database";
import { setPageMeta } from "@/utils/seo";
import toast from "react-hot-toast";

export function DealerLeadsPage() {
  const { dealer } = useDealer();
  const { leads, refetch } = useDealerCRM();
  const [view, setView] = useState<"pipeline" | "table">("pipeline");
  const [selected, setSelected] = useState<LeadWithMeta | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Lead CRM" });
    if (dealer) void fetchDealerMembers(dealer.id).then(setTeam);
  }, [dealer]);

  const onStatusChange = async (id: string, status: LeadStatus) => {
    try {
      await updateLeadStatus(id, status);
      toast.success("Stage updated");
      refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  };

  return (
    <DealerConsoleShell
      title="Lead CRM"
      description="Pipeline stages, callbacks, WhatsApp, notes and team assignment."
      crumbs={[{ label: "Leads" }]}
      actions={
        <div className="flex gap-1 rounded-lg border border-border p-0.5">
          <Button
            size="sm"
            variant={view === "pipeline" ? "default" : "ghost"}
            onClick={() => setView("pipeline")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={view === "table" ? "default" : "ghost"}
            onClick={() => setView("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      {view === "pipeline" ? (
        <div className="dealer-leads-layout">
          <LeadPipelineBoard
            leads={leads}
            selectedId={selected?.id}
            onSelect={setSelected}
            onStatusChange={(id, s) => void onStatusChange(id, s)}
          />
          <LeadDetailPanel
            lead={selected}
            dealerId={dealer?.id ?? ""}
            team={team}
            onUpdated={refetch}
          />
        </div>
      ) : (
        <LeadTable leads={leads} onStatusChange={(id, s) => void onStatusChange(id, s)} />
      )}
    </DealerConsoleShell>
  );
}
