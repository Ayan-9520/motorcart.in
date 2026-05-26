import { useCallback, useEffect, useState } from "react";
import { fetchParts } from "../services/parts.service";
import type { HubCategorySlug } from "@/features/marketplace/types";
import type { PartCategorySlug, PartOrigin, PartProduct } from "../types";

export function usePartsList(
  category?: PartCategorySlug,
  search?: string,
  hub?: HubCategorySlug | null,
  origin?: PartOrigin
) {
  const [parts, setParts] = useState<PartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await fetchParts({
      category,
      search: search || undefined,
      hub: hub ?? undefined,
      origin,
    });
    setParts(list);
    setLoading(false);
  }, [category, search, hub, origin]);

  useEffect(() => {
    load();
  }, [load]);

  return { parts, loading, refetch: load };
}
