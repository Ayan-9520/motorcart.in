import { Link } from "react-router-dom";
import {
  Wrench,
  Hammer,
  Droplets,
  Shield,
  Sparkles,
  Wind,
  Battery,
  CircleDot,
  FileText,
  FileBadge,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategory } from "../types";
import { SERVICE_CATEGORY_IMAGES, servicesCategoryPath } from "../data/services-hub-data";

const ICONS: Record<string, LucideIcon> = {
  Wrench,
  Hammer,
  Droplets,
  Shield,
  Sparkles,
  Wind,
  Battery,
  CircleDot,
  FileText,
  FileBadge,
};

export function ServicesCategoryCard({ category }: { category: ServiceCategory }) {
  const Icon = ICONS[category.icon] ?? Wrench;
  const image = SERVICE_CATEGORY_IMAGES[category.slug];

  return (
    <Link to={servicesCategoryPath(category.slug)} className="services-category-card group">
      {image ? (
        <>
          <img src={image} alt="" className="services-category-bg" loading="lazy" />
          <span className="services-category-overlay" />
        </>
      ) : null}
      <span className="services-category-content">
        <span className="services-category-icon-inline">
          <Icon className="h-5 w-5 text-primary" />
        </span>
        <span className="font-bold text-foreground group-hover:text-primary">{category.label}</span>
        <span className="text-[11px] text-muted-foreground">{category.description}</span>
        <span className="services-category-cta">
          Book <ArrowRight className="h-3 w-3" />
        </span>
      </span>
    </Link>
  );
}
