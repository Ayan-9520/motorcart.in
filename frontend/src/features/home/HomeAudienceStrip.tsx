import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PHASE1_AUDIENCE } from "@/features/home/data/phase1-home-data";

export function HomeAudienceStrip() {
  return (
    <section className="home-phase1-audience border-b border-border py-7 md:py-9">
      <div className="container">
        <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
          Built for the Indian auto market
        </p>
        <div className="home-phase1-audience-grid">
          {PHASE1_AUDIENCE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={item.href} className="home-phase1-audience-card group">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    {item.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
