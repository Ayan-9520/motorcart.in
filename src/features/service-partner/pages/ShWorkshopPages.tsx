import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getMockJobCard } from "../data/mock-sh-data";
import { ShDataTable } from "../components/ShDataTable";
import { ShKanbanBoard } from "../components/ShKanbanBoard";
import { ServicePartnerShell } from "../components/ServicePartnerShell";
import { useServicePartnerOS } from "../hooks/useServicePartnerOS";
import { setPageMeta } from "@/utils/seo";

const INSPECTION_SECTIONS = [
  "Exterior",
  "Interior",
  "Tyres",
  "Brakes",
  "Suspension",
  "Battery",
  "Engine",
  "AC",
  "Accidental damage",
];

export function ShKanbanPage() {
  const { data } = useServicePartnerOS();
  useEffect(() => setPageMeta({ title: "Workflow board" }), []);
  return (
    <ServicePartnerShell title="Workflow board" description="Kanban — waiting to delivered">
      <ShKanbanBoard columns={data?.kanban ?? []} />
    </ServicePartnerShell>
  );
}

export function ShJobCardsPage() {
  const { data } = useServicePartnerOS();
  useEffect(() => setPageMeta({ title: "Job cards" }), []);
  const jobs = data?.jobCards ?? [];
  return (
    <ServicePartnerShell
      title="Job cards"
      description="Customer · vehicle · labour · estimates"
      actions={
        <Button className="rounded-xl bg-green-600 hover:bg-green-500" size="sm">
          New job card
        </Button>
      }
    >
      <ShDataTable
        rows={jobs}
        rowKey={(j) => j.id}
        columns={[
          { key: "no", header: "Job #", cell: (j) => <Link to={`/dashboard/service/workshop/job-cards/${j.id}`} className="font-mono text-primary hover:underline">{j.jobNo}</Link> },
          { key: "cust", header: "Customer", cell: (j) => j.customerName },
          { key: "veh", header: "Vehicle", cell: (j) => j.vehicle },
          { key: "tech", header: "Technician", cell: (j) => j.technician ?? "—" },
          { key: "est", header: "Estimate", cell: (j) => formatCurrency(j.estimatedTotal) },
          { key: "st", header: "Stage", cell: (j) => <span className="sh-badge">{j.stage.replace(/_/g, " ")}</span> },
        ]}
      />
    </ServicePartnerShell>
  );
}

export function ShJobCardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useServicePartnerOS();
  const job = data?.jobCards.find((j) => j.id === id) ?? (id ? getMockJobCard(id) : null);
  useEffect(() => setPageMeta({ title: job?.jobNo ?? "Job card" }), [job?.jobNo]);

  if (!job) {
    return (
      <ServicePartnerShell title="Job card" description="Not found">
        <Button asChild variant="outline">
          <Link to="/dashboard/service/workshop/job-cards">Back</Link>
        </Button>
      </ServicePartnerShell>
    );
  }

  return (
    <ServicePartnerShell title={job.jobNo} description={job.vehicle} crumbs={[{ label: "Job cards", href: "/dashboard/service/workshop/job-cards" }]}>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="sh-glass-card">
          <h3 className="sh-panel__title">Customer & vehicle</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Customer</dt><dd>{job.customerName}</dd></div>
            {job.customerPhone ? <div className="flex justify-between"><dt className="text-muted-foreground">Phone</dt><dd>{job.customerPhone}</dd></div> : null}
            <div className="flex justify-between"><dt className="text-muted-foreground">Vehicle</dt><dd>{job.vehicle}</dd></div>
            {job.vin ? <div className="flex justify-between"><dt className="text-muted-foreground">VIN</dt><dd className="font-mono text-xs">{job.vin}</dd></div> : null}
          </dl>
        </section>
        <section className="sh-glass-card">
          <h3 className="sh-panel__title">Billing</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Labour</dt><dd>{formatCurrency(job.labourAmount)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Estimate</dt><dd className="font-bold text-primary">{formatCurrency(job.estimatedTotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Stage</dt><dd className="capitalize">{job.stage.replace(/_/g, " ")}</dd></div>
          </dl>
        </section>
        <section className="sh-glass-card lg:col-span-2">
          <h3 className="sh-panel__title">Complaints & notes</h3>
          <p className="mt-2 text-sm">{job.complaints}</p>
          <div className="mt-4 flex gap-2">
            <Button className="rounded-xl bg-green-600 hover:bg-green-500" asChild>
              <Link to="/dashboard/service/workshop/inspection">Open inspection</Link>
            </Button>
            <Button variant="outline" className="rounded-xl border-primary/30" asChild>
              <Link to="/dashboard/service/finance/invoices">GST invoice</Link>
            </Button>
          </div>
        </section>
      </div>
    </ServicePartnerShell>
  );
}

export function ShInspectionPage() {
  useEffect(() => setPageMeta({ title: "Inspection center" }), []);
  return (
    <ServicePartnerShell title="360° vehicle inspection" description="Exterior · interior · mechanical · damage marking">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INSPECTION_SECTIONS.map((s) => (
          <article key={s} className="sh-glass-card">
            <h3 className="font-semibold">{s}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Photos · damage marks · AI estimate</p>
            <Button size="sm" variant="outline" className="mt-3 rounded-lg border-primary/30">
              Upload photos
            </Button>
          </article>
        ))}
      </div>
      <section className="sh-glass-card mt-6">
        <h3 className="sh-panel__title">AI recommendations</h3>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>• Brake pads 40% worn — suggest replacement</li>
          <li>• AC gas low — refill recommended</li>
          <li>• Tyre tread 3.2mm — monitor in 2 months</li>
        </ul>
        <Button className="mt-4 rounded-xl bg-green-600 hover:bg-green-500">Send estimate for approval</Button>
      </section>
    </ServicePartnerShell>
  );
}

export function ShTechniciansPage() {
  const { data } = useServicePartnerOS();
  useEffect(() => setPageMeta({ title: "Technicians" }), []);
  return (
    <ServicePartnerShell title="Technician ERP" description="Allocation · shifts · productivity">
      <ShDataTable
        rows={data?.technicians ?? []}
        rowKey={(t) => t.id}
        columns={[
          { key: "name", header: "Name", cell: (t) => t.name },
          { key: "skill", header: "Skill", cell: (t) => t.skill },
          { key: "jobs", header: "Jobs today", cell: (t) => t.jobsToday },
          { key: "st", header: "Status", cell: (t) => <span className={t.active ? "text-primary" : "text-muted-foreground"}>{t.active ? "On floor" : "Off"}</span> },
        ]}
      />
    </ServicePartnerShell>
  );
}

export function ShBaysPage() {
  useEffect(() => setPageMeta({ title: "Bay management" }), []);
  const bays = [
    { id: "b1", name: "Bay 1 — General", status: "occupied", vehicle: "Creta 2022" },
    { id: "b2", name: "Bay 2 — Body shop", status: "occupied", vehicle: "Ertiga — denting" },
    { id: "b3", name: "Bay 3 — AC", status: "free", vehicle: "—" },
    { id: "b4", name: "Bay 4 — Wash", status: "occupied", vehicle: "City — wash" },
  ];
  return (
    <ServicePartnerShell title="Bay management" description="Live bay utilization">
      <div className="grid gap-3 sm:grid-cols-2">
        {bays.map((b) => (
          <article key={b.id} className="sh-glass-card">
            <p className="font-semibold">{b.name}</p>
            <p className="text-sm text-muted-foreground">{b.vehicle}</p>
            <span className={`sh-badge mt-2 ${b.status === "free" ? "sh-badge--success" : ""}`}>{b.status}</span>
          </article>
        ))}
      </div>
    </ServicePartnerShell>
  );
}
