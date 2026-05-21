import { useCallback, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { fetchFraudAlerts, updateFraudAlert } from "../services/platform-admin.service";
import type { FraudAlertRow, PlatformFraudStatus } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function FraudDetectionPage() {
  const [rows, setRows] = useState<FraudAlertRow[]>([]);

  const load = useCallback(async () => {
    setRows(await fetchFraudAlerts());
  }, []);

  useEffect(() => {
    setPageMeta({ title: "Fraud — Super Admin" });
    void load();
  }, [load]);

  const setStatus = async (id: string, status: PlatformFraudStatus) => {
    const { error } = await updateFraudAlert(id, status);
    if (error) toast.error(error);
    else {
      toast.success(`Marked ${status}`);
      void load();
    }
  };

  const columns: ColumnDef<FraudAlertRow>[] = [
    { header: "Source", accessorKey: "source" },
    { header: "Entity", cell: ({ row }) => `${row.original.entityType}:${row.original.entityId ?? "—"}` },
    {
      header: "Risk",
      cell: ({ row }) => <span className="font-mono font-semibold text-destructive">{row.original.riskScore}</span>,
    },
    { header: "Reason", accessorKey: "reason" },
    {
      header: "Status",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.status} />,
    },
    {
      header: "Actions",
      cell: ({ row }) =>
        row.original.status === "open" ? (
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => void setStatus(row.original.id, "reviewing")}>
              Review
            </Button>
            <Button size="sm" onClick={() => void setStatus(row.original.id, "cleared")}>
              Clear
            </Button>
            <Button size="sm" variant="destructive" onClick={() => void setStatus(row.original.id, "blocked")}>
              Block
            </Button>
          </div>
        ) : null,
    },
  ];

  return (
    <SuperAdminShell title="Fraud detection" description="Auction shill bids, payment anomalies, and risk scoring.">
      <DataTable title="Alert queue" data={rows} columns={columns} className="sa-table-card" />
    </SuperAdminShell>
  );
}
