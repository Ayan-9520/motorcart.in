import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bike, BusFront, Car, CarFront, Truck, Zap } from "lucide-react";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
import { useHeroSearch } from "@/features/home/components/hero-search-context";
import { getHeroHubConfig } from "@/features/home/data/hero-hub-config";
import { SectionHeader } from "./SectionHeader";

const iconMap = {
  Car,
  CarFront,
  Bike,
  Truck,
  Bus: BusFront,
  Zap,
} as const;

export function CategorySection() {
  const { mode } = useHeroSearch();
  const hub = getHeroHubConfig(mode);
  const categories = VEHICLE_CATEGORIES.filter((cat) => hub.categoryIds.includes(cat.id));

  if (!categories.length) return null;

  return (
    <section className="home-section">
      <div className="container home-stack">
        <SectionHeader
          eyebrow="Browse by type"
          title={`${hub.label} categories`}
          description={`Explore ${hub.label.toLowerCase()} listings on Motorcart — filtered for your search.`}
          href="/buy"
          linkLabel="View all"
        />
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, index) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Car;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Link
                  to={cat.href}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center shadow-card transition-all hover:border-primary/40 hover:shadow-card-hover dark:border-border dark:bg-card"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-foreground">{cat.label}</span>
                  <span className="text-[10px] text-muted-foreground">{cat.count}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
