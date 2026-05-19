import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Filter, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { usePartsList } from "../hooks/usePartsList";
import { PartCategoryNav } from "../components/PartCategoryNav";
import { PartCard } from "../components/PartCard";
import { PartsAiRecommendations } from "../components/PartsAiRecommendations";
import { PartsCatalogShell } from "../components/PartsCatalogShell";
import { recommendParts } from "../lib/ai-parts";
import { MOCK_PARTS_CATALOG } from "../data/mock-parts-catalog";
import { parseCategoryParam } from "../lib/part-utils";
import { PART_CATEGORIES } from "../types";
import { usePartsCartStore } from "@/store/partsCartStore";

export function PartsListingPage() {
  const { category: catParam } = useParams<{ category?: string }>();
  const [params, setParams] = useSearchParams();
  const category = parseCategoryParam(catParam);
  const vehicle = params.get("vehicle") ?? "";
  const [q, setQ] = useState(params.get("q") ?? "");
  const { parts, loading } = usePartsList(category, q);
  const cartCount = usePartsCartStore((s) => s.itemCount());

  const filtered = useMemo(() => {
    if (!vehicle) return parts;
    const v = vehicle.toLowerCase();
    return parts.filter(
      (p) =>
        p.name.toLowerCase().includes(v) ||
        p.compatibility.some((c) => c.toLowerCase().includes(v))
    );
  }, [parts, vehicle]);

  const aiPicks = useMemo(
    () =>
      recommendParts(MOCK_PARTS_CATALOG, {
        category: category ?? undefined,
        vehicle: vehicle || undefined,
      }, 6),
    [category, vehicle]
  );

  const catMeta = category ? PART_CATEGORIES.find((c) => c.slug === category) : null;

  useEffect(() => {
    setPageMeta({
      title: catMeta ? `${catMeta.label} — Parts | Motorcart` : "Parts Catalogue — Motorcart",
      description: "Genuine OEM & aftermarket parts with GST invoices, wholesale & COD.",
    });
  }, [catMeta]);

  const applySearch = () => {
    const next = new URLSearchParams(params);
    if (q.trim()) next.set("q", q.trim());
    else next.delete("q");
    setParams(next);
  };

  return (
    <PartsCatalogShell
      title={catMeta ? catMeta.label : "Full parts catalogue"}
      subtitle={
        catMeta
          ? catMeta.description
          : "50,000+ SKUs · filter by category, vehicle fitment & brand"
      }
      category={category}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[12rem] flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search parts…"
            className="rounded-xl pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applySearch()}
          />
        </div>
        <Button className="rounded-xl" onClick={applySearch}>
          Search
        </Button>
        {cartCount > 0 && (
          <Button variant="outline" className="rounded-xl gap-2" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              Cart ({cartCount})
            </Link>
          </Button>
        )}
        {vehicle ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Filter className="h-3 w-3" />
            {vehicle}
          </span>
        ) : null}
      </div>

      <PartCategoryNav active={category ?? "all"} basePath="/parts" />

      <div className="mt-6">
        <PartsAiRecommendations parts={aiPicks} title="PartsBot recommendations" />
      </div>

      <section className="mt-8">
        <p className="mb-4 text-sm text-muted-foreground">
          Showing <strong className="text-foreground">{filtered.length}</strong> products
        </p>

        {loading ? (
          <div className="parts-product-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No products match.{" "}
            <Link to="/parts" className="font-medium text-primary hover:underline">
              Back to parts hub
            </Link>
          </p>
        ) : (
          <div className="parts-product-grid">
            {filtered.map((part, i) => (
              <PartCard key={part.id} part={part} index={i} />
            ))}
          </div>
        )}
      </section>
    </PartsCatalogShell>
  );
}
