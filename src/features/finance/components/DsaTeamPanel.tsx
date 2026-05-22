import { Mail, Phone, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DsaTeamMember } from "../data/dsa-desk-data";

interface DsaTeamPanelProps {
  members: DsaTeamMember[];
}

export function DsaTeamPanel({ members }: DsaTeamPanelProps) {
  return (
    <ul className="fin-dsa-team">
      {members.map((m) => (
        <li key={m.id} className="fin-dsa-team__card">
          <div className="fin-dsa-team__avatar">
            <UserCircle className="h-8 w-8 text-primary/70" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-sm">{m.name}</p>
              <span className={cn("fin-dsa-team__role", `fin-dsa-team__role--${m.role}`)}>{m.role}</span>
              <span
                className={cn(
                  "fin-dsa-team__status",
                  m.status === "active" ? "fin-dsa-team__status--on" : ""
                )}
              >
                {m.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-3 mt-1">
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3 w-3" /> {m.email}
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3 w-3" /> {m.phone}
              </span>
            </p>
            <p className="text-xs mt-2 tabular-nums">
              <strong>{m.activeLeads}</strong> active leads · <strong>{m.conversions}</strong> conversions
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
