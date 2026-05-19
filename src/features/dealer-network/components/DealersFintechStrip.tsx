import { Link } from "react-router-dom";
import { DEALER_HUB_SERVICES } from "../data/dealers-hub-data";

export function DealersFintechStrip() {
  return (
    <section className="container pb-8">
      <h2 className="dealers-hub-section-title text-center">Dealer partner stack</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        CRM · AI · WhatsApp · analytics — built for automotive retail
      </p>
      <ul className="dealers-features-grid">
        {DEALER_HUB_SERVICES.map((s) => (
          <li key={s.id}>
            <Link to={s.href} className="dealers-feature-item group">
              <span className="dealers-feature-icon">
                <s.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </span>
              <span className="dealers-feature-label">{s.label}</span>
              <span className="dealers-feature-desc">{s.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
