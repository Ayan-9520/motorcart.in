import { Link } from "react-router-dom";
import { Car, Mail, MapPin, Phone } from "lucide-react";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/features/home/data/homepage-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-foreground">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Car className="h-5 w-5" />
              </span>
              {SITE_NAME}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">{SITE_TAGLINE}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> support@motorcart.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> 1800-XXX-XXXX
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Mumbai, India
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3 xl:grid-cols-6">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. · Privacy · Terms
        </p>
      </div>
    </footer>
  );
}
