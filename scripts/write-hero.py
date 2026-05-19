path = "src/features/home/HeroSection.tsx"
d, m = "motion.div", "motion.div"
d = "div"
m = "motion.div"

content = f'''import {{ useEffect, useState }} from "react";
import {{ Link }} from "react-router-dom";
import {{ motion, AnimatePresence }} from "framer-motion";
import {{
  ArrowRight,
  BadgeCheck,
  Gavel,
  Landmark,
  Shield,
  Sparkles,
  Store,
}} from "lucide-react";
import {{ Button }} from "@/components/ui/button";
import {{ Badge }} from "@/components/ui/badge";
import {{ HeroSearchModule }} from "@/features/home/components/HeroSearchModule";
import {{ HeroDashboardPanel }} from "@/features/home/components/HeroDashboardPanel";
import {{
  HERO_HEADLINE_WORDS,
  HERO_STATS,
  TRUSTED_PARTNERS,
  POPULAR_BRANDS,
}} from "@/features/home/data/homepage-data";

export function HeroSection() {{
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {{
    const id = setInterval(() => {{
      setWordIndex((i) => (i + 1) % HERO_HEADLINE_WORDS.length);
    }}, 2200);
    return () => clearInterval(id);
  }}, []);

  return (
    <section className="hero-section relative overflow-hidden border-b border-border bg-background wa-pattern">
      <{d} className="container relative mx-auto px-4 pb-16 pt-8 md:pb-20 md:pt-12 lg:pb-24">
        <{d} className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          <{m}
            initial={{{{ opacity: 0, y: 20 }}}}
            animate={{{{ opacity: 1, y: 0 }}}}
            transition={{{{ duration: 0.5 }}}}
            className="space-y-7"
          >
            <Badge className="gap-2 border-primary/30 bg-primary/10 px-4 py-1.5 text-primary">
              <Shield className="h-3.5 w-3.5" />
              <span className="ai-pulse" />
              Trusted by 50,000+ customers · RBI-partner lenders
            </Badge>

            <{d} className="space-y-4">
              <h1 className="text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
                India&apos;s AI-Powered{{" "}}
                <span className="text-primary">Automobile Ecosystem</span>
              </h1>
              <p className="flex min-h-[2rem] items-center text-lg font-medium text-muted-foreground sm:text-xl">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={{wordIndex}}
                    initial={{{{ opacity: 0, y: 8 }}}}
                    animate={{{{ opacity: 1, y: 0 }}}}
                    exit={{{{ opacity: 0, y: -8 }}}}
                    transition={{{{ duration: 0.25 }}}}
                    className="text-primary"
                  >
                    {{HERO_HEADLINE_WORDS[wordIndex]}}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-2 text-foreground">All in one platform.</span>
              </p>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Buy, Sell, Finance, Auction, Service &amp; Grow Your Automotive Business — enterprise-grade
                automation trusted by dealers, banks, and millions of buyers.
              </p>
            </{d}>

            <HeroSearchModule />

            <{d} className="flex flex-wrap gap-3">
              <Button size="lg" className="h-12 rounded-xl px-6 text-base" asChild>
                <Link to="/vehicles">
                  Explore Vehicles <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 rounded-xl px-6" asChild>
                <Link to="/sell">
                  <Store className="h-4 w-4" /> Sell Your Vehicle
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 rounded-xl px-6" asChild>
                <Link to="/auctions">
                  <Gavel className="h-4 w-4" /> Live Auctions
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="h-12 rounded-xl px-6" asChild>
                <Link to="/finance/apply">
                  <Landmark className="h-4 w-4" /> Apply Loan
                </Link>
              </Button>
            </{d}>

            <{d} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {{HERO_STATS.map((stat, i) => (
                <{m}
                  key={{stat.label}}
                  initial={{{{ opacity: 0, y: 12 }}}}
                  animate={{{{ opacity: 1, y: 0 }}}}
                  transition={{{{ delay: 0.15 + i * 0.05 }}}}
                >
                  <Link
                    to={{stat.href}}
                    className="stat-chip group block rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <p className="text-lg font-bold text-foreground group-hover:text-primary sm:text-xl">
                      {{stat.value}}
                    </p>
                    <p className="text-[11px] font-medium text-muted-foreground">{{stat.label}}</p>
                  </Link>
                </{m}>
              ))}}
            </{d}>

            <{d} className="space-y-4 border-t border-border pt-6">
              <{d}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Trusted partners
                </p>
                <{d} className="flex flex-wrap gap-2">
                  {{TRUSTED_PARTNERS.map((p) => (
                    <span
                      key={{p}}
                      className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
                    >
                      {{p}}
                    </span>
                  ))}}
                </{d}>
              </{d}>
              <{d}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Popular brands
                </p>
                <{d} className="flex flex-wrap gap-2">
                  {{POPULAR_BRANDS.map((b) => (
                    <Link
                      key={{b.slug}}
                      to={{`/vehicles?brand=${{b.slug}}`}}
                      className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                      {{b.name}}
                    </Link>
                  ))}}
                </{d}>
              </{d}>
            </{d}>
          </{m}>

          <{m}
            initial={{{{ opacity: 0, scale: 0.98 }}}}
            animate={{{{ opacity: 1, scale: 1 }}}}
            transition={{{{ duration: 0.55, delay: 0.1 }}}}
            className="relative hidden lg:block"
          >
            <{d} className="mb-4 flex items-center justify-end gap-2">
              <Badge variant="outline" className="gap-1 border-primary/40 text-primary">
                <Sparkles className="h-3 w-3" /> Live platform preview
              </Badge>
              <Badge className="gap-1 border-0 bg-primary/15 text-primary">
                <BadgeCheck className="h-3 w-3" /> Enterprise SaaS
              </Badge>
            </{d}>
            <HeroDashboardPanel />
          </{m}>
        </{d}>
      </{d}>
    </section>
  );
}}
'''
open(path, "w", encoding="utf-8").write(content)
print("written", path)
