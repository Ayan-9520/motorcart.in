import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { usePartsCartStore } from "@/store/partsCartStore";
import { PartsWhatsAppButton } from "../components/PartsWhatsAppButton";

export function PartsCartPage() {
  const { lines, removeLine, setQty, clear, itemCount } = usePartsCartStore();

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <div className="container mx-auto max-w-3xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-bold">Cart ({itemCount()} items)</h1>

      {lines.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty. <Link className="text-primary underline" to="/parts">Shop parts</Link></p>
      ) : (
        <>
          <ul className="space-y-4">
            {lines.map((l) => (
              <li key={l.partId} className="flex gap-4 rounded-xl border bg-card p-4">
                <img src={l.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <Link to={`/parts/${l.categorySlug}/${l.slug}`} className="font-medium hover:text-primary line-clamp-2">{l.name}</Link>
                  <p className="text-sm text-muted-foreground">{formatCurrency(l.price)} / unit · GST {l.gstRate}% incl.</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setQty(l.partId, l.qty - 1)}>−</Button>
                    <span className="w-8 text-center text-sm">{l.qty}</span>
                    <Button size="sm" variant="outline" onClick={() => setQty(l.partId, l.qty + 1)}>+</Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(l.price * l.qty)}</p>
                  <Button variant="ghost" size="icon" className="mt-2 text-destructive" onClick={() => removeLine(l.partId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/40 p-6">
            <div>
              <p className="text-sm text-muted-foreground">Subtotal (incl. GST)</p>
              <p className="text-2xl font-bold">{formatCurrency(subtotal)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PartsWhatsAppButton lines={lines} />
              <Button variant="outline" onClick={clear}>Clear cart</Button>
              <Button variant="default" asChild>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
