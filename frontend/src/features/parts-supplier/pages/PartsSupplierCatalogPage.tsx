import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { usePartsSupplierOS } from "../hooks/usePartsSupplierOS";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PartsSupplierCatalogPage() {
  const { data, loading } = usePartsSupplierOS();

  useEffect(() => setPageMeta({ title: "Product catalog" }), []);

  return (
    <PartsSupplierShell
      title="All products"
      description="SKU · OEM code · compatibility · GST-ready catalogue"
      actions={
        <Button className="rounded-xl bg-green-600 hover:bg-green-500" asChild>
          <Link to="/dashboard/parts/upload">Add product</Link>
        </Button>
      }
    >
      {loading ? (
        <p className="text-muted-foreground">Loading catalogue…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="psp-table w-full text-sm">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Part</th>
                <th>Brand</th>
                <th>Stock</th>
                <th>Retail</th>
                <th>Margin</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {(data?.catalog ?? []).map((p) => (
                <tr key={p.id}>
                  <td className="font-mono text-xs">{p.sku}</td>
                  <td>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.oemCode}</p>
                  </td>
                  <td>{p.brand}</td>
                  <td>
                    {p.stock}
                    {p.reserved > 0 ? <span className="text-xs text-slate-500"> ({p.reserved} res.)</span> : null}
                  </td>
                  <td>{formatCurrency(p.retailPrice)}</td>
                  <td>{p.marginPct}%</td>
                  <td>
                    <span
                      className={cn(
                        "psp-badge",
                        p.stockHealth === "fast" && "psp-badge--success",
                        p.stockHealth === "low" && "psp-badge--warning",
                        p.stockHealth === "dead" && "psp-badge--danger"
                      )}
                    >
                      {p.stockHealth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-sm text-slate-400">
        Compatibility engine maps each SKU to make / model / year — open{" "}
        <Link to="/dashboard/parts/compatibility" className="text-green-400 hover:underline">
          compatibility
        </Link>
        .
      </p>
    </PartsSupplierShell>
  );
}
