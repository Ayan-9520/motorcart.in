import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/theme/theme-provider";
import { AuthProvider } from "@/auth/AuthProvider";
import { router } from "@/router";
import { AppErrorBoundary } from "@/shared/ui/error-boundary/AppErrorBoundary";
import { AppModalHost } from "@/shared/ui/modal/AppModalHost";
import { parsePublicEnv } from "@/app/config/env";

void parsePublicEnv();

/**
 * Root composition — theme, auth session, global error boundary, modal host, router, toasts.
 * Keeps `App.tsx` thin and gives a single place to add query clients, i18n, etc. later.
 */
export function AppProviders() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppModalHost />
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "!bg-card !text-card-foreground !border !border-border !shadow-card !rounded-xl !text-sm",
            duration: 4000,
          }}
        />
      </ThemeProvider>
    </AppErrorBoundary>
  );
}
