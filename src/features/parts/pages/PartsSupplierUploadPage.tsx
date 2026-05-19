import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { insertPart } from "../services/parts.service";
import { PART_CATEGORIES } from "../types";
import type { PartCategorySlug } from "../types";
import { slugifyPartName } from "../lib/part-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export function PartsSupplierUploadPage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PartCategorySlug>("accessories");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(999);
  const [wholesale, setWholesale] = useState<number | "">("");
  const [stock, setStock] = useState(10);
  const [bulkMin, setBulkMin] = useState(1);
  const [gst, setGst] = useState(18);
  const [image, setImage] = useState("https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80");
  const [compat, setCompat] = useState("");

  const submit = async () => {
    if (!user) {
      toast.error("Login as parts seller");
      return;
    }
    const slug = `${slugifyPartName(name)}-${Date.now().toString(36).slice(-4)}`;
    const { error } = await insertPart(user.id, {
      name,
      slug,
      category,
      brand: brand || undefined,
      price,
      stock,
      images: [image],
      compatibility: compat.split(",").map((s) => s.trim()).filter(Boolean),
      wholesale_price: wholesale === "" ? undefined : Number(wholesale),
      bulk_min_qty: bulkMin,
      gst_rate: gst,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Product listed");
      setName("");
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Product upload</h1>
      <div className="space-y-4 rounded-xl border bg-card p-6">
        <div>
          <Label>Product name</Label>
          <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Category</Label>
          <select className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value as PartCategorySlug)}>
            {PART_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Brand</Label>
          <Input className="mt-1" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>MRP (₹, GST incl.)</Label>
            <Input type="number" className="mt-1" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Wholesale (₹)</Label>
            <Input type="number" className="mt-1" value={wholesale} onChange={(e) => setWholesale(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Stock qty</Label>
            <Input type="number" className="mt-1" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
          </div>
          <div>
            <Label>Bulk minimum</Label>
            <Input type="number" className="mt-1" value={bulkMin} onChange={(e) => setBulkMin(Number(e.target.value))} />
          </div>
        </div>
        <div>
          <Label>GST %</Label>
          <Input type="number" className="mt-1" value={gst} onChange={(e) => setGst(Number(e.target.value))} />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input className="mt-1" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div>
          <Label>Compatibility (comma separated)</Label>
          <Input className="mt-1" value={compat} onChange={(e) => setCompat(e.target.value)} placeholder="Swift, i20, Creta" />
        </div>
        <Button variant="default" className="w-full" onClick={submit} disabled={!name}>Publish product</Button>
      </div>
    </div>
  );
}
