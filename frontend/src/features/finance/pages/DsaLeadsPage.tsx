import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { useDsaDesk } from "../hooks/useDsaDesk";
import { FinanceDashboardShell } from "../components/FinanceDashboardShell";
import { DsaWorkspaceNav } from "../components/DsaWorkspaceNav";
import { LeadInbox } from "../components/LeadInbox";
import { formatCurrency } from "@/lib/utils";
import { resolvePartnerBankName } from "../data/primary-partner-banks";

export function DsaLeadsPage() {
  const { leads, loading } = useDsaDesk();

  useEffect(() => {
    setPageMeta({ title: "DSA Lead CRM — Motorcart Finance" });
  }, []);

  return (
    <FinanceDashboardShell
      variant="dsa"
      title="Loan CRM — leads"
      subtitle="Inbound leads from marketplace, eligibility checker & dealer referrals"
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/finance/offers">Loan marketplace</Link>
        </Button>
      }
    >
      <DsaWorkspaceNav />

      {loading ? (
        <p className="text-muted-foreground">Loading leads…</p>
      ) : (
        <>
          <ul className="fin-dsa-lead-summary grid gap-3 sm:grid-cols-3 mb-6">
            <li className="fin-stat-card">
              <p className="fin-stat-card__label">New leads</p>
              <p className="fin-stat-card__value">{leads.filter((l) => l.status === "new").length}</p>
            </li>
            <li className="fin-stat-card">
              <p className="fin-stat-card__label">In progress</p>
              <p className="fin-stat-card__value">
                {leads.filter((l) => ["contacted", "qualified"].includes(l.status)).length}
              </p>
            </li>
            <li className="fin-stat-card">
              <p className="fin-stat-card__label">Pipeline value</p>
              <p className="fin-stat-card__value text-base">
                {formatCurrency(leads.reduce((s, l) => s + (l.loanAmount ?? 0), 0))}
              </p>
            </li>
          </ul>

          <section className="fin-section">
            <h2 className="fin-section__title">Lead inbox</h2>
            <LeadInbox leads={leads} />
          </section>

          <section className="fin-section">
            <h2 className="fin-section__title">Assigned banks</h2>
            <ul className="space-y-2">
              {leads.map((l) => (
                <li key={l.id} className="fin-leads__row">
                  <div>
                    <p className="font-medium text-sm">{l.city ?? "India"} · {l.source}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.loanAmount ? formatCurrency(l.loanAmount) : "—"} · CIBIL {l.cibilScore ?? "—"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    {resolvePartnerBankName(l.assignedBankId)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </FinanceDashboardShell>
  );
}
