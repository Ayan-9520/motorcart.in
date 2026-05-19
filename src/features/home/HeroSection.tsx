import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Gavel,
  Landmark,
  Shield,
  Sparkles,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroSearchModule } from "@/features/home/components/HeroSearchModule";
import { HeroDashboardPanel } from "@/features/home/components/HeroDashboardPanel";
import {
  HERO_HEADLINE_WORDS,
  HERO_STATS,
  TRUSTED_PARTNERS,
  POPULAR_BRANDS,
} from "@/features/home/data/homepage-data";

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO_HEADLINE_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-section relative overflow-hidden border-b border-border bg-background wa-pattern">
      <motion.div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl dark:bg-primary/5"
        aria-hidden
      />
      <div className="container relative mx-auto px-4 pb-12 pt-6 md:pb-16 md:pt-10 lg:pb-20">
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:space-y-5"
          >
            <Badge className="gap-2 border-primary/30 bg-primary/10 px-3 py-1 text-primary">
              <Shield className="h-3.5 w-3.5" />
              <span className="ai-pulse" />
              Trusted by 50,000+ · RBI-partner lenders
            </Badge>

            <motion.div className="space-y-3">
              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[3rem] lg:leading-[1.06]">
                India&apos;s AI-Powered{" "}
                <span className="text-primary">Automobile Ecosystem</span>
              </h1>
              <p className="flex min-h-[1.75rem] items-center text-base font-medium text-muted-foreground sm:text-lg">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-primary"
                  >
                    {HERO_HEADLINE_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-2 text-foreground">All in one platform.</span>
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Buy, sell, finance, auction &amp; service — enterprise automation for dealers, banks, and
                millions of buyers.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button size="lg" className="h-11 rounded-xl px-5" asChild>
                <Link to="/vehicles">
                  Explore Vehicles <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 rounded-xl px-5" asChild>
                <Link to="/sell">
                  <Store className="h-4 w-4" /> Sell
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 rounded-xl px-5" asChild>
                <Link to="/auctions">
                  <Gavel className="h-4 w-4" /> Auctions
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="h-11 rounded-xl px-5" asChild>
                <Link to="/finance/apply">
                  <Landmark className="h-4 w-4" /> Apply Loan
                </Link>
              </Button>
            </div>

            <HeroSearchModule />

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {HERO_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.04 }}
                >
                  <Link
                    to={stat.href}
                    className="stat-chip group block rounded-xl border border-border bg-card p-2.5 transition-all hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)] sm:p-3"
                  >
                    <p className="text-base font-bold text-foreground group-hover:text-primary sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-medium text-muted-foreground sm:text-[11px]">
                      {stat.label}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Trusted partners &amp; brands
              </p>
              <div className="partner-scroll">
                {TRUSTED_PARTNERS.map((p) => (
                  <span key={p} className="partner-pill">
                    {p}
                  </span>
                ))}
                {POPULAR_BRANDS.map((b) => (
                  <Link
                    key={b.slug}
                    to={`/vehicles?brand=${b.slug}`}
                    className="partner-pill hover:text-primary"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative md:sticky md:top-24"
          >
            <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
              <Badge variant="outline" className="gap-1 border-primary/40 text-primary">
                <Sparkles className="h-3 w-3" /> Live preview
              </Badge>
              <Badge className="gap-1 border-0 bg-primary/15 text-primary">
                <BadgeCheck className="h-3 w-3" /> Enterprise SaaS
              </Badge>
            </div>
            <HeroDashboardPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
