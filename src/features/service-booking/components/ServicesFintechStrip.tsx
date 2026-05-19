import { Link } from "react-router-dom";
import { SERVICES_HUB_FEATURES } from "../data/services-hub-data";

export function ServicesFintechStrip() {
  return (
    <section className="container pb-8">
      <h2 className="services-hub-section-title text-center">Why Motorcart Services</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Ride-hailing experience for car care — book, track, pay
      </p>
      <ul className="services-features-grid">
        {SERVICES_HUB_FEATURES.map((f) => (
          <li key={f.id}>
            <Link to={f.href} className="services-feature-item group">
              <span className="services-feature-icon">
                <f.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
              </span>
              <span className="services-feature-label">{f.label}</span>
              <span className="services-feature-desc">{f.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
