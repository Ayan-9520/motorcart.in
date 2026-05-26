import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookingCalendar } from "@/features/service-booking/components/BookingCalendar";
import { useWorkshopDesk } from "@/features/service-booking/hooks/useWorkshopDesk";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/utils";
import { ShDataTable } from "../components/ShDataTable";
import { ServicePartnerShell } from "../components/ServicePartnerShell";
import { useServicePartnerOS } from "../hooks/useServicePartnerOS";
import { setPageMeta } from "@/utils/seo";

const DEMO_SERVICES = [
  { name: "Periodic service", price: "₹4,999", demand: "+18%" },
  { name: "Wheel alignment", price: "₹1,200", demand: "+6%" },
  { name: "Battery replacement", price: "₹8,500", demand: "+22%" },
  { name: "AC repair", price: "₹3,200", demand: "+9%" },
  { name: "Ceramic coating", price: "₹28,000", demand: "+14%" },
  { name: "Denting & painting", price: "₹42,000", demand: "+4%" },
  { name: "EV diagnostics", price: "₹2,800", demand: "+24%" },
];

const DEMO_INVENTORY = [
  { sku: "BOSCH-BP", name: "Brake pads", qty: 12, min: 20 },
  { sku: "CASTROL-5W30", name: "Engine oil 5W-30", qty: 28, min: 15 },
  { sku: "EXIDE-65", name: "Exide 65Ah", qty: 6, min: 10 },
];

export function ShAiPage() {
  const { data } = useServicePartnerOS();
  useEffect(() => setPageMeta({ title: "AI insights" }), []);
  return (
    <ServicePartnerShell title="AI workshop insights" description="Demand · delays · stock · productivity">
      <ul className="space-y-3">
        {(data?.insights ?? []).map((i) => (
          <li key={i.id} className="sh-ai-card">
            <p className="font-semibold">{i.title}</p>
            <p className="text-sm text-muted-foreground">{i.summary}</p>
            {i.actionUrl ? <Link to={i.actionUrl} className="mt-1 text-xs text-primary hover:underline">Open</Link> : null}
          </li>
        ))}
      </ul>
    </ServicePartnerShell>
  );
}

export function ShNotificationsPage() {
  useEffect(() => setPageMeta({ title: "Notifications" }), []);
  const items = [
    { title: "Estimate approved — JOB-2405-882", time: "5m ago" },
    { title: "Pickup driver en route", time: "22m ago" },
    { title: "Low stock: brake pads", time: "1h ago" },
  ];
  return (
    <ServicePartnerShell title="Notifications" description="Orders · pickups · stock · KYC">
      <ul className="space-y-2">
        {items.map((n) => (
          <li key={n.title} className="sh-glass-card flex justify-between text-sm">
            <span>{n.title}</span>
            <span className="text-muted-foreground">{n.time}</span>
          </li>
        ))}
      </ul>
    </ServicePartnerShell>
  );
}

export function ShCalendarPage() {
  const { user } = useAuth();
  const desk = useWorkshopDesk(user?.id, user?.role === "admin" || user?.role === "super_admin");
  useEffect(() => setPageMeta({ title: "Workshop calendar" }), []);
  return (
    <ServicePartnerShell title="Workshop calendar" description="Bookings · pickups · deliveries · holidays">
      {desk.centerId ? (
        <BookingCalendar bookings={desk.bookings} days={14} />
      ) : (
        <p className="text-muted-foreground">Connect service center for live calendar.</p>
      )}
    </ServicePartnerShell>
  );
}

export function ShCrmPage() {
  const { data } = useServicePartnerOS();
  useEffect(() => setPageMeta({ title: "Customer CRM" }), []);
  return (
    <ServicePartnerShell title="Customer CRM" description="History · loyalty · insurance · PUC">
      <ShDataTable
        rows={data?.customers ?? []}
        rowKey={(c) => c.id}
        columns={[
          { key: "n", header: "Customer", cell: (c) => c.name },
          { key: "p", header: "Phone", cell: (c) => c.phone },
          { key: "v", header: "Vehicles", cell: (c) => c.vehicles },
          { key: "vis", header: "Visits", cell: (c) => c.visits },
          { key: "loy", header: "Points", cell: (c) => c.loyaltyPoints },
          { key: "last", header: "Last visit", cell: (c) => c.lastVisit },
        ]}
      />
    </ServicePartnerShell>
  );
}

export function ShCrmRepeatPage() {
  const { data } = useServicePartnerOS();
  useEffect(() => setPageMeta({ title: "Repeat customers" }), []);
  const sorted = [...(data?.customers ?? [])].sort((a, b) => b.visits - a.visits);
  return (
    <ServicePartnerShell title="Repeat customers" description="LTV · retention · churn risk">
      <ShDataTable
        rows={sorted}
        rowKey={(c) => c.id}
        columns={[
          { key: "n", header: "Customer", cell: (c) => c.name },
          { key: "vis", header: "Visits", cell: (c) => c.visits },
          { key: "loy", header: "Loyalty", cell: (c) => c.loyaltyPoints },
        ]}
      />
    </ServicePartnerShell>
  );
}

export function ShProfilePage() {
  const { data } = useServicePartnerOS();
  useEffect(() => setPageMeta({ title: "Workshop profile" }), []);
  const p = data?.profile;
  return (
    <ServicePartnerShell title="Workshop profile" description="Logo · GST · hours · branches · reviews">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="sh-glass-card">
          <h3 className="sh-panel__title">Business</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Name</dt><dd>{p?.name}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">City</dt><dd>{p?.city}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Rating</dt><dd>{p?.rating}★</dd></div>
          </dl>
          <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
            <Link to="/dashboard/service/kyc">KYC verification</Link>
          </Button>
        </section>
        <section className="sh-glass-card">
          <h3 className="sh-panel__title">Service categories</h3>
          <p className="mt-2 text-sm text-muted-foreground">Periodic · AC · body · detailing · EV · RSA</p>
        </section>
        <section className="sh-glass-card lg:col-span-2">
          <h3 className="sh-panel__title">Pickup radius & insurance tie-ups</h3>
          <p className="text-sm text-muted-foreground">15 km pickup · HDFC Ergo · ICICI Lombard partners</p>
        </section>
      </div>
    </ServicePartnerShell>
  );
}

function ShChartBars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="sh-chart-bars">
      {values.map((v, i) => (
        <div key={i} className="sh-chart-bar" style={{ height: `${(v / max) * 100}%` }} title={String(v)} />
      ))}
    </div>
  );
}

export function ShAnalyticsHubPage() {
  const { data } = useServicePartnerOS();
  useEffect(() => setPageMeta({ title: "Analytics" }), []);
  return (
    <ServicePartnerShell title="Analytics center" description="Revenue · technicians · retention · branches">
      <div className="grid gap-4 md:grid-cols-2">
        <section className="sh-glass-card">
          <p className="text-sm text-muted-foreground">Daily revenue trend</p>
          <ShChartBars values={[42, 55, 48, 62, 70, 78, 84]} />
        </section>
        <section className="sh-glass-card">
          <p className="text-sm text-muted-foreground">Completion rate</p>
          <p className="mt-2 text-4xl font-bold text-primary">87%</p>
        </section>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Monthly GMV {formatCurrency(data?.revenueMonth ?? 0)} · Repeat customers 68%
      </p>
    </ServicePartnerShell>
  );
}

export function ShAnalyticsRevenuePage() {
  useEffect(() => setPageMeta({ title: "Revenue analytics" }), []);
  return (
    <ServicePartnerShell title="Revenue analytics" description="Daily · monthly · AOV · branch">
      <ShChartBars values={[8, 9, 9.5, 10, 11, 12, 12.4]} />
      <p className="mt-4 text-lg font-bold">Avg invoice: ₹8,420</p>
    </ServicePartnerShell>
  );
}

export function ShFinanceInvoicesPage() {
  useEffect(() => setPageMeta({ title: "GST invoices" }), []);
  const rows = [
    { id: "1", no: "WS/25-26/441", customer: "Rahul Mehta", amt: 12400, gst: 2232, st: "paid" },
    { id: "2", no: "WS/25-26/442", customer: "Delhi Fleet", amt: 42000, gst: 7560, st: "pending" },
  ];
  return (
    <ServicePartnerShell title="GST invoices" description="GSTR-ready · e-invoice · WhatsApp share">
      <ShDataTable
        rows={rows}
        rowKey={(r) => r.id}
        columns={[
          { key: "no", header: "Invoice", cell: (r) => r.no },
          { key: "c", header: "Customer", cell: (r) => r.customer },
          { key: "a", header: "Amount", cell: (r) => formatCurrency(r.amt) },
          { key: "g", header: "GST", cell: (r) => formatCurrency(r.gst) },
          { key: "s", header: "Status", cell: (r) => r.st },
        ]}
      />
    </ServicePartnerShell>
  );
}

export function ShWhatsAppPage() {
  useEffect(() => setPageMeta({ title: "WhatsApp" }), []);
  const flows = ["Booking confirmation", "Pickup updates", "Inspection report", "Estimate approval", "Invoice PDF", "Service reminder", "Feedback request"];
  return (
    <ServicePartnerShell title="WhatsApp automation" description="Templates · triggers · catalogue">
      <ul className="grid gap-2 sm:grid-cols-2">
        {flows.map((f) => (
          <li key={f} className="sh-glass-card text-sm font-medium">{f}</li>
        ))}
      </ul>
    </ServicePartnerShell>
  );
}

export function ShPickupPage() {
  useEffect(() => setPageMeta({ title: "Pickup & drop" }), []);
  const pickups = [
    { id: "p1", customer: "Rahul Mehta", address: "Sector 45, Gurgaon", status: "en_route", driver: "Neha G." },
    { id: "p2", customer: "Priya Sharma", address: "Noida Sec 62", status: "requested", driver: "—" },
  ];
  return (
    <ServicePartnerShell title="Pickup & drop" description="Driver · OTP · live tracking · POD">
      <ShDataTable
        rows={pickups}
        rowKey={(p) => p.id}
        columns={[
          { key: "c", header: "Customer", cell: (p) => p.customer },
          { key: "a", header: "Address", cell: (p) => p.address },
          { key: "d", header: "Driver", cell: (p) => p.driver },
          { key: "s", header: "Status", cell: (p) => p.status },
        ]}
      />
    </ServicePartnerShell>
  );
}

export function ShPartsInventoryPage() {
  useEffect(() => setPageMeta({ title: "Parts inventory" }), []);
  return (
    <ServicePartnerShell title="Spare parts inventory" description="Issue to jobs · valuation · vendors">
      <ShDataTable
        rows={DEMO_INVENTORY}
        rowKey={(r) => r.sku}
        columns={[
          { key: "sku", header: "SKU", cell: (r) => r.sku },
          { key: "n", header: "Part", cell: (r) => r.name },
          { key: "q", header: "Stock", cell: (r) => <span className={r.qty < r.min ? "text-amber-600" : ""}>{r.qty}</span> },
          { key: "m", header: "MOQ", cell: (r) => r.min },
        ]}
      />
    </ServicePartnerShell>
  );
}

export function ShInsuranceClaimsPage() {
  useEffect(() => setPageMeta({ title: "Insurance claims" }), []);
  const claims = [
    { id: "c1", ref: "CLM-8821", insurer: "HDFC Ergo", status: "survey", amt: 42000 },
    { id: "c2", ref: "CLM-8822", insurer: "ICICI Lombard", status: "approved", amt: 18500 },
  ];
  return (
    <ServicePartnerShell title="Insurance claims" description="Survey · approval · accidental workflow">
      <ShDataTable
        rows={claims}
        rowKey={(c) => c.id}
        columns={[
          { key: "r", header: "Claim", cell: (c) => c.ref },
          { key: "i", header: "Insurer", cell: (c) => c.insurer },
          { key: "a", header: "Estimate", cell: (c) => formatCurrency(c.amt) },
          { key: "s", header: "Status", cell: (c) => c.status },
        ]}
      />
    </ServicePartnerShell>
  );
}

export function ShServicesCatalogPage({ title, slug }: { title: string; slug: string }) {
  useEffect(() => setPageMeta({ title }), [title]);
  return (
    <ServicePartnerShell title={title} description={`Service package · ${slug}`}>
      <div className="grid gap-3 sm:grid-cols-2">
        {DEMO_SERVICES.filter((s) => slug === "all" || s.name.toLowerCase().includes(slug.split("-")[0] ?? "")).map((s) => (
          <article key={s.name} className="sh-glass-card">
            <p className="font-semibold">{s.name}</p>
            <p className="text-primary">{s.price}</p>
            <p className="text-xs text-muted-foreground">Demand {s.demand}</p>
          </article>
        ))}
      </div>
    </ServicePartnerShell>
  );
}

export function ShLiveOpsPage() {
  useEffect(() => setPageMeta({ title: "Live operations" }), []);
  return (
    <ServicePartnerShell title="Live operations" description="Bays · pickups · in-progress jobs">
      <p className="text-sm text-muted-foreground">18 vehicles on floor · 5 pickups active · 3 delayed jobs</p>
      <Button className="mt-4 rounded-xl bg-green-600 hover:bg-green-500" asChild>
        <Link to="/dashboard/service/workshop/kanban">Open workflow board</Link>
      </Button>
    </ServicePartnerShell>
  );
}

export function ShSettingsPage() {
  useEffect(() => setPageMeta({ title: "Settings" }), []);
  return (
    <ServicePartnerShell title="Integrations & settings" description="API · bays · notifications">
      <ul className="sh-feature-list">
        {["WhatsApp Business API", "Payment gateway", "Google Maps", "Insurance survey API"].map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </ServicePartnerShell>
  );
}

export function ShKycPage() {
  useEffect(() => setPageMeta({ title: "KYC" }), []);
  const steps = ["GST certificate", "Workshop license", "Fire NOC", "Bank proof", "Owner ID"];
  return (
    <ServicePartnerShell title="KYC verification" description="Verified workshop badge">
      <ul className="space-y-2 max-w-md">
        {steps.map((s, i) => (
          <li key={s} className="sh-glass-card flex justify-between text-sm">
            <span>{s}</span>
            <span className="text-primary">{i < 3 ? "Verified" : "Pending"}</span>
          </li>
        ))}
      </ul>
    </ServicePartnerShell>
  );
}

export function ShTeamPage() {
  useEffect(() => setPageMeta({ title: "Team" }), []);
  const team = [
    { name: "Owner", role: "owner" },
    { name: "Rajesh M.", role: "branch manager" },
    { name: "Suresh P.", role: "service advisor" },
    { name: "Ravi K.", role: "technician" },
    { name: "Neha G.", role: "pickup driver" },
  ];
  return (
    <ServicePartnerShell title="Team & roles" description="Owner to support executive">
      <ul className="space-y-2">
        {team.map((t) => (
          <li key={t.name} className="sh-glass-card flex justify-between text-sm">
            <span className="font-medium">{t.name}</span>
            <span className="text-muted-foreground">{t.role}</span>
          </li>
        ))}
      </ul>
    </ServicePartnerShell>
  );
}
