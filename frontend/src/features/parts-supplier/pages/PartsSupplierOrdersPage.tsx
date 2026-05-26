import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchSellerPartOrders,
  updatePartOrderTracking,
  updatePartOrderStatus,
} from "@/features/parts/services/parts.service";
import type { PartOrder } from "@/features/parts/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { OrderTrackingTimeline } from "@/features/parts/components/OrderTrackingTimeline";
import { usePartsSupplierOS } from "../hooks/usePartsSupplierOS";
import { setPageMeta } from "@/utils/seo";
import toast from "react-hot-toast";

export function PartsSupplierOrdersPage() {
  const { data } = usePartsSupplierOS();
  const [orders, setOrders] = useState<PartOrder[]>([]);
  const [track, setTrack] = useState<Record<string, string>>({});
  const [carrier, setCarrier] = useState<Record<string, string>>({});

  const load = () => fetchSellerPartOrders().then(setOrders);
  useEffect(() => {
    setPageMeta({ title: "Order management" });
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

  const displayOrders = orders.length > 0 ? orders : null;

  return (
    <PartsSupplierShell title="Live orders" description="Amazon-style pipeline — confirm, pack, ship, deliver">
      {data ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {data.pipeline.map((p) => (
            <span key={p.stage} className="psp-pipeline-pill">
              {p.label}: <strong>{p.count}</strong>
            </span>
          ))}
        </div>
      ) : null}

      {displayOrders ? (
        <div className="space-y-4">
          {displayOrders.map((o) => (
            <article key={o.id} className="psp-order-card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Link to={`/dashboard/parts/orders/${o.id}`} className="font-semibold text-primary hover:underline">
                    {o.invoiceNumber ?? o.id.slice(0, 8)}
                  </Link>
                  <p className="text-sm text-slate-400">{o.status} · {formatCurrency(o.grandTotal)}</p>
                </div>
                <div className="flex gap-2">
                  {o.status === "pending" && (
                    <Button size="sm" className="rounded-lg" onClick={() => confirm(o.id)}>
                      Confirm
                    </Button>
                  )}
                </div>
              </div>
              <OrderTrackingTimeline status={o.status} />
              {["confirmed", "packed"].includes(o.status) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Input
                    placeholder="Tracking #"
                    className="max-w-[180px]"
                    value={track[o.id] ?? ""}
                    onChange={(e) => setTrack((s) => ({ ...s, [o.id]: e.target.value }))}
                  />
                  <Input
                    placeholder="Carrier"
                    className="max-w-[120px]"
                    value={carrier[o.id] ?? "BlueDart"}
                    onChange={(e) => setCarrier((s) => ({ ...s, [o.id]: e.target.value }))}
                  />
                  <Button size="sm" variant="outline" className="rounded-lg" onClick={() => ship(o.id)}>
                    Mark shipped
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(data?.orders ?? []).map((o) => (
            <Link key={o.id} to={`/dashboard/parts/orders/${o.id}`} className="psp-order-card block hover:border-amber-500/40">
              <p className="font-semibold">{o.orderNo}</p>
              <p className="text-sm text-slate-400">
                {o.customerName} · {o.city} · {o.status} · {formatCurrency(o.grandTotal)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </PartsSupplierShell>
  );
}
