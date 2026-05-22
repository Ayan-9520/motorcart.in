import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import type { CustomerEcosystemSnapshot } from "../types";
import { fetchCustomerEcosystemSnapshot, markNotificationRead } from "../services/customer-ecosystem.service";

export function useCustomerEcosystem() {
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<CustomerEcosystemSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const snap = await fetchCustomerEcosystemSnapshot(user?.id);
    setData(snap);
    setLoading(false);
  }, [user?.id, user?.fullName]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const readNotification = useCallback(
    async (id: string) => {
      await markNotificationRead(id);
      setData((prev) =>
        prev
          ? {
              ...prev,
              notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
              unreadNotifications: Math.max(0, prev.unreadNotifications - 1),
            }
          : prev
      );
    },
    []
  );

  return { data, loading, refresh, readNotification };
}
