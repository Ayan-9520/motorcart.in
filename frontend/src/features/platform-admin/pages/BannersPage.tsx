import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { fetchPlatformBanners } from "../services/platform-admin.service";
import type { PlatformBanner } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function BannersPage() {
  const [rows, setRows] = useState<PlatformBanner[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Banners — Super Admin" });
    void fetchPlatformBanners().then(setRows);
  }, []);

  const columns: ColumnDef<PlatformBanner>[] = [
    { header: "Title", accessorKey: "title" },
    { header: "Placement", accessorKey: "placement" },
    {
      header: "Active",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.isActive ? "active" : "closed"} />,
    },
    { header: "Order", accessorKey: "sortOrder" },
  ];

  return (
    <SuperAdminShell title="Banners" description="Home hero, hub strips, and promotional placements.">
      <DataTable title="Active banners" data={rows} columns={columns} className="sa-table-card" />
    </SuperAdminShell>
  );
}
