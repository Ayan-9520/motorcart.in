import { Link } from "react-router-dom";
import type { NcdLead, NcdLeadStage } from "../types";
import { NCD_LEAD_STAGES } from "../data/mock-ncd-data";
import { cn } from "@/lib/utils";

const STAGE_LABELS: Record<NcdLeadStage, string> = {
  new: "New",
  contacted: "Contacted",
  interested: "Interested",
  test_drive: "Test drive",
  negotiation: "Negotiation",
  finance: "Finance",
  booking: "Booking",
  delivered: "Delivered",
  lost: "Lost",
};

type NcdLeadPipelineProps = {
  leads: NcdLead[];
  compact?: boolean;
};

export function NcdLeadPipeline({ leads, compact }: NcdLeadPipelineProps) {
  const cols = compact
    ? (["new", "test_drive", "negotiation", "booking"] as NcdLeadStage[])
    : NCD_LEAD_STAGES.filter((s) => s !== "lost");

  return (
    <div className={cn("ncd-pipeline", compact && "ncd-pipeline--compact")}>
      {cols.map((stage) => {
        const items = leads.filter((l) => l.stage === stage);
        return (
          <div key={stage} className="ncd-pipeline__col">
            <p className="ncd-pipeline__head">
              {STAGE_LABELS[stage]}
              <span className="ml-1 rounded-full bg-slate-700 px-1.5 text-[10px]">{items.length}</span>
            </p>
            <div className="ncd-pipeline__cards">
              {items.slice(0, compact ? 2 : 4).map((l) => (
                <Link key={l.id} to={`/dashboard/new-car/leads/${l.id}`} className="ncd-pipeline__card">
                  <p className="font-medium text-sm">{l.customerName}</p>
                  <p className="text-[10px] text-slate-400">{l.preferredModel ?? "—"} · {l.source}</p>
                  <p className="text-[10px] text-emerald-400">Score {l.score}</p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
