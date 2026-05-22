import { useEffect } from "react";
import { ServicePartnerShell } from "../components/ServicePartnerShell";
import { ShDataTable } from "../components/ShDataTable";
import { ShAnalyticsRevenuePage } from "./ShEnterprisePages";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";

export function ShCrmVehiclesPage() {
  useEffect(() => setPageMeta({ title: "Vehicle history" }), []);
  const rows = [
    { reg: "DL01AB1234", make: "Hyundai Creta", owner: "Rahul Mehta", last: "Periodic service" },
    { reg: "UP14CD5678", make: "Kia Seltos", owner: "Priya Sharma", last: "AC repair" },
  ];
  return (
    <ServicePartnerShell title="Vehicle history" description="RC · VIN · service timeline">
      <ShDataTable rows={rows} rowKey={(r) => r.reg} columns={[
        { key: "r", header: "Reg", cell: (r) => r.reg },
        { key: "m", header: "Vehicle", cell: (r) => r.make },
        { key: "o", header: "Owner", cell: (r) => r.owner },
        { key: "l", header: "Last service", cell: (r) => r.last },
      ]} />
    </ServicePartnerShell>
  );
}

export function ShCrmLoyaltyPage() {
  useEffect(() => setPageMeta({ title: "Loyalty" }), []);
  return (
    <ServicePartnerShell title="Loyalty members" description="Points · tiers · rewards">
      <p className="text-lg font-bold text-primary">312 active members</p>
      <p className="text-sm text-muted-foreground">Gold tier: 48 · Silver: 124</p>
    </ServicePartnerShell>
  );
}

export function ShCrmReviewsPage() {
  useEffect(() => setPageMeta({ title: "Reviews" }), []);
  const reviews = [
    { id: "1", author: "Rahul M.", rating: 5, text: "Excellent periodic service" },
    { id: "2", author: "Priya S.", rating: 4, text: "AC fixed same day" },
  ];
  return (
    <ServicePartnerShell title="Feedback & reviews" description="CSAT · Google · Motorcart">
      <ul className="space-y-2">
        {reviews.map((r) => (
          <li key={r.id} className="sh-glass-card text-sm">
            <span className="font-medium">{r.author}</span> · {r.rating}★
            <p className="text-muted-foreground">{r.text}</p>
          </li>
        ))}
      </ul>
    </ServicePartnerShell>
  );
}

export const ShFinanceRevenuePage = ShAnalyticsRevenuePage;

export function ShFinancePaymentsPage() {
  useEffect(() => setPageMeta({ title: "Payments" }), []);
  return (
    <ServicePartnerShell title="Payments" description="UPI · card · COD · settlements">
      <p className="text-sm">Today collected: <strong className="text-primary">{formatCurrency(84200)}</strong></p>
    </ServicePartnerShell>
  );
}

export function ShFinanceExpensesPage() {
  useEffect(() => setPageMeta({ title: "Expenses" }), []);
  return (
    <ServicePartnerShell title="Expenses" description="Parts · utilities · payroll">
      <p className="text-sm">MTD expenses: {formatCurrency(420000)}</p>
    </ServicePartnerShell>
  );
}

export function ShFinanceProfitPage() {
  useEffect(() => setPageMeta({ title: "Profit" }), []);
  return (
    <ServicePartnerShell title="Profit analytics" description="Margin by service · branch">
      <p className="text-2xl font-bold text-primary">Gross margin 32%</p>
    </ServicePartnerShell>
  );
}

export function ShPartsLowStockPage() {
  useEffect(() => setPageMeta({ title: "Low stock" }), []);
  return (
    <ServicePartnerShell title="Low stock alerts" description="Auto reorder suggestions">
      <p className="text-amber-600 text-sm">Brake pads · Exide 65Ah below MOQ</p>
    </ServicePartnerShell>
  );
}

export function ShPartsVendorsPage() {
  useEffect(() => setPageMeta({ title: "Vendors" }), []);
  return (
    <ServicePartnerShell title="Vendors" description="Local OEM · Bosch · Exide distributors">
      <ul className="sh-feature-list">
        {["Bosch India", "Exide NCR", "Castrol partner"].map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </ServicePartnerShell>
  );
}

export function ShPartsPoPage() {
  useEffect(() => setPageMeta({ title: "PO" }), []);
  return (
    <ServicePartnerShell title="Purchase orders" description="Inbound parts procurement">
      <p className="font-mono text-sm text-primary">PO-WS-042 · Bosch · ETA 22 May</p>
    </ServicePartnerShell>
  );
}

export function ShPartsBillingPage() {
  useEffect(() => setPageMeta({ title: "Parts billing" }), []);
  return (
    <ServicePartnerShell title="Parts billing" description="Issue parts to job cards">
      <p className="text-sm text-muted-foreground">Link parts consumption to JOB cards for margin tracking.</p>
    </ServicePartnerShell>
  );
}

export function ShDriversPage() {
  useEffect(() => setPageMeta({ title: "Drivers" }), []);
  return (
    <ServicePartnerShell title="Driver management" description="Pickup fleet roster">
      <p className="text-sm">4 drivers active · 2 on pickup route</p>
    </ServicePartnerShell>
  );
}

export function ShRoutesPage() {
  useEffect(() => setPageMeta({ title: "Routes" }), []);
  return (
    <ServicePartnerShell title="Route tracking" description="Optimized pickup loops">
      <p className="text-sm text-muted-foreground">Live map integration — configure API in settings.</p>
    </ServicePartnerShell>
  );
}

export function ShRsaPage() {
  useEffect(() => setPageMeta({ title: "RSA" }), []);
  return (
    <ServicePartnerShell title="Roadside assistance" description="Emergency dispatch SLA">
      <p className="text-sm">3 RSA jobs open · avg response 28 min</p>
    </ServicePartnerShell>
  );
}

export function ShMarketingSmsPage() {
  useEffect(() => setPageMeta({ title: "SMS" }), []);
  return (
    <ServicePartnerShell title="SMS reminders" description="DLT templates · service due">
      <p className="text-sm">Next broadcast: 240 customers — periodic due</p>
    </ServicePartnerShell>
  );
}

export function ShMarketingRemindersPage() {
  useEffect(() => setPageMeta({ title: "Reminders" }), []);
  return (
    <ServicePartnerShell title="Service reminders" description="Insurance · PUC · periodic">
      <p className="text-sm">18 reminders scheduled this week</p>
    </ServicePartnerShell>
  );
}

export function ShMarketingOffersPage() {
  useEffect(() => setPageMeta({ title: "Offers" }), []);
  return (
    <ServicePartnerShell title="Offers & coupons" description="Festive · loyalty · first visit">
      <p className="text-primary font-medium">MONSOON20 — 20% off AC service</p>
    </ServicePartnerShell>
  );
}

export function ShAnalyticsTechniciansPage() {
  useEffect(() => setPageMeta({ title: "Technician analytics" }), []);
  return (
    <ServicePartnerShell title="Technician productivity" description="Jobs · CSAT · revenue per tech">
      <p className="text-sm">Top: Ravi Kumar — 12 jobs MTD · 98% CSAT</p>
    </ServicePartnerShell>
  );
}

export function ShAnalyticsWorkshopPage() {
  useEffect(() => setPageMeta({ title: "Workshop analytics" }), []);
  return (
    <ServicePartnerShell title="Workshop analytics" description="Bay utilization · TAT">
      <p className="text-sm">Avg completion: 1.8 days · Bay util 78%</p>
    </ServicePartnerShell>
  );
}

export function ShAnalyticsRetentionPage() {
  useEffect(() => setPageMeta({ title: "Retention" }), []);
  return (
    <ServicePartnerShell title="Customer retention" description="Repeat % · churn">
      <p className="text-2xl font-bold text-primary">68% repeat</p>
    </ServicePartnerShell>
  );
}

export function ShAnalyticsBranchesPage() {
  useEffect(() => setPageMeta({ title: "Branches" }), []);
  return (
    <ServicePartnerShell title="Branch performance" description="Multi-branch centralized view">
      <ul className="space-y-2 text-sm">
        <li className="sh-glass-card flex justify-between"><span>Okhla — Delhi</span><span className="text-primary">₹8.2L</span></li>
        <li className="sh-glass-card flex justify-between"><span>Bhiwadi hub</span><span className="text-primary">₹4.1L</span></li>
      </ul>
    </ServicePartnerShell>
  );
}

export function ShGstSettingsPage() {
  useEffect(() => setPageMeta({ title: "GST" }), []);
  return (
    <ServicePartnerShell title="GST details" description="GSTIN · HSN · e-invoice">
      <p className="font-mono text-sm">06AABCS1234F1Z2 · Verified</p>
    </ServicePartnerShell>
  );
}

export function ShHoursPage() {
  useEffect(() => setPageMeta({ title: "Hours" }), []);
  return (
    <ServicePartnerShell title="Working hours" description="Mon–Sat · holidays">
      <p className="text-sm">9:00 AM – 7:00 PM · Sunday closed</p>
    </ServicePartnerShell>
  );
}
