import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Car,
  Play,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { SEARCH_TABS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { cn } from "@/lib/utils";

const heroStats = [
  { label: "Live Listings", value: 240000, suffix: "+" },
  { label: "Active Auctions", value: 142 },
  { label: "Dealers Online", value: 8500, suffix: "+" },
];

const visualTiles = [
  { icon: Car, label: "Vehicles", val: "2.4L+" },
  { icon: Users, label: "Dealers", val: "8.5K+" },
  { icon: TrendingUp, label: "Loans/mo", val: "₹1200Cr" },
  { icon: Sparkles, label: "AI Score", val: "94%" },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<(typeof SEARCH_TABS)[number]>("All");
  const [query, setQuery] = useState("");

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#0f172a] text-white">
      <motion.div
        className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#16a34a]/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-[#16a34a]/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#f8fafc 1px, transparent 1px), linear-gradient(90deg, #f8fafc 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div className="container relative mx-auto px-4 section-padding">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Badge className="gap-1.5 border-[#16a34a]/40 bg-[#16a34a]/15 px-3 py-1 text-[#4ade80]">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Ecosystem
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              India&apos;s AI Powered{" "}
              <span className="bg-gradient-to-r from-[#16a34a] to-emerald-400 bg-clip-text text-transparent">
                Automobile Ecosystem
              </span>
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              Buy, sell, finance, auction, service, and grow your automobile business with
              enterprise-grade AI automation on one platform.
            </p>

            <div className="space-y-3">
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {SEARCH_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      activeTab === tab
                        ? "bg-[#16a34a] text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/15"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </motion.div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                <motion.div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16a34a]">
                  <Search className="h-5 w-5 text-white" />
                </motion.div>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${activeTab === "All" ? "vehicles, parts, finance..." : activeTab.toLowerCase()}...`}
                  className="flex-1 border-0 bg-transparent text-white placeholder:text-slate-400 focus-visible:ring-0"
                />
                <Button variant="gradient" size="sm" asChild>
                  <Link to={`/vehicles?q=${encodeURIComponent(query)}`}>Search</Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/vehicles">
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link to="/sell">Sell</Link>
              </Button>
              <Button variant="ghost" size="lg" className="gap-2 text-slate-200 hover:text-white" asChild>
                <Link to="/ai-automation">
                  <Play className="h-4 w-4" /> AI Demo
                </Link>
              </Button>
            </div>

            <motion.div className="flex flex-wrap gap-8 pt-2">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#4ade80]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square max-w-lg">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#16a34a]/30 to-emerald-600/20 blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-center">
                  <Building2 className="h-32 w-32 text-[#4ade80]/80" strokeWidth={1} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {visualTiles.map(({ icon: Icon, label, val }) => (
                    <motion.div
                      key={label}
                      whileHover={{ y: -4 }}
                      className="rounded-xl border border-[#16a34a]/20 bg-[#16a34a]/10 p-4 text-center"
                    >
                      <Icon className="mx-auto mb-2 h-5 w-5 text-[#4ade80]" />
                      <p className="text-lg font-bold">{val}</p>
                      <p className="text-xs text-slate-400">{label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              {[
                { title: "LeadBot Active", desc: "34 leads qualified today", pos: "-left-4 top-8" },
                { title: "FinanceBot", desc: "₹2.4Cr loans processed", pos: "-right-4 top-1/3" },
                { title: "Auction Live", desc: "Honda City — ₹7.82L", pos: "bottom-8 left-1/4" },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className={cn(
                    "absolute rounded-xl border border-white/10 bg-[#0f172a]/90 p-3 shadow-xl backdrop-blur-md",
                    card.pos
                  )}
                >
                  <p className="text-xs font-semibold text-[#4ade80]">{card.title}</p>
                  <p className="text-xs text-slate-400">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
