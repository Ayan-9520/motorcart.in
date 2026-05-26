import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MessageSquare, Phone, Shield, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewCarDealerShell } from "../components/NewCarDealerShell";
import { fetchLeadDetail } from "../services/new-car-dealer.service";
import type { NcdLeadDetail } from "../types";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";

export function NewCarLeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<NcdLeadDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    void fetchLeadDetail(id).then(setLead);
    setPageMeta({ title: "Lead detail" });
  }, [id]);

  if (!lead) {
    return (
      <NewCarDealerShell title="Lead" crumbs={[{ label: "CRM", href: "/dashboard/new-car/leads" }]}>
        <p className="text-muted-foreground">Loading…</p>
      </NewCarDealerShell>
    );
  }

  return (
    <NewCarDealerShell
      title={lead.customerName}
      description={`${lead.city} · ${lead.source} · Score ${lead.score}`}
      crumbs={[
        { label: "CRM", href: "/dashboard/new-car/leads" },
        { label: lead.customerName },
      ]}
      actions={
        <Button className="rounded-xl" asChild>
          <Link to="/dashboard/new-car/whatsapp">
            <MessageSquare className="mr-1 h-4 w-4" /> WhatsApp
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="ncd-panel lg:col-span-2 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium">{lead.phone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Preferred car</p>
              <p className="font-medium">
                {lead.preferredBrand} {lead.preferredModel}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="font-medium">{lead.budgetMax ? formatCurrency(lead.budgetMax) : "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Trade-in</p>
              <p className="font-medium">{lead.tradeIn ?? "None"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Assigned</p>
              <p className="font-medium">{lead.assignedTo ?? "Unassigned"}</p>
            </div>
            <div className="flex gap-2">
              {lead.financeInterest ? (
                <Badge variant="secondary">
                  <Landmark className="mr-1 h-3 w-3" /> Finance
                </Badge>
              ) : null}
              {lead.insuranceInterest ? (
                <Badge variant="secondary">
                  <Shield className="mr-1 h-3 w-3" /> Insurance
                </Badge>
              ) : null}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Follow-up history</h3>
            <ul className="mt-2 space-y-2">
              {lead.followups.map((f) => (
                <li key={f.id} className="rounded-lg border border-border/70 bg-card/50 px-3 py-2 text-sm">
                  <span className="text-[10px] uppercase text-muted-foreground">{f.channel}</span>
                  <p>{f.note}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(f.at).toLocaleString("en-IN")}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="ncd-panel">
            <h3 className="font-semibold">Quick actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="outline" className="rounded-lg justify-start">
                <Phone className="mr-2 h-4 w-4" /> Call customer
              </Button>
              <Button variant="outline" className="rounded-lg justify-start" asChild>
                <Link to="/dashboard/new-car/test-drives">Schedule test drive</Link>
              </Button>
              <Button variant="outline" className="rounded-lg justify-start" asChild>
                <Link to="/finance/apply">Start finance</Link>
              </Button>
            </div>
          </div>
          <div className="ncd-panel">
            <p className="text-sm text-muted-foreground">WhatsApp messages</p>
            <p className="text-2xl font-bold">{lead.whatsappCount}</p>
          </div>
        </aside>
      </div>
    </NewCarDealerShell>
  );
}
