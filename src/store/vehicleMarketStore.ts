import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_COMPARE = 4;
const MAX_RECENT = 12;

interface VehicleMarketState {
  wishlist: string[];
  compare: string[];
  recentlyViewed: string[];
  addWishlist: (id: string) => void;
  removeWishlist: (id: string) => void;
  clearWishlist: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  addCompare: (id: string) => boolean;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
}

export const useVehicleMarketStore = create<VehicleMarketState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      compare: [],
      recentlyViewed: [],

      addWishlist: (id) =>
        set((s) => {
          if (s.wishlist.includes(id)) return s;
          const wishlist = [...s.wishlist, id];
          void import("@/services/notification-guest").then(({ syncGuestWishlistNotification }) =>
            syncGuestWishlistNotification(wishlist.length)
          );
          return { wishlist };
        }),
      removeWishlist: (id) =>
        set((s) => {
          const wishlist = s.wishlist.filter((x) => x !== id);
          void import("@/services/notification-guest").then(({ syncGuestWishlistNotification }) =>
            syncGuestWishlistNotification(wishlist.length)
          );
          return { wishlist };
        }),
      clearWishlist: () => set({ wishlist: [] }),
      toggleWishlist: (id) => {
        const { wishlist } = get();
        if (wishlist.includes(id)) get().removeWishlist(id);
        else get().addWishlist(id);
      },
      isWishlisted: (id) => get().wishlist.includes(id),

      addCompare: (id) => {
        const { compare } = get();
        if (compare.includes(id)) return true;
        if (compare.length >= MAX_COMPARE) return false;
        set({ compare: [...compare, id] });
        return true;
      },
      removeCompare: (id) => set((s) => ({ compare: s.compare.filter((x) => x !== id) })),
      clearCompare: () => set({ compare: [] }),
      isInCompare: (id) => get().compare.includes(id),

      addRecentlyViewed: (id) =>
        set((s) => ({
          recentlyViewed: [id, ...s.recentlyViewed.filter((x) => x !== id)].slice(0, MAX_RECENT),
        })),
    }),
    { name: "motorcart-vehicle-market" }
  )
);
