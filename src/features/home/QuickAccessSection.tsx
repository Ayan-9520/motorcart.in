import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { QUICK_ACCESS } from "@/features/home/data/homepage-data";
import { SectionHeader } from "./SectionHeader";

export function QuickAccessSection() {
  return (
    <section className="border-b border-border bg-card py-12 md:py-16">
      <div className="container mx-auto space-y-8 px-4">
        <SectionHeader
          eyebrow="Quick access"
          title="Everything you need, one tap away"
          description="Buy, sell, finance, service, and grow — premium tools for buyers, dealers, and partners."
          align="center"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {QUICK_ACCESS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={item.href}
                  className="quick-access-card group flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-4 text-center transition-all hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  {item.description && (
                    <span className="text-[11px] text-muted-foreground">{item.description}</span>
                  )}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
