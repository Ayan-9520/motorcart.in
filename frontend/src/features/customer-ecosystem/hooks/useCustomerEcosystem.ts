import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import type { CustomerEcosystemSnapshot } from "../types";
import {
  createCustomerVehicle,
  fetchCustomerEcosystemSnapshot,
  markNotificationRead,
  updateCustomerVehicleFastag,
  upsertCustomerPreferences,
  type CreateVehicleInput,
  type UpsertPreferencesInput,
} from "../services/customer-ecosystem.service";

export function useCustomerEcosystem() {
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<CustomerEcosystemSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const snap = await fetchCustomerEcosystemSnapshot(user?.id);
    setData(snap);
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const readNotification = useCallback(async (id: string) => {
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
  }, []);

  const addVehicle = useCallback(
    async (input: CreateVehicleInput) => {
      if (!user?.id) return { ok: false, error: "Not signed in" };
      setSaving(true);
      const result = await createCustomerVehicle(user.id, input);
      if (result.ok) await refresh();
      setSaving(false);
      return result;
    },
    [user?.id, refresh]
  );

  const savePreferences = useCallback(
    async (input: UpsertPreferencesInput) => {
      if (!user?.id) return { ok: false, error: "Not signed in" };
      setSaving(true);
      const result = await upsertCustomerPreferences(user.id, input);
      if (result.ok) await refresh();
      setSaving(false);
      return result;
    },
    [user?.id, refresh]
  );

  const rechargeFastag = useCallback(
    async (vehicleId: string, amount: number) => {
      if (!user?.id) return { ok: false, error: "Not signed in" };
      const vehicle = data?.vehicles.find((v) => v.id === vehicleId);
      const next = (vehicle?.fastagBalance ?? 0) + amount;
      setSaving(true);
      const result = await updateCustomerVehicleFastag(vehicleId, user.id, next);
      if (result.ok) await refresh();
      setSaving(false);
      return result;
    },
    [user?.id, data?.vehicles, refresh]
  );

  return {
    data,
    loading,
    saving,
    refresh,
    readNotification,
    addVehicle,
    savePreferences,
    rechargeFastag,
  };
}
