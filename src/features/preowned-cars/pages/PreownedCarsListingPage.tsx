import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleSortBar } from "@/features/vehicles/components/VehicleSortBar";
import { VehiclePagination } from "@/features/vehicles/components/VehiclePagination";
import { CompareFloatingBar } from "@/features/vehicles/components/CompareFloatingBar";
import { PreownedCarCard } from "../components/PreownedCarCard";
import { PreownedCarFilters } from "../components/PreownedCarFilters";
import { usePreownedCarSearch } from "../hooks/usePreownedCarSearch";
import { setPageMeta } from "@/utils/seo";

export function PreownedCarsListingPage() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const {
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
  } = usePreownedCarSearch();

  useEffect(() => {
    setPageMeta({
      title: "Browse Certified Pre-Owned Cars",
      description: "Inspected pre-owned cars with AI fair price, warranty & loan options on Motorcart.in",
    });
  }, [total]);

  const filterRecord = Object.fromEntries(searchParams.entries());

  return (
    <div className="wa-pattern min-h-screen">
      <div className="container mx-auto space-y-6 px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/used-cars" className="hover:text-primary">
            Pre-Owned Cars
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Browse</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold md:text-4xl">Certified pre-owned</h1>
          <p className="mt-1 text-muted-foreground">{total}+ inspected listings · AI fair price · dealer verified</p>
        </motion.div>

        <div className="flex gap-8">
          <div className="hidden w-72 shrink-0 lg:block">
            <PreownedCarFilters
              filters={filterRecord}
              preowned={preowned}
              onFilter={setFilter}
              onClear={clearFilters}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-6">
            <VehicleSortBar sort={sort} total={total} layout={layout} onSort={setSort} onLayout={setLayout} />
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[16/10] w-full rounded-xl" />
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">No certified cars match your filters.</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((v, i) => (
                  <PreownedCarCard key={v.id} vehicle={v} index={i} />
                ))}
              </div>
            )}
            <VehiclePagination page={page} totalPages={totalPages} onPage={setPage} />
          </div>
        </div>
      </div>
      <CompareFloatingBar />
    </div>
  );
}
