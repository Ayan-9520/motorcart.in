import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/theme/theme-provider";
import { AuthInit } from "@/components/auth/AuthInit";
import { router } from "@/router";

export default function App() {
  return (
    <ThemeProvider>
      <AuthInit />
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "!bg-card !text-card-foreground !border !border-border !shadow-card !rounded-xl !text-sm",
          duration: 4000,
        }}
      />
    </ThemeProvider>
  );
}
