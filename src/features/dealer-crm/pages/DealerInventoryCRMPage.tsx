import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Star, CheckCircle, Sparkles, Wand2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BulkUploadZone } from "../components/BulkUploadZone";
import { InventoryOptimizer } from "../components/InventoryOptimizer";
import { useDealer } from "../hooks/useDealer";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { createVehicle, updateVehicle, deleteVehicle } from "@/services/vehicle.service";
import { fetchDealerVehiclesByDealerId } from "../services/dealer.service";
import { generateAISpecs } from "../lib/excel-parser";
import { mapDbToListing } from "@/services/vehicle.service";
import type { DbVehicle } from "@/types/database";
import type { VehicleListing } from "@/types/vehicle";
import { formatCurrency } from "@/lib/utils";
import { vehicleDetailPath } from "@/lib/vehicle-utils";
import toast from "react-hot-toast";
import { setPageMeta } from "@/utils/seo";

export function DealerInventoryCRMPage() {
  const { dealer, user } = useDealer();
  const { refetch: refetchCRM } = useDealerCRM();
  const [vehicles, setVehicles] = useState<VehicleListing[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<VehicleListing | null>(null);
  const [form, setForm] = useState({
    title: "", brand: "", model: "", variant: "", year: 2024, price: 500000,
    fuelType: "Petrol", transmission: "Manual", bodyType: "SUV",
    category: "used-cars", kmsDriven: 0, owners: 1, city: "Mumbai", state: "Maharashtra",
    color: "", description: "", imageUrl: "",
    condition: "used" as const, discount: 0,
  });

  const load = async () => {
    if (!dealer) return;
    const rows = await fetchDealerVehiclesByDealerId(dealer.id);
    if (rows.length) {
      setVehicles(rows.map((v) => mapDbToListing(v as DbVehicle)));
    }
  };

  useEffect(() => {
    setPageMeta({ title: "Inventory Management" });
    load();
  }, [dealer]);

  const aiFillSpecs = () => {
    if (!form.brand || !form.model) {
      toast.error("Enter brand and model first");
      return;
    }
    const specs = generateAISpecs({
      rowNumber: 0,
      brand: form.brand,
      model: form.model,
      year: form.year,
      fuel: form.fuelType,
      transmission: form.transmission,
      kmsDriven: form.kmsDriven,
      ownership: form.owners,
      price: form.price,
      registrationState: form.state,
    });
    setForm((f) => ({
      ...f,
      description: f.description || `${form.year} ${form.brand} ${form.model} — ${specs.mileage}, ${specs.engine}.`,
    }));
    toast.success("AI filled description & specs");
  };

  const save = async () => {
    if (!user || !dealer) return;
    const payload = {
      title: form.title || `${form.year} ${form.brand} ${form.model}`,
      brand: form.brand,
      model: form.model,
      variant: form.variant,
      year: form.year,
      price: form.price,
      fuelType: form.fuelType,
      transmission: form.transmission,
      bodyType: form.bodyType,
      category: form.category,
      kmsDriven: form.kmsDriven,
      owners: form.owners,
      color: form.color,
      city: form.city,
      state: form.state,
      description: form.description,
      images: form.imageUrl ? [form.imageUrl] : [],
      condition: form.condition,
      metadata: {
        discountPercent: form.discount,
        specifications: generateAISpecs({
          rowNumber: 0,
          brand: form.brand,
          model: form.model,
          year: form.year,
          fuel: form.fuelType,
          transmission: form.transmission,
          kmsDriven: form.kmsDriven,
          ownership: form.owners,
          price: form.price,
          registrationState: form.state,
        }),
      },
    };

    if (editing) {
      await updateVehicle(editing.id, payload);
      toast.success("Updated");
    } else {
      await createVehicle(payload, user.id, dealer.id);
      toast.success("Vehicle added");
    }
    setShowForm(false);
    setEditing(null);
    load();
    refetchCRM();
  };

  const markSold = async (id: string) => {
    await updateVehicle(id, { status: "sold" });
    toast.success("Marked sold");
    load();
  };

  const toggleFeatured = async (v: VehicleListing) => {
    await updateVehicle(v.id, { is_featured: !v.isFeatured } as never);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete listing?")) return;
    await deleteVehicle(id);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Manual add, bulk upload, AI optimizer</p>
        </div>
        <Button variant="default" className="gap-1" onClick={() => { setEditing(null); setShowForm(true); }}>
          <Plus className="h-4 w-4" /> Add manually
        </Button>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">All inventory</TabsTrigger>
          <TabsTrigger value="upload">Bulk upload</TabsTrigger>
          <TabsTrigger value="optimizer">AI optimizer</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4 mt-4">
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {editing ? "Edit vehicle" : "Add vehicle"}
                  <Button type="button" variant="outline" size="sm" className="gap-1" onClick={aiFillSpecs}>
                    <Wand2 className="h-4 w-4" /> AI auto-fill specs
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(["brand", "model", "variant", "title", "city", "state", "color", "imageUrl", "description"] as const).map((k) => (
                  <div key={k} className={k === "description" ? "sm:col-span-2 lg:col-span-3" : ""}>
                    <Label className="capitalize">{k === "imageUrl" ? "Main image URL" : k}</Label>
                    <Input
                      className="mt-1"
                      value={String(form[k] ?? "")}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    />
                  </div>
                ))}
                <div><Label>Year</Label><Input type="number" className="mt-1" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} /></div>
                <div><Label>Price (₹)</Label><Input type="number" className="mt-1" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
                <div><Label>KM driven</Label><Input type="number" className="mt-1" value={form.kmsDriven} onChange={(e) => setForm({ ...form, kmsDriven: Number(e.target.value) })} /></div>
                <div><Label>Discount %</Label><Input type="number" className="mt-1" value={form.discount} onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })} /></div>
                <div className="sm:col-span-2 lg:col-span-3 flex gap-2">
                  <Button variant="default" onClick={save}>Save listing</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {vehicles.map((v) => (
              <Card key={v.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img src={v.images[0]} alt="" className="h-24 w-36 rounded-lg object-cover bg-muted" />
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={v.status === "available" ? "success" : "secondary"}>{v.status}</Badge>
                    {v.isFeatured && <Badge>Featured</Badge>}
                    {v.metadata.discountPercent ? <Badge className="bg-destructive text-white">{v.metadata.discountPercent}% off</Badge> : null}
                  </div>
                  <h3 className="mt-1 font-semibold">{v.title}</h3>
                  <p className="text-primary font-bold">{formatCurrency(v.price)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild><Link to={vehicleDetailPath(v)}>View</Link></Button>
                  <Button size="sm" variant="outline" onClick={() => { setEditing(v); setShowForm(true); }}><Pencil className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => toggleFeatured(v)}><Star className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => markSold(v.id)}><CheckCircle className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => remove(v.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </Card>
            ))}
            {!vehicles.length && (
              <Card className="p-12 text-center text-muted-foreground">
                <Sparkles className="h-10 w-10 mx-auto mb-3 text-primary opacity-50" />
                No inventory yet. Add manually or bulk upload Excel.
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <BulkUploadZone dealer={dealer} sellerId={user?.id} onComplete={() => { load(); refetchCRM(); }} />
        </TabsContent>

        <TabsContent value="optimizer" className="mt-4">
          <InventoryOptimizer vehicles={vehicles} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
