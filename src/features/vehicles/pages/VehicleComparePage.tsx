import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GitCompare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";
import { searchVehicles } from "@/services/vehicle.service";
import { formatCurrency } from "@/lib/utils";
import { getDiscountedPrice, getVehicleEmi, vehicleDetailPath } from "@/lib/vehicle-utils";
import type { VehicleListing } from "@/types/vehicle";
import { setPageMeta } from "@/utils/seo";
import { AICompareInsights } from "@/ai/ecosystem";

const ROWS: { key: keyof VehicleListing | "emi" | "price"; label: string; fmt?: (v: VehicleListing) => string }[] = [
  { key: "price", label: "Price", fmt: (v) => formatCurrency(getDiscountedPrice(v)) },
  { key: "emi", label: "EMI/mo", fmt: (v) => formatCurrency(getVehicleEmi(v)) },
  { key: "year", label: "Year", fmt: (v) => String(v.year) },
  { key: "kmsDriven", label: "KM Driven", fmt: (v) => v.kmsDriven.toLocaleString() },
  { key: "fuelType", label: "Fuel" },
  { key: "transmission", label: "Transmission" },
  { key: "owners", label: "Owners", fmt: (v) => String(v.owners) },
  { key: "bodyType", label: "Body" },
  { key: "city", label: "City" },
];

export function VehicleComparePage() {
  const { compare, removeCompare, clearCompare } = useVehicleMarketStore();
  const [pool, setPool] = useState<VehicleListing[]>(MOCK_VEHICLES);

  useEffect(() => {
    setPageMeta({ title: "Compare Vehicles" });
    searchVehicles({ filters: {}, sort: "newest", page: 1, pageSize: 100 }).then((r) => {
      if (r.vehicles.length) setPool(r.vehicles);
    });
  }, []);

  const vehicles = compare.map((id) => pool.find((v) => v.id === id)).filter(Boolean) as VehicleListing[];

  if (!vehicles.length) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <GitCompare className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">No vehicles to compare</h1>
        <p className="mt-2 text-muted-foreground">Add up to 4 vehicles from listings</p>
        <Button variant="default" className="mt-6" asChild>
          <Link to="/vehicles">Browse vehicles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Compare Vehicles</h1>
        <Button variant="ghost" size="sm" onClick={clearCompare}>Clear all</Button>
      </div>

      <AICompareInsights vehicles={vehicles} />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left font-medium text-muted-foreground">Spec</th>
              {vehicles.map((v) => (
                <th key={v.id} className="min-w-[180px] p-3 align-top">
                  <Card className="overflow-hidden">
                    <img src={v.images[0]} alt="" className="aspect-video w-full object-cover" />
                    <div className="p-3 text-left">
                      <Link to={vehicleDetailPath(v)} className="line-clamp-2 font-semibold hover:text-primary">
                        {v.title}
                      </Link>
                      <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-2 h-7 w-7" onClick={() => removeCompare(v.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-t">
                <td className="p-3 font-medium text-muted-foreground">{row.label}</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-3 text-center font-medium">
                    {row.fmt ? row.fmt(v) : String(v[row.key as keyof VehicleListing] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
