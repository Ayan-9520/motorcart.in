import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VehicleListing } from "@/types/vehicle";

export function Specifications({ vehicle }: { vehicle: VehicleListing }) {
  const specs = vehicle.metadata.specifications ?? {};
  const rows: [string, string][] = [
    ["Brand", vehicle.brand],
    ["Model", vehicle.model],
    ["Variant", vehicle.variant ?? "—"],
    ["Year", String(vehicle.year)],
    ["Fuel", vehicle.fuelType],
    ["Transmission", vehicle.transmission],
    ["Body Type", vehicle.bodyType],
    ["KM Driven", vehicle.kmsDriven.toLocaleString()],
    ["Owners", String(vehicle.owners)],
    ["Color", vehicle.color ?? "—"],
    ["City", vehicle.city],
    ...Object.entries(specs).flatMap(([k, v]) => {
      if (Array.isArray(v)) return [[k, v.join(", ")] as [string, string]];
      if (typeof v === "string") return [[k, v] as [string, string]];
      return [];
    }),
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-2 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 rounded-lg bg-muted/50 px-3 py-2 text-sm sm:flex-col sm:gap-0">
              <dt className="text-muted-foreground capitalize">{label.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        {vehicle.features.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">Features</p>
            <div className="flex flex-wrap gap-2">
              {vehicle.features.map((f) => (
                <span key={f} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
