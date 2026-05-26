import { Link } from "react-router-dom";
import { ArrowRight, Clock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { ServiceCatalogItem } from "../types";
import { SERVICE_CATEGORIES } from "../types";

interface ServiceCatalogCardProps {
  service: ServiceCatalogItem;
  index?: number;
}

export function ServiceCatalogCard({ service, index = 0 }: ServiceCatalogCardProps) {
  const catLabel =
    SERVICE_CATEGORIES.find((c) => c.slug === service.serviceType)?.label ?? service.serviceType;

  return (
    <article className="premium-service-catalog-card group" style={{ animationDelay: `${index * 40}ms` }}>
      <div className="premium-service-catalog-body">
        <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{catLabel}</p>
        <h3 className="mt-1 font-bold text-foreground group-hover:text-primary">{service.name}</h3>
        {service.description ? (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{service.description}</p>
        ) : null}
        {service.centerName ? (
          <p className="mt-2 text-[11px] text-muted-foreground">{service.centerName}</p>
        ) : null}
        <p className="mt-2 text-base font-bold text-primary">
          From {formatCurrency(service.priceFrom)}
          {service.priceTo != null ? ` – ${formatCurrency(service.priceTo)}` : ""}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
          {service.durationMinutes ? (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-muted/60 px-1.5 py-0.5">
              <Clock className="h-3 w-3" />
              {service.durationMinutes} min
            </span>
          ) : null}
          {service.isDoorstep ? (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-muted/60 px-1.5 py-0.5">
              <Home className="h-3 w-3" />
              Doorstep
            </span>
          ) : null}
        </div>
      </div>
      <div className="px-4 pb-4">
        <Button size="sm" className="w-full rounded-xl font-semibold shadow-[var(--shadow-primary)]" asChild>
          <Link to={`/services/book/${service.id}`}>
            Book slot <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
