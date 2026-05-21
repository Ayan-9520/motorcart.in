import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarketingPageShellProps = {
  children: ReactNode;
  className?: string;
  /** Tighter vertical spacing (Contact form fits with less scroll) */
  compact?: boolean;
};

/** Full-width marketing pages (About, Contact) with consistent padding below navbar. */
export function MarketingPageShell({ children, className, compact }: MarketingPageShellProps) {
  return (
    <div
      className={cn(
        "marketing-page w-full text-foreground",
        compact ? "pb-24 md:pb-16" : "min-h-[calc(100vh-8rem)] pb-28 md:pb-20",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MarketingPageBody({
  children,
  className,
  narrow,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "marketing-page-body mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-5xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
