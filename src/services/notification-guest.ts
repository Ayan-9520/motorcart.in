import type { DbNotification } from "@/types/database";

const STORAGE_KEY = "motorcart_guest_notifications_v1";

const SEED: Omit<DbNotification, "user_id">[] = [
  {
    id: "gn1",
    title: "Welcome to Motorcart",
    message: "Search 2.4L+ vehicles, parts, loans & live auctions — all in one place.",
    type: "system",
    is_read: false,
    link: "/buy",
    metadata: {},
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "gn2",
    title: "Wishlist tip",
    message: "Tap the heart on any listing to save vehicles here.",
    type: "wishlist",
    is_read: false,
    link: "/wishlist",
    metadata: {},
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "gn3",
    title: "Auction ending soon",
    message: "12 live lots end in the next 2 hours — place your bid now.",
    type: "auction",
    is_read: false,
    link: "/auctions",
    metadata: {},
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "gn4",
    title: "Pre-approved loan offer",
    message: "You may qualify for car loan EMI from ₹4,500/mo. Check eligibility.",
    type: "finance",
    is_read: true,
    link: "/finance",
    metadata: {},
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

function withUserId(rows: Omit<DbNotification, "user_id">[]): DbNotification[] {
  return rows.map((r) => ({ ...r, user_id: "guest" }));
}

export function loadGuestNotifications(): DbNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as DbNotification[];
  } catch {
    /* ignore */
  }
  const seeded = withUserId(SEED);
  saveGuestNotifications(seeded);
  return seeded;
}

export function saveGuestNotifications(items: DbNotification[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 50)));
}

export function markGuestNotificationRead(id: string) {
  const items = loadGuestNotifications().map((n) => (n.id === id ? { ...n, is_read: true } : n));
  saveGuestNotifications(items);
}

export function markAllGuestNotificationsRead() {
  saveGuestNotifications(loadGuestNotifications().map((n) => ({ ...n, is_read: true })));
}

export function syncGuestWishlistNotification(count: number) {
  const items = loadGuestNotifications();
  if (count === 0) return;
  const updated: DbNotification = {
    id: "gn-wishlist-count",
    user_id: "guest",
    title: `${count} vehicle${count === 1 ? "" : "s"} in wishlist`,
    message: "View your saved listings anytime from the heart menu.",
    type: "wishlist",
    is_read: false,
    link: "/wishlist",
    metadata: { count },
    created_at: new Date().toISOString(),
  };
  const rest = items.filter((n) => n.id !== updated.id);
  saveGuestNotifications([updated, ...rest]);
}

export function pushGuestNotification(partial: Pick<DbNotification, "title" | "message" | "type" | "link">) {
  const item: DbNotification = {
    id: `gn-${Date.now()}`,
    user_id: "guest",
    title: partial.title,
    message: partial.message,
    type: partial.type,
    is_read: false,
    link: partial.link,
    metadata: {},
    created_at: new Date().toISOString(),
  };
  saveGuestNotifications([item, ...loadGuestNotifications()]);
}
