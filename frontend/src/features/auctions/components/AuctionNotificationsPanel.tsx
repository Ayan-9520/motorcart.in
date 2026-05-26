import { Bell } from "lucide-react";
import type { AuctionNotification } from "../types";
import { cn } from "@/lib/utils";

interface AuctionNotificationsPanelProps {
  notifications: AuctionNotification[];
}

const KIND_STYLE: Record<string, string> = {
  outbid: "auc-notif--warn",
  won: "auc-notif--win",
  reserve_met: "auc-notif--ok",
  auction_ended: "auc-notif--muted",
};

export function AuctionNotificationsPanel({ notifications }: AuctionNotificationsPanelProps) {
  if (!notifications.length) return null;

  return (
    <section className="auc-notif-panel">
      <header className="auc-notif-panel__head">
        <Bell className="h-4 w-4" />
        <span>Your alerts</span>
      </header>
      <ul className="auc-notif-panel__list">
        {notifications.slice(0, 6).map((n) => (
          <li key={n.id} className={cn("auc-notif", KIND_STYLE[n.kind] ?? "")}>
            <p className="auc-notif__title">{n.title}</p>
            <p className="auc-notif__body">{n.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
