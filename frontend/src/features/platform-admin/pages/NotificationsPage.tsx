import { useCallback, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, Send } from "lucide-react";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
  createPlatformNotification,
  fetchPlatformNotifications,
  sendPlatformNotification,
} from "../services/platform-admin.service";
import type { PlatformNotificationRow } from "../types";
import { AdminErpShell } from "../components/AdminErpShell";
import { SuperAdminStatusBadge } from "../components/SuperAdminStatusBadge";

export function NotificationsPage() {
  const [rows, setRows] = useState<PlatformNotificationRow[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [channel, setChannel] = useState("push");
  const [audience, setAudience] = useState("all");

  const load = useCallback(async () => {
    setRows(await fetchPlatformNotifications());
  }, []);

  useEffect(() => {
    setPageMeta({ title: "Push notifications — Admin ERP" });
    void load();
  }, [load]);

  const create = async () => {
    if (!title.trim()) {
      toast.error("Title required");
      return;
    }
    const { error } = await createPlatformNotification({ title, body, channel, audience });
    if (error) toast.error(error);
    else {
      toast.success("Campaign scheduled");
      setTitle("");
      setBody("");
      void load();
    }
  };

  const send = async (id: string) => {
    const { error } = await sendPlatformNotification(id);
    if (error) toast.error(error);
    else {
      toast.success("Push sent to audience");
      void load();
    }
  };

  const columns: ColumnDef<PlatformNotificationRow>[] = [
    { header: "Title", accessorKey: "title" },
    { header: "Channel", accessorKey: "channel" },
    { header: "Audience", accessorKey: "audience" },
    {
      header: "Status",
      cell: ({ row }) => <SuperAdminStatusBadge status={row.original.status} />,
    },
    {
      header: "",
      cell: ({ row }) =>
        row.original.status !== "sent" ? (
          <Button size="sm" variant="outline" onClick={() => void send(row.original.id)}>
            <Send className="h-3.5 w-3.5 mr-1" /> Send now
          </Button>
        ) : null,
    },
  ];

  return (
    <AdminErpShell
      title="Push & notifications"
      description="Broadcast in-app, email, SMS, and push campaigns to customers and dealers."
    >
      <div className="erp-form-card">
        <h3 className="text-sm font-semibold mb-3">New campaign</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Campaign title" />
          </div>
          <div>
            <Label className="text-xs">Channel</Label>
            <select
              className="erp-select mt-1 w-full"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              <option value="push">Push</option>
              <option value="in_app">In-app</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Message</Label>
            <Input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Notification body" />
          </div>
          <div>
            <Label className="text-xs">Audience</Label>
            <select
              className="erp-select mt-1 w-full"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="all">All users</option>
              <option value="customers">Customers</option>
              <option value="dealers">Dealers</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={() => void create()}>
              <Plus className="h-4 w-4 mr-1" /> Schedule
            </Button>
          </div>
        </div>
      </div>
      <DataTable title="Campaigns" data={rows} columns={columns} className="sa-table-card erp-table" />
    </AdminErpShell>
  );
}
