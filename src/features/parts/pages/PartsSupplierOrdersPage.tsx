import { useEffect, useState } from "react";
import {
  fetchSellerPartOrders,
  updatePartOrderTracking,
  updatePartOrderStatus,
} from "../services/parts.service";
import type { PartOrder } from "../types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { OrderTrackingTimeline } from "../components/OrderTrackingTimeline";
import toast from "react-hot-toast";

export function PartsSupplierOrdersPage() {
  const [orders, setOrders] = useState<PartOrder[]>([]);
  const [track, setTrack] = useState<Record<string, string>>({});
  const [carrier, setCarrier] = useState<Record<string, string>>({});

  const load = () => fetchSellerPartOrders().then(setOrders);
  useEffect(() => {
    void load();
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
      void load();
    }
  };

  const confirm = async (orderId: string) => {
    const { error } = await updatePartOrderStatus(orderId, "confirmed");
    if (error) toast.error(error.message);
    else {
      toast.success("Order confirmed");
      void load();
    }
  };

  return (
    <PartsSupplierShell title="Order management" subtitle="Fulfil B2B & retail part orders with live tracking">
      <ul className="space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="parts-order-card">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-mono text-sm">{o.invoiceNumber ?? o.id.slice(0, 8)}</span>
              <span className="font-semibold">{formatCurrency(o.grandTotal)}</span>
            </div>
            <OrderTrackingTimeline
              status={o.status}
              trackingNumber={o.trackingNumber}
              carrier={o.carrier}
            />
            {o.status === "pending" && (
              <Button size="sm" variant="outline" onClick={() => void confirm(o.id)}>
                Confirm order
              </Button>
            )}
            {(o.status === "confirmed" || o.status === "packed") && (
              <div className="flex flex-wrap gap-2 mt-2">
                <Input
                  placeholder="Tracking #"
                  className="max-w-xs"
                  value={track[o.id] ?? ""}
                  onChange={(e) => setTrack((s) => ({ ...s, [o.id]: e.target.value }))}
                />
                <Input
                  placeholder="Carrier"
                  className="w-32"
                  value={carrier[o.id] ?? ""}
                  onChange={(e) => setCarrier((s) => ({ ...s, [o.id]: e.target.value }))}
                />
                <Button size="sm" onClick={() => void ship(o.id)}>
                  Dispatch
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {orders.length === 0 && (
        <p className="text-center py-12 text-muted-foreground">No orders with your SKUs yet.</p>
      )}
    </PartsSupplierShell>
  );
}
