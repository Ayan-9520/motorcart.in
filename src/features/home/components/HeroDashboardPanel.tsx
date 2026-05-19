import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, Gavel, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useHeroSearch } from "@/features/home/components/hero-search-context";
import { getHeroHubConfig, type HeroDashboardCard } from "@/features/home/data/hero-hub-config";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

function DashboardCard({ card, delay }: { card: HeroDashboardCard; delay: number }) {
  if (card.type === "auction") {
    return (
      <motion.div {...fade(delay)} className="floating-card flex flex-col">
        <div className="flex items-center justify-between gap-1">
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
          <span className="text-[10px] text-muted-foreground">{card.meta?.split("·")[1]?.trim()}</span>
        </div>
        <p className="mt-2 text-xs font-semibold leading-snug">{card.title}</p>
        {card.price != null && <p className="mt-1 text-base font-bold text-primary">{formatCurrency(card.price)}</p>}
        <p className="text-[10px] text-muted-foreground">{card.meta}</p>
        <Button size="sm" className="mt-auto w-full rounded-lg pt-3 text-xs" asChild>
          <Link to={card.href}>Place Bid</Link>
        </Button>
      </motion.div>
    );
  }

  if (card.type === "listing") {
    return (
      <motion.div {...fade(delay)} className="floating-card flex flex-col overflow-hidden p-0">
        {card.image ? (
          <img src={card.image} alt="" className="h-14 w-full object-cover sm:h-16" />
        ) : (
          <div className="h-14 bg-muted sm:h-16" />
        )}
        <div className="flex flex-1 flex-col p-2 sm:p-2.5">
          <div className="flex items-start justify-between gap-1">
            <div>
              <p className="text-[10px] font-medium text-primary">{card.badge ?? "Listed"}</p>
              <p className="text-xs font-semibold">{card.title}</p>
            </div>
          </div>
          {card.price != null && <p className="mt-1 text-sm font-bold sm:text-base">{formatCurrency(card.price)}</p>}
          <p className="text-[10px] text-muted-foreground">{card.meta}</p>
        </div>
      </motion.div>
    );
  }

  if (card.type === "loan") {
    return (
      <motion.div {...fade(delay)} className="floating-card">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span className="text-xs font-semibold">{card.title}</span>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">{card.meta}</p>
        {card.price != null && <p className="text-base font-bold">{formatCurrency(card.price)}</p>}
        <Button variant="outline" size="sm" className="mt-2 w-full rounded-lg text-xs" asChild>
          <Link to={card.href}>View offers</Link>
        </Button>
      </motion.div>
    );
  }

  if (card.type === "ai") {
    return (
      <motion.div {...fade(delay)} className="floating-card flex flex-col">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Bot className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold">{card.title}</p>
            <p className="flex items-center gap-1 text-[10px] text-primary">
              <span className="ai-pulse" /> Online
            </p>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">{card.subtitle}</p>
        <Button variant="outline" size="sm" className="mt-auto w-full rounded-lg text-xs" asChild>
          <Link to={card.href}>Ask AI</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div {...fade(delay)} className="floating-card col-span-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground">{card.title}</p>
        <TrendingUp className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{card.subtitle}</p>
      <Button size="sm" className="mt-2 rounded-lg text-xs" asChild>
        <Link to={card.href}>Explore</Link>
      </Button>
    </motion.div>
  );
}

export function HeroDashboardPanel() {
  const { mode } = useHeroSearch();
  const hub = getHeroHubConfig(mode);
  const cards = hub.dashboard;

  return (
    <motion.div
      {...fade(0.1)}
      className="hero-dashboard-panel w-full max-w-full rounded-2xl border border-border/80 bg-gradient-to-b from-card to-muted/20 p-2.5 shadow-[var(--shadow-card)] sm:p-3"
    >
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {hub.label} preview
      </p>
      <div className="grid grid-cols-2 gap-2">
        {cards.slice(0, 4).map((card, i) => (
          <DashboardCard key={`${mode}-${card.title}`} card={card} delay={0.15 + i * 0.05} />
        ))}
        {cards.length === 3 && (
          <motion.div {...fade(0.35)} className="floating-card col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground">Marketplace</p>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-xl font-bold text-foreground">+38%</p>
              <div className="flex h-8 flex-1 max-w-[120px] items-end gap-0.5">
                {[40, 65, 45, 80, 55, 95, 70].map((h, idx) => (
                  <motion.div key={idx} className="flex-1 rounded-sm bg-primary/80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
              <Users className="h-3 w-3" /> 8.5K dealers
            </p>
          </motion.div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {hub.dashboardTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-[10px] font-medium text-primary"
          >
            {tag.includes("auction") ? <Gavel className="h-3 w-3" /> : null}
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
