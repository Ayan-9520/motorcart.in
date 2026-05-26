import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gavel, MessageCircle, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHASE1_SPOTLIGHT } from "@/features/home/data/phase1-home-data";

function SpotlightCard({
  variant,
  icon: Icon,
  data,
  delay,
}: {
  variant: "community" | "auction";
  icon: typeof MessageCircle;
  data:
    | (typeof PHASE1_SPOTLIGHT)["community"]
    | (typeof PHASE1_SPOTLIGHT)["auction"];
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`home-phase1-spotlight-card home-phase1-spotlight-${variant}`}
    >
      <div className="home-phase1-spotlight-glow" aria-hidden />
      <p className="home-phase1-spotlight-eyebrow">
        <Icon className="h-3.5 w-3.5" />
        {data.eyebrow}
        {variant === "auction" && (
          <span className="home-phase1-spotlight-live">
            <Radio className="h-3 w-3" />
            Live
          </span>
        )}
      </p>
      <h3 className="home-phase1-spotlight-title">{data.title}</h3>
      <p className="home-phase1-spotlight-desc">{data.description}</p>
      <ul className="home-phase1-spotlight-stats">
        {data.stats.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button className="rounded-xl font-semibold shadow-[var(--shadow-primary)]" asChild>
          <Link to={data.href}>
            {data.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" className="rounded-xl border-primary/25" asChild>
          <Link to={data.secondaryHref}>{data.secondaryCta}</Link>
        </Button>
      </div>
    </motion.article>
  );
}

export function HomePhase1Spotlight() {
  return (
    <section className="home-phase1-spotlight-section home-section-alt">
      <div className="container home-stack">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            Phase 1 priorities
          </p>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Community &amp; auctions — where India&apos;s auto audience gathers
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Dealers list inventory, bankers move repo stock, and owners share stories — one platform,
            two engines driving daily engagement.
          </p>
        </div>
        <div className="home-phase1-spotlight-grid">
          <SpotlightCard
            variant="community"
            icon={MessageCircle}
            data={PHASE1_SPOTLIGHT.community}
            delay={0}
          />
          <SpotlightCard
            variant="auction"
            icon={Gavel}
            data={PHASE1_SPOTLIGHT.auction}
            delay={0.08}
          />
        </div>
      </div>
    </section>
  );
}
