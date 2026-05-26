import { Label } from "@/components/ui/label";
import { VehicleFilters } from "@/features/vehicles/components/VehicleFilters";
import type { FairPriceLabel } from "@/types/vehicle";

interface PreownedCarFiltersProps {
  filters: Record<string, string>;
  preowned: { certifiedOnly?: boolean; warrantyIncluded?: boolean; fairPrice?: FairPriceLabel };
  onFilter: (key: string, value: string | undefined) => void;
  onClear: () => void;
}

export function PreownedCarFilters({ filters, preowned, onFilter, onClear }: PreownedCarFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">Certified & trust</p>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={preowned.certifiedOnly ?? false}
              onChange={(e) => onFilter("certified", e.target.checked ? "1" : undefined)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            Certified only
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={preowned.warrantyIncluded ?? false}
              onChange={(e) => onFilter("warranty", e.target.checked ? "1" : undefined)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            Warranty included
          </label>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">AI fair price</Label>
            <select
              value={preowned.fairPrice ?? ""}
              onChange={(e) => onFilter("fairPrice", e.target.value || undefined)}
              className="mc-input h-9 w-full text-xs"
            >
              <option value="">Any</option>
              <option value="great-deal">Great Deal</option>
              <option value="fair-price">Fair Price</option>
              <option value="high-price">High Price</option>
            </select>
          </div>
        </div>
      </div>
      <VehicleFilters filters={filters} onFilter={onFilter} onClear={onClear} />
    </div>
  );
}
