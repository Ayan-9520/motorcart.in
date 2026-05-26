import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { HOME_AI_RECOMMENDATIONS } from "@/features/home/data/homepage-data";
import { SectionHeader } from "./SectionHeader";

export function AIRecommendationsHomeSection() {
  return (
    <section className="home-section">
      <div className="container home-stack">
        <SectionHeader
          eyebrow="AI recommendations"
          title="AI picks for you"
          description="Personalized inventory, finance, and auction opportunities — updated in real time."
          href="/vehicles"
          linkLabel="See all picks"
        />
        <div className="home-ai-rec-grid">
          {HOME_AI_RECOMMENDATIONS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={item.href} className="home-ai-rec-card group">
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                    <Sparkles className="h-3 w-3" />
                    {item.badge}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.subtitle}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
