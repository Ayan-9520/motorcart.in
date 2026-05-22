import { cn } from "@/lib/utils";
import type { HubCategorySlug } from "../types";
import { HUB_BUDGET_PRESETS, HUB_EMI_PRESETS } from "../data/hub-filter-catalog";

type MarketplaceFilterChipsProps = {
  hub: HubCategorySlug;
  filters: Record<string, string | number | undefined>;
  onFilter: (key: string, value: string | undefined) => void;
};

export function MarketplaceFilterChips({ hub, filters, onFilter }: MarketplaceFilterChipsProps) {
  const budgets = HUB_BUDGET_PRESETS[hub] ?? [];
  const emis = HUB_EMI_PRESETS[hub] ?? [];

  const activeBudget = budgets.findIndex(
    (b) =>
      String(filters.priceMin ?? "") === String(b.priceMin ?? "") &&
      String(filters.priceMax ?? "") === String(b.priceMax ?? "")
  );

  const activeEmi = emis.findIndex((e) => String(filters.emiMax ?? "") === String(e.emiMax));

  return (
    <div className="marketplace-filter-chips space-y-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
          Budget
        </p>
        <div className="flex flex-wrap gap-1.5">
          {budgets.map((b, i) => (
            <button
              key={b.label}
              type="button"
              className={cn(
                "marketplace-chip",
                activeBudget === i && "marketplace-chip-active"
              )}
              onClick={() => {
                if (activeBudget === i) {
                  onFilter("priceMin", undefined);
                  onFilter("priceMax", undefined);
                } else {
                  onFilter("priceMin", b.priceMin != null ? String(b.priceMin) : undefined);
                  onFilter("priceMax", b.priceMax != null ? String(b.priceMax) : undefined);
                }
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
          EMI
        </p>
        <div className="flex flex-wrap gap-1.5">
          {emis.map((e, i) => (
            <button
              key={e.label}
              type="button"
              className={cn("marketplace-chip", activeEmi === i && "marketplace-chip-active")}
              onClick={() => {
                onFilter("emiMax", activeEmi === i ? undefined : String(e.emiMax));
              }}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
