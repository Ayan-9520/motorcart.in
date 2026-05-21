import { Link } from "react-router-dom";
import { SERVICES_HUB_FEATURES } from "../data/services-hub-data";

export function ServicesFintechStrip() {
  return (
    <section className="container pb-8">
      <h2 className="services-hub-section-title text-center">Service experience, fintech-grade</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground md:max-w-2xl md:mx-auto">
        Book like ride-hailing: live slots, OTP at the bay, transparent quotes &amp; secure checkout — for every
        vehicle class from two-wheelers to fleets.
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
