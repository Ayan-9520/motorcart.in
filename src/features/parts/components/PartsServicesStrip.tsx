import { Link } from "react-router-dom";
import { PARTS_HUB_SERVICES } from "../data/parts-hub-data";

export function PartsServicesStrip() {
  return (
    <section className="container pb-8">
      <h2 className="parts-hub-section-title text-center">Built for professional garages</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground md:max-w-2xl md:mx-auto">
        Same stack you expect from a fintech: GST credit-ready invoices, slab wholesale pricing, COD &amp; online
        settlement, and AI fitment — across cars, CV, trucks, buses &amp; equipment.
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
