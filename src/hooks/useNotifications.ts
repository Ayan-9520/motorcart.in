import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  subscribeNotifications,
} from "@/services/notification.service";
import type { DbNotification } from "@/types/database";

export function useNotifications() {
  const { user } = useAuth();
  const [items, setItems] = useState<DbNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user?.id) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const rows = await fetchNotifications(user.id);
      setItems(rows);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
    if (!user?.id) return;
    return subscribeNotifications(user.id, load);
  }, [load, user?.id]);

  const unreadCount = items.filter((n) => !n.is_read).length;

  return {
    notifications: items,
    unreadCount,
    loading,
    markRead: markNotificationRead,
    markAllRead: () => user?.id && markAllNotificationsRead(user.id).then(load),
    refetch: load,
  };
}
