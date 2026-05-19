import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { fetchMyPartOrders } from "../services/parts.service";
import type { PartOrder } from "../types";
import { Badge } from "@/components/ui/badge";

export function PartsOrdersListPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<PartOrder[]>([]);

  useEffect(() => {
    if (!user) return;
    fetchMyPartOrders(user.id).then(setOrders);
  }, [user]);

  if (!user) {
    return <p className="p-8 text-center text-muted-foreground"><Link className="text-primary underline" to="/login">Login</Link> to track orders.</p>;
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold">Order tracking</h1>
      <ul className="space-y-3">
        {orders.map((o) => (
          <li key={o.id}>
            <Link to={`/orders/${o.id}`} className="flex items-center justify-between rounded-xl border bg-card p-4 hover:border-primary/40">
              <div>
                <p className="font-medium">{o.invoiceNumber ?? o.id.slice(0, 8)}</p>
                <p className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <Badge className="mb-1">{o.status}</Badge>
                <p className="font-semibold">{formatCurrency(o.grandTotal)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {orders.length === 0 && <p className="text-center text-muted-foreground py-12">No orders yet.</p>}
    </div>
  );
}
