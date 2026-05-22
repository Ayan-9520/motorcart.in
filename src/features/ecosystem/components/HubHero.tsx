import type { VehicleHubDefinition } from "../types";
import { HubSearchBar } from "./HubSearchBar";

type HubHeroProps = {
  hub: VehicleHubDefinition;
};

export function HubHero({ hub }: HubHeroProps) {
  const Icon = hub.icon;

  return (
    <header className="hub-hero">
      <div
        className="hub-hero-bg"
        style={{ backgroundImage: `url(${hub.heroImage})` }}
        aria-hidden
      />
      <div className="hub-hero-inner container">
        <div className="hub-hero-badge">
          <span className="hub-hero-icon">
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <span className="hub-hero-stat">
            <strong>{hub.stats.listings}</strong> listings
          </span>
          <span className="hub-hero-stat-divider" aria-hidden />
          <span className="hub-hero-stat">
            <strong>{hub.stats.dealers}</strong> dealers
          </span>
        </div>
        <h1 className="hub-hero-title">{hub.label}</h1>
        <p className="hub-hero-tagline">{hub.tagline}</p>
        <p className="hub-hero-desc">{hub.description}</p>
        <HubSearchBar
          hub={hub.slug}
          placeholder={hub.searchPlaceholder}
          brands={hub.brands}
          budgets={hub.budgets}
        />
      </div>
    </header>
  );
}
