import { useEffect, useState } from "react";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { fetchRevenueAnalytics } from "../services/platform-admin.service";
import type { RevenueAnalytics } from "../types";
import { AdminErpShell } from "../components/AdminErpShell";
import { SuperAdminStatGrid } from "../components/SuperAdminStatGrid";
import { IndianRupee, Percent, TrendingUp } from "lucide-react";

export function PlatformAnalyticsPage() {
  const [data, setData] = useState<RevenueAnalytics | null>(null);

  useEffect(() => {
    setPageMeta({ title: "Revenue analytics — Admin ERP" });
    void fetchRevenueAnalytics().then(setData);
  }, []);

  if (!data) {
    return (
      <AdminErpShell title="Revenue analytics">
        <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
      </AdminErpShell>
    );
  }

  const maxSignup = Math.max(...data.signups.map((p) => p.value), 1);

  return (
    <AdminErpShell
      title="Revenue analytics"
      description="GMV, MRR, loan disbursements, subscriptions, and growth — executive dashboard."
    >
      <SuperAdminStatGrid
        stats={[
          { label: "GMV (est.)", value: data.gmvTotal, format: "currency", icon: IndianRupee },
          { label: "MRR", value: data.mrr, format: "currency", icon: TrendingUp },
          { label: "Loans disbursed", value: data.loanDisbursed, format: "currency" },
          { label: "Subscriptions", value: data.subscriptionRevenue, format: "currency" },
          { label: "Auction fees", value: data.auctionFees, format: "currency" },
          { label: "Conversion", value: `${data.conversionRate}%`, icon: Percent },
        ]}
      />

      <div className="sa-metrics-row">
        <div className="sa-metric-pill">
          <span className="sa-metric-pill__label">Churn</span>
          <span className="sa-metric-pill__value">{data.churnRate}%</span>
        </div>
      </div>

      <section className="sa-section">
        <h2 className="sa-section__title">Monthly signups</h2>
        <div className="sa-bar-chart">
          {data.signups.map((p) => (
            <div key={p.label} className="sa-bar-chart__item">
              <div
                className="sa-bar-chart__bar"
                style={{ height: `${Math.round((p.value / maxSignup) * 100)}%` }}
                title={String(p.value)}
              />
              <span className="sa-bar-chart__label">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sa-section">
        <h2 className="sa-section__title">Revenue index (₹L)</h2>
        <p className="text-xs text-muted-foreground mb-2">Blended: loans + subscriptions + auctions</p>
        <div className="sa-bar-chart sa-bar-chart--revenue">
          {data.revenue.map((p) => (
            <div key={p.label} className="sa-bar-chart__item">
              <div className="sa-bar-chart__bar erp-bar--revenue" style={{ height: `${Math.min(100, p.value * 4)}%` }} />
              <span className="sa-bar-chart__label">{p.label}</span>
              <span className="text-[10px] text-muted-foreground">{formatCurrency(p.value * 100000)}</span>
            </div>
          ))}
        </div>
      </section>
    </AdminErpShell>
  );
}
