import { useAppModalStore } from "@/store/appModalStore";

export function useAppConfirmModal() {
  const requestConfirm = useAppModalStore((s) => s.requestConfirm);
  return { requestConfirm };
}
