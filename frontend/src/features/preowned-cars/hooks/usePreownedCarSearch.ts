import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filtersFromSearchParams } from "@/lib/vehicle-utils";
import type { FairPriceLabel, VehicleSortOption } from "@/types/vehicle";
import { searchPreownedCars } from "../services/preowned-cars.service";
import type { PreownedCarFilters, PreownedCarListing } from "../types";

const PAGE_SIZE = 12;

export function usePreownedCarSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<PreownedCarListing[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const sort = (searchParams.get("sort") as VehicleSortOption) || "newest";
  const page = Number(searchParams.get("page") || "1");
  const filters = { ...filtersFromSearchParams(searchParams), category: undefined as never };

  const preowned: PreownedCarFilters = {
    certifiedOnly: searchParams.get("certified") === "1",
    warrantyIncluded: searchParams.get("warranty") === "1",
    fairPrice: (searchParams.get("fairPrice") as FairPriceLabel) || undefined,
  };

  const load = useCallback(async () => {
    setLoading(true);
    const result = await searchPreownedCars({ filters, preowned, sort, page, pageSize: PAGE_SIZE });
    setVehicles(result.vehicles as PreownedCarListing[]);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setLoading(false);
  }, [JSON.stringify(filters), JSON.stringify(preowned), sort, page]);

  useEffect(() => {
    load();
  }, [load]);

  const setFilter = (key: string, value: string | undefined) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next, { replace: true });
  };

  const setSort = (s: VehicleSortOption) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", s);
    next.delete("page");
    setSearchParams(next, { replace: true });
  };

  const setPage = (p: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(p));
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => setSearchParams(new URLSearchParams(), { replace: true });

  return {
    vehicles,
    total,
    totalPages,
    page,
    loading,
    sort,
    preowned,
    setFilter,
    setSort,
    setPage,
    clearFilters,
    searchParams,
  };
}
