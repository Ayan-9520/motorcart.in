import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  MessageCircle,
  Package,
  Send,
  Store,
  Warehouse,
  FileText,
  Zap,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { PsEnterpriseTable } from "../components/PsEnterpriseTable";
import { PsModulePlaceholder } from "../components/PsModulePlaceholder";
import { usePartsSupplierOS } from "../hooks/usePartsSupplierOS";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  MOCK_RFQS,
  MOCK_INVOICES,
  MOCK_POS,
  MOCK_DISPATCH,
  MOCK_RACKS,
  MOCK_LOW_STOCK,
  MOCK_DEAD_STOCK,
  MOCK_WHATSAPP,
  MOCK_CATEGORIES,
  MOCK_BRANDS,
  MOCK_AUTOMATION_RULES,
} from "../data/mock-ps-modules";
import type { PsB2bCustomer, PsSupplierOrder } from "../types";

function statusBadge(status: string) {
  const map: Record<string, string> = {
    open: "psp-badge--warning",
    negotiating: "psp-badge--warning",
    quoted: "psp-badge--success",
    won: "psp-badge--success",
    lost: "psp-badge--danger",
    pick: "psp-badge--warning",
    pack: "psp-badge--warning",
    ready: "psp-badge--success",
    paid: "psp-badge--success",
    pending: "psp-badge--warning",
    sent: "psp-badge--success",
    partial: "psp-badge--warning",
    draft: "psp-badge",
  };
  return <span className={cn("psp-badge", map[status] ?? "")}>{status}</span>;
}

/* ——— Inventory & WMS ——— */

export function PartsSupplierWarehousesPage() {
  const { data } = usePartsSupplierOS();
  useEffect(() => setPageMeta({ title: "Warehouses" }), []);

  return (
    <PartsSupplierShell title="Warehouses" description="Multi-location WMS — zones, utilization & SKU mapping">
      <div className="grid gap-4 md:grid-cols-2">
        {(data?.warehouses ?? []).map((w) => (
          <article key={w.id} className="psp-glass-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="psp-icon-chip">
                  <Warehouse className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{w.name}</h3>
                  <p className="text-sm text-muted-foreground">{w.city}</p>
                </div>
              </div>
              <span className="psp-badge psp-badge--success">{w.utilizationPct}% util.</span>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <dt className="text-muted-foreground">SKUs</dt>
                <dd className="font-bold text-primary">{w.skuCount}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Low stock</dt>
                <dd className="font-bold text-amber-600 dark:text-amber-400">{w.lowStock}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Zones</dt>
                <dd className="font-bold">A–C</dd>
              </div>
            </dl>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-400"
                style={{ width: `${w.utilizationPct}%` }}
              />
            </div>
            <Button variant="outline" size="sm" className="mt-4 rounded-lg border-primary/30" asChild>
              <Link to="/dashboard/parts/racks">Rack management</Link>
            </Button>
          </article>
        ))}
      </div>
    </PartsSupplierShell>
  );
}

export function PartsSupplierRacksPage() {
  useEffect(() => setPageMeta({ title: "Rack management" }), []);
  return (
    <PartsSupplierShell title="Rack management" description="Bins · racks · pick paths">
      <PsEnterpriseTable
        rows={MOCK_RACKS}
        rowKey={(r) => r.id}
        columns={[
          { key: "wh", header: "Warehouse", cell: (r) => r.warehouse },
          { key: "zone", header: "Zone", cell: (r) => r.zone },
          { key: "rack", header: "Rack", cell: (r) => <span className="font-mono">{r.rack}</span> },
          { key: "bin", header: "Bin", cell: (r) => r.bin },
          { key: "sku", header: "SKU", cell: (r) => <span className="font-mono text-xs">{r.sku}</span> },
          { key: "qty", header: "Qty", cell: (r) => r.qty },
        ]}
      />
    </PartsSupplierShell>
  );
}

export function PartsSupplierLowStockPage() {
  useEffect(() => setPageMeta({ title: "Low stock" }), []);
  return (
    <PartsSupplierShell
      title="Low stock alerts"
      description="Auto alerts · MOQ · procurement suggestions"
      actions={
        <Button className="rounded-xl bg-green-600 hover:bg-green-500" asChild>
          <Link to="/dashboard/parts/procurement/po">Create PO</Link>
        </Button>
      }
    >
      <PsEnterpriseTable
        rows={MOCK_LOW_STOCK}
        rowKey={(r) => r.sku}
        columns={[
          { key: "sku", header: "SKU", cell: (r) => <span className="font-mono text-xs">{r.sku}</span> },
          { key: "name", header: "Product", cell: (r) => r.name },
          { key: "brand", header: "Brand", cell: (r) => r.brand },
          { key: "stock", header: "Stock", cell: (r) => <span className="text-amber-600 dark:text-amber-400 font-semibold">{r.stock}</span> },
          { key: "moq", header: "MOQ", cell: (r) => r.moq },
          { key: "days", header: "Est. days", cell: (r) => `${r.daysLeft}d` },
          { key: "wh", header: "Warehouse", cell: (r) => r.warehouse },
        ]}
      />
    </PartsSupplierShell>
  );
}

export function PartsSupplierDeadStockPage() {
  useEffect(() => setPageMeta({ title: "Dead stock" }), []);
  return (
    <PartsSupplierShell title="Dead stock" description="Aging inventory · clearance & B2B RFQ">
      <PsEnterpriseTable
        rows={MOCK_DEAD_STOCK}
        rowKey={(r) => r.sku}
        columns={[
          { key: "sku", header: "SKU", cell: (r) => <span className="font-mono text-xs">{r.sku}</span> },
          { key: "name", header: "Product", cell: (r) => r.name },
          { key: "qty", header: "Qty", cell: (r) => r.qty },
          { key: "age", header: "Aging", cell: (r) => `${r.daysAging} days` },
          { key: "val", header: "Value", cell: (r) => formatCurrency(r.value) },
          { key: "sug", header: "AI suggestion", cell: (r) => <span className="text-primary text-xs">{r.suggestion}</span> },
        ]}
      />
    </PartsSupplierShell>
  );
}

/* ——— Orders & dispatch ——— */

export function PartsSupplierDispatchPage() {
  const { data } = usePartsSupplierOS();
  useEffect(() => setPageMeta({ title: "Dispatch center" }), []);

  return (
    <PartsSupplierShell
      title="Dispatch center"
      description={`${data?.pendingDispatch ?? 0} orders pending — pick · pack · ship SLA`}
      actions={
        <Button variant="outline" className="rounded-xl border-primary/30" asChild>
          <Link to="/dashboard/parts/logistics/labels">Print labels</Link>
        </Button>
      }
    >
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        {(["pick", "pack", "ready"] as const).map((stage) => {
          const count = MOCK_DISPATCH.filter((d) => d.status === stage).length;
          return (
            <div key={stage} className="psp-glass-card text-center">
              <p className="text-xs uppercase text-muted-foreground">{stage}</p>
              <p className="text-2xl font-bold text-primary">{count}</p>
            </div>
          );
        })}
      </div>
      <PsEnterpriseTable
        rows={MOCK_DISPATCH}
        rowKey={(r) => r.id}
        columns={[
          { key: "ord", header: "Order", cell: (r) => <Link to={`/dashboard/parts/orders/${r.id}`} className="font-mono text-primary hover:underline">{r.orderNo}</Link> },
          { key: "cust", header: "Customer", cell: (r) => r.customer },
          { key: "wh", header: "Warehouse", cell: (r) => r.warehouse },
          { key: "items", header: "Lines", cell: (r) => r.items },
          { key: "sla", header: "SLA", cell: (r) => `${r.slaHours}h` },
          { key: "pri", header: "Priority", cell: (r) => (r.priority === "high" ? <span className="text-amber-600 dark:text-amber-400">High</span> : "Normal") },
          { key: "st", header: "Stage", cell: (r) => statusBadge(r.status) },
        ]}
      />
    </PartsSupplierShell>
  );
}

function OrdersByStagePage({ stage, title, desc }: { stage?: string; title: string; desc: string }) {
  const { data } = usePartsSupplierOS();

  const filtered = useMemo(() => {
    const orders = data?.orders ?? [];
    if (!stage) return orders;
    const map: Record<string, string[]> = {
      new: ["pending"],
      processing: ["confirmed"],
      packed: ["packed"],
      dispatched: ["shipped"],
      delivered: ["delivered"],
      returns: ["return_requested"],
      cancelled: ["cancelled"],
    };
    const statuses = map[stage];
    if (!statuses) return orders;
    return orders.filter((o) => statuses.includes(o.status));
  }, [data?.orders, stage]);

  useEffect(() => setPageMeta({ title }), [title]);

  return (
    <PartsSupplierShell title={title} description={desc}>
      <OrderTable rows={filtered} />
    </PartsSupplierShell>
  );
}

function OrderTable({ rows }: { rows: PsSupplierOrder[] }) {
  return (
    <PsEnterpriseTable
      rows={rows}
      rowKey={(o) => o.id}
      empty="No orders in this stage"
      columns={[
        { key: "no", header: "Order", cell: (o) => <Link to={`/dashboard/parts/orders/${o.id}`} className="font-mono text-primary hover:underline">{o.orderNo}</Link> },
        { key: "cust", header: "Customer", cell: (o) => o.customerName },
        { key: "type", header: "Type", cell: (o) => o.customerType },
        { key: "city", header: "City", cell: (o) => o.city },
        { key: "total", header: "Total", cell: (o) => formatCurrency(o.grandTotal) },
        { key: "st", header: "Status", cell: (o) => statusBadge(o.status) },
      ]}
    />
  );
}

export function PartsSupplierOrdersFilteredPage() {
  const path = useLocation().pathname;
  const stage = path.includes("/orders/new")
    ? "new"
    : path.includes("/processing")
      ? "processing"
      : path.includes("/returns")
        ? "returns"
        : undefined;
  const titles: Record<string, string> = {
    new: "New orders",
    processing: "Processing",
    returns: "Returns",
  };
  return (
    <OrdersByStagePage
      stage={stage}
      title={stage ? titles[stage] : "All orders"}
      desc="Amazon-style order pipeline"
    />
  );
}

export function PartsSupplierOrdersPackedPage() {
  return <OrdersByStagePage stage="packed" title="Packed orders" desc="Ready for dispatch — QC complete" />;
}

export function PartsSupplierOrdersDispatchedPage() {
  return <OrdersByStagePage stage="dispatched" title="Dispatched" desc="In transit — AWB generated" />;
}

export function PartsSupplierOrdersDeliveredPage() {
  return <OrdersByStagePage stage="delivered" title="Delivered" desc="Completed deliveries & POD" />;
}

export function PartsSupplierOrdersCancelledPage() {
  return <OrdersByStagePage stage="cancelled" title="Cancelled" desc="Cancelled & failed orders" />;
}

/* ——— B2B CRM ——— */

function CrmTable({ customers, typeLabel }: { customers: PsB2bCustomer[]; typeLabel: string }) {
  return (
    <PsEnterpriseTable
      rows={customers}
      rowKey={(c) => c.id}
      columns={[
        { key: "name", header: typeLabel, cell: (c) => <span className="font-medium">{c.name}</span> },
        { key: "city", header: "City", cell: (c) => c.city },
        { key: "orders", header: "Orders MTD", cell: (c) => c.ordersMtd },
        {
          key: "out",
          header: "Outstanding",
          cell: (c) => (
            <span className={c.outstanding > 0 ? "text-amber-600 dark:text-amber-400" : ""}>
              {formatCurrency(c.outstanding)}
            </span>
          ),
        },
        {
          key: "act",
          header: "",
          cell: () => (
            <Button size="sm" variant="ghost" className="text-primary" asChild>
              <Link to="/dashboard/parts/whatsapp">WhatsApp</Link>
            </Button>
          ),
        },
      ]}
    />
  );
}

export function PartsSupplierCrmDealersPage() {
  const { data } = usePartsSupplierOS();
  useEffect(() => setPageMeta({ title: "Dealer CRM" }), []);
  const dealers = (data?.b2bCustomers ?? []).filter((c) => c.type === "dealer");
  return (
    <PartsSupplierShell title="Dealer CRM" description="Credit limits · price lists · purchase history">
      <CrmTable customers={dealers.length ? dealers : data?.b2bCustomers ?? []} typeLabel="Dealer" />
    </PartsSupplierShell>
  );
}

export function PartsSupplierCrmGaragesPage() {
  const { data } = usePartsSupplierOS();
  useEffect(() => setPageMeta({ title: "Garages" }), []);
  const garages = (data?.b2bCustomers ?? []).filter((c) => c.type === "garage");
  return (
    <PartsSupplierShell title="Garages & workshops" description="Repeat B2B · RFQ · WhatsApp reorder">
      <CrmTable customers={garages.length ? garages : data?.b2bCustomers ?? []} typeLabel="Garage" />
    </PartsSupplierShell>
  );
}

export function PartsSupplierCrmRepeatPage() {
  const { data } = usePartsSupplierOS();
  useEffect(() => setPageMeta({ title: "Repeat buyers" }), []);
  const sorted = [...(data?.b2bCustomers ?? [])].sort((a, b) => b.ordersMtd - a.ordersMtd);
  return (
    <PartsSupplierShell title="Repeat buyers" description="LTV · frequency · churn risk">
      <CrmTable customers={sorted} typeLabel="Account" />
    </PartsSupplierShell>
  );
}

export function PartsSupplierRfqPage() {
  useEffect(() => setPageMeta({ title: "RFQ" }), []);
  return (
    <PartsSupplierShell
      title="Quotations (RFQ)"
      description="Bulk negotiate · counter offers · PDF quotes"
      actions={
        <Button className="rounded-xl bg-green-600 hover:bg-green-500">Export quotes</Button>
      }
    >
      <PsEnterpriseTable
        rows={MOCK_RFQS}
        rowKey={(r) => r.id}
        columns={[
          { key: "ref", header: "RFQ", cell: (r) => <span className="font-mono text-primary">{r.ref}</span> },
          { key: "buyer", header: "Buyer", cell: (r) => r.buyer },
          { key: "type", header: "Type", cell: (r) => r.buyerType },
          { key: "city", header: "City", cell: (r) => r.city },
          { key: "lines", header: "Lines", cell: (r) => r.lines },
          { key: "val", header: "Value", cell: (r) => formatCurrency(r.value) },
          { key: "st", header: "Status", cell: (r) => statusBadge(r.status) },
        ]}
      />
    </PartsSupplierShell>
  );
}

/* ——— Finance & procurement ——— */

export function PartsSupplierInvoicesPage() {
  useEffect(() => setPageMeta({ title: "GST invoices" }), []);
  return (
    <PartsSupplierShell title="GST invoices" description="GSTR-ready · e-invoice · credit notes">
      <PsEnterpriseTable
        rows={MOCK_INVOICES}
        rowKey={(r) => r.id}
        columns={[
          { key: "inv", header: "Invoice", cell: (r) => <span className="font-mono">{r.invoiceNo}</span> },
          { key: "ord", header: "Order", cell: (r) => r.orderNo },
          { key: "buyer", header: "Buyer", cell: (r) => r.buyer },
          { key: "amt", header: "Amount", cell: (r) => formatCurrency(r.amount) },
          { key: "gst", header: "GST", cell: (r) => formatCurrency(r.gst) },
          { key: "st", header: "Status", cell: (r) => statusBadge(r.status) },
          { key: "date", header: "Date", cell: (r) => r.date },
        ]}
      />
    </PartsSupplierShell>
  );
}

export function PartsSupplierPoPage() {
  useEffect(() => setPageMeta({ title: "Purchase orders" }), []);
  return (
    <PartsSupplierShell
      title="Purchase orders"
      description="Inbound procurement · GRN · vendor costs"
      actions={
        <Button className="rounded-xl bg-green-600 hover:bg-green-500">New PO</Button>
      }
    >
      <PsEnterpriseTable
        rows={MOCK_POS}
        rowKey={(r) => r.id}
        columns={[
          { key: "po", header: "PO", cell: (r) => <span className="font-mono text-primary">{r.poNo}</span> },
          { key: "vendor", header: "Vendor", cell: (r) => r.vendor },
          { key: "items", header: "Items", cell: (r) => r.items },
          { key: "amt", header: "Amount", cell: (r) => formatCurrency(r.amount) },
          { key: "eta", header: "ETA", cell: (r) => r.eta },
          { key: "st", header: "Status", cell: (r) => statusBadge(r.status) },
        ]}
      />
    </PartsSupplierShell>
  );
}

/* ——— WhatsApp & storefront ——— */

export function PartsSupplierWhatsAppPage() {
  useEffect(() => setPageMeta({ title: "WhatsApp commerce" }), []);
  return (
    <PartsSupplierShell title="WhatsApp commerce" description="Reorder · invoice · quotation · catalogue share">
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Quick reorder", icon: Package },
          { label: "Send invoice", icon: FileText },
          { label: "Send quotation", icon: Send },
          { label: "Share catalogue", icon: Store },
        ].map(({ label, icon: Icon }) => (
          <button key={label} type="button" className="psp-action-tile">
            <Icon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {MOCK_WHATSAPP.map((t) => (
          <li key={t.id} className="psp-glass-card flex items-center gap-4">
            <span className="psp-icon-chip">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{t.contact}</p>
              <p className="truncate text-sm text-muted-foreground">{t.lastMessage}</p>
            </div>
            <span className="text-xs text-muted-foreground">{t.lastAt}</span>
            {t.unread > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {t.unread}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </PartsSupplierShell>
  );
}

export function PartsSupplierStorefrontPage() {
  useEffect(() => setPageMeta({ title: "Public storefront" }), []);
  return (
    <PartsSupplierShell title="Public storefront" description="SEO catalogue · RFQ · verified supplier badge">
      <div className="psp-glass-card max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="psp-icon-chip">
            <Store className="h-6 w-6" />
          </span>
          <div>
            <p className="font-semibold">autopartshub.motorcart.in</p>
            <p className="flex items-center gap-1 text-sm text-primary">
              <ShieldCheck className="h-4 w-4" /> GST verified · 4.8★ reviews
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Public B2B catalogue with WhatsApp enquiry, bulk RFQ form, and dealer verification badge.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button className="rounded-xl bg-green-600 hover:bg-green-500" asChild>
            <a href="/parts" target="_blank" rel="noreferrer">
              Preview storefront <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" className="rounded-xl border-primary/30">
            Edit SEO pages
          </Button>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {["Product catalogue", "Bulk RFQ form", "WhatsApp CTA"].map((f) => (
          <div key={f} className="psp-feature-tile">
            <p className="text-sm font-medium">{f}</p>
            <p className="text-xs text-muted-foreground">Live on public URL</p>
          </div>
        ))}
      </div>
    </PartsSupplierShell>
  );
}

export function PartsSupplierKycPage() {
  useEffect(() => setPageMeta({ title: "KYC" }), []);
  const steps = [
    { label: "GST certificate", done: true },
    { label: "PAN / business proof", done: true },
    { label: "Warehouse address proof", done: true },
    { label: "Bank cancelled cheque", done: false },
    { label: "Owner verification selfie", done: false },
  ];
  return (
    <PartsSupplierShell title="KYC & verification" description="Supplier verification for marketplace trust">
      <ul className="space-y-3 max-w-lg">
        {steps.map((s) => (
          <li key={s.label} className="psp-glass-card flex items-center justify-between">
            <span>{s.label}</span>
            <span className={cn("text-xs font-semibold", s.done ? "text-primary" : "text-muted-foreground")}>
              {s.done ? "Verified" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
      <Button className="mt-6 rounded-xl bg-green-600 hover:bg-green-500">Upload documents</Button>
    </PartsSupplierShell>
  );
}

export function PartsSupplierAutomationPage() {
  useEffect(() => setPageMeta({ title: "Automation" }), []);
  return (
    <PartsSupplierShell title="Automation engine" description="Low stock · dispatch · GST · abandoned cart">
      <ul className="space-y-2">
        {MOCK_AUTOMATION_RULES.map((r) => (
          <li key={r.id} className="psp-glass-card flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className={cn("h-5 w-5", r.active ? "text-primary" : "text-muted-foreground")} />
              <div>
                <p className="font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.trigger}</p>
              </div>
            </div>
            <span className={cn("psp-badge", r.active ? "psp-badge--success" : "")}>{r.active ? "On" : "Off"}</span>
          </li>
        ))}
      </ul>
    </PartsSupplierShell>
  );
}

export function PartsSupplierCategoriesPage() {
  useEffect(() => setPageMeta({ title: "Categories" }), []);
  return (
    <PartsSupplierShell title="Categories" description="Automotive category tree · SEO slugs">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_CATEGORIES.map((c) => (
          <article key={c.slug} className="psp-glass-card">
            <h3 className="font-semibold">{c.name}</h3>
            <p className="mt-1 text-2xl font-bold text-primary">{c.count}</p>
            <p className="text-xs text-muted-foreground">SKUs active</p>
          </article>
        ))}
      </div>
    </PartsSupplierShell>
  );
}

export function PartsSupplierBrandsPage() {
  useEffect(() => setPageMeta({ title: "Brands" }), []);
  return (
    <PartsSupplierShell title="Brands" description="OEM & aftermarket brand authority">
      <div className="flex flex-wrap gap-2">
        {MOCK_BRANDS.map((b) => (
          <span key={b} className="psp-brand-pill">
            <Building2 className="mr-1 inline h-3 w-3" />
            {b}
          </span>
        ))}
      </div>
    </PartsSupplierShell>
  );
}

export function PartsSupplierCrmPipelinePage() {
  useEffect(() => setPageMeta({ title: "Lead pipeline" }), []);
  const cols = [
    { name: "New lead", count: 8 },
    { name: "Quoted", count: 12 },
    { name: "Negotiation", count: 5 },
    { name: "Won", count: 24 },
  ];
  return (
    <PartsSupplierShell title="Lead pipeline" description="B2B kanban · assign sales executive">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cols.map((c) => (
          <div key={c.name} className="psp-kanban-col">
            <p className="text-xs font-semibold uppercase text-muted-foreground">{c.name}</p>
            <p className="mt-2 text-2xl font-bold text-primary">{c.count}</p>
          </div>
        ))}
      </div>
    </PartsSupplierShell>
  );
}

export function PartsSupplierCrmNegotiationsPage() {
  useEffect(() => setPageMeta({ title: "Negotiations" }), []);
  return (
    <PartsSupplierShell title="Negotiations" description="Price discussions · counter offers">
      <PsEnterpriseTable
        rows={MOCK_RFQS.filter((r) => r.status === "negotiating" || r.status === "quoted")}
        rowKey={(r) => r.id}
        columns={[
          { key: "ref", header: "RFQ", cell: (r) => r.ref },
          { key: "buyer", header: "Buyer", cell: (r) => r.buyer },
          { key: "val", header: "Ask", cell: (r) => formatCurrency(r.value) },
          { key: "st", header: "Status", cell: (r) => statusBadge(r.status) },
        ]}
      />
    </PartsSupplierShell>
  );
}

export function PartsSupplierCrmWorkshopsPage() {
  const { data } = usePartsSupplierOS();
  useEffect(() => setPageMeta({ title: "Workshops" }), []);
  const workshops = (data?.b2bCustomers ?? []).filter((c) => c.type === "workshop");
  return (
    <PartsSupplierShell title="Workshops" description="Workshop B2B accounts">
      <CrmTable customers={workshops.length ? workshops : data?.b2bCustomers ?? []} typeLabel="Workshop" />
    </PartsSupplierShell>
  );
}

/** Re-export placeholder factory for routes not yet upgraded */
export { PsModulePlaceholder };
