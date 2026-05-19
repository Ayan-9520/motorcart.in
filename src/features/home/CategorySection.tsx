import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bike, BusFront, Car, CarFront, Truck, Zap } from "lucide-react";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
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
  return (
    <section className="home-section">
      <div className="container mx-auto space-y-10 px-4">
        <SectionHeader
          eyebrow="Browse by type"
          title="Vehicle Categories"
          description="New cars, used cars, bikes, trucks, buses, and EVs — all in one marketplace."
          href="/vehicles"
          linkLabel="View all"
        />
        <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" initial={false}>
          {VEHICLE_CATEGORIES.map((cat, index) => {
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
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-card transition-all hover:border-primary/40 hover:shadow-card-hover dark:border-border dark:bg-card"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{cat.label}</p>
                    <p className="text-sm text-muted-foreground">{cat.count} listings</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
