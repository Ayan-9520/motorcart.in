import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AdvancedSearchBar } from "@/features/vehicles/components/AdvancedSearchBar";
import { VehicleFilters } from "@/features/vehicles/components/VehicleFilters";
import { VehicleSortBar } from "@/features/vehicles/components/VehicleSortBar";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { VehiclePagination } from "@/features/vehicles/components/VehiclePagination";
import { CompareFloatingBar } from "@/features/vehicles/components/CompareFloatingBar";
import { AIRecommendations } from "@/features/vehicles/components/AIRecommendations";
import { setPageMeta } from "@/utils/seo";
import { BUY_HUB_CATEGORIES } from "../data/buy-hub-categories";
import { buyListingPath, hubCategoryLabel } from "../lib/route-utils";
import { useBuyCategoryListing } from "../hooks/useBuyCategoryListing";
import type { VehicleConditionSlug } from "../types";

export function BuyCategoryListingPage() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    hub,
    condition,
    title,
    invalid,
    vehicles,
    total,
    totalPages,
    page,
    loading,
    sort,
    setFilter,
    setSort,
    setPage,
    resetHubFilters,
    searchParams,
    switchConditionPath,
    switchHubPath,
  } = useBuyCategoryListing();

  const filterRecord = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    if (!title) return;
    setPageMeta({
      title: `${title} — Buy on Motorcart`,
      description: `Browse ${total}+ ${title.toLowerCase()} with side filters, verified dealers & EMI on Motorcart.in`,
    });
  }, [title, total]);

  if (invalid || !hub || !condition) {
    return <Navigate to="/buy" replace />;
  }

  const hubLabel = hubCategoryLabel(hub);

  return (
    <div className="marketplace-listing-page min-h-screen">
      <motion.div className="container py-6 md:py-8">
        <nav className="marketplace-breadcrumb mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link to="/buy" className="hover:text-primary">
            Buy
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={buyListingPath(hub, "new")} className="hover:text-primary">
            {hubLabel}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground">{condition === "new" ? "New" : "Used"}</span>
        </nav>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="marketplace-listing-title">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Premium listings · verified dealers · instant EMI
              {searchParams.get("q") ? (
                <span className="text-foreground">
                  {" "}
                  · Results for &quot;{searchParams.get("q")}&quot;
                </span>
              ) : null}
            </p>
          </div>
          <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
            {(["new", "used"] as VehicleConditionSlug[]).map((c) => (
              <Link
                key={c}
                to={switchConditionPath(c)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                  condition === c
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c === "new" ? <Sparkles className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                {c === "new" ? "New" : "Used"}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {BUY_HUB_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={switchHubPath(cat.id)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                hub === cat.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="mt-5">
          <AdvancedSearchBar onToggleFilters={() => setShowMobileFilters((s) => !s)} />
        </div>

        <div className="mt-6 flex gap-6 lg:gap-8">
          <aside
            className={cn(
              "hidden w-64 shrink-0 lg:block xl:w-72",
              showMobileFilters && "fixed inset-0 z-50 block overflow-y-auto bg-background/98 p-4 lg:static lg:bg-transparent lg:p-0"
            )}
          >
            {showMobileFilters && (
              <button
                type="button"
                className="mb-4 text-sm font-medium text-primary lg:hidden"
                onClick={() => setShowMobileFilters(false)}
              >
                ← Back to results
              </button>
            )}
            <VehicleFilters filters={filterRecord} onFilter={setFilter} onClear={resetHubFilters} />
          </aside>

          <div className="min-w-0 flex-1 space-y-5">
            <VehicleSortBar
              sort={sort}
              total={total}
              layout={layout}
              onSort={setSort}
              onLayout={setLayout}
            />

            {loading ? (
              <div
                className={
                  layout === "grid"
                    ? "vehicle-listing-grid marketplace-results-grid"
                    : "space-y-3"
                }
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className={
                      layout === "grid"
                        ? "h-72 w-full rounded-xl"
                        : "h-36 w-full rounded-xl"
                    }
                  />
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-10 text-center">
                <p className="text-base font-semibold">No vehicles found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
                <Link to="/buy" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                  ← Back to buy hub
                </Link>
              </div>
            ) : (
              <div
                className={
                  layout === "grid"
                    ? "vehicle-listing-grid marketplace-results-grid"
                    : "space-y-3"
                }
              >
                {vehicles.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} layout={layout} />
                ))}
              </div>
            )}

            <VehiclePagination page={page} totalPages={totalPages} onPage={setPage} />
            <AIRecommendations pool={vehicles} />
          </div>
        </div>
      </motion.div>
      <CompareFloatingBar />
    </div>
  );
}
