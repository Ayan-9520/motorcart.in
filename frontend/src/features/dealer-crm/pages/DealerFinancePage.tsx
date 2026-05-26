import { useEffect, useState } from "react";
import { Landmark } from "lucide-react";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { useDealer } from "../hooks/useDealer";
import { fetchDealerFinanceStats } from "../services/dealer-enterprise.service";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";

export function DealerFinancePage() {
  const { dealer, loading } = useDealer();
  const [stats, setStats] = useState({ pending: 0, approved: 0, applications: [] as { id: string; status: string; loan_amount: number; created_at: string }[] });

  useEffect(() => {
    setPageMeta({ title: "Finance pipeline" });
    if (dealer) {
      void fetchDealerFinanceStats(dealer.id).then((data) =>
        setStats({
          pending: data.pending,
          approved: data.approved,
          applications: data.applications as {
            id: string;
            status: string;
            loan_amount: number;
            created_at: string;
          }[],
        })
      );
    }
  }, [dealer]);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <DealerConsoleShell
      title="Finance status"
      description="Loan applications linked to your inventory — track approval and disbursement."
      crumbs={[{ label: "Finance" }]}
    >
      <div className="dealer-os-stat-row">
        <div className="dealer-os-stat-tile">
          <Landmark className="h-5 w-5 text-primary" />
          <strong>{stats.pending}</strong>
          <span>In progress</span>
        </div>
        <div className="dealer-os-stat-tile">
          <strong>{stats.approved}</strong>
          <span>Approved / disbursed</span>
        </div>
      </div>

      <div className="dealer-os-card overflow-hidden">
        <table className="dealer-os-table">
          <thead>
            <tr>
              <th>Application</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.applications.map((a) => (
              <tr key={a.id}>
                <td className="font-mono text-xs">{a.id.slice(0, 8)}…</td>
                <td>{formatCurrency(a.loan_amount)}</td>
                <td>
                  <span className="dealer-os-pill">{a.status}</span>
                </td>
                <td className="text-muted-foreground">
                  {new Date(a.created_at).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
            {!stats.applications.length && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                  No finance applications on your listings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DealerConsoleShell>
  );
}
