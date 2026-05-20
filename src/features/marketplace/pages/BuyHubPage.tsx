import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, GitCompare, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { BUY_HUB_CATEGORIES } from "../data/buy-hub-categories";
import { HubCategoryCard } from "../components/HubCategoryCard";
import { BuyCategoryIconRail } from "../components/BuyCategoryIconRail";

const TRUST_STATS = [
  { icon: TrendingUp, label: "2.5L+", sub: "Listings" },
  { icon: Users, label: "8,500+", sub: "Dealers" },
  { icon: ShieldCheck, label: "100%", sub: "RC verified" },
  { icon: Sparkles, label: "AI", sub: "Fair price" },
];

export function BuyHubPage() {
  useEffect(() => {
    setPageMeta({
      title: "Buy Vehicles — New & Pre-Owned",
      description:
        "Cars, bikes, trucks, buses, auto, equipment & EV — new and pre-owned with filters, verified dealers & EMI.",
    });
  }, []);

  return (
    <div className="buy-hub-page min-h-screen">
      {/* Compact premium header — categories start higher on screen */}
      <section className="buy-hub-top">
        <div className="container">
          <div className="buy-hub-top-inner">
            <div className="buy-hub-top-copy">
              <p className="marketplace-hub-eyebrow">Buy on Motorcart</p>
              <h1 className="buy-hub-hero-title">Choose your vehicle</h1>
              <p className="buy-hub-hero-sub">
                All categories below — tap <strong className="text-foreground">New</strong> or{" "}
                <strong className="text-foreground">Pre-Owned</strong> on any card
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs" asChild>
                  <Link to="/vehicles/compare">
                    <GitCompare className="mr-1 h-3.5 w-3.5" />
                    Compare
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs" asChild>
                  <Link to="/finance/compare">
                    <Calculator className="mr-1 h-3.5 w-3.5" />
                    EMI
                  </Link>
                </Button>
              </div>
            </div>
            <ul className="buy-hub-stats-compact">
              {TRUST_STATS.map(({ icon: Icon, label, sub }) => (
                <li key={sub} className="buy-hub-stat-compact">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span>
                    <strong>{label}</strong>
                    <em>{sub}</em>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* All 7 categories — always visible icon row */}
          <BuyCategoryIconRail categories={BUY_HUB_CATEGORIES} />
        </div>
      </section>

      {/* Full category cards — 4 + 3 layout, all on front */}
      <section className="container pb-12 pt-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            All categories · New &amp; Pre-Owned
          </h2>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            7 types
          </span>
        </div>

        <div className="buy-hub-grid-all">
          {BUY_HUB_CATEGORIES.map((item, i) => (
            <motion.div
              key={item.id}
              id={`category-${item.id}`}
              className="buy-hub-grid-item scroll-mt-28"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <HubCategoryCard item={item} compact />
            </motion.div>
          ))}
        </div>

        <div className="buy-hub-footer-cta mt-8 text-center">
          <Button className="rounded-xl shadow-[var(--shadow-primary)]" asChild>
            <Link to="/buy/cars/used">
              Browse pre-owned cars <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
