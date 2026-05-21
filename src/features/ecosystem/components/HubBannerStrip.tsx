import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HubPromoBanner } from "../types";

type HubBannerStripProps = {
  banners: HubPromoBanner[];
};

export function HubBannerStrip({ banners }: HubBannerStripProps) {
  return (
    <div className="hub-banner-strip">
      {banners.map((banner) => (
        <Link
          key={banner.id}
          to={banner.href}
          className={cn(
            "hub-banner-card",
            banner.variant === "primary" && "hub-banner-card-primary",
            banner.variant === "soft" && "hub-banner-card-soft"
          )}
        >
          <div className="hub-banner-copy">
            <h3 className="hub-banner-title">{banner.title}</h3>
            <p className="hub-banner-subtitle">{banner.subtitle}</p>
            <span className="hub-banner-cta">
              {banner.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
