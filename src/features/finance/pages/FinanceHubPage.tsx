import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calculator,
  Clock,
  Percent,
  ShieldCheck,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { BANK_OFFERS } from "@/features/home/data/homepage-data";
import { PartnerLogoMarquee } from "@/features/home/components/PartnerLogoMarquee";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { FINANCE_HUB_CATEGORIES } from "../data/finance-hub-categories";
import { FinanceHubCard } from "../components/FinanceHubCard";
import { FinanceIconRail } from "../components/FinanceIconRail";
import { financeOffersPath } from "../lib/finance-hub-routes";

const TRUST_STATS = [
  { icon: Building2, label: "14+", sub: "Banks & NBFCs" },
  { icon: Percent, label: "8.5%", sub: "Rates from" },
  { icon: Clock, label: "4 hrs", sub: "Fast approval" },
  { icon: Sparkles, label: "AI", sub: "Best match" },
];

const QUICK_TOOLS = [
  {
    title: "EMI Calculator",
    desc: "Instant monthly EMI",
    href: "/finance/compare",
    icon: Calculator,
  },
  {
    title: "Check eligibility",
    desc: "Soft check · no impact",
    href: "/finance/offers",
    icon: ShieldCheck,
  },
  {
    title: "Refinance & save",
    desc: "Lower your existing EMI",
    href: "/finance/compare?type=refinance",
    icon: TrendingDown,
  },
];

export function FinanceHubPage() {
  useEffect(() => {
    setPageMeta({
      title: "Finance & Loans — Motorcart",
      description:
        "New & used car loans, bike finance, EV green loans, refinance, insurance — compare 14+ lenders and apply online.",
    });
  }, []);

  return (
    <div className="finance-hub-page buy-hub-page min-h-screen">
      <section className="buy-hub-top finance-hub-top">
        <div className="container">
          <div className="buy-hub-top-inner">
            <div className="buy-hub-top-copy">
              <p className="marketplace-hub-eyebrow">Finance on Motorcart</p>
              <h1 className="buy-hub-hero-title">Loans, EMI &amp; insurance</h1>
              <p className="buy-hub-hero-sub">
                All products below — <strong className="text-foreground">Compare</strong> lenders or{" "}
                <strong className="text-foreground">Apply</strong> in minutes with AI matching
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" className="h-8 rounded-lg text-xs shadow-[var(--shadow-primary)]" asChild>
                  <Link to="/finance/apply">
                    Apply now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs" asChild>
                  <Link to="/finance/offers">All bank offers</Link>
                </Button>
              </div>
            </div>
            <ul className="buy-hub-stats-compact">
              {TRUST_STATS.map(({ icon: Icon, label, sub }) => (
                <li key={sub} className="buy-hub-stat-compact finance-hub-stat">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span>
                    <strong>{label}</strong>
                    <em>{sub}</em>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <FinanceIconRail categories={FINANCE_HUB_CATEGORIES} />
        </div>
      </section>

      <section className="container pb-4 pt-2">
        <div className="finance-quick-tools grid gap-3 sm:grid-cols-3">
          {QUICK_TOOLS.map((tool) => (
            <Link key={tool.href} to={tool.href} className="finance-quick-tool group">
              <tool.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary">{tool.title}</p>
                <p className="text-[11px] text-muted-foreground">{tool.desc}</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 opacity-30 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-12 pt-2">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            All finance products
          </h2>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            8 options
          </span>
        </div>

        <div className="buy-hub-grid-all finance-hub-grid">
          {FINANCE_HUB_CATEGORIES.map((item, i) => (
            <motion.div
              key={item.id}
              id={`finance-${item.id}`}
              className="buy-hub-grid-item scroll-mt-28"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <FinanceHubCard item={item} />
            </motion.div>
          ))}
        </div>

        <section className="finance-partners mt-10">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Trusted lending partners
          </p>
          <PartnerLogoMarquee />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {BANK_OFFERS.slice(0, 8).map((bank) => (
              <Link
                key={bank.code}
                to={financeOffersPath()}
                className="finance-bank-chip group"
              >
                <span className="partner-logo-slot shrink-0">
                  <BrandLogo src={bank.logo} alt={bank.name} size="md" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-foreground">{bank.name}</p>
                  <p className="text-[10px] text-primary">
                    From {bank.rate} · EMI {bank.emi}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="buy-hub-footer-cta finance-hub-footer mt-10 text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            AI FinanceBot matches you with the best lender for your profile
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button className="rounded-xl shadow-[var(--shadow-primary)]" asChild>
              <Link to="/finance/apply">
                Start application <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-xl" asChild>
              <Link to="/finance/offers">Compare all offers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
