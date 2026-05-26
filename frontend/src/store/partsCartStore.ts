import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, PartProduct } from "@/features/parts/types";

interface PartsCartState {
  lines: CartLine[];
  addProduct: (part: PartProduct, qty: number, unitPrice: number) => void;
  removeLine: (partId: string) => void;
  setQty: (partId: string, qty: number) => void;
  clear: () => void;
  itemCount: () => number;
}

export const usePartsCartStore = create<PartsCartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addProduct: (part, qty, unitPrice) => {
        set((s) => {
          const existing = s.lines.find((l) => l.partId === part.id);
          const image = part.images[0] ?? "";
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.partId === part.id
                  ? { ...l, qty: Math.min(l.qty + qty, part.stock), price: unitPrice }
                  : l
              ),
            };
          }
          return {
            lines: [
              ...s.lines,
              {
                partId: part.id,
                slug: part.slug,
                name: part.name,
                categorySlug: part.categorySlug,
                image,
                price: unitPrice,
                wholesalePrice: part.wholesalePrice,
                gstRate: part.gstRate,
                bulkMinQty: part.bulkMinQty,
                sellerId: part.sellerId,
                qty: Math.min(qty, part.stock),
              },
            ],
          };
        });
      },
      removeLine: (partId) => set((s) => ({ lines: s.lines.filter((l) => l.partId !== partId) })),
      setQty: (partId, qty) =>
        set((s) => ({
          lines: s.lines.map((l) => (l.partId === partId ? { ...l, qty: Math.max(1, qty) } : l)),
        })),
      clear: () => set({ lines: [] }),
      itemCount: () => get().lines.reduce((n, l) => n + l.qty, 0),
    }),
    { name: "motorcart-parts-cart" }
  )
);
