import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VehicleHubFilterRail } from "@/components/vehicle/VehicleHubFilterRail";
import { parseVehicleHubParam } from "@/lib/vehicle-hub-catalog";
import type { HubCategorySlug } from "@/features/marketplace/types";
import { partsBrowsePath } from "../data/parts-hub-data";

export function PartsHubHero() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activeHub = useMemo(() => parseVehicleHubParam(params.get("hub")), [params]);
  const [query, setQuery] = useState("");

  const buildHubHref = (hub: HubCategorySlug | null) => {
    const next = new URLSearchParams(params);
    if (hub) next.set("hub", hub);
    else next.delete("hub");
    const qs = next.toString();
    return qs ? `/parts?${qs}` : "/parts";
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(
      partsBrowsePath({
        q: query.trim() || undefined,
        hub: activeHub ?? undefined,
      })
    );
  };

  return (
    <section className="parts-hub-hero">
      <div className="container">
        <p className="parts-hub-eyebrow">Motorcart Parts · B2B &amp; retail</p>
        <h1 className="parts-hub-title">
          India&apos;s <span className="text-primary">fintech-grade</span> parts marketplace
        </h1>
        <p className="parts-hub-subtitle">
          OEM &amp; aftermarket for cars, bikes, commercial vehicles, trucks, buses &amp; equipment — GST invoices,
          wholesale pricing, COD &amp; same-day metro delivery
        </p>

        <div className="mb-4 mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Shop by vehicle type
          </p>
          <VehicleHubFilterRail activeHub={activeHub} buildHref={buildHubHref} />
        </div>

        <form onSubmit={onSearch} className="parts-hub-search">
          <div className="parts-hub-search-input flex min-w-0 flex-1 items-center gap-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search part name, SKU, brand…"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <Button type="submit" className="parts-hub-search-btn h-12 shrink-0 rounded-xl px-6 font-semibold md:px-8">
            Search parts
          </Button>
        </form>
      </div>
    </section>
  );
}
