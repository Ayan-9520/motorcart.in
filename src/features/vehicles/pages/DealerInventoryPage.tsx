import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Tag, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { fetchDealerVehicles, createVehicle, updateVehicle, deleteVehicle } from "@/services/vehicle.service";
import type { VehicleListing } from "@/types/vehicle";
import { formatCurrency } from "@/lib/utils";
import { vehicleDetailPath } from "@/lib/vehicle-utils";
import toast from "react-hot-toast";
import { setPageMeta } from "@/utils/seo";

export function DealerInventoryPage() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<VehicleListing[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<VehicleListing | null>(null);
  const [form, setForm] = useState({
    title: "", brand: "", model: "", year: 2024, price: 500000,
    fuelType: "Petrol", transmission: "Manual", bodyType: "SUV",
    category: "used-cars", kmsDriven: 0, owners: 1, city: "Mumbai", state: "Maharashtra",
    condition: "used" as const,
  });

  const load = async () => {
    if (!user) return;
    const list = await fetchDealerVehicles(user.id);
    setVehicles(list.length ? list : []);
  };

  useEffect(() => {
    setPageMeta({ title: "Manage Inventory" });
    load();
  }, [user]);

  const save = async () => {
    if (!user) return;
    if (editing) {
      await updateVehicle(editing.id, form);
      toast.success("Vehicle updated");
    } else {
      await createVehicle(form, user.id);
      toast.success("Vehicle listed");
    }
    setShowForm(false);
    setEditing(null);
    load();
  };

  const markSold = async (id: string) => {
    await updateVehicle(id, { status: "sold" });
    toast.success("Marked as sold");
    load();
  };

  const toggleFeatured = async (v: VehicleListing) => {
    await updateVehicle(v.id, { is_featured: !v.isFeatured } as never);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this listing?")) return;
    await deleteVehicle(id);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button variant="default" className="gap-1" onClick={() => { setEditing(null); setShowForm(true); }}>
          <Plus className="h-4 w-4" /> Add Vehicle
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit Vehicle" : "Add New Vehicle"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {(["title", "brand", "model", "city", "state"] as const).map((k) => (
              <div key={k}>
                <Label className="capitalize">{k}</Label>
                <Input className="mt-1" value={String(form[k as keyof typeof form] ?? "")} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
            <div>
              <Label>Year</Label>
              <Input type="number" className="mt-1" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
            </div>
            <div>
              <Label>Price (₹)</Label>
              <Input type="number" className="mt-1" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <Button variant="default" onClick={save}>Save</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {vehicles.map((v) => (
          <Card key={v.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <img src={v.images[0]} alt="" className="h-24 w-36 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                <Badge variant={v.status === "available" ? "success" : "secondary"}>{v.status}</Badge>
                {v.isFeatured && <Badge>Featured</Badge>}
              </div>
              <h3 className="mt-1 font-semibold">{v.title}</h3>
              <p className="text-primary font-bold">{formatCurrency(v.price)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to={vehicleDetailPath(v)}>View</Link>
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setEditing(v); setForm({ ...form, title: v.title, brand: v.brand, model: v.model, price: v.price, year: v.year }); setShowForm(true); }}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => toggleFeatured(v)}>
                <Star className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => markSold(v.id)}>
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => remove(v.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
