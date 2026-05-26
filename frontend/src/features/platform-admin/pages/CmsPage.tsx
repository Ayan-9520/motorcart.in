import { useCallback, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { fetchCmsPages, upsertCmsPage } from "../services/platform-admin.service";
import type { CmsPageRow } from "../types";
import { AdminErpShell } from "../components/AdminErpShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function CmsPage() {
  const [rows, setRows] = useState<CmsPageRow[]>([]);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const load = useCallback(async () => {
    setRows(await fetchCmsPages());
  }, []);

  useEffect(() => {
    setPageMeta({ title: "CMS — Admin ERP" });
    void load();
  }, [load]);

  const save = async () => {
    if (!slug.trim() || !title.trim()) {
      toast.error("Slug and title required");
      return;
    }
    const { error } = await upsertCmsPage({ slug, title, body, status });
    if (error) toast.error(error);
    else {
      toast.success("Page saved");
      setSlug("");
      setTitle("");
      setBody("");
      void load();
    }
  };

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
    <AdminErpShell
      title="CMS management"
      description="Legal, marketing, and help content for the public site."
      actions={
        <Button size="sm" variant="outline" onClick={() => void save()}>
          <Plus className="h-4 w-4 mr-1" /> Quick save
        </Button>
      }
    >
      <div className="erp-form-card">
        <h3 className="text-sm font-semibold mb-3">Page editor</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="about-us" />
          </div>
          <div>
            <Label className="text-xs">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Body (HTML / markdown)</Label>
            <Input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Page content…" />
          </div>
          <div>
            <Label className="text-xs">Status</Label>
            <select
              className="erp-select mt-1 w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={() => void save()}>Save page</Button>
          </div>
        </div>
      </div>
      <DataTable title="Pages" data={rows} columns={columns} className="sa-table-card erp-table" />
    </AdminErpShell>
  );
}
