import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LeadWithMeta } from "../types";
import type { LeadStatus } from "@/types/database";

const STAGES: { id: LeadStatus; label: string; color: string }[] = [
  { id: "new", label: "New leads", color: "border-primary/40 bg-primary/5" },
  { id: "contacted", label: "Follow-up", color: "border-amber-500/30 bg-amber-500/5" },
  { id: "qualified", label: "Qualified", color: "border-amber-500/20 bg-amber-500/5" },
  { id: "converted", label: "Closed", color: "border-primary/50 bg-primary/10" },
  { id: "lost", label: "Lost", color: "border-border bg-muted/40" },
];

type LeadPipelineBoardProps = {
  leads: LeadWithMeta[];
  onSelect: (lead: LeadWithMeta) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  selectedId?: string;
};

export function LeadPipelineBoard({
  leads,
  onSelect,
  onStatusChange,
  selectedId,
}: LeadPipelineBoardProps) {
  return (
    <div className="dealer-pipeline">
      {STAGES.map((stage) => {
        const column = leads.filter((l) => l.status === stage.id);
        return (
          <div key={stage.id} className={cn("dealer-pipeline-col", stage.color)}>
            <div className="dealer-pipeline-col-head">
              <span className="font-semibold text-sm">{stage.label}</span>
              <span className="dealer-pipeline-count">{column.length}</span>
            </div>
            <div className="dealer-pipeline-cards">
              {column.map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => onSelect(lead)}
                  className={cn(
                    "dealer-pipeline-card text-left",
                    selectedId === lead.id && "dealer-pipeline-card-active"
                  )}
                >
                  <p className="font-medium text-sm line-clamp-1">{lead.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{lead.phone}</p>
                  {lead.aiScore != null && (
                    <span className="dealer-pipeline-score">{lead.aiScore}% AI</span>
                  )}
                  <div className="dealer-pipeline-card-actions" onClick={(e) => e.stopPropagation()}>
                    <Button size="icon" variant="ghost" className="h-7 w-7" asChild>
                      <a href={`tel:${lead.phone}`}>
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-primary" asChild>
                      <a
                        href={`https://wa.me/91${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <select
                      className="dealer-pipeline-move"
                      value={lead.status}
                      onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                      aria-label="Move stage"
                    >
                      {STAGES.map((s) => (
                        <option key={s.id} value={s.id}>
                          → {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </button>
              ))}
              {!column.length && (
                <p className="dealer-pipeline-empty">No leads</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
