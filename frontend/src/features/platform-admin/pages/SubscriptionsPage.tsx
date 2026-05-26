import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { formatCurrency } from "@/lib/utils";
import { fetchSubscriptionPlans } from "../services/platform-admin.service";
import type { SubscriptionPlanRow } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";

export function SubscriptionsPage() {
  const [rows, setRows] = useState<SubscriptionPlanRow[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Subscriptions — Super Admin" });
    void fetchSubscriptionPlans().then(setRows);
  }, []);

  const columns: ColumnDef<SubscriptionPlanRow>[] = [
    { header: "Plan", accessorKey: "name" },
    { header: "Code", accessorKey: "code" },
    {
      header: "Price / mo",
      cell: ({ row }) => formatCurrency(row.original.priceMonthly),
    },
    { header: "Max listings", accessorKey: "maxListings" },
    { header: "Active dealers", accessorKey: "activeDealers" },
  ];

  return (
    <SuperAdminShell title="Subscriptions" description="Dealer plans, caps, and active subscriber counts.">
      <DataTable title="Subscription plans" data={rows} columns={columns} className="sa-table-card" />
    </SuperAdminShell>
  );
}
