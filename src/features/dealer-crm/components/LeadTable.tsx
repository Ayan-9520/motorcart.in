import { Phone, MessageCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { LeadWithMeta } from "../types";
import type { LeadStatus } from "@/types/database";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-primary/15 text-primary",
  contacted: "bg-card text-muted-foreground",
  qualified: "bg-[#f59e0b]/15 text-[#f59e0b]",
  converted: "bg-primary/20 text-primary",
  lost: "bg-muted text-muted-foreground",
};

interface LeadTableProps {
  leads: LeadWithMeta[];
  onStatusChange?: (id: string, status: LeadStatus) => void;
}

export function LeadTable({ leads, onStatusChange }: LeadTableProps) {
  if (!leads.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">No leads yet. They will appear from website enquiries.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="p-3 text-left font-medium">Lead</th>
            <th className="p-3 text-left font-medium">Type</th>
            <th className="p-3 text-left font-medium">Source</th>
            <th className="p-3 text-left font-medium">AI Score</th>
            <th className="p-3 text-left font-medium">Status</th>
            <th className="p-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t hover:bg-background">
              <td className="p-3">
                <p className="font-medium">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{lead.phone}</p>
              </td>
              <td className="p-3 capitalize">{lead.type.replace("_", " ")}</td>
              <td className="p-3">{lead.source}</td>
              <td className="p-3">
                {lead.aiScore != null ? (
                  <span className="font-semibold text-primary">{lead.aiScore}%</span>
                ) : (
                  "—"
                )}
              </td>
              <td className="p-3">
                <select
                  value={lead.status}
                  onChange={(e) => onStatusChange?.(lead.id, e.target.value as LeadStatus)}
                  className={cn("rounded-full border-0 px-2 py-1 text-xs font-medium", STATUS_COLORS[lead.status])}
                >
                  {(["new", "contacted", "qualified", "converted", "lost"] as LeadStatus[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="p-3">
                <div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                    <a href={`tel:${lead.phone}`}><Phone className="h-4 w-4" /></a>
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" asChild>
                    <a
                      href={`https://wa.me/91${lead.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
