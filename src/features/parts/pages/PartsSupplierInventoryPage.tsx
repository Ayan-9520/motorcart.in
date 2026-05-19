import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchSellerParts, updatePartStock } from "../services/parts.service";
import type { PartProduct } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export function PartsSupplierInventoryPage() {
  const { user } = useAuth();
  const [parts, setParts] = useState<PartProduct[]>([]);

  useEffect(() => {
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory & stock</h1>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">MRP</th>
              <th className="p-3">Wholesale</th>
              <th className="p-3">Stock</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {parts.map((p) => (
              <InventoryRow key={p.id} part={p} onSave={saveStock} />
            ))}
          </tbody>
        </table>
      </div>
      {parts.length === 0 && <p className="text-muted-foreground">No products yet — add your first listing.</p>}
    </div>
  );
}

function InventoryRow({ part, onSave }: { part: PartProduct; onSave: (id: string, stock: number) => void }) {
  const [stock, setStock] = useState(part.stock);
  return (
    <tr className="border-b">
      <td className="p-3 font-medium">{part.name}</td>
      <td className="p-3">{formatCurrency(part.price)}</td>
      <td className="p-3">{part.wholesalePrice != null ? formatCurrency(part.wholesalePrice) : "—"}</td>
      <td className="p-3">
        <Input type="number" className="w-24" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
      </td>
      <td className="p-3">
        <Button size="sm" variant="outline" onClick={() => onSave(part.id, stock)}>Save</Button>
      </td>
    </tr>
  );
}
