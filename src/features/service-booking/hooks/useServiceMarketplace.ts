import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchServiceCatalog, fetchServiceCenters } from "../services/service-booking.service";
import type { ServiceCatalogItem, ServiceCenter } from "../types";
import { SERVICE_CATEGORIES, type ServiceCategorySlug } from "../types";

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
      setCenters(c);
      setCatalog(cat);
    } finally {
      setLoading(false);
    }
  }, [cityParam, categoryFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  return { centers, catalog, loading, categoryFilter, cityParam, reload: load };
}
