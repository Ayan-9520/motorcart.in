import { Link } from "react-router-dom";
import { Bell, Gavel, MessageCircle, Car } from "lucide-react";
import type { DealerNotification } from "../lib/dealer-analytics";
import { cn } from "@/lib/utils";

const iconMap = {
  lead: MessageCircle,
  auction: Gavel,
  inventory: Car,
  system: Bell,
};

type DealerNotificationsPanelProps = {
  items: DealerNotification[];
  className?: string;
};

export function DealerNotificationsPanel({ items, className }: DealerNotificationsPanelProps) {
  return (
    <div className={cn("dealer-os-card", className)}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications
        </h2>
        <span className="dealer-os-pill">{items.length} new</span>
      </div>
      <ul className="space-y-2">
        {items.map((n) => {
          const Icon = iconMap[n.type];
          const inner = (
            <li className="dealer-notification-row">
              <span className="dealer-notification-icon">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{n.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{n.body}</p>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
            </li>
          );
          return n.href ? (
            <Link key={n.id} to={n.href} className="block hover:opacity-90">
              {inner}
            </Link>
          ) : (
            <div key={n.id}>{inner}</div>
          );
        })}
        {!items.length && (
          <p className="text-sm text-muted-foreground py-6 text-center">All caught up — no pending alerts.</p>
        )}
      </ul>
    </div>
  );
}
