import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, MessageCircle, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useServiceCenterDetail } from "../hooks/useServiceCenterDetail";
import { serviceSupportWhatsAppUrl } from "../lib/whatsapp";

export function ServiceCenterDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { center, services, reviews, loading } = useServiceCenterDetail(slug);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", content: "" });

  useEffect(() => {
    if (center) {
      setPageMeta({
        title: `${center.name} — Book Service`,
        description: center.description ?? `Book trusted automotive services at ${center.name}.`,
      });
    }
  }, [center]);

  if (!slug) return null;

  const wa =
    center?.phone &&
    serviceSupportWhatsAppUrl({
      phoneDigits: center.phone.replace(/\D/g, "") || "919876543210",
      lines: [center.name, "I'd like to enquire about a service booking."],
    });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-white" asChild>
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Services
            </Link>
          </Button>
          {loading || !center ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-2/3 max-w-md bg-muted" />
              <Skeleton className="h-5 w-full max-w-xl bg-muted" />
            </div>
          ) : (
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold text-foreground">{center.name}</h1>
                  {center.isVerified && <Badge className="bg-primary/15 text-primary">Verified</Badge>}
                </div>
                <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {[center.address, center.city, center.state].filter(Boolean).join(" · ")}
                </p>
                <div className="mt-2 flex items-center gap-2 text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400" />
                  {center.rating.toFixed(1)} ({center.reviewCount} reviews)
                </div>
                {center.description && <p className="mt-4 max-w-2xl text-muted-foreground">{center.description}</p>}
              </div>
              {wa && (
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                  <a href={wa} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto grid gap-10 px-4 py-10 lg:grid-cols-[1fr_340px]">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Services</h2>
          <div className="mt-4 space-y-3">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl bg-muted" />)
              : services.map((s) => (
                  <Card key={s.id} className="border-border bg-card">
                    <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{s.name}</h3>
                        <p className="text-sm text-muted-foreground">{s.description}</p>
                        <p className="mt-1 text-sm text-primary">
                          From {formatCurrency(s.priceFrom)}
                          {s.priceTo != null ? ` – ${formatCurrency(s.priceTo)}` : ""}
                        </p>
                      </div>
                      <Button className="shrink-0 bg-primary text-primary-foreground hover:bg-[#1ebe5d]" asChild>
                        <Link to={`/services/book/${s.id}`}>
                          Book <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </section>

        <aside className="space-y-6">
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground">Ratings & reviews</h3>
              <p className="mt-1 text-xs text-muted-foreground">Post-login review submission is available from booking detail.</p>
              <Separator className="my-4 bg-muted" />
              {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              ) : (
                <ul className="space-y-3">
                  {reviews.map((r) => (
                    <li key={r.id} className="text-sm">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        {r.rating}/5
                      </div>
                      {r.title && <p className="mt-1 font-medium text-foreground">{r.title}</p>}
                      {r.content && <p className="text-muted-foreground">{r.content}</p>}
                    </li>
                  ))}
                </ul>
              )}
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-primary">Leave a review (demo form)</summary>
                <div className="mt-3 space-y-2">
                  <label className="text-xs text-muted-foreground">Rating</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                    className="flex h-9 w-full rounded-md border border-border bg-background px-2 text-sm"
                  />
                  <input
                    placeholder="Title"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm((f) => ({ ...f, title: e.target.value }))}
                    className="flex h-9 w-full rounded-md border border-border bg-background px-2 text-sm"
                  />
                  <textarea
                    placeholder="Tell others about your visit"
                    value={reviewForm.content}
                    onChange={(e) => setReviewForm((f) => ({ ...f, content: e.target.value }))}
                    className="min-h-[72px] w-full rounded-md border border-border bg-background p-2 text-sm"
                  />
                  <p className="text-xs text-muted-foreground">Submit from a confirmed booking to count as verified.</p>
                </div>
              </details>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
