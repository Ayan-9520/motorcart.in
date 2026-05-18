import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeProvider";
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
          className: "text-sm",
          duration: 4000,
        }}
      />
    </ThemeProvider>
  );
}
