import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AUCTION_ASSET_CATEGORIES } from "../data/auction-hub-data";

export function AuctionAssetCategoryGrid() {
  return (
    <section className="container pb-14">
      <div className="auction-hub-category-header">
        <h2 className="auction-hub-section-title text-primary">More than just vehicles</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Commercial fleets, tractors, gold, real estate &amp; more — browse by asset class with live &amp;
          upcoming lots across India.
        </p>
      </div>

      <div className="auction-category-grid">
        {AUCTION_ASSET_CATEGORIES.map((cat) => (
          <Link key={cat.id} to={cat.href} className="auction-category-card group">
            <img src={cat.image} alt={cat.label} loading="lazy" className="auction-category-bg" />
            <span className="auction-category-overlay" />
            <span className="auction-category-content">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                {cat.countLabel}
              </span>
              <span className="text-lg font-bold text-white md:text-xl">{cat.label}</span>
              <span className="text-xs text-white/85">{cat.subtitle}</span>
              <span className="auction-category-cta">
                View all <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
