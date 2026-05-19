import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, MapPin, Gavel, ChevronRight } from "lucide-react";
import {
  HERO_AI_PICKS,
  HERO_TRENDING_PICKS,
  buildHeroBuyPath,
  HERO_SEARCH_TABS,
} from "@/features/home/data/homepage-data";
import { useHeroSearch } from "@/features/home/components/hero-search-context";

export function HeroSearchInsights() {
  const { mode, filters } = useHeroSearch();
  const activeTab = HERO_SEARCH_TABS.find((t) => t.id === mode) ?? HERO_SEARCH_TABS[0];

  const pickPath = (pickMode: typeof mode, pickQuery: string) =>
    buildHeroBuyPath(pickMode, pickQuery, filters);

  return (
    <section className="hero-insights hero-insights-row" aria-label="Search suggestions">
      <header className="hero-insights-head">
        <span className="hero-insights-label">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" />
          AI picks for you
        </span>
        <span className="hero-insights-meta">Curated for {activeTab.label.toLowerCase()}</span>
      </header>

      <div className="hero-ai-picks-row">
        {HERO_AI_PICKS.map((pick) => (
          <Link
            key={pick.id}
            to={pickPath(pick.mode, pick.query)}
            className="hero-ai-pick-card group"
          >
            <div className="hero-ai-pick-card-top">
              <span className="hero-ai-pick-badge">{pick.badge}</span>
              {pick.mode === "auctions" ? (
                <Gavel className="h-4 w-4 text-primary/80" />
              ) : (
                <Sparkles className="h-4 w-4 text-primary/80" />
              )}
            </div>
            <p className="hero-ai-pick-title">{pick.title}</p>
            <p className="hero-ai-pick-sub">{pick.subtitle}</p>
            <span className="hero-ai-pick-cta">
              View on Buy
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="hero-trending-block">
        <div className="hero-trending-head">
          <TrendingUp className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-xs font-semibold text-foreground">Trending now</span>
        </div>
        <div className="hero-trending-chips-row">
          {HERO_TRENDING_PICKS.map((pick, index) => (
            <Link
              key={pick.id}
              to={pickPath(pick.mode, pick.query)}
              className="hero-trending-chip-pill group"
            >
              <span className="hero-trending-rank">{index + 1}</span>
              <span className="hero-trending-title">{pick.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <p className="hero-insights-foot">
        <MapPin className="h-3 w-3 shrink-0 text-primary" />
        Opens Buy marketplace — New &amp; Used
      </p>
    </section>
  );
}
