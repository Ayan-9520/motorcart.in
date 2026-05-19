import { useCallback, useEffect, useState } from "react";
import { fetchParts } from "../services/parts.service";
import type { PartCategorySlug, PartProduct } from "../types";

export function usePartsList(category?: PartCategorySlug, search?: string) {
  const [parts, setParts] = useState<PartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await fetchParts({ category, search: search || undefined });
    setParts(list);
    setLoading(false);
  }, [category, search]);

  useEffect(() => {
    load();
  }, [load]);

  return { parts, loading, refetch: load };
}
