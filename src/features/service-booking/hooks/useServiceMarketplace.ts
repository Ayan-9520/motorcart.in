import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchServiceCatalog, fetchServiceCenters } from "../services/service-booking.service";
import type { ServiceCatalogItem, ServiceCenter } from "../types";
import { SERVICE_CATEGORIES, type ServiceCategorySlug } from "../types";
import { centerMatchesVehicleHub, parseVehicleHubParam } from "@/lib/vehicle-hub-catalog";

const HOME_TYPE_MAP: Record<string, ServiceCategorySlug | undefined> = {
  wash: "car-wash",
  repair: "car-servicing",
  detailing: "ceramic-coating",
  rsa: undefined,
};

export function useServiceMarketplace() {
  const [params] = useSearchParams();
  const typeParam = params.get("type");
  const cityParam = params.get("city") ?? undefined;
  const hubParam = useMemo(() => parseVehicleHubParam(params.get("hub")), [params]);

  const categoryFilter = useMemo(() => {
    const raw = params.get("category");
    if (raw && SERVICE_CATEGORIES.some((c) => c.slug === raw)) return raw as ServiceCategorySlug;
    if (typeParam && HOME_TYPE_MAP[typeParam]) return HOME_TYPE_MAP[typeParam];
    return undefined;
  }, [params, typeParam]);

  const [centers, setCenters] = useState<ServiceCenter[]>([]);
  const [catalog, setCatalog] = useState<ServiceCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [c, cat] = await Promise.all([
        fetchServiceCenters(cityParam),
        fetchServiceCatalog({ category: categoryFilter }),
      ]);
      let nextCenters = c;
      let nextCatalog = cat;
      if (hubParam) {
        nextCenters = c.filter((x) => centerMatchesVehicleHub(x, hubParam));
        const ids = new Set(nextCenters.map((x) => x.id));
        nextCatalog = cat.filter((s) => ids.has(s.serviceCenterId));
      }
      setCenters(nextCenters);
      setCatalog(nextCatalog);
    } finally {
      setLoading(false);
    }
  }, [cityParam, categoryFilter, hubParam]);

  useEffect(() => {
    void load();
  }, [load]);

  return { centers, catalog, loading, categoryFilter, cityParam, hubParam, reload: load };
}
