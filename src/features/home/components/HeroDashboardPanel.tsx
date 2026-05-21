import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  CheckCircle2,
  Gavel,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useHeroSearch } from "@/features/home/components/hero-search-context";
import { getHeroHubConfig, getHomeHeroDashboard, type HeroDashboardCard } from "@/features/home/data/hero-hub-config";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

function DashboardCard({ card, delay }: { card: HeroDashboardCard; delay: number }) {
  if (card.type === "auction") {
    return (
      <motion.div {...fade(delay)} className="hero-dash-card hero-dash-card-auction">
        <div className="hero-dash-card-head">
          <Badge className="border-0 bg-destructive text-[10px] text-destructive-foreground">
            {card.live ? (
              <>
                <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                LIVE
              </>
            ) : (
              card.badge
            )}
          </Badge>
          <span className="hero-dash-kpi-label">{card.meta?.split("·")[1]?.trim()}</span>
        </div>
        <p className="hero-dash-card-title">{card.title}</p>
        {card.price != null && (
          <p className="hero-dash-kpi-value text-primary">{formatCurrency(card.price)}</p>
        )}
        <p className="hero-dash-meta">{card.meta}</p>
        <Button size="sm" className="mt-auto w-full rounded-lg text-xs" asChild>
          <Link to={card.href}>Place bid</Link>
        </Button>
      </motion.div>
    );
  }

  if (card.type === "listing") {
    return (
      <motion.div {...fade(delay)} className="hero-dash-card hero-dash-card-listing overflow-hidden p-0">
        {card.image ? (
          <img src={card.image} alt="" className="hero-dash-listing-img" />
        ) : (
          <div className="hero-dash-listing-img bg-muted" />
        )}
        <div className="flex flex-1 flex-col p-2.5 sm:p-3">
          <p className="hero-dash-kpi-label">{card.badge ?? "Listed"}</p>
          <p className="hero-dash-card-title">{card.title}</p>
          {card.price != null && (
            <p className="hero-dash-kpi-value">{formatCurrency(card.price)}</p>
          )}
          <p className="hero-dash-meta">{card.meta}</p>
        </div>
      </motion.div>
    );
  }

  if (card.type === "loan") {
    return (
      <motion.div {...fade(delay)} className="hero-dash-card">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span className="hero-dash-card-title">{card.title}</span>
        </div>
        <p className="hero-dash-meta mt-2">{card.meta}</p>
        {card.price != null && (
          <p className="hero-dash-kpi-value mt-1">{formatCurrency(card.price)}</p>
        )}
        <Button variant="outline" size="sm" className="mt-auto w-full rounded-lg text-xs" asChild>
          <Link to={card.href}>View offers</Link>
        </Button>
      </motion.div>
    );
  }

  if (card.type === "ai") {
    return (
      <motion.div {...fade(delay)} className="hero-dash-card">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-primary)]">
            <Bot className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="hero-dash-card-title">{card.title}</p>
            <p className="flex items-center gap-1 text-[10px] font-medium text-primary">
              <span className="ai-pulse" /> Online
            </p>
          </div>
        </div>
        <p className="hero-dash-meta mt-2 line-clamp-2">{card.subtitle}</p>
        <Button variant="outline" size="sm" className="mt-auto w-full rounded-lg text-xs" asChild>
          <Link to={card.href}>{card.href.includes("/community") ? "Open feed" : "Ask AI"}</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div {...fade(delay)} className="hero-dash-card col-span-2">
      <div className="flex items-center justify-between">
        <p className="hero-dash-kpi-label">{card.title}</p>
        <TrendingUp className="h-4 w-4 text-primary" />
      </div>
      <p className="hero-dash-meta mt-1">{card.subtitle}</p>
      <Button size="sm" className="mt-2 rounded-lg text-xs" asChild>
        <Link to={card.href}>Explore</Link>
      </Button>
    </motion.div>
  );
}

export function HeroDashboardPanel() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { mode } = useHeroSearch();
  const hub = getHeroHubConfig(mode);
  const homeDash = isHome ? getHomeHeroDashboard() : null;
  const cards = homeDash?.cards ?? hub.dashboard;
  const panelTitle = homeDash?.panelTitle ?? `${hub.label} dashboard`;
  const dashboardTags = homeDash?.tags ?? hub.dashboardTags;

  return (
    <motion.div {...fade(0.1)} className="hero-intelligence-panel">
      <div className="hero-intelligence-head">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <Activity className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Live intelligence
            </p>
            <p className="text-sm font-bold tracking-tight text-foreground">{panelTitle}</p>
          </div>
        </div>
        <span className="hero-intelligence-live">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Live
        </span>
      </div>

      <div className="hero-dashboard-grid">
        {cards.slice(0, 4).map((card, i) => (
          <DashboardCard key={`${mode}-${card.title}`} card={card} delay={0.15 + i * 0.05} />
        ))}
        {cards.length === 3 && (
          <motion.div {...fade(0.35)} className="hero-dash-card col-span-2">
            <div className="flex items-center justify-between">
              <p className="hero-dash-kpi-label">Marketplace momentum</p>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-2xl font-bold tracking-tight text-foreground">+38%</p>
              <div className="flex h-10 flex-1 max-w-[130px] items-end gap-0.5">
                {[40, 65, 45, 80, 55, 95, 70].map((h, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-sm bg-primary/85 transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <p className="hero-dash-meta mt-2 flex items-center gap-1">
              <Users className="h-3 w-3" /> 8.5K verified dealers
            </p>
          </motion.div>
        )}
      </div>

      <div className="hero-dashboard-tags">
        {dashboardTags.map((tag) => (
          <span key={tag} className="hero-dashboard-tag">
            {tag.includes("auction") ? <Gavel className="h-3 w-3" /> : null}
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
