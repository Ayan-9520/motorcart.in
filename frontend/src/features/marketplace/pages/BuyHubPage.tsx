import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { useVehicleHubStore } from "@/store/vehicleHubStore";
import {
  parseHubCategorySlug,
  parseConditionSlug,
  buyListingPath,
} from "../lib/route-utils";
import { BUY_HUB_CATEGORIES } from "../data/buy-hub-categories";
import { getHubCopy } from "../data/marketplace-hub-config";
import { HubCategoryCard } from "../components/HubCategoryCard";
import { MarketplaceHubHero } from "../components/MarketplaceHubHero";
import type { HubCategorySlug } from "../types";

export function BuyHubPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeHub = useVehicleHubStore((s) => s.activeHub);
  const activeCondition = useVehicleHubStore((s) => s.activeCondition);
  const setBuyContext = useVehicleHubStore((s) => s.setBuyContext);
  const copy = getHubCopy(activeHub);

  const hubParam = searchParams.get("hub");
  const conditionParam = searchParams.get("condition");

  useEffect(() => {
    const hub = parseHubCategorySlug(hubParam ?? undefined);
    if (!hub) return;
    const condition =
      parseConditionSlug(conditionParam ?? undefined) ?? activeCondition;
    setBuyContext(hub, condition);
    navigate(buyListingPath(hub, condition), { replace: true });
  }, [hubParam, conditionParam, activeCondition, navigate, setBuyContext]);

  const activeCategory = useMemo(
    () => BUY_HUB_CATEGORIES.find((c) => c.id === activeHub) ?? BUY_HUB_CATEGORIES[0],
    [activeHub]
  );

  const otherCategories = useMemo(
    () => BUY_HUB_CATEGORIES.filter((c) => c.id !== activeHub),
    [activeHub]
  );

  useEffect(() => {
    setPageMeta({
      title: `Buy ${copy.plural} — New & Pre-Owned`,
      description: `Browse new and pre-owned ${copy.plural.toLowerCase()} with verified dealers, AI fair price & instant EMI on Motorcart.`,
    });
  }, [copy.plural]);

  return (
    <div className="buy-hub-page min-h-screen">
      <MarketplaceHubHero mode="buy" />

      <section className="container py-6 md:py-8">
        <div className="buy-hub-featured-header">
          <div>
            <h2 className="text-lg font-bold tracking-tight md:text-xl">
              {copy.plural} for you
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              New launches &amp; certified pre-owned — tap a condition to browse
            </p>
          </div>
          <ul className="buy-hub-stats-compact">
            <li className="buy-hub-stat-compact">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span>
                <strong>{activeCategory.stats.new}</strong>
                <em>New</em>
              </span>
            </li>
            <li className="buy-hub-stat-compact">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>
                <strong>{activeCategory.stats.used}</strong>
                <em>Pre-Owned</em>
              </span>
            </li>
            <li className="buy-hub-stat-compact">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span>
                <strong>8.5K+</strong>
                <em>Dealers</em>
              </span>
            </li>
          </ul>
        </div>

        <motion.div
          key={activeHub}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <HubCategoryCard item={activeCategory} />
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button className="rounded-xl shadow-[var(--shadow-primary)]" asChild>
            <Link to={buyListingPath(activeHub, "new")}>
              <Sparkles className="mr-1.5 h-4 w-4" />
              New {copy.plural}
            </Link>
          </Button>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to={buyListingPath(activeHub, "used")}>
              Browse pre-owned {copy.plural.toLowerCase()}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container border-t border-border/70 pb-12 pt-2">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          All vehicle types
        </h3>
        <div className="buy-hub-grid-all">
          {otherCategories.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="buy-hub-grid-item"
            >
              <div
                role="button"
                tabIndex={0}
                className="w-full cursor-pointer text-left"
                onClick={() => {
                  const hub = item.id as HubCategorySlug;
                  setBuyContext(hub, activeCondition);
                  navigate(buyListingPath(hub, activeCondition), { replace: true });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const hub = item.id as HubCategorySlug;
                    setBuyContext(hub, activeCondition);
                    navigate(buyListingPath(hub, activeCondition), { replace: true });
                  }
                }}
              >
                <HubCategoryCard item={item} compact />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
