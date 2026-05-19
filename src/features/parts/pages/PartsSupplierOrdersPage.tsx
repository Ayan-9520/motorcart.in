import { useEffect, useState } from "react";
import { fetchSellerPartOrders, updatePartOrderTracking } from "../services/parts.service";
import type { PartOrder } from "../types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function PartsSupplierOrdersPage() {
  const [orders, setOrders] = useState<PartOrder[]>([]);
  const [track, setTrack] = useState<Record<string, string>>({});
  const [carrier, setCarrier] = useState<Record<string, string>>({});

  const load = () => fetchSellerPartOrders().then(setOrders);
  useEffect(() => {
    load();
  }, []);

  const ship = async (orderId: string) => {
    const t = track[orderId] ?? "";
    const c = carrier[orderId] ?? "BlueDart";
    if (!t) {
      toast.error("Enter tracking number");
      return;
    }
    const { error } = await updatePartOrderTracking(orderId, t, c);
    if (error) toast.error(error.message);
    else {
      toast.success("Marked shipped");
      load();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders to fulfil</h1>
      <ul className="space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="rounded-xl border bg-card p-4 space-y-3">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-mono text-sm">{o.invoiceNumber ?? o.id}</span>
              <span className="text-sm font-semibold">{formatCurrency(o.grandTotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground">{o.status}</p>
            <div className="flex flex-wrap gap-2">
              <Input placeholder="Tracking #" className="max-w-xs" value={track[o.id] ?? ""} onChange={(e) => setTrack((s) => ({ ...s, [o.id]: e.target.value }))} />
              <Input placeholder="Carrier" className="w-32" value={carrier[o.id] ?? ""} onChange={(e) => setCarrier((s) => ({ ...s, [o.id]: e.target.value }))} />
              <Button size="sm" variant="default" onClick={() => ship(o.id)}>Ship</Button>
            </div>
          </li>
        ))}
      </ul>
      {orders.length === 0 && <p className="text-muted-foreground">No orders with your SKUs yet.</p>}
    </div>
  );
}
