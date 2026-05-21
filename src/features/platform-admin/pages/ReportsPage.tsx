import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { fetchPlatformReports } from "../services/platform-admin.service";
import type { PlatformReportRow } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";

export function ReportsPage() {
  const [rows, setRows] = useState<PlatformReportRow[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Reports — Super Admin" });
    void fetchPlatformReports().then(setRows);
  }, []);

  const columns: ColumnDef<PlatformReportRow>[] = [
    { header: "Report", accessorKey: "title" },
    { header: "Key", accessorKey: "reportKey" },
    { header: "Period", accessorKey: "periodLabel" },
    {
      header: "Generated",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString("en-IN"),
    },
    {
      header: "",
      cell: () => (
        <Button size="sm" variant="ghost" onClick={() => toast.success("Export queued (demo)")}>
          <Download className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <SuperAdminShell title="Reports" description="Scheduled snapshots — GMV, leads, and compliance exports.">
      <DataTable title="Report history" data={rows} columns={columns} className="sa-table-card" />
    </SuperAdminShell>
  );
}
