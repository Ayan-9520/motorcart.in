import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { QUICK_ACCESS } from "@/features/home/data/homepage-data";
import { SectionHeader } from "./SectionHeader";

export function QuickAccessSection() {
  return (
    <section className="border-b border-border bg-card py-7 md:py-9">
      <div className="container home-stack">
        <SectionHeader
          eyebrow="Quick access"
          title="Everything you need, one tap away"
          description="Buy, sell, finance, service, and grow — premium tools for buyers, dealers, and partners."
          align="center"
        />
        <div className="quick-access-grid">
          {QUICK_ACCESS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="min-w-0"
              >
                <Link
                  to={item.href}
                  className="quick-access-card group flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background text-center transition-all hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-foreground">{item.label}</span>
                  {item.description && (
                    <span className="text-[11px] leading-snug text-muted-foreground">{item.description}</span>
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
