import { Link } from "react-router-dom";
import { Car, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const columns = [
  { title: "Marketplace", links: [{ label: "Buy Vehicles", to: "/vehicles" }, { label: "Sell", to: "/sell" }, { label: "Auctions", to: "/auctions" }, { label: "Parts", to: "/parts" }] },
  { title: "Finance", links: [{ label: "Loans", to: "/finance" }, { label: "Insurance", to: "/insurance" }] },
  { title: "Business", links: [{ label: "Dealers", to: "/dashboard/dealer" }, { label: "DSA", to: "/dashboard/dsa" }, { label: "Pricing", to: "/pricing" }] },
  { title: "Company", links: [{ label: "About", to: "/about" }, { label: "Contact", to: "/contact" }, { label: "FAQs", to: "/faqs" }] },
];

export function Footer() {
  return (
    <footer className="border-t bg-brand-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary"><Car className="h-5 w-5 text-white" /></span>
              {SITE_NAME}
            </Link>
            <p className="text-sm text-white/70">{SITE_TAGLINE}</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.to}><Link to={link.to} className="text-sm text-white/70 hover:text-white">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
