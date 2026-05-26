import { DEALER_HUB_BRANDS } from "../data/dealers-hub-data";

export function DealersBrandStrip() {
  return (
    <section className="container border-y border-border/60 py-8">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Authorized &amp; multi-brand partners
      </p>
      <ul className="dealers-brand-strip">
        {DEALER_HUB_BRANDS.map((b) => (
          <li key={b.name} className="dealers-brand-item">
            <img src={b.logo} alt={b.name} loading="lazy" className="partner-logo-tile h-8 w-auto max-h-8 object-contain opacity-80" />
          </li>
        ))}
      </ul>
    </section>
  );
}
