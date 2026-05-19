import { Link } from "react-router-dom";
import { AUCTION_SERVICES } from "../data/auction-hub-data";

export function AuctionServicesStrip() {
  return (
    <section className="container pb-8">
      <h2 className="auction-hub-section-title text-center">Our popular services</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        End-to-end auction ecosystem — bid, park, document &amp; finance in one place
      </p>
      <ul className="auction-services-grid">
        {AUCTION_SERVICES.map((service) => (
          <li key={service.id}>
            <Link to={service.href} className="auction-service-item group">
              <span className="auction-service-icon">
                <service.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </span>
              <span className="auction-service-label">{service.label}</span>
              <span className="auction-service-desc">{service.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
