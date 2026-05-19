import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setPageMeta } from "@/utils/seo";
import { getDealerBySlug } from "../hooks/useDealerDirectory";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function DealerProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const dealer = slug ? getDealerBySlug(slug) : undefined;

  useEffect(() => {
    if (!dealer) return;
    setPageMeta({
      title: `${dealer.name} — Dealer on Motorcart`,
      description: `${dealer.name} in ${dealer.city} — ${dealer.listingCount} listings, ${dealer.rating}★ rating`,
    });
  }, [dealer]);

  if (!dealer) return <NotFoundPage />;

  const wa = `https://wa.me/${dealer.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${dealer.name}, I found you on Motorcart`)}`;

  return (
    <div className="dealers-hub-page min-h-screen">
      <section className="dealers-profile-hero">
        <div className="container">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 rounded-lg text-primary-foreground/90 hover:bg-white/10 hover:text-white" asChild>
            <Link to="/dealers/browse">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Directory
            </Link>
          </Button>
          <div className="dealers-profile-hero-grid">
            <div className="dealers-profile-cover">
              <img src={dealer.coverUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="dealers-profile-head">
              <div className="dealers-profile-logo">
                <img src={dealer.logoUrl} alt="" className="partner-logo-tile h-10 w-auto object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-white md:text-3xl">{dealer.name}</h1>
                  {dealer.isVerified && (
                    <Badge className="gap-1 border-0 bg-primary text-primary-foreground">
                      <BadgeCheck className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-white/80">
                  <MapPin className="h-4 w-4" />
                  {dealer.city}, {dealer.state}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/90">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <strong>{dealer.rating.toFixed(1)}</strong> ({dealer.reviewCount.toLocaleString("en-IN")})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />~{dealer.responseMins} min response
                  </span>
                  <span className="flex items-center gap-1">
                    <Store className="h-4 w-4" />
                    {dealer.listingCount} listings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="dealers-profile-panel">
              <h2 className="text-lg font-bold">Specialties</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {dealer.specialties.map((s) => (
                  <span key={s} className="dealers-profile-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="dealers-profile-panel">
              <h2 className="text-lg font-bold">Brands</h2>
              <p className="mt-2 text-sm text-muted-foreground">{dealer.brands.join(" · ")}</p>
            </div>
            <div className="dealers-profile-panel">
              <h2 className="text-lg font-bold">Inventory</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Partner since {dealer.sinceYear}. Browse live stock from this showroom on Motorcart.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button className="rounded-xl" asChild>
                  <Link to={`/vehicles?dealer=${dealer.slug}`}>View listings</Link>
                </Button>
                <Button variant="outline" className="rounded-xl" asChild>
                  <Link to={`/community/dealers/${dealer.slug}`}>Community feed</Link>
                </Button>
              </div>
            </div>
          </div>

          <aside className="dealers-profile-panel h-fit space-y-4">
            <h2 className="text-lg font-bold">Contact showroom</h2>
            <Button className="w-full rounded-xl" asChild>
              <a href={wa} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" className="w-full rounded-xl" asChild>
              <a href={`tel:+${dealer.phone.replace(/\D/g, "")}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call dealer
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              KYC-verified partner on Motorcart.in — report issues via support.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
