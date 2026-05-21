import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppModalStore } from "@/store/appModalStore";

/** Global confirm dialog host — mount once near the app root. */
export function AppModalHost() {
  const open = useAppModalStore((s) => s.open);
  const title = useAppModalStore((s) => s.title);
  const description = useAppModalStore((s) => s.description);
  const confirmLabel = useAppModalStore((s) => s.confirmLabel);
  const cancelLabel = useAppModalStore((s) => s.cancelLabel);
  const variant = useAppModalStore((s) => s.variant);
  const close = useAppModalStore((s) => s.close);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && close(false)}>
      <DialogContent className="rounded-2xl border-border/80 shadow-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription className="text-pretty">{description}</DialogDescription> : null}
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" className="rounded-xl" onClick={() => close(false)}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant === "destructive" ? "destructive" : "default"}
            className="rounded-xl"
            onClick={() => close(true)}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
