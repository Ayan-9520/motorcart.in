import { useCallback, useEffect, useState } from "react";
import {
  fetchCenterReviews,
  fetchServiceCatalog,
  fetchServiceCenterBySlug,
} from "../services/service-booking.service";
import type { ServiceCatalogItem, ServiceCenter } from "../types";

export function useServiceCenterDetail(slug: string | undefined) {
  const [center, setCenter] = useState<ServiceCenter | null>(null);
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);
  const [reviews, setReviews] = useState<{ id: string; rating: number; title: string | null; content: string | null; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!slug) {
      setCenter(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const c = await fetchServiceCenterBySlug(slug);
      setCenter(c);
      const [svc, rev] = await Promise.all([
        fetchServiceCatalog({ centerId: c?.id }),
        c ? fetchCenterReviews(c.id) : Promise.resolve([]),
      ]);
      setServices(svc);
      setReviews(rev);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  return { center, services, reviews, loading, reload: load };
}
