import { useCallback, useEffect, useState } from "react";
import {
  createBooking,
  fetchBookedSlotStarts,
  fetchServiceById,
  fetchServiceCenters,
  fetchServiceCenterBySlug,
  verifyBookingOtp,
} from "../services/service-booking.service";
import { generateSlots } from "../lib/slots";
import type { ServiceBooking, ServiceCatalogItem, ServiceCenter } from "../types";

export function useServiceBookingFlow(serviceId: string | undefined, userId: string | undefined) {
  const [service, setService] = useState<ServiceCatalogItem | null>(null);
  const [center, setCenter] = useState<ServiceCenter | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicleReg, setVehicleReg] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<ServiceBooking | null>(null);
  const [otp, setOtp] = useState("");
  const [otpBusy, setOtpBusy] = useState(false);

  const load = useCallback(async () => {
    if (!serviceId) {
      setService(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const svc = await fetchServiceById(serviceId);
      setService(svc);
      if (!svc) return;
      let c: ServiceCenter | null = null;
      if (svc.centerSlug) c = await fetchServiceCenterBySlug(svc.centerSlug);
      if (!c) {
        const all = await fetchServiceCenters();
        c = all.find((x) => x.id === svc.serviceCenterId) ?? null;
      }
      setCenter(c);
      const interval = c?.slotIntervalMinutes ?? 30;
      const generated = generateSlots(interval, 7);
      const from = new Date().toISOString();
      const to = new Date(Date.now() + 8 * 24 * 3600 * 1000).toISOString();
      const taken = c ? await fetchBookedSlotStarts(c.id, from, to) : [];
      const takenSet = new Set(taken.map((t) => new Date(t).getTime()));
      setSlots(generated.filter((g) => !takenSet.has(new Date(g).getTime())));
    } finally {
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    void load();
  }, [load]);

  const submit = useCallback(async () => {
    if (!service || !center || !userId || !selectedSlot) return null;
    setSubmitting(true);
    try {
      const booking = await createBooking({
        userId,
        serviceId: service.id,
        serviceCenterId: center.id,
        scheduledAt: selectedSlot,
        vehicleDetails: { registration: vehicleReg, make: "", model: "" },
        notes: notes || null,
        pickupAddress: pickup.trim() || null,
        dropAddress: drop.trim() || null,
        totalAmount: service.priceFrom,
      });
      setCreated(booking);
      return booking;
    } finally {
      setSubmitting(false);
    }
  }, [service, center, userId, selectedSlot, vehicleReg, notes, pickup, drop]);

  const confirmOtp = useCallback(async () => {
    if (!created) return { ok: false as const, error: "No booking" };
    setOtpBusy(true);
    try {
      return await verifyBookingOtp(created.id, otp.trim());
    } finally {
      setOtpBusy(false);
    }
  }, [created, otp]);

  return {
    service,
    center,
    slots,
    selectedSlot,
    setSelectedSlot,
    pickup,
    setPickup,
    drop,
    setDrop,
    vehicleReg,
    setVehicleReg,
    notes,
    setNotes,
    loading,
    submitting,
    submit,
    created,
    otp,
    setOtp,
    otpBusy,
    confirmOtp,
    reload: load,
  };
}
