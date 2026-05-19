import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MOCK_PUBLIC_DEALERS } from "../data/dealers-hub-data";
import type { DealerVertical, PublicDealer } from "../types";

export interface DealerDirectoryFilters {
  q: string;
  city: string;
  vertical: DealerVertical | "";
  verifiedOnly: boolean;
}

function matchesQuery(dealer: PublicDealer, q: string): boolean {
  if (!q.trim()) return true;
  const needle = q.toLowerCase();
  return (
    dealer.name.toLowerCase().includes(needle) ||
    dealer.city.toLowerCase().includes(needle) ||
    dealer.brands.some((b) => b.toLowerCase().includes(needle)) ||
    dealer.specialties.some((s) => s.toLowerCase().includes(needle))
  );
}

export function useDealerDirectory(override?: Partial<DealerDirectoryFilters>) {
  const [searchParams] = useSearchParams();

  const filters: DealerDirectoryFilters = {
    q: override?.q ?? searchParams.get("q") ?? "",
    city: override?.city ?? searchParams.get("city") ?? "",
    vertical: (override?.vertical ?? (searchParams.get("vertical") as DealerVertical | null) ?? "") as DealerVertical | "",
    verifiedOnly: override?.verifiedOnly ?? searchParams.get("verified") === "1",
  };

  const dealers = useMemo(() => {
    return MOCK_PUBLIC_DEALERS.filter((d) => {
      if (filters.verifiedOnly && !d.isVerified) return false;
      if (filters.vertical && d.vertical !== filters.vertical) return false;
      if (filters.city && filters.city !== "All cities" && d.city !== filters.city) return false;
      return matchesQuery(d, filters.q);
    });
  }, [filters.city, filters.q, filters.verifiedOnly, filters.vertical]);

  return { dealers, filters, total: MOCK_PUBLIC_DEALERS.length };
}

export function getDealerBySlug(slug: string): PublicDealer | undefined {
  return MOCK_PUBLIC_DEALERS.find((d) => d.slug === slug);
}
