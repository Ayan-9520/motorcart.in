import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PHASE1_ECOSYSTEM_HUBS, PHASE1_TAGLINE } from "@/features/home/data/phase1-home-data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

export function HomeEcosystemGateway() {
  return (
    <section className="home-phase1-ecosystem border-b border-border bg-card py-8 md:py-11">
      <div className="container home-stack">
        <SectionHeader
          eyebrow="Phase 1 · Vehicle ecosystem"
          title="Every vehicle type — its own hub"
          description={PHASE1_TAGLINE}
          align="center"
        />
        <div className="home-phase1-ecosystem-grid">
          {PHASE1_ECOSYSTEM_HUBS.map((hub, i) => {
            const Icon = hub.icon;
            return (
              <motion.div
                key={hub.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={hub.href}
                  className={cn(
                    "home-phase1-hub-card group",
                    hub.highlight && "home-phase1-hub-card-highlight"
                  )}
                >
                  <span className="home-phase1-hub-icon">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{hub.label}</p>
                    <p className="text-xs text-muted-foreground">{hub.tagline}</p>
                    <p className="mt-1 text-[11px] font-medium text-primary">{hub.stat}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-primary" />
                </Link>
              </motion.div>
            );
          })}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Each hub opens dedicated buy · sell · finance · parts · service &amp; community flows.
        </p>
      </div>
    </section>
  );
}
