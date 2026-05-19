import { Link } from "react-router-dom";
import { GitCompare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { MOCK_VEHICLES } from "@/data/vehicle-catalog";

export function CompareFloatingBar() {
  const { compare, removeCompare, clearCompare } = useVehicleMarketStore();
  if (!compare.length) return null;

  const items = compare.map((id) => MOCK_VEHICLES.find((v) => v.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 items-center gap-3 rounded-2xl border bg-card p-3 shadow-2xl">
      <GitCompare className="h-5 w-5 shrink-0 text-primary" />
      <p className="flex-1 text-sm font-medium">{compare.length} vehicle(s) selected</p>
      <div className="hidden gap-1 sm:flex">
        {items.slice(0, 3).map((v) => (
          <span key={v!.id} className="max-w-[100px] truncate rounded bg-muted px-2 py-0.5 text-xs">
            {v!.brand} {v!.model}
          </span>
        ))}
      </div>
      <Button variant="default" size="sm" asChild>
        <Link to="/vehicles/compare">Compare</Link>
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearCompare}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
