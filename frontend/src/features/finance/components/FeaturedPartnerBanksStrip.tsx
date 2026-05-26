import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PRIMARY_PARTNER_BANKS } from "../data/primary-partner-banks";

interface FeaturedPartnerBanksStripProps {
  applyHref?: string;
  compact?: boolean;
}

export function FeaturedPartnerBanksStrip({
  applyHref = "/finance/apply",
  compact = false,
}: FeaturedPartnerBanksStripProps) {
  return (
    <section className={compact ? "fin-partners-strip fin-partners-strip--compact" : "fin-partners-strip"}>
      <div className="fin-partners-strip__head">
        <p className="fin-partners-strip__eyebrow">Partner banks</p>
        <h3 className="fin-partners-strip__title">HDFC · ICICI · Axis · SBI · Chola · Tata Capital</h3>
      </div>
      <ul className="fin-partners-strip__grid">
        {PRIMARY_PARTNER_BANKS.map((bank) => (
          <li key={bank.id}>
            <Link to={`/finance/offers?bank=${bank.id}`} className="fin-partners-strip__card group">
              <span className="partner-logo-slot shrink-0">
                <BrandLogo src={bank.logoUrl} alt={bank.name} size="md" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground group-hover:text-primary">
                  {bank.name}
                </p>
                <p className="text-[10px] text-muted-foreground">From {bank.rateFrom}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="fin-partners-strip__cta text-center text-xs text-muted-foreground">
        <Link to={applyHref} className="font-semibold text-primary hover:underline">
          Apply across all partners
        </Link>
        {" · "}
        <Link to="/finance/integrations" className="hover:text-primary">
          Bank integrations
        </Link>
      </p>
    </section>
  );
}
