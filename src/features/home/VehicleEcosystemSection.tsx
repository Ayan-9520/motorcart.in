import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bike,
  Car,
  CarFront,
  Gavel,
  Landmark,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { VEHICLE_ECOSYSTEM } from "@/lib/constants";
import { useHeroSearch } from "@/features/home/components/hero-search-context";
import { getHeroHubConfig } from "@/features/home/data/hero-hub-config";
import { cn } from "@/lib/utils";

const ICONS = {
  Car,
  CarFront,
  Bike,
  Truck,
  Gavel,
  Landmark,
  Wrench,
} as const;

const CARD_TIER: Record<string, string> = {
  "new-cars": "ecosystem-card-featured",
  "used-cars": "ecosystem-card-featured",
  auctions: "ecosystem-card-highlight",
  finance: "ecosystem-card-highlight",
};

export function VehicleEcosystemSection() {
  const { mode } = useHeroSearch();
  const hub = getHeroHubConfig(mode);
  const items = VEHICLE_ECOSYSTEM.filter((item) => hub.ecosystemIds.includes(item.id));

  if (!items.length) return null;

  return (
    <section className="border-b border-border bg-card py-7 md:py-10">
      <div className="container home-stack">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-xs">
            {hub.label} marketplace
          </p>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">
            Everything for {hub.label.toLowerCase()} — one ecosystem
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground sm:text-sm">
            {hub.browseFooter}
          </p>
        </div>
        <div className="ecosystem-grid">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Car;
            const tier = CARD_TIER[item.id] ?? "";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={cn(tier.includes("featured") && "sm:col-span-2")}
              >
                <Link to={item.href} className={cn("group ecosystem-card", tier)}>
                  <span className="ecosystem-card-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-foreground sm:text-base">{item.label}</h3>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-2.5 text-sm font-bold text-primary">{item.stat}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {"highlight" in item && item.highlight ? (
                    <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      <Sparkles className="h-3 w-3" />
                      {item.highlight}
                    </span>
                  ) : null}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
