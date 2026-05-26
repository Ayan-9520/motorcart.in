import { useCallback, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { formatCurrency } from "@/lib/utils";
import { fetchAdminVehicles, moderateVehicle } from "../services/platform-admin.service";
import type { AdminVehicleRow } from "../types";
import { AdminErpShell } from "../components/AdminErpShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function VehicleModerationPage() {
  const [rows, setRows] = useState<AdminVehicleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "draft" | "flagged">("all");

  const load = useCallback(async () => {
    setLoading(true);
    const all = await fetchAdminVehicles();
    setRows(
      filter === "draft"
        ? all.filter((v) => v.status === "draft")
        : filter === "flagged"
          ? all.filter((v) => !v.dealerName)
          : all
    );
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    setPageMeta({ title: "Vehicle moderation — Admin ERP" });
    void load();
  }, [load]);

  const setStatus = async (id: string, status: string) => {
    const { error } = await moderateVehicle(id, { status });
    if (error) toast.error(error);
    else {
      toast.success(`Listing ${status}`);
      void load();
    }
  };

  const columns: ColumnDef<AdminVehicleRow>[] = [
    { header: "Vehicle", accessorKey: "title" },
    { header: "Dealer", accessorKey: "dealerName" },
    { header: "City", accessorKey: "city" },
    {
      header: "Price",
      cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
      header: "Status",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.status} />,
    },
    {
      header: "Flags",
      cell: ({ row }) => (
        <div className="flex gap-1">
          {row.original.platformFeatured && <Badge variant="secondary">Platform</Badge>}
          {row.original.isFeatured && <Badge variant="outline">Dealer</Badge>}
        </div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.status === "draft" && (
            <Button size="sm" onClick={() => void setStatus(row.original.id, "available")}>
              Approve
            </Button>
          )}
          {row.original.status === "available" && (
            <Button size="sm" variant="outline" onClick={() => void setStatus(row.original.id, "draft")}>
              Hold
            </Button>
          )}
          <Button size="sm" variant="destructive" onClick={() => void setStatus(row.original.id, "sold")}>
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminErpShell
      title="Vehicle moderation"
      description="Review listings, approve new inventory, and remove policy violations across all dealers."
    >
      <div className="erp-filter-bar">
        {(["all", "draft", "flagged"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All listings" : f === "draft" ? "Pending review" : "Needs review"}
          </Button>
        ))}
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading listings…</p>
      ) : (
        <DataTable title="Vehicle listings" data={rows} columns={columns} className="sa-table-card erp-table" />
      )}
    </AdminErpShell>
  );
}
