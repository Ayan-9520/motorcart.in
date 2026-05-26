import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  CreditCard,
  MapPin,
  Plug,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { usePartsSupplierOS } from "../hooks/usePartsSupplierOS";
import { setPageMeta } from "@/utils/seo";
import { Button } from "@/components/ui/button";

export function PartsSupplierProfilePage() {
  const { user } = useAuth();
  const { data } = usePartsSupplierOS();

  useEffect(() => setPageMeta({ title: "Business profile" }), []);

  const p = data?.profile;

  return (
    <PartsSupplierShell title="Business profile" description="Enterprise supplier identity · KYC · logistics · APIs">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="psp-glass-card">
          <h3 className="psp-panel__title flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            Business profile
          </h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Company</dt>
              <dd className="text-right font-medium">{p?.businessName ?? user?.companyName ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">GSTIN</dt>
              <dd className="flex items-center gap-1">
                {p?.gstin ?? "Pending"}
                {p?.isGstVerified ? (
                  <span className="psp-badge psp-badge--success">Verified</span>
                ) : null}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">City</dt>
              <dd>{p?.city ?? user?.city ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Tier</dt>
              <dd className="capitalize">{p?.tier?.replace(/_/g, " ") ?? "standard"}</dd>
            </div>
          </dl>
          <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
            <Link to="/dashboard/parts/kyc">Manage KYC</Link>
          </Button>
        </section>

        <section className="psp-glass-card">
          <h3 className="psp-panel__title flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            GST & verification
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            GSTR-ready invoicing · e-invoice IRN · supplier verification badge on storefront.
          </p>
          <Button className="mt-3 rounded-xl border-primary/30" variant="outline" asChild>
            <Link to="/dashboard/parts/finance/invoices">View invoices</Link>
          </Button>
        </section>

        <section className="psp-glass-card">
          <h3 className="psp-panel__title flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Warehouses & pickup
          </h3>
          <ul className="mt-2 space-y-2 text-sm">
            {(data?.warehouses ?? []).map((w) => (
              <li key={w.id} className="flex justify-between border-b border-border/50 py-2 last:border-0">
                <span>{w.name}</span>
                <span className="text-muted-foreground">
                  {w.city} · {w.utilizationPct}%
                </span>
              </li>
            ))}
          </ul>
          <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
            <Link to="/dashboard/parts/warehouses">Edit locations</Link>
          </Button>
        </section>

        <section className="psp-glass-card">
          <h3 className="psp-panel__title flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            Logistics settings
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Default couriers: BlueDart, Delhivery · 24h dispatch SLA · RTO handling enabled.
          </p>
          <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
            <Link to="/dashboard/parts/logistics/couriers">Courier partners</Link>
          </Button>
        </section>

        <section className="psp-glass-card">
          <h3 className="psp-panel__title flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            Banking & settlements
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Settlement account · payout calendar · TDS configuration.
          </p>
          <Button variant="outline" className="mt-3 rounded-xl border-primary/30" asChild>
            <Link to="/dashboard/parts/finance/settlements">Settlements</Link>
          </Button>
        </section>

        <section className="psp-glass-card">
          <h3 className="psp-panel__title flex items-center gap-2">
            <Plug className="h-4 w-4 text-primary" />
            API integrations
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Webhooks for orders · WhatsApp Business API · ERPNext sync (coming soon).
          </p>
          <Button variant="outline" size="sm" className="mt-3 rounded-lg">
            Generate API key
          </Button>
        </section>

        <section className="psp-glass-card lg:col-span-2">
          <h3 className="psp-panel__title flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-primary" />
            Return policy
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            7-day defective returns · B2B credit note workflow · RTO on courier damage · QC on
            high-value SKUs.
          </p>
        </section>
      </div>
    </PartsSupplierShell>
  );
}
