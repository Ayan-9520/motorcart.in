import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchSellerParts, updatePartStock } from "@/features/parts/services/parts.service";
import type { PartProduct } from "@/features/parts/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";
import toast from "react-hot-toast";

export function PartsSupplierInventoryPage() {
  const { user } = useAuth();
  const [parts, setParts] = useState<PartProduct[]>([]);

  useEffect(() => {
    setPageMeta({ title: "Inventory & stock" });
    if (!user) return;
    fetchSellerParts(user.id).then(setParts);
  }, [user]);

  const saveStock = async (id: string, stock: number) => {
    const { error } = await updatePartStock(id, stock);
    if (error) toast.error(error.message);
    else {
      toast.success("Stock updated");
      if (user) fetchSellerParts(user.id).then(setParts);
    }
  };

  return (
    <PartsSupplierShell
      title="Inventory & stock"
      description="Warehouse quantities · reserved · rack codes"
    >
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="psp-table w-full text-sm">
          <thead>
            <tr>
              <th>Product</th>
              <th>Origin</th>
              <th>MRP</th>
              <th>Wholesale</th>
              <th>Stock</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {parts.map((p) => (
              <InventoryRow key={p.id} part={p} onSave={saveStock} />
            ))}
          </tbody>
        </table>
      </div>
      {parts.length === 0 && (
        <p className="mt-4 text-muted-foreground">No products yet — add your first SKU from Add product.</p>
      )}
    </PartsSupplierShell>
  );
}

function InventoryRow({ part, onSave }: { part: PartProduct; onSave: (id: string, stock: number) => void }) {
  const [stock, setStock] = useState(part.stock);
  return (
    <tr>
      <td className="font-medium">{part.name}</td>
      <td>{part.partOrigin}</td>
      <td>{formatCurrency(part.price)}</td>
      <td>{part.wholesalePrice != null ? formatCurrency(part.wholesalePrice) : "—"}</td>
      <td>
        <Input type="number" className="w-24" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
      </td>
      <td>
        <Button size="sm" variant="outline" className="rounded-lg" onClick={() => onSave(part.id, stock)}>
          Save
        </Button>
      </td>
    </tr>
  );
}
