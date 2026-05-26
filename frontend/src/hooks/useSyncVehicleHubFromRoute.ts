import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { parseBuyMarketplaceRoute } from "@/features/marketplace/lib/route-utils";
import { parseHubCategorySlug } from "@/features/marketplace/lib/route-utils";
import { useVehicleHubStore } from "@/store/vehicleHubStore";

/** Keeps navbar hub + new/used in sync with the current URL on every public page. */
export function useSyncVehicleHubFromRoute(): void {
  const { pathname, search } = useLocation();
  const setBuyContext = useVehicleHubStore((s) => s.setBuyContext);
  const setActiveHub = useVehicleHubStore((s) => s.setActiveHub);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const buyRoute = parseBuyMarketplaceRoute(pathname, params);
    if (buyRoute) {
      setBuyContext(buyRoute.hub, buyRoute.condition);
      return;
    }

    if (pathname.startsWith("/sell/")) {
      const hub = parseHubCategorySlug(pathname.split("/")[2]);
      if (hub) setActiveHub(hub);
      return;
    }

    const partsHub = parseHubCategorySlug(params.get("hub") ?? undefined);
    if (pathname.startsWith("/parts") && partsHub) {
      setActiveHub(partsHub);
      return;
    }
    if (pathname.startsWith("/services") && partsHub) {
      setActiveHub(partsHub);
      return;
    }

    const eco = pathname.replace(/^\//, "").split("/")[0];
    const ecoHub = parseHubCategorySlug(eco);
    if (
      ecoHub &&
      ["cars", "bikes", "trucks", "buses", "ev", "auto"].includes(ecoHub)
    ) {
      setActiveHub(ecoHub);
    }
  }, [pathname, search, setBuyContext, setActiveHub]);
}
