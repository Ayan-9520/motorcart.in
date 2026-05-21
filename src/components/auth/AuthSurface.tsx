import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Premium auth card shell — subtle depth, no loud gradients. */
export function AuthSurface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-1 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:p-px before:content-['']",
        "before:bg-gradient-to-br before:from-primary/25 before:via-transparent before:to-primary/5",
        className
      )}
    >
      <div className="relative rounded-[14px] bg-card/95 px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
