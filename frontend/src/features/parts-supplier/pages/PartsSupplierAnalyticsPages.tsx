import { useEffect, type ReactNode } from "react";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { setPageMeta } from "@/utils/seo";

const MONTHLY = [62, 71, 68, 78, 82, 88, 94];

function AnalyticsShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  useEffect(() => setPageMeta({ title }), [title]);
  return (
    <PartsSupplierShell title={title} description={description}>
      <div className="psp-panel mb-6">
        <p className="text-sm text-slate-400">Last 7 weeks (₹ Lakhs)</p>
        <div className="psp-chart-bars mt-2">
          {MONTHLY.map((v, i) => (
            <div
              key={i}
              className="psp-chart-bar"
              style={{ height: `${v}%` }}
              title={`Week ${i + 1}`}
            />
          ))}
        </div>
      </div>
      {children}
    </PartsSupplierShell>
  );
}

export function PartsSupplierAnalyticsRevenuePage() {
  return (
    <AnalyticsShell title="Revenue analytics" description="MTD GMV · B2B vs retail · settlements">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="psp-panel">
          <p className="text-xs text-slate-500">B2B share</p>
          <p className="text-2xl font-bold text-green-400">68%</p>
        </div>
        <div className="psp-panel">
          <p className="text-xs text-slate-500">Cancellation</p>
          <p className="text-2xl font-bold">2.1%</p>
        </div>
        <div className="psp-panel">
          <p className="text-xs text-slate-500">Return ratio</p>
          <p className="text-2xl font-bold">1.4%</p>
        </div>
      </div>
    </AnalyticsShell>
  );
}

export function PartsSupplierAnalyticsProductsPage() {
  return (
    <AnalyticsShell title="Product analytics" description="SKU trends · category mix">
      <p className="text-sm text-slate-400">Top: Brake pads · Lubricants · Batteries</p>
    </AnalyticsShell>
  );
}

export function PartsSupplierAnalyticsWarehousePage() {
  return (
    <AnalyticsShell title="Warehouse analytics" description="Utilization · pick rate · SLA">
      <p className="text-sm text-slate-400">Okhla 82% · Bhiwadi 71% utilization</p>
    </AnalyticsShell>
  );
}

export function PartsSupplierAnalyticsCustomersPage() {
  return (
    <AnalyticsShell title="Customer analytics" description="Repeat % · outstanding · LTV">
      <p className="text-sm text-slate-400">186 repeat B2B buyers this month</p>
    </AnalyticsShell>
  );
}

export function PartsSupplierAnalyticsSkuPage() {
  return (
    <AnalyticsShell title="SKU performance" description="Fast / slow / dead movers">
      <p className="text-sm text-green-400">Fast: Bosch Brake Pad — Creta</p>
    </AnalyticsShell>
  );
}

/** Legacy /dashboard/parts/analytics */
export function PartsSupplierAnalyticsHubPage() {
  return <PartsSupplierAnalyticsRevenuePage />;
}
