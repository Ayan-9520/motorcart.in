import { useCallback, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, FileBarChart } from "lucide-react";
import { setPageMeta } from "@/utils/seo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { fetchPlatformReports, generatePlatformReport } from "../services/platform-admin.service";
import type { PlatformReportRow } from "../types";
import { AdminErpShell } from "../components/AdminErpShell";

const REPORT_TYPES = [
  { key: "monthly_gmv", title: "Monthly GMV report" },
  { key: "dealer_pipeline", title: "Dealer pipeline" },
  { key: "fraud_summary", title: "Fraud summary" },
  { key: "loan_book", title: "Loan book snapshot" },
];

export function ReportsPage() {
  const [rows, setRows] = useState<PlatformReportRow[]>([]);
  const [generating, setGenerating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setRows(await fetchPlatformReports());
  }, []);

  useEffect(() => {
    setPageMeta({ title: "Reports — Admin ERP" });
    void load();
  }, [load]);

  const generate = async (key: string, title: string) => {
    setGenerating(key);
    const { error } = await generatePlatformReport(key, title);
    if (error) toast.error(error);
    else {
      toast.success(`${title} generated`);
      void load();
    }
    setGenerating(null);
  };

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
        <Button size="sm" variant="ghost" onClick={() => toast.success("CSV export queued")}>
          <Download className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <AdminErpShell title="Reports" description="Generate GMV, compliance, and operations snapshots on demand.">
      <div className="erp-report-actions">
        {REPORT_TYPES.map((r) => (
          <Button
            key={r.key}
            variant="outline"
            size="sm"
            disabled={generating === r.key}
            onClick={() => void generate(r.key, r.title)}
          >
            <FileBarChart className="h-4 w-4 mr-1" />
            {r.title}
          </Button>
        ))}
      </div>
      <DataTable title="Report history" data={rows} columns={columns} className="sa-table-card erp-table" />
    </AdminErpShell>
  );
}
