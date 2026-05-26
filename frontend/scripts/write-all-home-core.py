# Generates HeroSection, AIFeaturesSection, DealerCTA with correct JSX

HERO = r'''import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BadgeCheck, Gavel, Landmark, Shield, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroSearchModule } from "@/features/home/components/HeroSearchModule";
import { HeroDashboardPanel } from "@/features/home/components/HeroDashboardPanel";
import { HERO_HEADLINE_WORDS, HERO_STATS, TRUSTED_PARTNERS, POPULAR_BRANDS } from "@/features/home/data/homepage-data";

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % HERO_HEADLINE_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-section relative overflow-hidden border-b border-border bg-background wa-pattern">
      <motion.div className="container relative mx-auto px-4 py-8 md:py-12 lg:py-14">
        <motion.div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 xl:gap-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="space-y-5">
            <Badge className="w-fit gap-2 border-primary/30 bg-primary/10 px-3 py-1 text-primary">
              <Shield className="h-3.5 w-3.5" /><span className="ai-pulse" /> Trusted by 50,000+ · RBI lenders
            </Badge>
            <motion.div className="space-y-3">
              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                India&apos;s AI-Powered <span className="text-primary">Automobile Ecosystem</span>
              </h1>
              <p className="flex flex-wrap items-center gap-x-2 text-base text-muted-foreground sm:text-lg">
                <AnimatePresence mode="wait">
                  <motion.span key={wordIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="font-semibold text-primary">
                    {HERO_HEADLINE_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="font-medium text-foreground">All in one platform.</span>
              </p>
              <p className="max-w-lg text-sm text-muted-foreground sm:text-base">
                Buy, sell, finance, auction, service and grow — for buyers, dealers and banks.
              </p>
            </motion.div>
            <motion.div className="flex flex-wrap gap-2 sm:gap-3">
              <Button size="lg" className="h-11 rounded-xl px-5 shadow-[var(--shadow-primary)]" asChild><Link to="/vehicles">Explore Vehicles <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button size="lg" variant="outline" className="h-11 rounded-xl bg-card px-5" asChild><Link to="/sell"><Store className="h-4 w-4" /> Sell</Link></Button>
              <Button size="lg" variant="outline" className="h-11 rounded-xl bg-card px-5" asChild><Link to="/auctions"><Gavel className="h-4 w-4" /> Auctions</Link></Button>
              <Button size="lg" variant="secondary" className="h-11 rounded-xl px-5" asChild><Link to="/finance/apply"><Landmark className="h-4 w-4" /> Loan</Link></Button>
            </motion.div>
            <HeroSearchModule />
            <motion.div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {HERO_STATS.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
                  <Link to={stat.href} className="block rounded-xl border border-border bg-card px-3 py-2.5 text-center transition-all hover:border-primary hover:shadow-[var(--shadow-card-hover)]">
                    <p className="text-base font-bold text-foreground sm:text-lg">{stat.value}</p>
                    <p className="text-[10px] font-medium text-muted-foreground">{stat.label}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="rounded-xl border border-border bg-card p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Partners &amp; brands</p>
              <motion.div className="flex flex-wrap gap-1.5">
                {TRUSTED_PARTNERS.map((p) => (<span key={p} className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium">{p}</span>))}
                {POPULAR_BRANDS.map((b) => (<Link key={b.slug} to={`/vehicles?brand=${b.slug}`} className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 text-[11px] font-medium text-primary">{b.name}</Link>))}
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.08 }} className="relative">
            <motion.div className="mb-3 flex flex-wrap justify-center gap-2 md:justify-end">
              <Badge variant="outline" className="border-primary/40 text-primary"><Sparkles className="mr-1 h-3 w-3" /> Live preview</Badge>
              <Badge className="border-0 bg-primary/15 text-primary"><BadgeCheck className="mr-1 h-3 w-3" /> Enterprise</Badge>
            </motion.div>
            <HeroDashboardPanel />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
'''.replace("motion.div", "div").replace("motion.div", "motion.div")

# Fix: the replace above is wrong. Build manually with variables
d, m = "div", "motion.div"

def tag(name, attrs=""):
    return f"<{name}{(' ' + attrs) if attrs else ''}>"

def close(name):
    return f"</{name}>"

# Write hero using only explicit strings - read from file write-hero output after running original write-hero.py with md:grid

open("src/features/home/HeroSection.tsx", "w", encoding="utf-8").write(
    open("scripts/write-hero.py", encoding="utf-8").read().split("content = f'''")[1].split("'''")[0]
    if False else ""
)

# Simpler: run original write-hero then sed
import subprocess
subprocess.run(["python", "scripts/write-hero.py"], check=True)
t = open("src/features/home/HeroSection.tsx", encoding="utf-8").read()
t = t.replace('className="relative hidden lg:block"', 'className="relative"')
t = t.replace("lg:grid-cols-[1.05fr_0.95fr]", "md:grid-cols-2")
t = t.replace("space-y-7", "space-y-5")
# merge partners section
old = """            <div className="space-y-4 border-t border-border pt-6">
              <motion.div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Trusted partners
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRUSTED_PARTNERS.map((p) => (
                    <span
                      key={p}
                      className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Popular brands
                </p>
                <motion.div className="flex flex-wrap gap-2">
                  {POPULAR_BRANDS.map((b) => (
                    <Link
                      key={b.slug}
                      to={`/vehicles?brand=${b.slug}`}
                      className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>"""
new = """            <div className="rounded-xl border border-border bg-card p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Partners & brands</p>
              <div className="flex flex-wrap gap-1.5">
                {TRUSTED_PARTNERS.map((p) => (<span key={p} className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium">{p}</span>))}
                {POPULAR_BRANDS.map((b) => (<Link key={b.slug} to={`/vehicles?brand=${b.slug}`} className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 text-[11px] font-medium text-primary">{b.name}</Link>))}
              </div>
            </motion.div>"""
# fix motion typos in new block
new = new.replace("</motion.div>", "</div>").replace("<motion.div", "<div")
if old in t:
    t = t.replace(old, new)
open("src/features/home/HeroSection.tsx", "w", encoding="utf-8").write(t)

AI = '''import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Brain, Gavel, Headphones, LineChart, Share2 } from "lucide-react";
import { aiAgents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

const agentIcons = [Brain, LineChart, Gavel, Bot, Share2, Headphones];

export function AIFeaturesSection() {
  return (
    <section className="home-section-alt relative overflow-hidden">
      <div className="container relative mx-auto space-y-10 px-4">
        <SectionHeader eyebrow="AI automation" title="6 AI Agents Powering Motorcart" description="From lead qualification to 24/7 support — intelligent automation at every touchpoint." href="/ai" linkLabel="Explore AI" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiAgents.slice(0, 6).map((agent, index) => {
            const Icon = agentIcons[index % agentIcons.length];
            return (
              <motion.div key={agent.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -4 }} className="home-ai-card">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-5 w-5" /></div>
                <h3 className="text-lg font-semibold text-foreground">{agent.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{agent.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary"><span className="ai-pulse" /> Active</span>
              </motion.div>
            );
          })}
        </div>
        <motion.div className="text-center"><Button size="lg" className="rounded-xl px-8" asChild><Link to="/ai">See AI in Action</Link></Button></div>
      </div>
    </section>
  );
}
'''.replace('<motion.div className="text-center">', '<div className="text-center">').replace('</motion.div>\n      </motion.div>', '</div>\n      </div>')

open("src/features/home/AIFeaturesSection.tsx", "w", encoding="utf-8").write(AI)

DEALER = '''import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Shield, Store, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const perks = [
  { icon: Store, label: "List unlimited inventory" },
  { icon: BarChart3, label: "Dealer CRM & analytics" },
  { icon: Shield, label: "Verified buyer leads" },
  { icon: Users, label: "8,500+ dealer network" },
];

export function DealerCTA() {
  return (
    <section className="home-section">
      <div className="container mx-auto px-4">
        <motion.div className="home-cta-panel" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <Badge className="border-primary/30 bg-primary/10 text-primary">Partner program</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Become a Verified Dealer</h2>
              <p className="max-w-lg text-muted-foreground">Join India&apos;s fastest-growing automotive marketplace with AI leads and enterprise tools.</p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-xl" asChild><Link to="/dashboard/dealer">Apply as Dealer <ArrowRight className="h-4 w-4" /></Link></Button>
                <Button size="lg" variant="outline" className="rounded-xl bg-card" asChild><Link to="/dealers">Learn more</Link></Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {perks.map((perk, index) => {
                const Icon = perk.icon;
                return (
                  <motion.div key={perk.label} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-xl border border-border bg-muted/50 p-4 dark:bg-muted/30">
                    <Icon className="mb-2 h-6 w-6 text-primary" /><p className="text-sm font-medium text-foreground">{perk.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
'''

open("src/features/home/DealerCTA.tsx", "w", encoding="utf-8").write(DEALER)
print("all written")
