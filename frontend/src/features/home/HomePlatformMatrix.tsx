import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HOME_PLATFORM_PILLARS } from "@/features/home/data/home-platform-data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const ACCENT_CLASS = {
  primary: "home-platform-card-primary",
  auction: "home-platform-card-auction",
  community: "home-platform-card-community",
  finance: "home-platform-card-finance",
} as const;

export function HomePlatformMatrix() {
  return (
    <section className="home-platform-section border-b border-border bg-gradient-to-b from-muted/20 to-background py-8 md:py-12">
      <div className="container home-stack">
        <SectionHeader
          eyebrow="One platform"
          title="Everything Motorcart does — for every vehicle segment"
          description="Cars, bikes, trucks, buses, auto & EV — plus buy, sell, auctions, finance, parts, service, community & AI. Built for India's dealers, bankers & buyers."
          align="center"
          className="mx-auto"
        />
        <div className="home-platform-bento">
          {HOME_PLATFORM_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            const size = pillar.size ?? "default";
            const accent = pillar.accent ? ACCENT_CLASS[pillar.accent] : "";
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.02, 0.24) }}
                className={cn(
                  "home-platform-cell",
                  size === "wide" && "home-platform-cell-wide",
                  size === "tall" && "home-platform-cell-tall",
                  size === "featured" && "home-platform-cell-featured"
                )}
              >
                <Link
                  to={pillar.href}
                  className={cn("home-platform-card group", accent)}
                >
                  <span className="home-platform-icon">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary">
                        {pillar.title}
                      </h3>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-primary" />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {pillar.description}
                    </p>
                    <span className="mt-2 inline-block text-[11px] font-semibold text-primary">
                      {pillar.stat}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
