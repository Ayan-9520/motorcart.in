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

const ICONS = {
  Car,
  CarFront,
  Bike,
  Truck,
  Gavel,
  Landmark,
  Wrench,
} as const;

export function VehicleEcosystemSection() {
  return (
    <section className="border-b border-border bg-card py-7 md:py-9">
      <div className="container home-stack">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-xs">Marketplace</p>
          <h2 className="mt-1.5 text-lg font-bold tracking-tight sm:text-xl">
            New + certified pre-owned, one ecosystem
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-xs text-muted-foreground sm:text-sm">
            India&apos;s AI-powered automotive marketplace — split by trust layer, unified by Motorcart.
          </p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {VEHICLE_ECOSYSTEM.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Car;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={item.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-background p-3.5 transition-all hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-2.5 text-sm font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-0.5 flex-1 text-xs text-muted-foreground">{item.description}</p>
                  <p className="mt-2 text-sm font-bold text-primary">{item.stat}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {"highlight" in item && item.highlight ? (
                    <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
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
