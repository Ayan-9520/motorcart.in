import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setPageMeta } from "@/utils/seo";
import { usePartsCartStore } from "@/store/partsCartStore";
import { PartsHubHero } from "../components/PartsHubHero";
import { PartsServicesStrip } from "../components/PartsServicesStrip";
import { PartsHubCategoryCard } from "../components/PartsHubCategoryCard";
import { PartsBrandStrip } from "../components/PartsBrandStrip";
import { PartCard } from "../components/PartCard";
import { PartsAiRecommendations } from "../components/PartsAiRecommendations";
import { PART_CATEGORIES, PARTS_TRUST_STATS } from "../data/parts-hub-data";
import { partsBrowsePath } from "../data/parts-hub-data";
import { MOCK_PARTS_CATALOG } from "../data/mock-parts-catalog";
import { recommendParts } from "../lib/ai-parts";
import { usePartsList } from "../hooks/usePartsList";

export function PartsHubPage() {
  const cartCount = usePartsCartStore((s) => s.itemCount());
  const { parts, loading } = usePartsList(undefined, "");
  const featured = useMemo(() => MOCK_PARTS_CATALOG.filter((p) => p.isFeatured).slice(0, 8), []);
  const aiPicks = useMemo(() => recommendParts(MOCK_PARTS_CATALOG, {}, 6), []);

  useEffect(() => {
    setPageMeta({
      title: "Auto Parts Marketplace — Motorcart",
      description:
        "Premium B2B & retail spare parts — GST invoice, wholesale, COD, AI fitment & fast delivery across India.",
    });
  }, []);

  return (
    <div className="parts-hub-page min-h-screen">
      <PartsHubHero />

      <div className="container -mt-2 mb-6 flex flex-wrap justify-center gap-3">
        {PARTS_TRUST_STATS.map(({ label, sub }) => (
          <span key={sub} className="parts-hub-stat-pill">
            <strong>{label}</strong> {sub}
          </span>
        ))}
        {cartCount > 0 ? (
          <Link to="/cart" className="parts-hub-stat-pill border-primary/40 bg-primary/5 text-primary">
            <ShoppingCart className="h-3.5 w-3.5" />
            <strong>{cartCount}</strong> in cart
          </Link>
        ) : null}
      </div>

      <PartsServicesStrip />

      <section className="container pb-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="parts-hub-section-title">Shop by category</h2>
            <p className="mt-1 text-sm text-muted-foreground">9 verticals · OEM &amp; aftermarket</p>
          </div>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to={partsBrowsePath()}>
              Full catalogue <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="parts-hub-category-grid">
          {PART_CATEGORIES.map((cat) => (
            <PartsHubCategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      <PartsBrandStrip />

      <section className="container border-t border-border/80 pb-10 pt-8">
        <PartsAiRecommendations parts={aiPicks} title="PartsBot — AI matched for your garage" />

        <div className="mt-10 mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="parts-hub-section-title">Featured deals</h2>
            <p className="mt-1 text-sm text-muted-foreground">GST-inclusive · bulk MOQ shown</p>
          </div>
          <Button className="rounded-xl shadow-[var(--shadow-primary)]" asChild>
            <Link to={partsBrowsePath()}>
              <Package className="mr-2 h-4 w-4" />
              Browse all SKUs
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="parts-product-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="parts-product-grid">
            {(featured.length ? featured : parts.slice(0, 8)).map((part, i) => (
              <PartCard key={part.id} part={part} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="container pb-14">
        <div className="parts-fintech-banner">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Fintech for garages</p>
            <h3 className="mt-2 text-xl font-bold md:text-2xl">GST credit notes · pay later · dealer slabs</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Download invoices from orders, unlock wholesale after KYC, and split payments via finance partners.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-xl" asChild>
              <Link to="/login?redirect=/parts/browse">Unlock wholesale</Link>
            </Button>
            <Button variant="outline" className="rounded-xl" asChild>
              <Link to="/dashboard/parts">
                <Store className="mr-2 h-4 w-4" />
                Sell as supplier
              </Link>
            </Button>
          </div>
        </div>

        <div className="parts-hub-footer-cta mt-8 text-center">
          <p className="mb-3 text-sm text-muted-foreground">Need a quote for 50+ units? WhatsApp our parts desk.</p>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to={partsBrowsePath()}>Open catalogue</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
