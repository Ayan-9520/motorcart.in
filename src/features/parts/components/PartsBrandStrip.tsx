import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PARTS_HUB_BRANDS } from "../data/parts-hub-data";

export function PartsBrandStrip() {
  return (
    <section className="container pb-10">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Authorised &amp; trusted brands
      </p>
      <ul className="parts-brands-row">
        {PARTS_HUB_BRANDS.map((b) => (
          <li key={b.name}>
            <Link to="/parts/browse" className="parts-brand-tile group" title={b.name}>
              <BrandLogo src={b.logo} alt={b.name} size="sm" className="opacity-80 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
