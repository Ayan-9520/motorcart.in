import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, loading, markRead, markAllRead } = useNotifications();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const handleMarkRead = async (id: string) => {
    await markRead(id);
  };

  return (
    <div className="relative" ref={panelRef}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="nav-icon-btn nav-icon-btn-ghost relative"
        title={unreadCount > 0 ? `Notifications — ${unreadCount} unread` : "Notifications"}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="nav-badge nav-badge-notify" aria-hidden>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="notification-panel animate-fade-in">
          <div className="notification-panel-header">
            <div>
              <p className="font-bold text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-xs"
                onClick={() => void markAllRead()}
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </Button>
            )}
          </div>

          <div className="notification-panel-list">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : notifications.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-muted-foreground">No notifications yet</p>
            ) : (
              <ul>
                {notifications.map((n) => (
                  <li key={n.id}>
                    <div
                      className={cn(
                        "notification-item",
                        !n.is_read && "notification-item-unread"
                      )}
                    >
                      {n.link ? (
                        <Link
                          to={n.link}
                          className="block flex-1"
                          onClick={() => {
                            if (!n.is_read) void handleMarkRead(n.id);
                            setOpen(false);
                          }}
                        >
                          <NotificationBody n={n} />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="block w-full text-left"
                          onClick={() => !n.is_read && void handleMarkRead(n.id)}
                        >
                          <NotificationBody n={n} />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationBody({
  n,
}: {
  n: { title: string; message: string; type: string; created_at: string; is_read: boolean };
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">{n.title}</p>
        <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(n.created_at)}</span>
      </div>
      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.message}</p>
      <span className="mt-1.5 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
        {n.type}
      </span>
    </>
  );
}
