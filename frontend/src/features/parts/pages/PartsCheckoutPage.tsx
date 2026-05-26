import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { usePartsCartStore } from "@/store/partsCartStore";
import { useAuth } from "@/hooks/useAuth";
import { submitPartOrder } from "../services/parts.service";
import toast from "react-hot-toast";

export function PartsCheckoutPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { lines, clear, itemCount } = usePartsCartStore();
  const [pay, setPay] = useState<"cod" | "online" | "whatsapp">("cod");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const placeOrder = async () => {
    if (!isAuthenticated || !user) {
      toast.error("Please login");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    if (lines.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setBusy(true);
    const result = await submitPartOrder({
      items: lines.map((l) => ({ part_id: l.partId, qty: l.qty })),
      payment_method: pay,
      shipping: { name, phone, line1, city, state, pin, userId: user.id },
      cod: pay === "cod",
    });
    setBusy(false);
    if (result.ok) {
      const id = String((result.data as { order_id: string }).order_id);
      clear();
      toast.success("Order placed!");
      navigate(`/orders/${id}`);
    } else {
      toast.error("Order failed");
    }
  };

  if (lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Nothing to checkout.</p>
        <Button className="mt-4" asChild><Link to="/parts">Browse parts</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <section className="rounded-xl border p-6 space-y-4">
        <h2 className="font-semibold">Shipping</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div><Label>Full name</Label><Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Phone</Label><Input className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="sm:col-span-2"><Label>Address</Label><Input className="mt-1" value={line1} onChange={(e) => setLine1(e.target.value)} /></div>
          <div><Label>City</Label><Input className="mt-1" value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div><Label>State</Label><Input className="mt-1" value={state} onChange={(e) => setState(e.target.value)} /></div>
          <div><Label>PIN</Label><Input className="mt-1" value={pin} onChange={(e) => setPin(e.target.value)} /></div>
        </div>
      </section>

      <section className="rounded-xl border p-6 space-y-3">
        <h2 className="font-semibold">Payment</h2>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="pay" checked={pay === "cod"} onChange={() => setPay("cod")} />
          Cash on Delivery (COD)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="pay" checked={pay === "online"} onChange={() => setPay("online")} />
          Pay online (UPI / card) — coming soon
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="pay" checked={pay === "whatsapp"} onChange={() => setPay("whatsapp")} />
          Confirm via WhatsApp
        </label>
      </section>

      <div className="rounded-xl bg-primary/5 p-6 flex items-center justify-between">
        <span className="font-medium">Total ({itemCount()} pcs)</span>
        <span className="text-2xl font-bold text-primary">{formatCurrency(subtotal)}</span>
      </div>

      <Button variant="default" className="w-full h-12" disabled={busy || !name || !phone || !line1} onClick={placeOrder}>
        {busy ? "Placing order…" : "Place order & generate invoice"}
      </Button>
    </div>
  );
}
