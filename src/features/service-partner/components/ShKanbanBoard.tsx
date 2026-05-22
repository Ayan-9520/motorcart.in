import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import type { ShKanbanColumn } from "../types";

export function ShKanbanBoard({ columns }: { columns: ShKanbanColumn[] }) {
  return (
    <div className="sh-kanban-scroll flex gap-3 overflow-x-auto pb-2">
      {columns.map((col) => (
        <div key={col.stage} className="sh-kanban-col min-w-[200px] flex-1">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{col.label}</p>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
              {col.jobs.length}
            </span>
          </div>
          <ul className="space-y-2">
            {col.jobs.map((j) => (
              <li key={j.id}>
                <Link to={`/dashboard/service/workshop/job-cards/${j.id}`} className="sh-kanban-card block">
                  <p className="font-mono text-[10px] text-primary">{j.jobNo}</p>
                  <p className="mt-1 text-sm font-medium leading-tight">{j.customerName}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{j.vehicle}</p>
                  <p className="mt-2 text-xs font-semibold">{formatCurrency(j.estimatedTotal)}</p>
                </Link>
              </li>
            ))}
            {!col.jobs.length ? <p className="py-4 text-center text-xs text-muted-foreground">—</p> : null}
          </ul>
        </div>
      ))}
    </div>
  );
}
