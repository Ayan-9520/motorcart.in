import { useEffect, useState } from "react";
import { fetchPublicDealerBySlug } from "@/features/dealer-crm/services/dealer-enterprise.service";

export function usePublicDealer(slug: string | undefined) {
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchPublicDealerBySlug>>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    void fetchPublicDealerBySlug(slug).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [slug]);

  return { data, loading };
}
