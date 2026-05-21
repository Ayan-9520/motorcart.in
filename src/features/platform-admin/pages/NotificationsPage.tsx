import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { fetchPlatformNotifications } from "../services/platform-admin.service";
import type { PlatformNotificationRow } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function NotificationsPage() {
  const [rows, setRows] = useState<PlatformNotificationRow[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Notifications — Super Admin" });
    void fetchPlatformNotifications().then(setRows);
  }, []);

  const columns: ColumnDef<PlatformNotificationRow>[] = [
    { header: "Title", accessorKey: "title" },
    { header: "Channel", accessorKey: "channel" },
    { header: "Audience", accessorKey: "audience" },
    {
      header: "Status",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.status} />,
    },
  ];

  return (
    <SuperAdminShell title="Notifications" description="Broadcast in-app, email, and push campaigns.">
      <DataTable title="Campaigns" data={rows} columns={columns} className="sa-table-card" />
    </SuperAdminShell>
  );
}
