import { Link } from "react-router-dom";
import { PARTS_HUB_BRANDS } from "../data/parts-hub-data";

export function PartsBrandStrip() {
  return (
    <section className="container pb-10">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Authorised &amp; trusted brands
      </p>
      <ul className="parts-brands-row">
        {PARTS_HUB_BRANDS.map((b) => (
          <li key={b.name}>
            <Link to="/parts/browse" className="parts-brand-tile group overflow-hidden" title={b.name}>
              <img
                src={b.image}
                alt={b.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="parts-brand-tile-label">{b.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
