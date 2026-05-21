import { create } from "zustand";

export type AppModalVariant = "default" | "destructive";

type ConfirmState = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel: string;
  variant: AppModalVariant;
  resolve: ((v: boolean) => void) | null;
};

const initial: ConfirmState = {
  open: false,
  title: "",
  description: undefined,
  confirmLabel: "Confirm",
  cancelLabel: "Cancel",
  variant: "default",
  resolve: null,
};

export const useAppModalStore = create<ConfirmState & {
  requestConfirm: (opts: {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: AppModalVariant;
  }) => Promise<boolean>;
  close: (result: boolean) => void;
}>((set, get) => ({
  ...initial,
  requestConfirm: (opts) =>
    new Promise<boolean>((resolve) => {
      set({
        open: true,
        title: opts.title,
        description: opts.description,
        confirmLabel: opts.confirmLabel ?? "Confirm",
        cancelLabel: opts.cancelLabel ?? "Cancel",
        variant: opts.variant ?? "default",
        resolve,
      });
    }),
  close: (result) => {
    const r = get().resolve;
    r?.(result);
    set({ ...initial });
  },
}));
