import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HubServiceItem } from "../types";

type HubServiceGridProps = {
  services: HubServiceItem[];
  hubLabel: string;
};

export function HubServiceGrid({ services, hubLabel }: HubServiceGridProps) {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <section className="hub-services" aria-labelledby="hub-services-heading">
      <div className="hub-services-header">
        <h2 id="hub-services-heading" className="hub-services-title">
          {hubLabel} ecosystem
        </h2>
        <p className="hub-services-subtitle">
          Everything for {hubLabel.toLowerCase()} — buy, sell, finance &amp; more
        </p>
      </div>

      {featured.length > 0 && (
        <div className="hub-service-grid hub-service-grid-featured">
          {featured.map((item) => (
            <HubServiceCard key={item.id} item={item} size="lg" />
          ))}
        </div>
      )}

      <div className="hub-service-grid">
        {rest.map((item) => (
          <HubServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function HubServiceCard({
  item,
  size = "md",
}: {
  item: HubServiceItem;
  size?: "md" | "lg";
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.href}
      className={cn("group hub-service-card", size === "lg" && "hub-service-card-lg")}
    >
      <span className="hub-service-icon">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="hub-service-body">
        <span className="hub-service-label-row">
          <span className="hub-service-label">{item.label}</span>
          {item.badge && <span className="hub-service-badge">{item.badge}</span>}
        </span>
        <span className="hub-service-desc">{item.description}</span>
      </span>
      <ArrowUpRight className="hub-service-arrow h-4 w-4 shrink-0" aria-hidden />
    </Link>
  );
}
