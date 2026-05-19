import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useVehicleSearch } from "@/hooks/useVehicleSearch";
import {
  hubCategoryToFilters,
  listingPageTitle,
  parseConditionSlug,
  parseHubCategorySlug,
} from "../lib/route-utils";
import type { HubCategorySlug, VehicleConditionSlug } from "../types";

/** Syncs /buy/:category/:condition route into vehicle search filters */
export function useBuyCategoryListing() {
  const { category: catParam, condition: condParam } = useParams<{
    category: string;
    condition: string;
  }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const hub = parseHubCategorySlug(catParam);
  const condition = parseConditionSlug(condParam);

  const hubFilters = useMemo(() => {
    if (!hub || !condition) return null;
    return hubCategoryToFilters(hub, condition);
  }, [hub, condition]);

  const vehicleCategory = hubFilters?.category;

  useEffect(() => {
    if (!hub || !condition) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        let changed = false;

        if (hub === "cars") {
          const type = condition === "new" ? "new-cars" : "used-cars";
          if (next.get("type") !== type) {
            next.set("type", type);
            changed = true;
          }
          if (next.has("hub")) {
            next.delete("hub");
            changed = true;
          }
        } else if (hub === "auto" || hub === "equipment") {
          if (next.get("hub") !== hub) {
            next.set("hub", hub);
            changed = true;
          }
          if (next.has("type")) {
            next.delete("type");
            changed = true;
          }
        } else {
          if (next.get("type") !== hub) {
            next.set("type", hub);
            changed = true;
          }
          if (next.has("hub")) {
            next.delete("hub");
            changed = true;
          }
        }

        if (next.get("condition") !== condition) {
          next.set("condition", condition);
          changed = true;
        }

        if (!changed) return prev;
        next.delete("page");
        return next;
      },
      { replace: true }
    );
  }, [hub, condition, setSearchParams]);

  const resetHubFilters = () => {
    if (!hub || !condition) return;
    const next = new URLSearchParams();
    if (hub === "cars") {
      next.set("type", condition === "new" ? "new-cars" : "used-cars");
    } else if (hub === "auto" || hub === "equipment") {
      next.set("hub", hub);
    } else {
      next.set("type", hub);
    }
    next.set("condition", condition);
    setSearchParams(next, { replace: true });
  };

  const search = useVehicleSearch(vehicleCategory);

  const title =
    hub && condition ? listingPageTitle(hub, condition) : "Vehicles";

  const switchConditionPath = (next: VehicleConditionSlug) =>
    hub ? `/buy/${hub}/${next}` : "/buy";

  const switchHubPath = (nextHub: HubCategorySlug) =>
    condition ? `/buy/${nextHub}/${condition}` : "/buy";

  return {
    hub,
    condition,
    hubFilters,
    title,
    switchConditionPath,
    switchHubPath,
    invalid: !hub || !condition,
    resetHubFilters,
    ...search,
  };
}
