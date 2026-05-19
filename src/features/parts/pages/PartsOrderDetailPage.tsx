import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import type { PartOrder } from "../types";
import { fetchPartOrderById } from "../services/parts.service";

export function PartsOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<PartOrder | null | undefined>(undefined);

  useEffect(() => {
    if (!user || !id) return;
    fetchPartOrderById(user.id, id).then(setOrder);
  }, [user, id]);

  useEffect(() => {
    if (!id || !user) return;
    const ch = supabase
      .channel(`order-${id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "part_orders", filter: `id=eq.${id}` },
        () => user && fetchPartOrderById(user.id, id).then(setOrder)
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [id, user]);

  if (order === undefined) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-muted-foreground">Loading order…</p>
        <Button variant="link" asChild><Link to="/orders">All orders</Link></Button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-muted-foreground">Order not found</p>
        <Button variant="link" asChild><Link to="/orders">All orders</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Button variant="ghost" size="sm" asChild><Link to="/orders">← Orders</Link></Button>
      <h1 className="text-2xl font-bold">Order {order.invoiceNumber ?? order.id.slice(0, 8)}</h1>
      <Badge>{order.status}</Badge>
      <p className="text-sm text-muted-foreground">Payment: {order.paymentMethod} {order.codConfirmed && "· COD"}</p>
      {order.trackingNumber && (
        <p className="text-sm">Tracking: <strong>{order.carrier}</strong> {order.trackingNumber}</p>
      )}
      <ul className="space-y-2 border rounded-xl p-4">
        {order.items.map((i) => (
          <li key={i.id} className="flex justify-between text-sm">
            <span>{i.qty} × part</span>
            <span>{formatCurrency(i.lineTotal)}</span>
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold">Total {formatCurrency(order.grandTotal)}</p>
      <Button asChild>
        <Link to={`/orders/${order.id}/invoice`}>View GST invoice</Link>
      </Button>
    </div>
  );
}
