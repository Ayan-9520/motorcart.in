import { useCallback, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setPageMeta } from "@/utils/seo";
import { useServiceMarketplace } from "../hooks/useServiceMarketplace";
import { ServicesCatalogShell } from "../components/ServicesCatalogShell";
import { ServicesCategoryRail } from "../components/ServicesCategoryRail";
import { ServiceCenterCard } from "../components/ServiceCenterCard";
import { ServiceCatalogCard } from "../components/ServiceCatalogCard";
import { SERVICE_CATEGORIES } from "../types";
import { servicesBrowsePath } from "../data/services-hub-data";
import { VehicleHubFilterRail } from "@/components/vehicle/VehicleHubFilterRail";
import type { HubCategorySlug } from "@/features/marketplace/types";
import { VEHICLE_HUB_ENTRIES } from "@/lib/vehicle-hub-catalog";

export function ServiceMarketplacePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { centers, catalog, loading, categoryFilter, cityParam, hubParam } = useServiceMarketplace();
  const pickupOnly = params.get("pickup") === "1";

  const buildHubHref = useCallback(
    (hub: HubCategorySlug | null) => {
      const next = new URLSearchParams(params);
      if (hub) next.set("hub", hub);
      else next.delete("hub");
      const qs = next.toString();
      return qs ? `/services/browse?${qs}` : "/services/browse";
    },
    [params]
  );

  const hubLabel = hubParam ? VEHICLE_HUB_ENTRIES.find((e) => e.id === hubParam)?.label : null;

  const filteredCenters = useMemo(() => {
    if (!pickupOnly) return centers;
    return centers.filter((c) => c.pickupDropAvailable);
  }, [centers, pickupOnly]);

  const filteredCatalog = useMemo(() => {
    if (!categoryFilter) return catalog;
    return catalog.filter((s) => s.serviceType === categoryFilter);
  }, [catalog, categoryFilter]);

  const catMeta = categoryFilter ? SERVICE_CATEGORIES.find((c) => c.slug === categoryFilter) : null;

  useEffect(() => {
    setPageMeta({
      title: catMeta ? `${catMeta.label} — Services | Motorcart` : "Browse Services — Motorcart",
      description: "Book verified automotive services with live slots and transparent pricing.",
    });
  }, [catMeta]);

  return (
    <ServicesCatalogShell
      title={catMeta ? catMeta.label : "Browse services & centers"}
      subtitle={
        catMeta
          ? `${catMeta.description}${hubLabel ? ` · ${hubLabel}` : ""}`
          : `Filter by vehicle type, category and city${hubLabel ? ` · ${hubLabel}` : ""}`
      }
      category={categoryFilter}
    >
      <div className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Vehicle type
        </p>
        <VehicleHubFilterRail activeHub={hubParam} buildHref={buildHubHref} />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[12rem] max-w-sm flex-1">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            defaultValue={cityParam ?? ""}
            placeholder="Filter by city…"
            className="rounded-xl pl-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const v = (e.target as HTMLInputElement).value.trim();
                navigate(
                  servicesBrowsePath({
                    city: v || undefined,
                    category: categoryFilter,
                    hub: hubParam ?? undefined,
                  })
                );
              }
            }}
          />
        </div>
        <Button variant="outline" className="rounded-xl gap-2" asChild>
          <Link to="/services/my-bookings">
            <Search className="h-4 w-4" />
            My bookings
          </Link>
        </Button>
        {pickupOnly ? (
          <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Pickup &amp; drop only
          </span>
        ) : null}
        {hubLabel ? (
          <span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground">
            {hubLabel}
          </span>
        ) : null}
      </div>

      <ServicesCategoryRail active={categoryFilter ?? "all"} />

      <section className="mt-10" id="centers">
        <h2 className="services-hub-section-title">Verified centers</h2>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">
          {filteredCenters.length} centers {cityParam ? `in ${cityParam}` : "available"}
        </p>
        {loading ? (
          <div className="services-centers-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-2xl" />
            ))}
          </div>
        ) : filteredCenters.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No centers match. <Link to="/services" className="text-primary hover:underline">Back to hub</Link>
          </p>
        ) : (
          <div className="services-centers-grid">
            {filteredCenters.map((c, i) => (
              <ServiceCenterCard key={c.id} center={c} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-12" id="catalog">
        <h2 className="services-hub-section-title">Book a service</h2>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">
          {filteredCatalog.length} services · prices include GST where applicable
        </p>
        {loading ? (
          <div className="services-catalog-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-2xl" />
            ))}
          </div>
        ) : filteredCatalog.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No services in this category.</p>
        ) : (
          <div className="services-catalog-grid">
            {filteredCatalog.map((s, i) => (
              <ServiceCatalogCard key={s.id} service={s} index={i} />
            ))}
          </div>
        )}
      </section>
    </ServicesCatalogShell>
  );
}
