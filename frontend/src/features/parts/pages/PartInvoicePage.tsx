import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { fetchPartOrderById } from "../services/parts.service";
import type { PartOrder } from "../types";
import { splitGstInclusive } from "../lib/gst-invoice";

export function PartInvoicePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<PartOrder | null | undefined>(undefined);

  useEffect(() => {
    if (!user || !id) return;
    fetchPartOrderById(user.id, id).then(setOrder);
  }, [user, id]);

  if (order === undefined) {
    return <p className="p-8 text-center text-muted-foreground">Loading…</p>;
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <p>Invoice not found</p>
        <Button variant="link" asChild><Link to="/orders">Orders</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 print:py-4">
      <div className="mb-6 flex justify-between print:hidden">
        <Button variant="outline" asChild><Link to={`/orders/${order.id}`}>← Order</Link></Button>
        <Button type="button" onClick={() => window.print()}>Print / Save PDF</Button>
      </div>

      <article className="rounded-2xl border bg-card p-8 shadow-card print:shadow-none">
        <header className="flex flex-wrap justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary">{SITE_NAME}</h1>
            <p className="text-sm text-muted-foreground">GST Invoice — Auto Parts</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-mono font-semibold">{order.invoiceNumber}</p>
            <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-muted-foreground">{SITE_URL}</p>
          </div>
        </header>

        <section className="mt-6 grid gap-6 sm:grid-cols-2 text-sm">
          <div>
            <h2 className="font-semibold text-primary">Bill to</h2>
            <p className="mt-2 whitespace-pre-line">
              {(order.shippingAddress.name as string) ?? "Customer"}
              <br />
              {String(order.shippingAddress.line1 ?? "")}
              <br />
              {String(order.shippingAddress.city ?? "")}, {String(order.shippingAddress.state ?? "")} {String(order.shippingAddress.pin ?? "")}
              <br />
              Ph: {String(order.shippingAddress.phone ?? "")}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-primary">Supply summary</h2>
            <p className="mt-2 text-muted-foreground">HSN/SAC as per applicable auto parts classification. Prices GST-inclusive.</p>
          </div>
        </section>

        <table className="mt-8 w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="p-3">Item</th>
              <th className="p-3">Qty</th>
              <th className="p-3 text-right">Taxable</th>
              <th className="p-3 text-right">GST</th>
              <th className="p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((line) => {
              const { taxable, gst } = splitGstInclusive(Math.round(line.lineTotal * 100), line.gstRate);
              return (
                <tr key={line.id} className="border-b">
                  <td className="p-3">{line.partName ?? line.partId.slice(0, 8)}</td>
                  <td className="p-3">{line.qty}</td>
                  <td className="p-3 text-right">{formatCurrency(taxable)}</td>
                  <td className="p-3 text-right">{formatCurrency(gst)}</td>
                  <td className="p-3 text-right font-medium">{formatCurrency(line.lineTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <footer className="mt-8 flex justify-end border-t pt-6 text-sm">
          <div className="w-64 space-y-1">
            <div className="flex justify-between"><span>Taxable value</span><span>{formatCurrency(order.subtotal)}</span></div>
            <div className="flex justify-between"><span>Total GST</span><span>{formatCurrency(order.gstTotal)}</span></div>
            <div className="flex justify-between text-lg font-bold text-primary"><span>Grand total</span><span>{formatCurrency(order.grandTotal)}</span></div>
          </div>
        </footer>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          This is a computer-generated document. For support, contact parts@motorcart.in
        </p>
      </article>
    </div>
  );
}
