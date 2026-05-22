import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { formatCurrency } from "@/lib/utils";
import { fetchPlatformTransactions } from "../services/platform-admin.service";
import type { PlatformTransactionRow } from "../types";
import { AdminErpShell } from "../components/AdminErpShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function TransactionsPage() {
  const [rows, setRows] = useState<PlatformTransactionRow[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Transactions — Admin ERP" });
    void fetchPlatformTransactions().then(setRows);
  }, []);

  const total = rows.reduce((s, r) => s + r.amount, 0);

  const columns: ColumnDef<PlatformTransactionRow>[] = [
    { header: "Reference", accessorKey: "reference" },
    {
      header: "Type",
      cell: ({ row }) => <span className="text-xs font-mono uppercase">{row.original.type}</span>,
    },
    { header: "Party", accessorKey: "party" },
    {
      header: "Amount",
      cell: ({ row }) => <span className="font-semibold tabular-nums">{formatCurrency(row.original.amount)}</span>,
    },
    {
      header: "Status",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.status} />,
    },
    {
      header: "Date",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString("en-IN"),
    },
  ];

  return (
    <AdminErpShell
      title="All transactions"
      description="Loans, subscriptions, auctions, and marketplace payments — unified ledger view."
    >
      <div className="erp-kpi-strip">
        <div className="erp-kpi erp-kpi--wide">
          <span className="erp-kpi__label">Volume (visible set)</span>
          <span className="erp-kpi__value">{formatCurrency(total)}</span>
        </div>
        <div className="erp-kpi">
          <span className="erp-kpi__label">Records</span>
          <span className="erp-kpi__value">{rows.length}</span>
        </div>
      </div>
      <DataTable title="Transaction ledger" data={rows} columns={columns} className="sa-table-card erp-table" />
    </AdminErpShell>
  );
}
