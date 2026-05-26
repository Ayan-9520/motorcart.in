import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { DataTable } from "@/shared/ui/data-table/DataTable";
import { insuranceApplyPath } from "../lib/insurance-routes";
import { planTypeLabel } from "../lib/insurance-premium";
import type { InsuranceQuoteOffer } from "../types";

const columns: ColumnDef<InsuranceQuoteOffer>[] = [
  {
    id: "insurer",
    accessorKey: "partnerName",
    header: "Insurer",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BrandLogo src={row.original.logoUrl ?? ""} alt={row.original.partnerName} size="sm" />
        <span className="font-medium">{row.original.partnerName}</span>
      </div>
    ),
  },
  {
    id: "plan",
    accessorKey: "planType",
    header: "Plan",
    cell: ({ row }) => planTypeLabel(row.original.planType),
  },
  {
    id: "premium",
    accessorKey: "annualPremium",
    header: "Premium / yr",
    cell: ({ row }) => (
      <span className="font-bold text-primary tabular-nums">
        {formatCurrency(row.original.annualPremium)}
      </span>
    ),
  },
  {
    id: "idv",
    accessorKey: "idvAmount",
    header: "IDV",
    cell: ({ row }) => formatCurrency(row.original.idvAmount),
  },
  {
    id: "csr",
    accessorKey: "claimSettlementRatio",
    header: "CSR %",
    cell: ({ row }) => `${row.original.claimSettlementRatio}%`,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Button size="sm" asChild>
        <Link to={insuranceApplyPath(row.original.id, row.original.vehicleType)}>Buy</Link>
      </Button>
    ),
  },
];

interface InsuranceCompareTableProps {
  offers: InsuranceQuoteOffer[];
  loading?: boolean;
}

export function InsuranceCompareTable({ offers, loading }: InsuranceCompareTableProps) {
  if (loading && offers.length === 0) {
    return <p className="text-muted-foreground py-8 text-center">Loading quotes…</p>;
  }

  if (!loading && offers.length === 0) {
    return (
      <p className="text-muted-foreground py-8 text-center rounded-xl border border-dashed">
        No plans for this combination. Try another plan type or vehicle.
      </p>
    );
  }

  return (
    <DataTable
      title="All offers"
      data={offers}
      columns={columns}
      emptyLabel="No offers to compare."
      className="ins-table-card"
    />
  );
}
