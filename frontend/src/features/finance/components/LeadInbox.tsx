import { formatCurrency } from "@/lib/utils";
import type { FinanceLead } from "../types";
import { Button } from "@/components/ui/button";

interface LeadInboxProps {
  leads: FinanceLead[];
  onDistribute?: (leadId: string) => void;
  distributing?: string | null;
}

export function LeadInbox({ leads, onDistribute, distributing }: LeadInboxProps) {
  return (
    <ul className="fin-leads">
      {leads.length === 0 && (
        <li className="py-10 text-center text-sm text-muted-foreground">No finance leads in queue</li>
      )}
      {leads.map((lead) => (
        <li key={lead.id} className="fin-leads__row">
          <div>
            <p className="font-medium capitalize">{lead.source.replace(/_/g, " ")} · {lead.productType}</p>
            <p className="text-sm text-muted-foreground">
              {lead.loanAmount ? formatCurrency(lead.loanAmount) : "Amount TBD"}
              {lead.city ? ` · ${lead.city}` : ""}
              {lead.cibilScore ? ` · CIBIL ${lead.cibilScore}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`fin-leads__status fin-leads__status--${lead.status}`}>{lead.status}</span>
            {lead.status === "new" && onDistribute && (
              <Button
                size="sm"
                variant="outline"
                disabled={distributing === lead.id}
                onClick={() => onDistribute(lead.id)}
              >
                Assign DSA
              </Button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
