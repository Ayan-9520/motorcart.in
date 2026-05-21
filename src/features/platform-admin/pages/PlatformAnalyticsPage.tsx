import { useEffect, useState } from "react";
import { setPageMeta } from "@/utils/seo";
import { fetchPlatformAnalytics } from "../services/platform-admin.service";
import type { PlatformAnalytics } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";

export function PlatformAnalyticsPage() {
  const [data, setData] = useState<PlatformAnalytics | null>(null);

  useEffect(() => {
    setPageMeta({ title: "Analytics — Super Admin" });
    void fetchPlatformAnalytics().then(setData);
  }, []);

  if (!data) {
    return (
      <SuperAdminShell title="Analytics">
        <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
      </SuperAdminShell>
    );
  }

  const maxSignup = Math.max(...data.signups.map((p) => p.value), 1);

  return (
    <SuperAdminShell title="Analytics" description="Signups, revenue proxy, conversion, and churn.">
      <div className="sa-metrics-row">
        <div className="sa-metric-pill">
          <span className="sa-metric-pill__label">Conversion</span>
          <span className="sa-metric-pill__value">{data.conversionRate}%</span>
        </div>
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
        <div className="sa-bar-chart sa-bar-chart--revenue">
          {data.revenue.map((p) => (
            <div key={p.label} className="sa-bar-chart__item">
              <div className="sa-bar-chart__bar" style={{ height: `${Math.min(100, p.value * 4)}%` }} />
              <span className="sa-bar-chart__label">{p.label}</span>
            </div>
          ))}
        </div>
      </section>
    </SuperAdminShell>
  );
}
