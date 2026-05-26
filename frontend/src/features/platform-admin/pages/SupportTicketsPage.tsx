import { useCallback, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { fetchSupportTickets, updateSupportTicket } from "../services/platform-admin.service";
import type { PlatformTicketStatus, SupportTicketRow } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function SupportTicketsPage() {
  const [rows, setRows] = useState<SupportTicketRow[]>([]);

  const load = useCallback(async () => {
    setRows(await fetchSupportTickets());
  }, []);

  useEffect(() => {
    setPageMeta({ title: "Support — Super Admin" });
    void load();
  }, [load]);

  const setStatus = async (id: string, status: PlatformTicketStatus) => {
    const { error } = await updateSupportTicket(id, status);
    if (error) toast.error(error);
    else {
      toast.success("Ticket updated");
      void load();
    }
  };

  const columns: ColumnDef<SupportTicketRow>[] = [
    { header: "Subject", accessorKey: "subject" },
    { header: "Category", accessorKey: "category" },
    {
      header: "Priority",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.priority} />,
    },
    {
      header: "Status",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.status} />,
    },
    { header: "Requester", accessorKey: "requesterEmail" },
    {
      header: "Actions",
      cell: ({ row }) =>
        row.original.status !== "resolved" ? (
          <Button size="sm" onClick={() => void setStatus(row.original.id, "resolved")}>
            Resolve
          </Button>
        ) : null,
    },
  ];

  return (
    <SuperAdminShell title="Support tickets" description="Helpdesk queue, escalations, and SLA tracking.">
      <DataTable title="Open tickets" data={rows} columns={columns} className="sa-table-card" />
    </SuperAdminShell>
  );
}
