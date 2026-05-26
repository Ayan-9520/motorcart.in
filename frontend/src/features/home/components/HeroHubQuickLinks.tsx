import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useHeroSearch } from "@/features/home/components/hero-search-context";
import { getHeroHubConfig } from "@/features/home/data/hero-hub-config";

export function HeroHubQuickLinks() {
  const { mode } = useHeroSearch();
  const hub = getHeroHubConfig(mode);

  return (
    <section className="hero-hub-quicklinks" aria-label={`${hub.label} quick links`}>
      <p className="hero-hub-quicklinks-label">
        Explore {hub.label.toLowerCase()}
        <span className="text-muted-foreground"> — marketplace &amp; services</span>
      </p>
      <div className="hero-hub-quicklinks-grid">
        {hub.quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} to={item.href} className="hero-hub-quicklink-card group">
              <span className="hero-hub-quicklink-icon">
                <Icon className="h-4 w-4" />
              </span>
              <span className="hero-hub-quicklink-text">
                <span className="hero-hub-quicklink-title">{item.label}</span>
                {item.description ? (
                  <span className="hero-hub-quicklink-desc">{item.description}</span>
                ) : null}
              </span>
              <ArrowUpRight className="hero-hub-quicklink-arrow h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
