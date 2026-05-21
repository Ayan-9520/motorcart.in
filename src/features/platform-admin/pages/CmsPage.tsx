import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { fetchCmsPages } from "../services/platform-admin.service";
import type { CmsPageRow } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function CmsPage() {
  const [rows, setRows] = useState<CmsPageRow[]>([]);

  useEffect(() => {
    setPageMeta({ title: "CMS — Super Admin" });
    void fetchCmsPages().then(setRows);
  }, []);

  const columns: ColumnDef<CmsPageRow>[] = [
    { header: "Title", accessorKey: "title" },
    { header: "Slug", cell: ({ row }) => <code className="text-xs">/{row.original.slug}</code> },
    {
      header: "Status",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.status} />,
    },
    {
      header: "Updated",
      cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString("en-IN"),
    },
  ];

  return (
    <SuperAdminShell
      title="CMS"
      description="Legal, marketing, and help content for the public site."
      actions={
        <Button size="sm" onClick={() => toast("Page editor — connect to CMS table")}>
          <Plus className="h-4 w-4 mr-1" /> New page
        </Button>
      }
    >
      <DataTable title="Pages" data={rows} columns={columns} className="sa-table-card" />
    </SuperAdminShell>
  );
}
