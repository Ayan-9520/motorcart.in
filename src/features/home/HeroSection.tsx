import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSearchModule } from "@/features/home/components/HeroSearchModule";
import { HeroSearchInsights } from "@/features/home/components/HeroSearchInsights";
import { HeroDashboardPanel } from "@/features/home/components/HeroDashboardPanel";
import { useHeroSearch } from "@/features/home/components/hero-search-context";
import { getHeroHubConfig } from "@/features/home/data/hero-hub-config";
import { HERO_HEADLINE_WORDS } from "@/features/home/data/homepage-data";

export function HeroSection() {
  const { mode } = useHeroSearch();
  const hub = getHeroHubConfig(mode);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO_HEADLINE_WORDS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-section relative overflow-hidden border-b border-border">
      <div className="hero-section-surface" aria-hidden />

      <div className="container relative py-8 md:py-11 lg:py-12">
        <div className="hero-layout-grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="hero-layout-left min-w-0 space-y-5"
          >
            <div className="hero-eyebrow">
              <Shield className="h-3.5 w-3.5" />
              <span>Trusted by 50,000+ buyers &amp; 8,500+ dealers</span>
            </div>

            <motion.div className="space-y-3">
              <h1 className="hero-headline">
                <span className="hero-headline-line hero-headline-muted">India&apos;s</span>
                <span className="hero-headline-line hero-headline-accent">AI-powered</span>
                <span className="hero-headline-line">automotive ecosystem</span>
              </h1>
              <p className="hero-rotating-line">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${mode}-${wordIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="font-semibold text-primary"
                  >
                    {HERO_HEADLINE_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-muted-foreground"> — {hub.headlineSuffix}.</span>
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="default"
                className="h-10 rounded-xl px-5 font-semibold shadow-[var(--shadow-primary)]"
                asChild
              >
                <Link to={hub.primaryCta.href}>
                  {hub.primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="default" variant="outline" className="h-10 rounded-xl px-5" asChild>
                <Link to={hub.secondaryCta.href}>{hub.secondaryCta.label}</Link>
              </Button>
            </div>

            <HeroSearchModule />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="hero-layout-right hidden min-w-0 md:flex md:flex-col lg:sticky lg:top-20"
          >
            <HeroDashboardPanel />
          </motion.div>
        </div>

        <HeroSearchInsights />
      </div>
    </section>
  );
}
