import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryTabs } from "../components/CategoryTabs";
import { AdvancedSearchBar } from "../components/AdvancedSearchBar";
import { VehicleFilters } from "../components/VehicleFilters";
import { VehicleSortBar } from "../components/VehicleSortBar";
import { VehicleCard } from "../components/VehicleCard";
import { VehiclePagination } from "../components/VehiclePagination";
import { CompareFloatingBar } from "../components/CompareFloatingBar";
import { AIRecommendations } from "../components/AIRecommendations";
import { useVehicleSearch } from "@/hooks/useVehicleSearch";
import { setPageMeta } from "@/utils/seo";
import { VEHICLE_CATEGORIES } from "@/lib/constants";

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  VEHICLE_CATEGORIES.map((c) => [c.id, c.label])
);

export function VehicleListingPage() {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    vehicles,
    total,
    totalPages,
    page,
    loading,
    sort,
    category,
    setFilter,
    setSort,
    setPage,
    clearFilters,
    searchParams,
  } = useVehicleSearch(categoryParam);

  const title = category ? CATEGORY_LABELS[category] ?? "Vehicles" : "All Vehicles";

  useEffect(() => {
    setPageMeta({
      title: `${title} — Buy Online`,
      description: `Browse ${total}+ ${title.toLowerCase()} with EMI calculator, verified dealers & AI recommendations on Motorcart.in`,
    });
  }, [title, total]);

  const filterRecord = Object.fromEntries(searchParams.entries());

  return (
    <div className="wa-pattern min-h-screen">
      <div className="container mx-auto space-y-6 px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-1 text-muted-foreground">
            India&apos;s premium marketplace — verified listings, instant EMI, test drives
          </p>
        </motion.div>

        <CategoryTabs />
        <AdvancedSearchBar onToggleFilters={() => setShowMobileFilters((s) => !s)} />

        <div className="flex gap-8">
          <div className={`hidden w-72 shrink-0 lg:block ${showMobileFilters ? "lg:block" : ""}`}>
            <div className={showMobileFilters ? "fixed inset-0 z-50 overflow-y-auto bg-background/95 p-4 lg:static lg:bg-transparent lg:p-0" : ""}>
              {showMobileFilters && (
                <button type="button" className="mb-4 text-sm text-primary lg:hidden" onClick={() => setShowMobileFilters(false)}>
                  ← Back to results
                </button>
              )}
              <VehicleFilters filters={filterRecord} onFilter={setFilter} onClear={clearFilters} />
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-6">
            <VehicleSortBar sort={sort} total={total} layout={layout} onSort={setSort} onLayout={setLayout} />

            {loading ? (
              <div className={layout === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className={layout === "grid" ? "aspect-[4/3] w-full rounded-xl" : "h-40 w-full rounded-xl"} />
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <div className="rounded-xl border bg-card p-12 text-center">
                <p className="text-lg font-medium">No vehicles found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={layout === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
                {vehicles.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} layout={layout} />
                ))}
              </div>
            )}

            <VehiclePagination page={page} totalPages={totalPages} onPage={setPage} />
            <AIRecommendations pool={vehicles} />
          </div>
        </div>
      </div>
      <CompareFloatingBar />
    </div>
  );
}
