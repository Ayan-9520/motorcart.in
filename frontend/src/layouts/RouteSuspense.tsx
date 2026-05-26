import { Suspense, type ReactNode } from "react";
import { PageSpinner } from "@/shared/ui/loading/PageSpinner";

export function RouteSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageSpinner className="min-h-[40vh]" />}>{children}</Suspense>;
}
