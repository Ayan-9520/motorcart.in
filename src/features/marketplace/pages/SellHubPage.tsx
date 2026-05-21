import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { useVehicleHubStore } from "@/store/vehicleHubStore";
import { SELL_HUB_CATEGORIES } from "../data/sell-hub-categories";
import { SellCategoryCard } from "../components/SellCategoryCard";
import { MarketplaceHubHero } from "../components/MarketplaceHubHero";
import { getHubCopy } from "../data/marketplace-hub-config";
import { parseHubCategorySlug, sellListingPath } from "../lib/route-utils";
import type { HubCategorySlug } from "../types";

const STEPS = [
  { title: "Choose category", desc: "Car, bike, truck, bus or auto" },
  { title: "Add vehicle details", desc: "Brand, year, kms, city — 5 minutes" },
  { title: "Get offers", desc: "Instant valuation & verified buyer calls" },
];

export function SellHubPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeHub = useVehicleHubStore((s) => s.activeHub);
  const setActiveHub = useVehicleHubStore((s) => s.setActiveHub);
  const copy = getHubCopy(activeHub);

  const hubParam = searchParams.get("hub");
  const typeParam = searchParams.get("type");

  useEffect(() => {
    const parsed = parseHubCategorySlug(hubParam ?? undefined);
    if (parsed) setActiveHub(parsed);
  }, [hubParam, setActiveHub]);

  useEffect(() => {
    const hub = parseHubCategorySlug(typeParam ?? undefined);
    if (hub) {
      navigate(sellListingPath(hub), { replace: true });
    }
  }, [typeParam, navigate]);

  const activeCategory = useMemo(
    () => SELL_HUB_CATEGORIES.find((c) => c.id === activeHub) ?? SELL_HUB_CATEGORIES[0],
    [activeHub]
  );

  const otherCategories = useMemo(
    () => SELL_HUB_CATEGORIES.filter((c) => c.id !== activeHub),
    [activeHub]
  );

  useEffect(() => {
    setPageMeta({
      title: copy.sellTitle,
      description: `${copy.sellSubtitle} on Motorcart.in`,
    });
  }, [copy]);

  return (
    <div className="marketplace-hub-page min-h-screen">
      <MarketplaceHubHero mode="sell" />

      <section className="container py-6">
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="sell-step-card">
              <span className="sell-step-num">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container pb-6">
        <div className="buy-hub-featured-header">
          <div>
            <h2 className="text-lg font-bold tracking-tight md:text-xl">{copy.sellTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{copy.sellSubtitle}</p>
          </div>
          <Button className="rounded-xl shadow-[var(--shadow-primary)]" asChild>
            <Link to={sellListingPath(activeHub)}>
              List now <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <motion.div
          key={activeHub}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 max-w-lg"
        >
          <SellCategoryCard item={activeCategory} />
        </motion.div>
      </section>

      <section className="container border-t border-border/70 pb-14 pt-2">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Sell other vehicle types
        </h3>
        <div className="hub-category-grid">
          {otherCategories.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <div
                role="button"
                tabIndex={0}
                className="w-full cursor-pointer text-left"
                onClick={() => {
                  const hub = item.id as HubCategorySlug;
                  setActiveHub(hub);
                  navigate(`/sell?hub=${hub}`, { replace: true });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const hub = item.id as HubCategorySlug;
                    setActiveHub(hub);
                    navigate(`/sell?hub=${hub}`, { replace: true });
                  }
                }}
              >
                <SellCategoryCard item={item} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" className="rounded-lg" asChild>
            <Link to="/dashboard/dealer">
              <Store className="mr-1.5 h-4 w-4" />
              Dealer bulk upload
            </Link>
          </Button>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            Free for individual owners
          </p>
        </div>
      </section>
    </div>
  );
}
