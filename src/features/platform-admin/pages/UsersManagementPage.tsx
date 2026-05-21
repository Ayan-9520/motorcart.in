import { useCallback, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import type { UserStatus } from "@/types/database";
import { fetchAdminUsers, updateAdminUser } from "../services/platform-admin.service";
import type { AdminUserRow } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function UsersManagementPage() {
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setRows(await fetchAdminUsers());
    setLoading(false);
  }, []);

  useEffect(() => {
    setPageMeta({ title: "Users — Super Admin" });
    void load();
  }, [load]);

  const setStatus = async (id: string, status: UserStatus) => {
    const { error } = await updateAdminUser(id, { status });
    if (error) toast.error(error);
    else {
      toast.success("User updated");
      void load();
    }
  };

  const columns: ColumnDef<AdminUserRow>[] = [
    { header: "Name", accessorKey: "fullName" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", cell: ({ row }) => <span className="text-xs font-mono">{row.original.role}</span> },
    {
      header: "Status",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.status} />,
    },
    {
      header: "KYC",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.kycStatus} />,
    },
    { header: "City", accessorKey: "city" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          {row.original.status !== "suspended" ? (
            <Button size="sm" variant="outline" onClick={() => void setStatus(row.original.id, "suspended")}>
              Suspend
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => void setStatus(row.original.id, "active")}>
              Activate
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <SuperAdminShell title="User management" description="Directory, roles, account status, and access reviews.">
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading users…</p>
      ) : (
        <DataTable title="All users" data={rows} columns={columns} emptyLabel="No users found." className="sa-table-card" />
      )}
    </SuperAdminShell>
  );
}
