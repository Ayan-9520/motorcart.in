import { Link } from "react-router-dom";
import { Calendar, FileDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AuctionEvent } from "../data/auction-hub-data";
import { AUCTION_CATEGORY_ICONS } from "../data/auction-hub-data";
import { auctionEventPath } from "../lib/auction-hub-routes";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const MODE_LABELS = {
  phygital: "Phygital",
  online: "Online",
  physical: "Physical",
} as const;

function formatSchedule(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const time = (d: Date) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const date = s.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  return `${time(s)} to ${time(e)}, ${date}`;
}

interface AuctionEventCardProps {
  event: AuctionEvent;
}

export function AuctionEventCard({ event }: AuctionEventCardProps) {
  const browseHref = auctionEventPath(event.slug);
  const featuredHref = event.featuredAuctionSlug
    ? `/auctions/live/${event.featuredAuctionSlug}`
    : browseHref;

  const onCatalogue = () => {
    toast.success(`${event.city} catalogue — PDF download coming soon`);
  };

  const onInterest = () => {
    toast.success("Interest registered! Our team will call you within 2 hours.");
  };

  return (
    <article className="auction-event-card">
      <div className="auction-event-card-media">
        <img src={event.yardImage} alt={`${event.city} auction yard`} loading="lazy" />
        <Badge
          className={cn(
            "absolute left-3 top-3 border-0 text-[10px] font-bold uppercase",
            event.status === "live" ? "bg-red-600 text-white" : "bg-amber-500 text-white"
          )}
        >
          {event.status === "live" ? "Live now" : "Upcoming"}
        </Badge>
      </div>

      <div className="auction-event-card-body">
        <header className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {event.city}{" "}
              <span className="font-semibold text-primary">{MODE_LABELS[event.mode]}</span>
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {event.venueName}
            </p>
          </div>
        </header>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-foreground">
            {event.vehicleCount} vehicles available
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 gap-1 rounded-lg text-xs"
            onClick={onCatalogue}
          >
            <FileDown className="h-3.5 w-3.5" />
            Catalogue
          </Button>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-primary" />
          {formatSchedule(event.startsAt, event.endsAt)}
        </p>

        <ul className="auction-event-categories">
          {event.categoryKeys.map((key) => {
            const Icon = AUCTION_CATEGORY_ICONS[key] ?? AUCTION_CATEGORY_ICONS.car;
            return (
              <li key={key} title={key}>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </li>
            );
          })}
        </ul>

        <footer className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="rounded-xl font-semibold" asChild>
            <Link to={featuredHref}>View now</Link>
          </Button>
          <Button className="rounded-xl font-semibold shadow-[var(--shadow-primary)]" onClick={onInterest}>
            I am interested
          </Button>
        </footer>
      </div>
    </article>
  );
}
