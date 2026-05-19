import { Link } from "react-router-dom";
import { PARTS_HUB_SERVICES } from "../data/parts-hub-data";

export function PartsServicesStrip() {
  return (
    <section className="container pb-8">
      <h2 className="parts-hub-section-title text-center">Why garages choose Motorcart</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Fintech checkout · GST compliance · AI fitment · dealer wholesale
      </p>
      <ul className="parts-services-grid">
        {PARTS_HUB_SERVICES.map((s) => (
          <li key={s.id}>
            <Link to={s.href} className="parts-service-item group">
              <span className="parts-service-icon">
                <s.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </span>
              <span className="parts-service-label">{s.label}</span>
              <span className="parts-service-desc">{s.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
